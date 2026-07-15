'use server'

import { Resend } from 'resend';
import getBaseURL from '@/lib/base-url';

type ContactEmailPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

const resend = new Resend(process.env.RESEND_API_KEY ?? process.env.RESEND);

export async function sendContactEmail(payload: ContactEmailPayload) {
  const apiKey = process.env.RESEND_API_KEY ?? process.env.RESEND;

  if (!apiKey) {
    return { success: false, error: 'Email service is not configured' };
  }

  const baseUrl = getBaseURL();

  try {
    const { data, error } = await resend.emails.send({
      from: 'Tesla Contact <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL ?? 'hello@example.com'],
      replyTo: payload.email,
      subject: `New contact message from ${payload.name}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${payload.name}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Phone:</strong> ${payload.phone ?? 'Not provided'}</p>
        <p><strong>Message:</strong> ${payload.message}</p>
        <p><strong>Site:</strong> ${baseUrl}</p>
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