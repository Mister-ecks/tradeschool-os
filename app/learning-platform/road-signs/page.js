import RoadSignModule from '@/components/modules/road-signs/RoadSignModule'

export const metadata = {
  title: 'Road Signs Training - TradeSchool OS',
  description: 'Master traffic signs for safe driving with interactive study and quiz modes. Learn regulatory, warning, and mandatory signs with comprehensive training.',
  keywords: 'road signs, traffic signs, driving training, CDL, regulatory signs, warning signs',
  openGraph: {
    title: 'Road Signs Training - TradeSchool OS',
    description: 'Interactive road sign training with study and quiz modes',
    type: 'website',
  },
}

export default function RoadSignsPage() {
  const studentId = 'student-123'; // In production, get from authentication

  return <RoadSignModule studentId={studentId} />
}
