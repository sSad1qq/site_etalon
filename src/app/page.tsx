import Hero from '@/components/Hero'
import dynamic from 'next/dynamic'
import type { Metadata } from 'next'

// Lazy-load below-fold components to reduce initial bundle
const ResultsBoard = dynamic(() => import('@/components/ResultsBoard'), {
  loading: () => <div className="min-h-[400px]" />,
})
const AdvantagesGrid = dynamic(() => import('@/components/AdvantagesGrid'), {
  loading: () => <div className="min-h-[300px]" />,
})
const StudentJourney = dynamic(() => import('@/components/StudentJourney'), {
  loading: () => <div className="min-h-[300px]" />,
})
const StatsComparison = dynamic(() => import('@/components/StatsComparison'), {
  loading: () => <div className="min-h-[200px]" />,
})
const SubjectsGrid = dynamic(() => import('@/components/SubjectsGrid'), {
  loading: () => <div className="min-h-[300px]" />,
})
const FormatsGrid = dynamic(() => import('@/components/FormatsGrid'), {
  loading: () => <div className="min-h-[300px]" />,
})
const VideoTestimonials = dynamic(() => import('@/components/VideoTestimonials'), {
  loading: () => <div className="min-h-[400px]" />,
})
const AboutSection = dynamic(() => import('@/components/AboutSection'), {
  loading: () => <div className="min-h-[300px]" />,
})

export const metadata: Metadata = {
  title: 'Репетитор Пенза — подготовка к ЕГЭ и ОГЭ | Центр Эталон',
  description: 'Центр подготовки к ЕГЭ и ОГЭ в Пензе. Репетиторы по математике, информатике, русскому языку и другим предметам. Мини-группы и индивидуальные занятия. Подготовка к экзаменам в Пензе. Более 1000 довольных учеников!',
  keywords: ['репетитор Пенза', 'подготовка к ЕГЭ Пенза', 'подготовка к ОГЭ Пенза', 'репетитор по математике Пенза', 'репетитор по информатике Пенза', 'ЕГЭ Пенза', 'ОГЭ Пенза', 'центр подготовки Пенза', 'курсы ЕГЭ Пенза', 'курсы ОГЭ Пенза', 'математика Пенза', 'информатика Пенза', 'репетиторский центр Пенза'],
  openGraph: {
    title: 'Репетитор Пенза — подготовка к ЕГЭ и ОГЭ | Центр Эталон',
    description: 'Центр подготовки к ЕГЭ и ОГЭ в Пензе. Репетиторы по математике, информатике, русскому языку и другим предметам. Мини-группы и индивидуальные занятия.',
    images: ['/logo.webp'],
  },
}

export default function Home() {
  return (
    <div className="min-h-screen hero-gradient">
      <Hero />
      <ResultsBoard />
      <AdvantagesGrid />
      <StudentJourney />
      <StatsComparison />
      <SubjectsGrid />
      <FormatsGrid />
      <VideoTestimonials />
      <AboutSection />
    </div>
  )
}
