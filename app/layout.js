import './globals.css'

export const metadata = {
  title: 'Back40 Designs',
  description: 'Custom patch hats and branded merch',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
