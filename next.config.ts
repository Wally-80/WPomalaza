import type { NextConfig } from "next";
// import withPWA from 'next-pwa';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qzcjiswshnawchksudqo.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Configuración vacía de Turbopack para silenciar el warning
  turbopack: {},
};

export default nextConfig;
// Temporarily disabled PWA to fix Next.js hanging issue
// export default withPWA({
//   dest: 'public',
//   register: true,
//   skipWaiting: true,
//   disable: process.env.NODE_ENV === 'development',
// })(nextConfig);
