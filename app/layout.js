import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { NavigationSimple as Navigation } from '@/components/layout/NavigationSimple'
import { UserProvider } from '@/lib/auth/UserContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TradeSchool OS - Skilled Trades & STEM Learning Platform',
  description: 'Universal trade & STEM learning hub starting with HVAC. Master practical skills with hands-on training, video lessons, and real-world deployments.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'TradeSchool OS',
  },
  icons: {
    icon: '/icon-192x192.svg',
    apple: '/icon-192x192.svg',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#3b82f6',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TradeSchool OS" />
        <link rel="apple-touch-icon" href="/icon-192x192.svg" />
      </head>
      <body className="min-h-screen bg-gray-50">
        <UserProvider>
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
          </div>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </UserProvider>
      </body>
    </html>
  )
}





