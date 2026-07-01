// Configuração central da loja: identidade, contato e textos institucionais.
// Trocar por dados reais ao clonar este modelo para um cliente.

export const MARCA = {
  nome: 'Loja Modelo',
  slogan: 'Design para o dia a dia',
  descricao:
    'Uma vitrine-modelo com catálogo, carrinho e checkout demonstrativos. ' +
    'Use como base para lojas reais: troque produtos, cores e textos.',
  email: 'contato@lojamodelo.com',
  telefone: '(11) 99999-0000',
  endereco: 'Rua das Amostras, 100 — São Paulo, SP',
}

// Link de suporte/atendimento (WhatsApp) usado no rodapé e no checkout.
export const WHATSAPP_URL =
  'https://wa.me/5511999990000?text=' +
  encodeURIComponent('Olá! Vim pela Loja Modelo e quero saber mais.')

export const REDES = [
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
  { label: 'TikTok', href: 'https://tiktok.com', icon: 'tiktok' },
]

// Frete grátis acima deste valor (em centavos). Apenas demonstrativo.
export const FRETE_GRATIS_A_PARTIR_DE = 29900
export const VALOR_FRETE = 1990
