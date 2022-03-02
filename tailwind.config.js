 module.exports = {
     content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
     //purge: [],
     darkMode: "media", // or "media" or "class"
     theme: {
         filter: { // defaults to {}
             'none': 'none',
             'grayscale': 'grayscale(1)',
             'invert': 'invert(1)',
             'sepia': 'sepia(1)',
         },
         backdropFilter: { // defaults to {}
             'none': 'none',
             'blur': 'blur(20px)',
         },
         extend: {
             spacing: {
                 128: '32rem',
             },
             colors: {
                 "textAlternative": "#ccc",
                 "textSecondary": "#696969",
                 "dark": "#000534",
                 "textOnDark": "#F4F5F9",
                 "backgroundSecondary": "#fafafa",
                 "facebook": "#39569C",
                 "linkedin": "#0079B5",
                 "telegram": "#0088CC",
                 "twitter": "#01A9F2",
                 "whatsapp": "#25D366",
                 "tripadvisor": "#00d59e",
                 "instagram": "#E1306C",
                 "copy": "#001638",


                 "vermelho": "#E02525",
                 "verdinho": "#5FA900",

                 "primary": "#118EE2",
                 "primaryShade": "#044868",
                 "secondary": "#E8F1F2",
                 "secondaryShade": "#C5CDCE",
                 "primaryAlternative": "#DC7396",
                 "primaryAlternativeShade": "#A62953"

             },
         },
     },
     variants: {
         filter: ['responsive'], // defaults to ['responsive']
         backdropFilter: ['responsive'], // defaults to ['responsive']
         fill: ['responsive'],
         extend: {},

     },
     plugins: [
         require('tailwindcss-filters')
     ],
 }