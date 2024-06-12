/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: process.env.NEXT_PUBLIC_API_URL
          ? process.env.NEXT_PUBLIC_API_URL + ":path*"
          : "https://localhost:8000/api/v1/:path*",
      },
    ];
  },
  typescript: {
   
  },
};
module.exports = nextConfig;
