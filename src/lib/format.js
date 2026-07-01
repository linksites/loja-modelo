// Utilitários de formatação. Preços são armazenados em centavos (inteiros)
// para evitar erros de ponto flutuante; formatamos em BRL para exibição.

const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

/** Formata um valor em centavos como moeda brasileira (ex.: 12990 → "R$ 129,90"). */
export function formatarPreco(centavos) {
  return brl.format((centavos ?? 0) / 100)
}
