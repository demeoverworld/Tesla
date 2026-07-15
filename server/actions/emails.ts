'use server'

import { Resend } from 'resend';
import getBaseURL from '@/lib/base-url';

type ContactEmailPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export async function sendContactEmail(payload: ContactEmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return { success: false, error: 'Email service is not configured' };
  }

  const resend = new Resend(apiKey);
  const baseUrl = getBaseURL();
  const recipientEmail = process.env.CONTACT_EMAIL ?? 'demetregogoladze11@gmail.com';

  try {
    const { data, error } = await resend.emails.send({
      from: 'Tesla Contact <onboarding@resend.dev>',
      to: [recipientEmail],
      replyTo: payload.email,
      subject: `New contact request from ${payload.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 16px; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #111827, #ef4444); padding: 24px; border-radius: 12px; color: #ffffff;">
            <h2 style="margin: 0 0 8px; font-size: 24px;">New Contact Request</h2>
            <p style="margin: 0; opacity: 0.9;">A customer just filled out your contact form.</p>
          </div>

          <div style="padding: 24px 0 0; color: #111827;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: 700; width: 120px;">Name</td>
                <td style="padding: 8px 0;">${payload.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 700;">Email</td>
                <td style="padding: 8px 0;">${payload.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 700;">Phone</td>
                <td style="padding: 8px 0;">${payload.phone ?? 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 700;">Message</td>
                <td style="padding: 8px 0; white-space: pre-wrap;">${payload.message}</td>
              </tr>
            </table>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 13px; color: #6b7280;">
              <p style="margin: 0 0 4px;">Submitted from: ${baseUrl}</p>
              <p style="margin: 0;">This message was generated automatically from your contact form.</p>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    };
  }
}