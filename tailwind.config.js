/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta da loja-modelo (tema claro, editorial)
        tinta: '#14161c', // quase-preto — texto e superfícies escuras
        nevoa: '#f6f5f2', // off-white — fundo
        marca: '#ff5a3c', // coral — cor de ação
        marcaDark: '#e64027',
        oceano: '#1f6f6b', // verde-azulado — secundária
        areia: '#e9e3d8', // bege — bordas/realces suaves
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(20, 22, 28, 0.18)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 26s linear infinite',
      },
    },
  },
  plugins: [],
}
