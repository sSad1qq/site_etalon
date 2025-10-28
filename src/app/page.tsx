import Hero from '@/components/Hero'
import AboutCenter from '@/components/AboutCenter'
import ResultsBoard from '@/components/ResultsBoard'
import StudentJourney from '@/components/StudentJourney'
import SubjectsGrid from '@/components/SubjectsGrid'
import StatsComparison from '@/components/StatsComparison'
import AdvantagesGrid from '@/components/AdvantagesGrid'
import FormatsGrid from '@/components/FormatsGrid'
import AchievementsGrid from '@/components/AchievementsGrid'

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
    </div>
  )
}