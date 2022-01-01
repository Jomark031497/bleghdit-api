/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['gravatar.com', process.env.CLIENT_URL]
  }
}

