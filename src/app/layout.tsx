import type { Metadata } from "next";
import "./globals.css";
import "./styles.css";
import Header from '@/components/Header'

export const metadata: Metadata = {
  metadataBase: new URL('https://etalon-penza.ru'),
  title: {
    default: 'Репетитор Пенза — подготовка к ЕГЭ и ОГЭ | Центр Эталон',
    template: '%s · Репетитор Пенза · Эталон'
  },
  description: 'Центр подготовки к ЕГЭ и ОГЭ в Пензе. Репетиторы по математике, информатике, русскому языку и другим предметам. Мини-группы и индивидуальные занятия. Подготовка к экзаменам в Пензе.',
  keywords: ['репетитор Пенза', 'подготовка к ЕГЭ Пенза', 'подготовка к ОГЭ Пенза', 'репетитор по математике Пенза', 'репетитор по информатике Пенза', 'ЕГЭ Пенза', 'ОГЭ Пенза', 'центр подготовки Пенза', 'курсы ЕГЭ Пенза', 'курсы ОГЭ Пенза', 'математика Пенза', 'информатика Пенза'],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Репетитор Пенза — подготовка к ЕГЭ и ОГЭ | Центр Эталон',
    description: 'Центр подготовки к ЕГЭ и ОГЭ в Пензе. Репетиторы по математике, информатике, русскому языку и другим предметам. Мини-группы и индивидуальные занятия. Подготовка к экзаменам в Пензе.',
    images: ['/logo.png'],
    locale: 'ru_RU',
    type: 'website',
    siteName: 'Центр Эталон - Репетитор Пенза',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Репетитор Пенза — подготовка к ЕГЭ и ОГЭ | Центр Эталон',
    description: 'Центр подготовки к ЕГЭ и ОГЭ в Пензе. Репетиторы по математике, информатике и другим предметам.',
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
    "name": "Образовательный центр Эталон - Репетитор в Пензе",
    "alternateName": "Центр подготовки к ЕГЭ и ОГЭ в Пензе",
    "description": "Центр подготовки к ЕГЭ и ОГЭ в Пензе. Репетиторы по математике, информатике, русскому языку и другим предметам. Подготовка к экзаменам.",
    "url": "https://etalon-penza.ru",
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
      "addressRegion": "Пензенская область",
      "postalCode": "440000",
      "addressCountry": "RU"
    },
    "areaServed": {
      "@type": "City",
      "name": "Пенза"
    },
    "teaches": [
      "Подготовка к ЕГЭ",
      "Подготовка к ОГЭ",
      "Математика",
      "Информатика",
      "Русский язык",
      "Физика",
      "Химия"
    ]
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
