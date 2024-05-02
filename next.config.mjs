/** @type {import('next').NextConfig} */

const cspHeader = `
    default-src 'self';
    connect-src 'self' http://localhost:8080 https://api.catlogeasy.site/;
    img-src 'self' http://localhost:8080 https://api.catlogeasy.site/ https://*.ap-northeast-1.amazonaws.com data:;
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    object-src 'none';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`;

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, " ").trim(), 
          },
        ],
      },
    ];
  },
  // typescript:{
  //    ignoreBuildErrors: true
  // }
};

export default nextConfig;
