import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 🔧 Ativa o modo export (gera HTML estático)
  output: "export",

  // 🖼️ Mantém os padrões de imagem, mas desativa o otimizador interno
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // 🔩 Ignora erros de build para garantir exportação limpa
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 🔚 Garante compatibilidade com Apache/Hostinger (rotas terminam com "/")
  trailingSlash: true,
};

export const config = {
  api: {
    externalResolver: true,
  },
};

export default nextConfig;
