import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { ownerAppointmentEmail, userAppointmentConfirmation } from "@/src/lib/email-templates";

const ses = new SESClient({
  region: process.env.SES_REGION || process.env.AWS_SES_REGION || "us-west-2",
  credentials: {
    accessKeyId: process.env.SES_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.SES_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const dynamoClient = new DynamoDBClient({
  region: process.env.SES_REGION || process.env.AWS_SES_REGION || "us-west-2",
  credentials: {
    accessKeyId: process.env.SES_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.SES_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const dynamo = DynamoDBDocumentClient.from(dynamoClient);

const TABLE_NAME = "our-mechanic-appointments";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      carYear,
      carBrand,
      carModel,
      selectedServices,
      date,
      timeHour,
      timeMinute,
      timePeriod,
      notes,
      isTest = false,
    } = body;

    // Basic validation
    if (!name || !email || !phone || !carYear || !carBrand || !carModel || !date || !selectedServices?.length) {
      return NextResponse.json(
        { error: "Please fill in all required fields and select at least one service." },
        { status: 400 }
      );
    }

    const time = `${timeHour}:${timeMinute} ${timePeriod}`;
    const id = randomUUID();
    const createdAt = new Date().toISOString();

    // Save to DynamoDB
    const appointment = {
      id,
      createdAt,
      isTest,
      name,
      email,
      phone,
      carYear: Number(carYear),
      carBrand,
      carModel,
      selectedServices,
      date,
      time,
      notes: notes || "",
      status: "pending",
    };

    await dynamo.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: appointment,
      })
    );

    const ownerEmail = process.env.CONTACT_EMAIL || "javier.capobianco.2210@gmail.com";

    // Email 1: Notification to shop owner
    const ownerNotification = new SendEmailCommand({
      Source: "no-reply@ourmechanic.ca",
      Destination: {
        ToAddresses: [ownerEmail],
      },
      Message: {
        Subject: {
          Data: `New Appointment Request - ${name} (${date} at ${time})`,
        },
        Body: {
          Text: {
            Data: `New appointment request:\n\nCustomer: ${name}\nEmail: ${email}\nPhone: ${phone}\nVehicle: ${carYear} ${carBrand} ${carModel}\nServices: ${selectedServices.join(", ")}\nDate/Time: ${date} at ${time}\nNotes: ${notes || "None"}\n\nAppointment ID: ${id}`,
          },
          Html: {
            Data: ownerAppointmentEmail({
              name, email, phone, carYear: Number(carYear), carBrand, carModel,
              selectedServices, date, time, notes: notes || "", id, isTest,
            }),
          },
        },
      },
      ReplyToAddresses: [email],
    });

    // Email 2: Confirmation to customer
    const userConfirmation = new SendEmailCommand({
      Source: "no-reply@ourmechanic.ca",
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Subject: {
          Data: "Appointment Request Received - Our Mechanic",
        },
        Body: {
          Text: {
            Data: `Hi ${name},\n\nThank you for requesting an appointment at Our Mechanic!\n\nVehicle: ${carYear} ${carBrand} ${carModel}\nServices: ${selectedServices.join(", ")}\nDate/Time: ${date} at ${time}\n\nYour appointment is not confirmed until you receive a follow-up from us. We will contact you within 24 hours.\n\nCall us at 403-277-7174 for immediate assistance.\n\nBest regards,\nOur Mechanic Team`,
          },
          Html: {
            Data: userAppointmentConfirmation({
              name, carYear: Number(carYear), carBrand, carModel,
              selectedServices, date, time,
            }),
          },
        },
      },
    });

    // Send both emails
    await Promise.all([
      ses.send(ownerNotification),
      ses.send(userConfirmation),
    ]);

    return NextResponse.json({ success: true, appointmentId: id });
  } catch (error) {
    console.error("Appointment submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit appointment. Please try again later." },
      { status: 500 }
    );
  }
}
