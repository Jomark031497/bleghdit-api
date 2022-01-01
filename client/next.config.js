/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['gravatar.com', 'localhost', process.env.CLIENT_URL]
  }
}

