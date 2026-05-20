import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // @splinetool/react-spline only exports "." for `import`; Webpack's default
    // resolution can hit "Package path . is not exported". Point at the file explicitly.
    config.resolve.alias = {
      ...config.resolve.alias,
      "@splinetool/react-spline": path.resolve(
        __dirname,
        "node_modules/@splinetool/react-spline/dist/react-spline.js"
      ),
    };
    return config;
  },
};

export default nextConfig;
