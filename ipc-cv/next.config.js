/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/step1',
        permanent: true, // Set to `false` if it's a temporary redirect
      },
    ];
  },
};

module.exports = nextConfig;
