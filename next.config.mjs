/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.ctfassets.net',
            port: '',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
