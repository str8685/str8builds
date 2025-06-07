import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Default email settings if not provided in environment variables
const DEFAULT_SMTP_HOST = 'smtp.sendgrid.net';
const DEFAULT_SMTP_PORT = 587;
const DEFAULT_SMTP_USER = 'apikey';
const DEFAULT_FROM_EMAIL = 'notifications@str8build.co.nz';

// Create a transporter with environment variables or defaults
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || DEFAULT_SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || DEFAULT_SMTP_PORT.toString()),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || DEFAULT_SMTP_USER,
    pass: process.env.SMTP_PASSWORD || '',
  },
});

// Interface for email options
interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }>;
}

/**
 * Send an email
 * @param options Email options
 * @returns Promise that resolves with the nodemailer info object
 */
export async function sendEmail(options: EmailOptions) {
  try {
    // Check if SMTP password is set
    if (!process.env.SMTP_PASSWORD) {
      console.warn('SMTP_PASSWORD not set. Email sending is disabled.');
      return { 
        success: false, 
        message: 'Email sending is disabled. SMTP_PASSWORD not set.' 
      };
    }

    const mailOptions = {
      from: process.env.FROM_EMAIL || DEFAULT_FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      text: options.text || '',
      html: options.html || '',
      attachments: options.attachments || [],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error sending email' 
    };
  }
}

/**
 * Send an invoice email
 * @param to Recipient email
 * @param invoiceNumber Invoice number
 * @param clientName Client name
 * @param amount Invoice amount
 * @param pdfBuffer PDF buffer
 * @returns Promise that resolves with the nodemailer info object
 */
export async function sendInvoiceEmail(
  to: string,
  invoiceNumber: string,
  clientName: string,
  amount: string,
  pdfBuffer: Buffer
) {
  const subject = `Invoice ${invoiceNumber} from STR8 BUILD`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0ca5e9;">Invoice ${invoiceNumber}</h2>
      <p>Dear ${clientName},</p>
      <p>Please find attached your invoice for ${amount}.</p>
      <p>If you have any questions, please don't hesitate to contact us.</p>
      <p>Thank you for your business!</p>
      <p style="margin-top: 30px;">Best regards,<br>STR8 BUILD Team</p>
    </div>
  `;

  return sendEmail({
    to,
    subject,
    html,
    attachments: [
      {
        filename: `Invoice-${invoiceNumber}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  });
}

/**
 * Send a timesheet report email
 * @param to Recipient email
 * @param period Time period (e.g., "June 2023")
 * @param totalHours Total hours
 * @param pdfBuffer PDF buffer
 * @returns Promise that resolves with the nodemailer info object
 */
export async function sendTimesheetEmail(
  to: string,
  period: string,
  totalHours: string,
  pdfBuffer: Buffer
) {
  const subject = `Timesheet Report - ${period}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0ca5e9;">Timesheet Report - ${period}</h2>
      <p>Please find attached your timesheet report for ${period}.</p>
      <p>Total hours: ${totalHours}</p>
      <p style="margin-top: 30px;">Best regards,<br>STR8 BUILD Team</p>
    </div>
  `;

  return sendEmail({
    to,
    subject,
    html,
    attachments: [
      {
        filename: `Timesheet-${period.replace(/\s/g, '-')}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  });
}
