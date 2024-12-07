/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", 
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#031930',
        'secondary-color': '#223A59',
        '3ary-color': '#3684DB',
        '4ary-color': '#B3D6F9',
        '5ary-color': '#758BA5',
        '6-ary-color': '#D1DDED',

        'dark-primary-color': '#CCD0CF',
        'dark-secondary-color': '#9BA8AB',
        'dark-3ary-color': '#4A5C6A',
        'dark-4ary-color': '#253745',
        'dark-5ary-color': '#11212D',
        'dark-6-ary-color': '#06141B',



        'error-color': '#ed2d2d',
        'logo-color': '#e8f5f9'
      }
    },
  },
  plugins:  [
    
  ]
}

