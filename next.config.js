/** @type {import('next').NextConfig} */
const nextConfig = {
  // The lane pages and the collection page now live on the single Dealership Series page.
  async redirects() {
    return [
      { source: "/dealership-series/front-line", destination: "/dealership-series#front-line", permanent: false },
      { source: "/dealership-series/backlot", destination: "/dealership-series#back-lot", permanent: false },
      { source: "/dealership-series/service-bay", destination: "/dealership-series#service-bay", permanent: false },
      { source: "/dealership-series/pre-order", destination: "/dealership-series", permanent: false },
    ];
  },
}

module.exports = nextConfig
