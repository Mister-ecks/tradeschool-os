import CourseDetail from '@/components/courses/CourseDetail'
import { fiberOtdrCourse } from '@/data/fiber-otdr-modules'

export const metadata = {
  title: 'Fiber & OTDR Training Program - Professional Fiber Optic Certification | TradeSchool OS',
  description: 'Master fiber optic splicing, OTDR testing, and network installation with our comprehensive training program. Virtual labs, tool scanning, and industry certification prep.',
  keywords: 'fiber optic training, OTDR testing, fusion splicing, fiber installation, telecommunications certification, CFOT, FOT',
  openGraph: {
    title: 'Fiber & OTDR Training Program',
    description: 'Professional fiber optic training with virtual labs and industry certification preparation',
    type: 'website',
  },
}

export default function FiberOtdrCoursePage() {
  return <CourseDetail course={fiberOtdrCourse} />
}
