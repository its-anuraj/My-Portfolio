import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Anuraj Singh — Mobile App Developer | React Native & Expo",
    short_name: "Anuraj Singh",
    description:
      "Official portfolio of Anuraj Singh — Mobile App Developer specializing in React Native, Expo, and TypeScript.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF9F6",
    theme_color: "#B49A5A",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/anuraj.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
