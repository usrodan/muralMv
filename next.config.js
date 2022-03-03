module.exports = { 
  plugins: [ 
  require('@tailwindcss/forms'),
],
  images: {
      minimumCacheTTL: 36000,
      domains: [
          'media.graphcms.com', "cdn.novanoticia.com.br" ,"i.postimg.cc","res.cloudinary.com", "placehold.jp"
        ],
  }
}