import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    // 1. Wyliczenie jutrzejszej daty w formacie YYYY-MM-DD
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateKey = tomorrow.toISOString().split('T')[0];

    // Przykład pobrania ze słownika (podmień na swój import lub stałą)
    const wasteItems = WASTE_SCHEDULE_REGION_1[dateKey];

    // 2. Brak wywozu w danym dniu – OBO WIĄZKOWY RETURN
    if (!wasteItems || wasteItems.length === 0) {
      return NextResponse.json({
        success: true,
        message: `Brak zaplanowanego wywozu na dzień ${dateKey}. E-mail nie został wysłany.`,
      });
    }

    // 3. Logika wysyłki e-maila (np. Resend / Nodemailer)
    // await sendEmail(...);

    // 4. Sukces wysyłki – OBO WIĄZKOWY RETURN
    return NextResponse.json({
      success: true,
      message: `Powiadomienie na dzień ${dateKey} zostało pomyślnie wysłane.`,
      items: wasteItems,
    });

  } catch (error) {
    // 5. Obsługa błędów – OBO WIĄZKOWY RETURN
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Wystąpił nieznany błąd',
      },
      { status: 500 }
    );
  }
}
