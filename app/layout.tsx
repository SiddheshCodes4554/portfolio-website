import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: 'Siddhesh Gawade Portfolio',
  description: 'Created by Siddhesh Gawade, this portfolio showcases my work and skills in web development, design, and more.',
  generator: 'Siddhesh Gawade',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
