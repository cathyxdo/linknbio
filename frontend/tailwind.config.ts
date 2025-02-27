import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'times': ['Times New Roman', 'serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
        'merriweather': ['Merriweather', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'courier-new': ['Courier New', 'monospace'],
        'bitter': ['Bitter', 'serif'],
        'libre-baskerville': ['Libre Baskerville', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'gothic-a1': ['Gothic A1', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'oswald': ['Oswald', 'sans-serif'],
        'quicksand': ['Quicksand', 'sans-serif'],
        'bebas-neue': ['Bebas Neue', 'sans-serif'],
        'pacifico': ['Pacifico', 'sans-serif'],  // using 'cursive' for script fonts
        'fredoka-one': ['Fredoka One', 'sans-serif'],
        sans: ['Manrope', 'Inter', 'DM Sans', 'sans-serif'],
      },
      colors: {
        'custom-red-50': "#ffeff0",
        'custom-red-200': "#fdbfc3",
        'custom-red-400': "#fc8086",
        'custom-red-500': "#fb6068",
        'custom-red-600': "#d3434a",
  
        'custom-green-100': "#daf6e2",
        'custom-green-200': "#b9e9c5",
        'custom-green-500': "#65dc8d",
        'custom-green-800': "#157033",
  
      
        'custom-yellow-50': "#fdf8f1",
        'custom-yellow-200': "#f7e3c6",
        'custom-yellow-500': "#ecb871",  
      
        'custom-orange-100': "#ffe7d6",
        'custom-orange-200': "#ffd0ad",
        'custom-orange-500': "#ff7647",
        'custom-orange-800': "#82450d",
  
        'custom-blue-200': "#a2d1f1",
        'custom-blue-500': "#44b1ff",
        'custom-blue-800': "#144264",

        'custom-purple-100': "#f3e4f8",
        'custom-purple-200': "#e7c9f1",
        'custom-purple-500': "#e4acff",
        'custom-purple-600': "#844b94",
        'custom-purple-800': "#4a265a",
  
      },
    },
    
    
  },
  plugins: [],
}
export default config
