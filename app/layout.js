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
      <head>
  <link href="https://fonts.googleapis.com/css?family=Bebas+Neue&display=swap" rel="stylesheet" />
  <meta property="og:title" content="B40 Dealership Series - Limited Pre-Order" />
  <meta property="og:description" content="Custom headwear built for dealership culture. Front Line, Service Bay, Back Lot. Orders close May 31." />
  <meta property="og:image" content="https://back40designco.com/images/sticker-is-quicker.jpg" />
  <meta property="og:url" content="https://back40designco.com/dealership-series" />
  <meta name="twitter:card" content="summary_large_image" />
</head>
      <body>{children}</body>
    </html>
  )
}
