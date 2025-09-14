import RepairModule from '@/components/modules/youth-repair/RepairModule'

export const metadata = {
  title: 'Youth Repair Skills - TradeSchool OS',
  description: 'Learn phone and laptop repair with step-by-step video tutorials, interactive quizzes, and hands-on practice with AI feedback.',
  keywords: 'phone repair, laptop repair, repair skills, electronics, tutorials, hands-on training',
  openGraph: {
    title: 'Youth Repair Skills - TradeSchool OS',
    description: 'Step-by-step repair tutorials with interactive learning',
    type: 'website',
  },
}

export default function YouthRepairPage() {
  const studentId = 'student-123'; // In production, get from authentication
  const repairType = 'phone'; // Default to phone repair, could be dynamic

  return <RepairModule studentId={studentId} repairType={repairType} />
}
