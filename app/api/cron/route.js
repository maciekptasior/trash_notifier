import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    // Pobranie jutrzejszej daty (YYYY-MM-DD)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateKey = tomorrow.toISOString().split('T')[0];

    // TUTAJ DODAJ SWOJĄ LOGIKĘ (np. sprawdzenie w słowniku/bazie):
    // const wasteItems = WASTE_SCHEDULE_REGION_1[dateKey];
    const wasteItems = null; // Zastąp właściwą zmienną

    if (!wasteItems || wasteItems.length === 0) {
      return NextResponse.json(
        { success: true, message: `Brak wywozu odpadów na dzień ${dateKey}.` },
        { status: 200 }
      );
    }

    // LOGIKA WYSYŁKI E-MAIL (Resend / Nodemailer / SendGrid)
    // await sendEmail(...);

    return NextResponse.json(
      { success: true, message: `Powiadomienie na dzień ${dateKey} zostało wysłane.`, items: wasteItems },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Wystąpił błąd serwera.' },
      { status: 500 }
    );
  }
}
