import QuestionGenerator from '@/components/cdl/QuestionGenerator'

export const metadata = {
  title: 'CDL Question Generator - Create Custom Quizzes | TradeSchool OS',
  description: 'Generate custom CDL road sign quizzes with our intelligent question generator. Create practice tests, export questions, and customize difficulty levels.',
  keywords: 'CDL question generator, road sign quiz, custom quiz creator, CDL practice test generator',
  openGraph: {
    title: 'CDL Question Generator - Create Custom Quizzes',
    description: 'Generate custom CDL road sign quizzes and practice tests',
    type: 'website',
  },
}

export default function QuestionGeneratorPage() {
  return <QuestionGenerator />
}
