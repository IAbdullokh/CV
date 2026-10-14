/** @type {import('next').NextConfig} */
const basePath = process.env.BASE_PATH || "";

const nextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to ./out, which any static host can serve.
  output: "export",
  // For hosting under a sub-path (e.g. GitHub Pages at /CV): BASE_PATH=/CV npm run build
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
