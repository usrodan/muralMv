module.exports = {
  plugins: [
    require('@tailwindcss/forms'),
  ],
  images: {
    minimumCacheTTL: 36000,
    domains: [
     "res.cloudinary.com", "placehold.jp", "cloudinary.com", "localhost:1337"
    ],
  }
}
