import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { WASTE_SCHEDULE_REGION_1 } from '@/lib/schedule';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
  // Weryfikacja nagłówka autoryzacyjnego z Vercel Cron
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // Obliczenie daty na jutro
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowKey = tomorrow.toISOString().split('T')[0];

  const wasteTypes = WASTE_SCHEDULE_REGION_1[tomorrowKey];

  // Jeśli jutro nie ma wywozu, nic nie wysyłamy
  if (!wasteTypes || wasteTypes.length === 0) {
    return NextResponse.json({ message: 'Brak wywozu śmieci jutro.' });
  }

  // Wysyłka e-maila
  try {
    await resend.emails.send({
      from: 'Odpady Środa Śląska <onboarding@resend.dev>',
      to: process.env.NOTIFICATION_EMAIL!,
      subject: `🔔 Jutro (${tomorrowKey}) wywóz śmieci!`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Przypomnienie o odbiorze śmieci</h2>
          <p>Jutro (<strong>${tomorrowKey}</strong>) w I rejonie odbierane będą:</p>
          <ul>
            ${wasteTypes.map((type) => `<li style="font-size: 18px; margin-bottom: 8px;"><strong>${type}</strong></li>`).join('')}
          </ul>
          <p>Pamiętaj o wystawieniu pojemników/worków przed posesję.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, tomorrowKey, wasteTypes });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
