import VRARTraining from '@/components/modules/vr-ar/VRARTraining'

export const metadata = {
  title: 'VR & AR Training - TradeSchool OS',
  description: 'Immersive 3D and augmented reality experiences for hands-on learning. Virtual reality simulations and AR overlays for technical training.',
  keywords: 'VR training, AR training, virtual reality, augmented reality, 3D learning, immersive training',
  openGraph: {
    title: 'VR & AR Training - TradeSchool OS',
    description: 'Immersive VR and AR training experiences',
    type: 'website',
  },
}

export default function VRARPage() {
  const studentId = 'student-123'; // In production, get from authentication

  return <VRARTraining studentId={studentId} />
}
