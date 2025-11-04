import Hero from '@/components/Hero'
import AboutCenter from '@/components/AboutCenter'
import ResultsBoard from '@/components/ResultsBoard'
import StudentJourney from '@/components/StudentJourney'
import SubjectsGrid from '@/components/SubjectsGrid'
import VideoTestimonials from '@/components/VideoTestimonials'
import StatsComparison from '@/components/StatsComparison'
import AdvantagesGrid from '@/components/AdvantagesGrid'
import FormatsGrid from '@/components/FormatsGrid'
import AchievementsGrid from '@/components/AchievementsGrid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Репетитор Пенза — подготовка к ЕГЭ и ОГЭ | Центр Эталон',
  description: 'Центр подготовки к ЕГЭ и ОГЭ в Пензе. Репетиторы по математике, информатике, русскому языку и другим предметам. Мини-группы и индивидуальные занятия. Подготовка к экзаменам в Пензе. Более 1000 довольных учеников!',
  keywords: ['репетитор Пенза', 'подготовка к ЕГЭ Пенза', 'подготовка к ОГЭ Пенза', 'репетитор по математике Пенза', 'репетитор по информатике Пенза', 'ЕГЭ Пенза', 'ОГЭ Пенза', 'центр подготовки Пенза', 'курсы ЕГЭ Пенза', 'курсы ОГЭ Пенза', 'математика Пенза', 'информатика Пенза', 'репетиторский центр Пенза'],
  openGraph: {
    title: 'Репетитор Пенза — подготовка к ЕГЭ и ОГЭ | Центр Эталон',
    description: 'Центр подготовки к ЕГЭ и ОГЭ в Пензе. Репетиторы по математике, информатике, русскому языку и другим предметам. Мини-группы и индивидуальные занятия.',
    images: ['/logo.png'],
  },
}

export default function Home() {
  return (
    <div className="min-h-screen hero-gradient">
      <Hero />
      <AdvantagesGrid />
      <AboutCenter />
      <AchievementsGrid />
      <ResultsBoard />
      <StudentJourney />
      <StatsComparison />
      <SubjectsGrid />
      <FormatsGrid />
      <VideoTestimonials />
    </div>
  )
}