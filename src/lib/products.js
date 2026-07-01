// Catálogo-modelo. Preços em centavos. As imagens usam o serviço público
// picsum.photos (com "seed" fixo por produto) apenas como placeholder — troque
// por fotos reais em `public/assets/` ao adaptar para um cliente.

const img = (seed, w = 800, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`

export const CATEGORIAS = [
  { id: 'todos', label: 'Todos' },
  { id: 'vestuario', label: 'Vestuário' },
  { id: 'acessorios', label: 'Acessórios' },
  { id: 'casa', label: 'Casa' },
]

export const PRODUTOS = [
  {
    id: 'camiseta-essencial',
    nome: 'Camiseta Essencial',
    categoria: 'vestuario',
    preco: 8990,
    precoAntigo: 11990,
    imagem: img('camiseta-essencial'),
    descricao:
      'Malha 100% algodão penteado, corte reto e caimento leve. A base ' +
      'perfeita para qualquer look do dia a dia.',
    destaque: true,
    tags: ['algodão', 'unissex'],
  },
  {
    id: 'moletom-canguru',
    nome: 'Moletom Canguru',
    categoria: 'vestuario',
    preco: 19990,
    imagem: img('moletom-canguru'),
    descricao:
      'Moletom felpado por dentro, com bolso canguru e capuz forrado. ' +
      'Conforto para os dias frios sem abrir mão do estilo.',
    destaque: true,
    tags: ['inverno', 'unissex'],
  },
  {
    id: 'calca-jeans-slim',
    nome: 'Calça Jeans Slim',
    categoria: 'vestuario',
    preco: 24990,
    imagem: img('calca-jeans-slim'),
    descricao:
      'Jeans com elastano para máxima liberdade de movimento e modelagem ' +
      'slim que valoriza a silhueta.',
    tags: ['jeans'],
  },
  {
    id: 'bone-classico',
    nome: 'Boné Clássico',
    categoria: 'acessorios',
    preco: 6990,
    imagem: img('bone-classico'),
    descricao:
      'Boné de sarja com aba curva e fecho ajustável. Acabamento premium ' +
      'e conforto o dia inteiro.',
    destaque: true,
    tags: ['ajustável'],
  },
  {
    id: 'mochila-urbana',
    nome: 'Mochila Urbana',
    categoria: 'acessorios',
    preco: 27990,
    precoAntigo: 32990,
    imagem: img('mochila-urbana'),
    descricao:
      'Compartimento acolchoado para notebook 15", tecido resistente à ' +
      'água e alças ergonômicas. Feita para a rotina na cidade.',
    tags: ['notebook', 'impermeável'],
  },
  {
    id: 'oculos-solar',
    nome: 'Óculos de Sol',
    categoria: 'acessorios',
    preco: 15990,
    imagem: img('oculos-solar'),
    descricao:
      'Lentes com proteção UV400 e armação leve em acetato. Estilo ' +
      'atemporal que combina com tudo.',
    tags: ['uv400'],
  },
  {
    id: 'caneca-ceramica',
    nome: 'Caneca de Cerâmica',
    categoria: 'casa',
    preco: 4990,
    imagem: img('caneca-ceramica'),
    descricao:
      'Caneca de 350 ml em cerâmica esmaltada, ideal para o café da ' +
      'manhã. Pode ir ao micro-ondas e à lava-louças.',
    tags: ['350ml'],
  },
  {
    id: 'luminaria-mesa',
    nome: 'Luminária de Mesa',
    categoria: 'casa',
    preco: 21990,
    imagem: img('luminaria-mesa'),
    descricao:
      'Luz LED com três temperaturas de cor e ajuste de intensidade. ' +
      'Design minimalista para a escrivaninha.',
    destaque: true,
    tags: ['led', 'regulável'],
  },
  {
    id: 'manta-tricot',
    nome: 'Manta de Tricô',
    categoria: 'casa',
    preco: 17990,
    precoAntigo: 20990,
    imagem: img('manta-tricot'),
    descricao:
      'Manta macia em fio anti-alérgico, perfeita para o sofá nas noites ' +
      'frias. Toque aconchegante e visual sofisticado.',
    tags: ['macia'],
  },
]

/** Busca um produto pelo seu id (slug). */
export function getProduto(id) {
  return PRODUTOS.find((p) => p.id === id)
}
