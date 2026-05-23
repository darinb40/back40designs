import './globals.css'

export const metadata = {
  title: 'B40 Design Co. | Custom Patch Headwear | Northwest Arkansas',
  description: 'B40 Design Co. builds custom patch headwear in Northwest Arkansas. Trail Series hats inspired by NWA trails, Dealership Series for car industry culture, and custom builds for shops and brands.',
  keywords: 'B40, B40 Arkansas, B40 Design Co, B40 hats, Back 40 Design, custom patch hats Northwest Arkansas, NWA hats, Bella Vista hats, B40 NWA',
  openGraph: {
    title: 'B40 Design Co. | Custom Patch Headwear | Northwest Arkansas',
    description: 'B40 Design Co. builds custom patch headwear in Northwest Arkansas. Trail Series, Dealership Series, and custom builds.',
    url: 'https://www.back40designco.com',
    siteName: 'B40 Design Co.',
    images: [
      {
        url: 'https://www.back40designco.com/images/b402026.png',
        width: 1200,
        height: 630,
        alt: 'B40 Design Co. -- Custom Patch Headwear Northwest Arkansas',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B40 Design Co. | Custom Patch Headwear | Northwest Arkansas',
    description: 'B40 Design Co. builds custom patch headwear in Northwest Arkansas.',
    images: ['https://www.back40designco.com/images/b402026.png'],
  },
  alternates: {
    canonical: 'https://www.back40designco.com',
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
