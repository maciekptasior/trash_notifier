import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Harmonogram Wywozu Odpadów',
  description: 'Aplikacja powiadamiająca o wywozie śmieci',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#fff' }}>
        {children}
      </body>
    </html>
  );
}
