import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "The New Economic Revolution | A business model for the digital age",
  description: 'We’re building the business model for the Digital Economy — a model designed for networks and abundance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Farcaster Frame metadata */}
        <meta
          name="fc:frame"
          content='{"version":"next","imageUrl":"https://abundance.id/images/icon.png","button":{"title":"Join the Revolution","action":{"type":"launch_frame","name":"Abundance","url":"https://abundance.id/","splashImageUrl":"https://abundance.id/images/icon.png","splashBackgroundColor":"#001445"}}}'
        />
        {/* Mini App specific metadata */}
        <meta name="fc:miniapp" content="true" />
        <meta name="fc:miniapp:name" content="Abundance" />
        <meta name="fc:miniapp:description" content="Join the New Economic Revolution" />
        <meta name="fc:miniapp:icon" content="https://abundance.id/images/icon.png" />
        <meta name="fc:miniapp:url" content="https://abundance.id/~/earn" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
