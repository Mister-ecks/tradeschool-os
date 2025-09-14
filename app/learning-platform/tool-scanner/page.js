import BarcodeScanner from '@/components/modules/barcode-scanner/BarcodeScanner'

export const metadata = {
  title: 'Tool Recognition Scanner - TradeSchool OS',
  description: 'Scan barcodes and QR codes to identify tools and learn proper usage. Comprehensive tool database with usage instructions and safety guidelines.',
  keywords: 'tool recognition, barcode scanner, QR code, tool identification, repair tools, tool database',
  openGraph: {
    title: 'Tool Recognition Scanner - TradeSchool OS',
    description: 'Barcode and QR code scanning for tool identification',
    type: 'website',
  },
}

export default function ToolScannerPage() {
  const studentId = 'student-123'; // In production, get from authentication
  const lessonId = 'tool-recognition-lesson-1'; // In production, get from routing

  return <BarcodeScanner studentId={studentId} lessonId={lessonId} />
}
