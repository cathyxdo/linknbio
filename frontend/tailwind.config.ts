import type { Config } from 'tailwindcss'
/* 
--black: #000000ff;
--tiffany-blue: #7ED8BEff;
--coral: #F38D68ff;
--bright-pink-crayola: #F76F8Eff;
--burnt-sienna: #EE6C4Dff;
--aquamarine: #A1FCDFff;
--orchid-pink: #F1BAC8ff;
--amber: #FABD2Aff;
--apricot: #FFCAB1ff;
--sea-green: #529872ff; */

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
      },
    },/* 
    colors: {
      'tiffany-blue': '#7ED8BEff',
      'coral': '#F38D68ff',
      'bright-pink': '#F76F8Eff',
      'burnt-sienna': '#EE6C4Dff',
      'aquamarine': '#A1FCDFff',
      'orchid-pink': '#F1BAC8ff',
      'amber': '#FABD2Aff',
      'apricot': '#FFCAB1ff',
      'sea-green': '#529872ff',
    }, */
  },
  plugins: [],
}
export default config
