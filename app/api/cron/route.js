import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'maciekptasior@gmail.com', // wpisz swój adres e-mail
      subject: '🧪 Testowy e-mail powiadomienia o śmieciach',
      html: '<p>Cześć! Jeśli widzisz tę wiadomość, wysyłka przez Resend na Vercelu działa poprawnie.</p>',
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Error' },
      { status: 500 }
    );
  }
}
