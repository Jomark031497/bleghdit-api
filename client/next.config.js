/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['www.gravatar.com', 'res.cloudinary.com', process.env.APP_DOMAIN] 
  }
}

