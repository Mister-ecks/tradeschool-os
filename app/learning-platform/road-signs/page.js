import RoadSignQuiz from '@/components/modules/road-signs/RoadSignQuiz'

export const metadata = {
  title: 'Road Signs Learning Module - TradeSchool OS',
  description: 'Master Ontario road signs with interactive flashcards and quizzes. Learn regulatory, warning, guide, school, and construction signs with comprehensive training.',
  keywords: 'road signs, traffic signs, driving training, CDL, regulatory signs, warning signs, Ontario road signs, flashcards',
  openGraph: {
    title: 'Road Signs Learning Module - TradeSchool OS',
    description: 'Interactive road sign learning with flashcards and quizzes',
    type: 'website',
  },
}

export default function RoadSignsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <RoadSignQuiz />
    </main>
  )
}