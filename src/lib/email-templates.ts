const BRAND_RED = "#ED2424";
const LOGO_URL = "https://d11hq8wdns9i0v.amplifyapp.com/OurMechanicLogo-1.png";

function emailWrapper(content: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, Helvetica, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
              <!-- Header -->
              <tr>
                <td style="background-color: #1a1a1a; padding: 24px; text-align: center;">
                  <img src="${LOGO_URL}" alt="Our Mechanic" width="180" style="display: block; margin: 0 auto;" />
                </td>
              </tr>
              <!-- Body -->
              <tr>
                <td style="padding: 32px 24px;">
                  ${content}
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="background-color: #1a1a1a; padding: 24px; text-align: center;">
                  <p style="color: #ffffff; margin: 0 0 8px 0; font-size: 14px; font-weight: bold;">Our Mechanic Inc.</p>
                  <p style="color: #aaaaaa; margin: 0 0 4px 0; font-size: 12px;">3927 3-A St NE, Calgary, AB T2E 6S7</p>
                  <p style="color: #aaaaaa; margin: 0 0 4px 0; font-size: 12px;">Phone: 403-277-7174 | Fax: 403-250-0203</p>
                  <p style="color: #aaaaaa; margin: 0 0 4px 0; font-size: 12px;">Mon–Fri: 8:00 AM – 5:00 PM</p>
                  <p style="color: #666666; margin: 16px 0 0 0; font-size: 11px;">© ${new Date().getFullYear()} Our Mechanic Inc. All Rights Reserved.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

export function ownerContactEmail(name: string, email: string, message: string): string {
  return emailWrapper(`
    <h2 style="color: ${BRAND_RED}; margin: 0 0 16px 0; font-size: 22px;">New Contact Form Submission</h2>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
      <tr>
        <td style="padding: 10px 12px; background-color: #f9f9f9; border-bottom: 1px solid #eee; font-weight: bold; width: 120px; color: #333;">Name</td>
        <td style="padding: 10px 12px; background-color: #f9f9f9; border-bottom: 1px solid #eee; color: #555;">${name}</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; border-bottom: 1px solid #eee; font-weight: bold; width: 120px; color: #333;">Email</td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #555;">${email}</td>
      </tr>
    </table>
    <h3 style="color: #333; margin: 0 0 8px 0; font-size: 16px;">Message:</h3>
    <div style="background-color: #f9f9f9; border-left: 4px solid ${BRAND_RED}; padding: 16px; border-radius: 4px; color: #444; line-height: 1.6;">
      ${message.replace(/\n/g, "<br />")}
    </div>
  `);
}

export function userContactConfirmation(name: string, message: string): string {
  return emailWrapper(`
    <h2 style="color: ${BRAND_RED}; margin: 0 0 16px 0; font-size: 22px;">We Received Your Message!</h2>
    <p style="color: #333; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">Hi ${name},</p>
    <p style="color: #555; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">Thank you for reaching out to Our Mechanic! We've received your message and will get back to you within 24 hours during business days.</p>
    <h3 style="color: #333; margin: 0 0 8px 0; font-size: 16px;">Your message:</h3>
    <div style="background-color: #f9f9f9; border-left: 4px solid ${BRAND_RED}; padding: 16px; border-radius: 4px; color: #444; line-height: 1.6; margin-bottom: 20px;">
      ${message.replace(/\n/g, "<br />")}
    </div>
    <p style="color: #555; font-size: 15px; line-height: 1.6; margin: 0 0 8px 0;">If you need immediate assistance, please call us at <strong style="color: ${BRAND_RED};">403-277-7174</strong>.</p>
    <p style="color: #555; font-size: 15px; line-height: 1.6; margin: 24px 0 0 0;">Best regards,<br /><strong>Our Mechanic Team</strong></p>
  `);
}

export function ownerAppointmentEmail(data: {
  name: string;
  email: string;
  phone: string;
  carYear: number;
  carBrand: string;
  carModel: string;
  selectedServices: string[];
  date: string;
  time: string;
  notes: string;
  id: string;
  isTest: boolean;
}): string {
  const servicesList = data.selectedServices.join(", ");
  return emailWrapper(`
    <h2 style="color: ${BRAND_RED}; margin: 0 0 16px 0; font-size: 22px;">New Appointment Request</h2>
    ${data.isTest ? '<p style="background-color: #fff3cd; padding: 8px 12px; border-radius: 4px; font-size: 12px; color: #856404;">⚠️ TEST SUBMISSION</p>' : ""}
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
      <tr>
        <td style="padding: 10px 12px; background-color: #f9f9f9; border-bottom: 1px solid #eee; font-weight: bold; width: 130px; color: #333;">Customer</td>
        <td style="padding: 10px 12px; background-color: #f9f9f9; border-bottom: 1px solid #eee; color: #555;">${data.name}</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Email</td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #555;">${data.email}</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; background-color: #f9f9f9; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Phone</td>
        <td style="padding: 10px 12px; background-color: #f9f9f9; border-bottom: 1px solid #eee; color: #555;">${data.phone}</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Vehicle</td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #555;">${data.carYear} ${data.carBrand} ${data.carModel}</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; background-color: #f9f9f9; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Services</td>
        <td style="padding: 10px 12px; background-color: #f9f9f9; border-bottom: 1px solid #eee; color: #555;">${servicesList}</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Date/Time</td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #555;">${data.date} at ${data.time}</td>
      </tr>
    </table>
    ${data.notes ? `
      <h3 style="color: #333; margin: 0 0 8px 0; font-size: 16px;">Notes:</h3>
      <div style="background-color: #f9f9f9; border-left: 4px solid ${BRAND_RED}; padding: 16px; border-radius: 4px; color: #444; line-height: 1.6; margin-bottom: 16px;">
        ${data.notes.replace(/\n/g, "<br />")}
      </div>
    ` : ""}
    <p style="color: #888; font-size: 11px; margin: 16px 0 0 0;">Appointment ID: ${data.id}</p>
  `);
}

export function userAppointmentConfirmation(data: {
  name: string;
  carYear: number;
  carBrand: string;
  carModel: string;
  selectedServices: string[];
  date: string;
  time: string;
}): string {
  const servicesList = data.selectedServices.join(", ");
  return emailWrapper(`
    <h2 style="color: ${BRAND_RED}; margin: 0 0 16px 0; font-size: 22px;">Appointment Request Received</h2>
    <p style="color: #333; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">Hi ${data.name},</p>
    <p style="color: #555; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0;">Thank you for requesting an appointment at <strong>Our Mechanic</strong>! Here's a summary of your request:</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
      <tr>
        <td style="padding: 10px 12px; background-color: #f9f9f9; border-bottom: 1px solid #eee; font-weight: bold; width: 120px; color: #333;">Vehicle</td>
        <td style="padding: 10px 12px; background-color: #f9f9f9; border-bottom: 1px solid #eee; color: #555;">${data.carYear} ${data.carBrand} ${data.carModel}</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Services</td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #eee; color: #555;">${servicesList}</td>
      </tr>
      <tr>
        <td style="padding: 10px 12px; background-color: #f9f9f9; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Date/Time</td>
        <td style="padding: 10px 12px; background-color: #f9f9f9; border-bottom: 1px solid #eee; color: #555;">${data.date} at ${data.time}</td>
      </tr>
    </table>
    <div style="background-color: #fff3cd; padding: 16px; border-radius: 4px; margin-bottom: 20px;">
      <p style="margin: 0; color: #856404; font-size: 14px;"><strong>⚠️ Please note:</strong> Your appointment is not confirmed until you receive a follow-up from us. We will contact you within 24 hours.</p>
    </div>
    <p style="color: #555; font-size: 15px; line-height: 1.6; margin: 0 0 8px 0;">If you need immediate assistance, please call us at <strong style="color: ${BRAND_RED};">403-277-7174</strong>.</p>
    <p style="color: #555; font-size: 15px; line-height: 1.6; margin: 24px 0 0 0;">Best regards,<br /><strong>Our Mechanic Team</strong></p>
  `);
}
