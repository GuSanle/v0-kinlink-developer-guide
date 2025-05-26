import nextMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Ensure MDX page extensions are included
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

// Initialize MDX support
const withMDX = nextMDX({
  // Optional: configure MDX options if needed, e.g.,
  // options: {
  //   remarkPlugins: [],
  //   rehypePlugins: [],
  // },
});

// Wrap the Next.js config with MDX support
export default withMDX(nextConfig);