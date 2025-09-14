import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'
import TradeModules from '@/components/home/TradeModules'
import LearningPlatform from '@/components/home/LearningPlatform'
import Stats from '@/components/home/Stats'
import CTA from '@/components/home/CTA'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <TradeModules />
      <LearningPlatform />
      <Stats />
      <CTA />
    </div>
  )
}



