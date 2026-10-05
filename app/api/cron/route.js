import { NextResponse } from 'next/server';

// Wymuszenie wykonywania funkcji przy każdym zapytaniu (brak ISR Cache)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  // Tutaj Twój dotychczasowy kod wyliczania daty i wysyłki Resend/Nodemailer...
}
