import './globals.css'

export const metadata = {
  title: 'Back40 Designs',
  description: 'Custom patch hats and branded merch',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
