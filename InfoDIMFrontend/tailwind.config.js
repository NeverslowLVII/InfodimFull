/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInFromLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        slideInFromLeft: 'slideInFromLeft 1s ease-out',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
      opacity: {
        0: '0',
        100: '1',
      },
      animationDelay: {
        '0ms': '0ms',
        '150ms': '150ms',
        '300ms': '300ms',
        '450ms': '450ms',
        '600ms': '600ms',
      },
    },
  },
  plugins: [
    function({ addUtilities, theme, e }) {
      const newUtilities = {};
      Object.entries(theme('animationDelay')).forEach(([key, value]) => {
        newUtilities[`.${e(`delay-${key}`)}`] = {
          animationDelay: value,
        };
      });
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
  safelist: (() => {
    const colors = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']; 
    const shades = ['50','100', '200', '300', '400', '500', '600', '700', '800', '900','950'];
    const safelist = [];

    colors.forEach(color => {
      shades.forEach(shade => {
        safelist.push(`text-${color}-${shade}`);
        safelist.push(`bg-${color}-${shade}`);
        safelist.push(`border-${color}-${shade}`);
        safelist.push(`hover:text-${color}-${shade}`);
        safelist.push(`hover:bg-${color}-${shade}`);
        safelist.push(`hover:border-${color}-${shade}`);
        // Add other utilities as needed
      });
    });

    return safelist;
  })(),
};
