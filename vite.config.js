import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuração do Vite + React.
// No build usamos base relativa ('./') para que o mesmo artefato funcione em
// qualquer subcaminho do GitHub Pages (ex.: /loja-modelo/) sem reconstruir
// caso o repositório seja renomeado. No dev local, a raiz é "/".
export default defineConfig(({ command }) => ({
  base: command === 'build' ? './' : '/',
  plugins: [react()],
}))
