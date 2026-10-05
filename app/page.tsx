'use client';

import { useState } from 'react';
import { WASTE_SCHEDULE_REGION_1 } from './lib/schedule';

const MONTH_NAMES = [
  'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
  'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
];

const WEEKDAYS = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1));

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
                minHeight: '90px', 
                backgroundColor: '#fff', 
                border: wasteItems ? '2px solid #2e7d32' : '1px solid #e0e0e0', 
                borderRadius: '6px',
                padding: '6px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: wasteItems ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              <span style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '4px', color: wasteItems ? '#2e7d32' : '#333' }}>
                {dayNumber}
              </span>
              
              {wasteItems && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', overflowY: 'auto' }}>
                  {wasteItems.map((item, i) => (
                    <span 
                      key={i} 
                      style={{ 
                        fontSize: '0.7rem', 
                        backgroundColor: '#e8f5e9', 
                        color: '#1b5e20', 
                        padding: '2px 4px', 
                        borderRadius: '3px',
                        lineHeight: '1.2'
                      }}
                    >
                      • {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <footer style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '6px', fontSize: '0.85rem' }}>
        <strong>Zabudowa jednorodzinna:</strong> Odbiór papieru odbywa się raz w miesiącu[cite: 8]. Powiadomienie e-mail jest wysyłane automatycznie dzień wcześniej o godzinie 18:00.
      </footer>
    </div>
  );
}
