import RoadSignTraining from '@/components/cdl/RoadSignTraining'

export const metadata = {
  title: 'CDL Road Sign Training - Master Traffic Signs | TradeSchool OS',
  description: 'Comprehensive CDL road sign training with interactive quizzes, practice modes, and CDL-specific sign recognition. Master all traffic signs for commercial driver licensing.',
  keywords: 'CDL road signs, traffic signs, commercial driver training, road sign quiz, CDL practice test',
  openGraph: {
    title: 'CDL Road Sign Training - Master Traffic Signs',
    description: 'Interactive road sign training for CDL certification',
    type: 'website',
  },
}

export default function RoadSignsPage() {
  return <RoadSignTraining />
}
