import { NextResponse } from 'next/server';

let subscriptions: any[] = [];

export async function POST(request: Request) {
  try {
    const subscription = await request.json();
    const exists = subscriptions.some(s => s.endpoint === subscription.endpoint);
    if (!exists) {
      subscriptions.push(subscription);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
