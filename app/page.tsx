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

const WEEKDAYS = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'];

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

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  let startingDay = firstDayOfMonth.getDay() - 1;
  if (startingDay === -1) startingDay = 6;

  const totalDays = lastDayOfMonth.getDate();

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(year, month + offset, 1));
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', fontFamily: 'system-ui, sans-serif', padding: '0 1rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', margin: '0 0 0.5rem 0' }}>🗑️ Kalendarz Wywozu Odpadów</h1>
        <p style={{ color: '#666', margin: 0 }}>Środa Śląska – I Rejon (Zabudowa Jednorodzinna)</p>
      </header>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <button 
          onClick={() => changeMonth(-1)}
          style={{ padding: '0.5rem 1rem', fontSize: '1rem', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          ← Poprzedni
        </button>
        <h2 style={{ fontSize: '1.4rem', margin: 0 }}>
          {MONTH_NAMES[month]} {year}
        </h2>
        <button 
          onClick={() => changeMonth(1)}
          style={{ padding: '0.5rem 1rem', fontSize: '1rem', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          Następny →
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(7, 1fr)', 
        gap: '8px', 
        backgroundColor: '#f9f9f9', 
        padding: '12px', 
        borderRadius: '8px',
        border: '1px solid #eee'
      }}>
        {WEEKDAYS.map((day) => (
          <div key={day} style={{ fontWeight: 'bold', textAlign: 'center', padding: '8px 0', color: '#555' }}>
            {day}
          </div>
        ))}

        {Array.from({ length: startingDay }).map((_, index) => (
          <div key={`empty-${index}`} style={{ minHeight: '90px', backgroundColor: '#fff', opacity: 0.3 }} />
        ))}

        {Array.from({ length: totalDays }).map((_, index) => {
          const dayNumber = index + 1;
          const formattedMonth = String(month + 1).padStart(2, '0');
          const formattedDay = String(dayNumber).padStart(2, '0');
          const dateKey = `${year}-${formattedMonth}-${formattedDay}`;

          const wasteItems = WASTE_SCHEDULE_REGION_1[dateKey];

          return (
            <div 
              key={dayNumber} 
              style={{ 
                minHeight: '100px', 
                backgroundColor: '#fff', 
                border: wasteItems ? '2px solid #2e7d32' : '1px solid #e0e0e0', 
                borderRadius: '6px',
                padding: '6px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: wasteItems ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              <span style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '4px', color: '#333' }}>
                {dayNumber}
              </span>
              
              {wasteItems && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  {wasteItems.map((item, i) => {
                    const style = getTagStyle(item);
                    return (
                      <span 
                        key={i} 
                        style={{ 
                          fontSize: '0.65rem', 
                          fontWeight: 'bold',
                          backgroundColor: style.backgroundColor, 
                          color: style.color, 
                          padding: '3px 4px', 
                          borderRadius: '3px',
                          lineHeight: '1.1',
                          display: 'block',
                          wordBreak: 'break-word'
                        }}
                      >
                        {item}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
