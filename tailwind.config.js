/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          lg: '1.25rem',
        },
      },
      fontFamily: {
        "Yekan-bold": "Yekan Bold",
        "Yekan-Medium": "Yekan Medium",
        "Yekan-Regula": "Yekan Regular",
        "Yekan-Light": "Yekan Light",
        "Yekan-SemiBold": "Yekan SemiBold",
        // Modam fonts
        "Modam-light": "Modam Light",
        "Modam-Regular": "Modam Regular",
        "Modam-bold": "Modam Bold",
        "Modam-ExtraBold": "Modam ExtraBold",
        "Modam-SemiBold": "Modam Semi",
      },
      colors: {
        primaryColor: "#1F2732",
        secondPrimaryColor: "#EDF6FD",
        skyBlue:"#d5e7ed",
        lightBlue: "#5EB5F8",
        lightGray: "#858585",
        lightGray2: "#F4F4F4",
        dark: "#363636",
      }

    },
  },
  plugins: [function ({addVariant}) {
    addVariant('child', '&>*');
    addVariant('child-hover', '&>*:hover')
  }],
}

