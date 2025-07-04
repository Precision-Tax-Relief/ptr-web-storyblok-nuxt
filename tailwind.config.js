/** @type {import('tailwindcss').Config} */
module.exports = {
  safelist: [
    'whitespace-nowrap',
  ],
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./storyblok/**/*.{html,js,ts,vue}"
  ],
  plugins: [require("@tailwindcss/typography")],
  theme: {
    container: {
      center: true,
      padding: "2rem"
    },
    extend: {
      colors: {
        primary: "#078082", // Main teal color
        primaryDark: "#056062", // Darker teal
        primaryLight: "#46aaac", // Lighter teal
        secondary: "#005f86", // Complementary orange-brown
        secondaryMuted: "#aa6e2d", // Softer secondary
        neutralDark: "#21282d", // Dark neutral for text
        neutralLight: "#e6f0f2", // Light neutral for backgrounds
        charcoal: {
          DEFAULT: "#4c4d4f",
          50: "#F2F3F5",
          100: "#D9DADB",
          200: "#C7C8CA", // silver sand: secondary
          300: "#b7b8b9",
          400: "#949495",
          500: "#707172",
          600: "#4c4d4f", // main Charcoal
          700: "#3d3e3f",
          800: "#2e2e2f",
          900: "#171718"
        },
        sand: {
          50: "#FFFDFA",
          100: "#FCFBF7",
          200: "#FAF7F2",
          300: "#F9F4ED", // Sand 1
          400: "#E8E1D8",
          500: "#D4CBC1",
          600: "#B8AEA2",
          700: "#8C8377", // Sand 2
          800: "#706A63",
          900: "#5C554E",
          1000: "#47423E"
        },
        green: {
          DEFAULT: "#00ff00",
          600: "#189821",
          666: "#04AE3E",
          700: "#03872F"
        },
        Zgreen: {
          DEFAULT: "#85CC28",
          600: "#6FAA22"
        },
        Zblue: {
          DEFAULT: "#0022ff",
          600: "#005f88"
        }
      },
      transitionDelay: {
        50: "50ms",
        250: "250ms",
        400: "400ms"
      },
      maxWidth: {
        "5-5xl": "72rem"
      },
      fontFamily: {
        sans: ['"Open Sans"', "sans-serif"]
      }
    }
  },
  purge: {
    enabled: process.env.NODE_ENV !== "production",
    content: [
      "./components/**/*.{js,vue,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./storyblok/**/*.{html,js,ts,vue}"
    ],
    options: {
      safelist: [] // Add any classes that might be dynamically created
    }
  }
}
