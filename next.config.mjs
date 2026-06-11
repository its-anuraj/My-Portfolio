/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["floral-speed-gravel.ngrok-free.dev"],
  images: {
    qualities: [25, 50, 75, 100],
  },
};

export default nextConfig;
