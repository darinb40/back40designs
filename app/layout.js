import './globals.css'

export const metadata = {
  title: 'Back 40 Design Co.',
  description: 'Custom patch headwear built in Northwest Arkansas. Trail Series, Dealership Series, and custom builds.',
  openGraph: {
    title: 'Back 40 Design Co.',
    description: 'Custom patch headwear built in Northwest Arkansas. Trail Series, Dealership Series, and custom builds.',
    url: 'https://www.back40designco.com',
    siteName: 'Back 40 Design Co.',
    images: [
      {
        url: 'https://www.back40designco.com/images/b402026.png',
        width: 1200,
        height: 630,
        alt: 'Back 40 Design Co.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Back 40 Design Co.',
    description: 'Custom patch headwear built in Northwest Arkansas.',
    images: ['https://www.back40designco.com/images/b402026.png'],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css?family=Bebas+Neue&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
