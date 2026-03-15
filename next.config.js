/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Optimize image handling (optional but recommended for AI apps)
  images: {
    unoptimized: true, 
  },
  
  // 2. Security Headers (Ensures your model files can be loaded by the browser)
  async headers() {
    return [
      {
        source: '/tfjs_model/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;