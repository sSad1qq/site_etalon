import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Предметы для подготовки к ЕГЭ и ОГЭ в Пензе',
  description: 'Подготовка к ЕГЭ и ОГЭ в центре «Эталон» в Пензе: математика, информатика, русский язык, физика, обществознание и другие предметы.',
  openGraph: {
    title: 'Предметы для подготовки к ЕГЭ и ОГЭ в Пензе | Центр Эталон',
    description: 'Предметы и форматы подготовки к ЕГЭ и ОГЭ в центре «Эталон» в Пензе.',
  },
}

export default function SubjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
