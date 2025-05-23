import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['vercel.app'], // Ajoutez votre domaine de production ici
  },
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
