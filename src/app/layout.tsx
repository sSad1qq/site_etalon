import type { Metadata } from "next";
import "./globals.css";
import "./styles.css";
import Header from '@/components/Header'

export const metadata: Metadata = {
  metadataBase: new URL('https://etalon-penza.ru'),
  title: {
    default: 'Эталон — подготовка к ЕГЭ и ОГЭ',
    template: '%s · Эталон'
  },
  description: 'Образовательный центр «Эталон» — подготовка к ЕГЭ и ОГЭ, мини-группы и индивидуальные программы.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Эталон — подготовка к ЕГЭ и ОГЭ',
    description: 'Образовательный центр «Эталон» — подготовка к ЕГЭ и ОГЭ, мини-группы и индивидуальные программы.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJson = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Образовательный центр Эталон",
    "url": "https://example.com",
    "logo": "https://etalon-penza.ru/logo.png",
    "image": "https://etalon-penza.ru/logo.png",
    "sameAs": [
      "https://vk.com/repetitor_penza_etalon",
      "https://t.me/centerEtalon"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Московская 12, 3 этаж",
      "addressLocality": "Пенза",
      "addressCountry": "RU"
    }
  }

  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="antialiased">
        {/* JSON-LD Organization */}
        <script type="application/ld+json">{JSON.stringify(orgJson)}</script>
        <Header />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
