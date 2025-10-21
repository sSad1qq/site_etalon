import Hero from '@/components/Hero'
import AboutCenter from '@/components/AboutCenter'
import ResultsBoard from '@/components/ResultsBoard'
import StudentJourney from '@/components/StudentJourney'
import SubjectsGrid from '@/components/SubjectsGrid'
import VideoTestimonials from '@/components/VideoTestimonials'
import StatsComparison from '@/components/StatsComparison'

export default function Home() {
  return (
    <div className="min-h-screen hero-gradient">
      <Hero />
      <AboutCenter />
      <ResultsBoard />
      <StudentJourney />
      <StatsComparison />
      <SubjectsGrid />
      <VideoTestimonials />
    </div>
  )
}