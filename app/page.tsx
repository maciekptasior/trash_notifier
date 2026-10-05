'use client';

import { useState } from 'react';

const WASTE_SCHEDULE_REGION_1: Record<string, string[]> = {
  // WRZESIEN 2026
  '2026-09-07': ['Zmieszane', 'BIO', 'Papier'],
  '2026-09-10': ['Wielkogabaryty'],
  '2026-09-14': ['Zmieszane', 'BIO', 'Metale i tworzywa sztuczne'],
  '2026-09-19': ['Tekstylia i odzież'],
  '2026-09-21': ['Zmieszane', 'BIO'],
  '2026-09-28': ['Zmieszane', 'BIO', 'Metale i tworzywa sztuczne', 'Szkło'],

  // PAZDZIERNIK 2026
  '2026-10-05': ['Zmieszane', 'BIO', 'Papier'],
  '2026-10-12': ['Zmieszane', 'BIO', 'Metale i tworzywa sztuczne'],
  '2026-10-19': ['Zmieszane', 'BIO'],
  '2026-10-26': ['Zmieszane', 'BIO', 'Metale i tworzywa sztuczne'],

  // LISTOPAD 2026
  '2026-11-02': ['Zmieszane', 'BIO', 'Papier'],
  '2026-11-09': ['Zmieszane', 'BIO', 'Metale i tworzywa sztuczne'],
  '2026-11-16': ['Zmieszane', 'BIO'],
  '2026-11-23': ['Zmieszane', 'BIO', 'Metale i tworzywa sztuczne', 'Szkło'],
  '2026-11-30': ['Zmieszane', 'BIO'],

  // GRUDZIEN 2026
  '2026-12-07': ['Zmieszane', 'BIO', 'Papier'],
  '2026-12-14': ['Zmieszane', 'BIO', 'Metale i tworzywa sztuczne'],
  '2026-12-21': ['Zmieszane', 'BIO'],
  '2026-12-28': ['Zmieszane', 'BIO', 'Metale i tworzywa sztuczne']
};

const MONTH_NAMES = [
  'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
  'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
];

const WEEKDAYS_FULL = [
  'Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'
];

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function getTagStyle(item: string) {
  const lower = item.toLowerCase();
  
  if (lower.includes('zmieszane')) {
    return { backgroundColor: '#212121', color: '#ffffff' };
  }
  if (lower.includes('bio')) {
    return { backgroundColor: '#5d4037', color: '#ffffff' };
  }
  if (lower.includes('metale') || lower.includes('tworzywa')) {
    return { backgroundColor: '#fbc02d', color: '#000000' };
  }
  if (lower.includes('szkło') || lower.includes('szklo')) {
    return { backgroundColor: '#2e7d32', color: '#ffffff' };
  }
  if (lower.includes('papier')) {
    return { backgroundColor: '#1565c0', color: '#ffffff' };
  }
  if (lower.includes('wielkogabaryty') || lower.includes('gabaryty')) {
    return { backgroundColor: '#c62828', color: '#ffffff' };
  }
  
  return { backgroundColor: '#757575', color: '#ffffff' };
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(() => new Date(2026, 9, 1));
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(year, month + offset, 1));
  };

  const subscribeToPush = async () => {
    setLoading(true);
    try {
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        alert('Przeglądarka nie wspiera powiadomień Push.');
        return;
      }

      const registration = await navigator.serviceWorker.register('/sw.js');
      await navigator.serviceWorker.ready;

      const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!publicVapidKey) {
        alert('Brak klucza VAPID w zmiennych środowiskowych.');
        return;
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      });

      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription),
      });

      setIsSubscribed(true);
      alert('Pomyślnie włączono powiadomienia Push!');
    } catch (error) {
      console.error(error);
      alert('Wystąpił błąd podczas włączania powiadomień.');
    } finally {
      setLoading(false);
    }
  };

  // Filtrowanie wywozów dla aktualnie wybranego miesiąca
  const activePickups = Object.entries(WASTE_SCHEDULE_REGION_1)
    .filter(([dateStr]) => {
      const [y, m] = dateStr.split('-').map(Number);
      return y === year && m === month + 1;
    })
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB));

  return (
    <div style={{ maxWidth: '600px', margin: '1rem auto', fontFamily: 'system-ui, sans-serif', padding: '0 0.75rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
        <h1 style={{ fontSize: '1.5rem', margin: '0 0 0.4rem 0' }}>🗑️ Kalendarz Wywozu Odpadów</h1>
        <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 0.8rem 0' }}>Środa Śląska – I Rejon</p>
        
        <button
          onClick={subscribeToPush}
          disabled={isSubscribed || loading}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '0.85rem',
            fontWeight: 'bold',
            backgroundColor: isSubscribed ? '#2e7d32' : '#1565c0',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            cursor: isSubscribed ? 'default' : 'pointer',
            margin: '0 auto',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          🔔 {isSubscribed ? 'Powiadomienia Aktywne' : 'Włącz Powiadomienia Push'}
        </button>
      </header>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <button 
          onClick={() => changeMonth(-1)}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', cursor: 'pointer', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: '#fff' }}
        >
          ← Poprzedni
        </button>
        <h2 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 'bold' }}>
          {MONTH_NAMES[month]} {year}
        </h2>
        <button 
          onClick={() => changeMonth(1)}
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', cursor: 'pointer', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: '#fff' }}
        >
          Następny →
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {activePickups.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '8px', color: '#666' }}>
            Brak zaplanowanych wywozów w tym miesiącu.
          </div>
        ) : (
          activePickups.map(([dateStr, items]) => {
            const dateObj = new Date(dateStr);
            const dayNum = dateObj.getDate();
            const dayName = WEEKDAYS_FULL[dateObj.getDay()];

            return (
              <div 
                key={dateStr}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e0e0e0',
                  borderLeft: '5px solid #2e7d32',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  gap: '12px'
                }}
              >
                <div style={{ minWidth: '70px', textAlign: 'center', borderRight: '1px solid #eee', paddingRight: '8px' }}>
                  <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#222', lineHeight: '1.1' }}>
                    {dayNum}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '2px' }}>
                    {dayName}
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', flex: 1 }}>
                  {items.map((item, i) => {
                    const style = getTagStyle(item);
                    return (
                      <span
                        key={i}
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          backgroundColor: style.backgroundColor,
                          color: style.color,
                          padding: '4px 8px',
                          borderRadius: '4px',
                          display: 'inline-block'
                        }}
                      >
                        {item}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
