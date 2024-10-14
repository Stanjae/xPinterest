/** @type {import('next').NextConfig} **/
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'cdn.sanity.io',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'via.placeholder.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'hut.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'placehold.jp',
            port: '',
            pathname: '/**',
          }
        ]
      }
};

export default nextConfig;
