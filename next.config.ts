import type { NextConfig } from "next";
import withPWA from 'next-pwa';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qzcjiswshnawchksudqo.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  // Configuración vacía de Turbopack para silenciar el warning
  turbopack: {},
};

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})(nextConfig);
