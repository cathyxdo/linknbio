/** @type {import('next').NextConfig} */
const nextConfig = {}

//module.exports = nextConfig
/* module.exports = {
    images: {
      domains: ['linknbio-resources.s3.us-west-1.amazonaws.com', 'linknbio-resources.s3.amazonaws.com'],
    },
  }; */
  module.exports = {
    output: "standalone",
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'linknbio-resources.s3.amazonaws.com',
          port: '',
        },
      ],
    },
  }