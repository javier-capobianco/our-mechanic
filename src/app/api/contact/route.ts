import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { NextResponse } from "next/server";
import { ownerContactEmail, userContactConfirmation } from "@/src/lib/email-templates";

const ses = new SESClient({
  region: process.env.SES_REGION || process.env.AWS_SES_REGION || "us-west-2",
  credentials: {
    accessKeyId: process.env.SES_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.SES_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const ownerEmail = process.env.CONTACT_EMAIL || "javier.capobianco.2210@gmail.com";

    // Email 1: Notification to the shop owner
    const ownerNotification = new SendEmailCommand({
      Source: "no-reply@ourmechanic.ca",
      Destination: {
        ToAddresses: [ownerEmail],
      },
      Message: {
        Subject: {
          Data: `New Contact Form Submission from ${name}`,
        },
        Body: {
          Text: {
            Data: `You have a new message from the Our Mechanic website:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          },
          Html: {
            Data: ownerContactEmail(name, email, message),
          },
        },
      },
      ReplyToAddresses: [email],
    });

    // Email 2: Confirmation to the person who submitted the form
    const userConfirmation = new SendEmailCommand({
      Source: "no-reply@ourmechanic.ca",
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Subject: {
          Data: "We received your message - Our Mechanic",
        },
        Body: {
          Text: {
            Data: `Hi ${name},\n\nThank you for reaching out to Our Mechanic! We've received your message and will get back to you within 24 hours during business days.\n\nYour message:\n"${message}"\n\nIf you need immediate assistance, please call us at 403-277-7174.\n\nBest regards,\nOur Mechanic Team\n3927 3-A St NE, Calgary, AB\nMon–Fri: 8:00 AM – 5:00 PM`,
          },
          Html: {
            Data: userContactConfirmation(name, message),
          },
        },
      },
    });

    // Send both emails
    await Promise.all([
      ses.send(ownerNotification),
      ses.send(userConfirmation),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("SES send error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
