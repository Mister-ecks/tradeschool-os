import ModuleSelector from '@/components/modules/ModuleSelector'

export const metadata = {
  title: 'Learning Platform - TradeSchool OS',
  description: 'Master essential skills through interactive modules, VR/AR experiences, and hands-on practice. Road signs, repair skills, VR/AR training, and tool recognition.',
  keywords: 'learning platform, trade school, road signs, repair skills, VR training, AR training, tool recognition',
  openGraph: {
    title: 'Learning Platform - TradeSchool OS',
    description: 'Interactive learning modules for essential trade skills',
    type: 'website',
  },
}

export default function LearningPlatformPage() {
  // In a real application, you'd get the student ID from authentication
  const studentId = 'student-123'; // Placeholder student ID

  return <ModuleSelector studentId={studentId} />
}
