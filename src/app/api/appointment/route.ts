import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

const ses = new SESClient({
  region: process.env.AWS_SES_REGION || "us-west-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_SES_REGION || "us-west-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
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

    // Format services list for email
    const servicesList = selectedServices.join(", ");

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
            Data: `New appointment request from the Our Mechanic website:\n\nCustomer: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nVehicle: ${carYear} ${carBrand} ${carModel}\nServices: ${servicesList}\n\nRequested Date/Time: ${date} at ${time}\n\nNotes:\n${notes || "None"}\n\n---\nAppointment ID: ${id}\nTest: ${isTest ? "Yes" : "No"}`,
          },
          Html: {
            Data: `
              <h2>New Appointment Request</h2>
              <table style="border-collapse: collapse; width: 100%;">
                <tr><td style="padding: 8px; font-weight: bold;">Customer:</td><td style="padding: 8px;">${name}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${email}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${phone}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Vehicle:</td><td style="padding: 8px;">${carYear} ${carBrand} ${carModel}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Services:</td><td style="padding: 8px;">${servicesList}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Date/Time:</td><td style="padding: 8px;">${date} at ${time}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Notes:</td><td style="padding: 8px;">${notes || "None"}</td></tr>
              </table>
              <hr />
              <p style="color: #888; font-size: 12px;">Appointment ID: ${id} | Test: ${isTest ? "Yes" : "No"}</p>
            `,
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
            Data: `Hi ${name},\n\nThank you for requesting an appointment at Our Mechanic!\n\nHere's a summary of your request:\n\nVehicle: ${carYear} ${carBrand} ${carModel}\nServices: ${servicesList}\nRequested Date/Time: ${date} at ${time}\n\nPlease remember that your appointment is not confirmed until you receive a follow-up from us. We will contact you within 24 hours to confirm.\n\nIf you need immediate assistance, please call us at 403-277-7174.\n\nBest regards,\nOur Mechanic Team\n3927 3-A St NE, Calgary, AB\nMon–Fri: 8:00 AM – 5:00 PM`,
          },
          Html: {
            Data: `
              <h2>Appointment Request Received</h2>
              <p>Hi ${name},</p>
              <p>Thank you for requesting an appointment at <strong>Our Mechanic</strong>!</p>
              <h3>Your Request Summary:</h3>
              <table style="border-collapse: collapse; width: 100%;">
                <tr><td style="padding: 8px; font-weight: bold;">Vehicle:</td><td style="padding: 8px;">${carYear} ${carBrand} ${carModel}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Services:</td><td style="padding: 8px;">${servicesList}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Date/Time:</td><td style="padding: 8px;">${date} at ${time}</td></tr>
              </table>
              <br />
              <p style="background: #fff3cd; padding: 12px; border-radius: 4px;">
                ⚠️ <strong>Please note:</strong> Your appointment is not confirmed until you receive a follow-up from us. We will contact you within 24 hours.
              </p>
              <p>If you need immediate assistance, please call us at <strong>403-277-7174</strong>.</p>
              <br />
              <p>Best regards,<br /><strong>Our Mechanic Team</strong><br />3927 3-A St NE, Calgary, AB<br />Mon–Fri: 8:00 AM – 5:00 PM</p>
            `,
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
