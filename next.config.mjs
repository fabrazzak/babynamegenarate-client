/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Required for static export
    images: {
        unoptimized: true, // Avoid Next.js image optimization
    },
};

export default nextConfig;
