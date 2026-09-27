# 04 · Planet HYPE

- **Imagem:** `imagens/04-planet-hype.png` (492x267 px) · origem: print de tela
- **Tipo:** landing de produto (tênis)
- **Em uma frase:** fundo laranja cheio, palavra "HYPE" gigante em branco **atrás** do tênis, com respingos de tinta saindo do produto.

## Paleta (medida)
| Papel | Hex | Observação |
|---|---|---|
| Fundo | `#ff7f41` → `#faa257` | laranja com leve degradê/luz no centro |
| Display e texto | `#fcf9f8` | branco levemente quente |
| Laranja do produto | `#fc6a0f` / `#eb6711` | tom mais forte, igual ao tênis |
| Opção de cor 1 | `#05e6ce` | turquesa (bolinha de cor) |
| Sombras/respingos | `#d88155` e preto | partículas |

## Tipografia
- **Display "HYPE":** condensada extra pesada, caixa alta, altura ~50% da tela, branca · *Anton*, *Bebas Neue*, *Oswald 700*
- **Título "FIND YOUR GREATNESS":** mesma família condensada, branca, 2 linhas.
- **Corpo:** 12–13px, branco, 4 linhas curtas.
- **Menu e botões:** sans simples 13–14px.

## Layout
- Header: logo "planet" com cantos de colchete à esquerda; Home, Products, Contact + botão pílula branco "Place order" com ícone à direita.
- Abaixo do header, centralizado: seletor em pílula "Products | Contact" (ativo branco, inativo translúcido).
- Hero de uma tela: título e texto à esquerda (centro vertical); "HYPE" centralizado ao fundo; tênis no centro, levemente inclinado; à direita "Choose Your Color" com 3 bolinhas e abaixo 3 círculos de tamanho (41, 42, 43).
- Rodapé do hero: ícones sociais à esquerda; "Choose your size" com linhas dos dois lados no centro; botão pílula branco "See all products ↗" à direita.

## Camadas e profundidade
- Fundo → "HYPE" → respingos atrás → tênis → respingos na frente → UI.
- O tênis cobre parte das letras do meio.

## Componentes
- Botões pílula brancos com texto escuro e ícone/seta.
- Seletores circulares: cor (preenchido) e tamanho (contorno branco com número).
- Seletor segmentado em pílula.

## Detalhes premium
- Produto recortado com sombra e partículas: dá movimento a uma imagem parada.
- Cor única do fundo tirada do próprio produto.
- Tudo branco sobre laranja: sem terceira cor na interface.

## Movimento (sugerido pela composição)
- Trocar a cor no seletor pode trocar o fundo e o produto juntos (mesma lógica da ficha 03).
- Leve flutuação do tênis e parallax dos respingos; respeitar `prefers-reduced-motion`.

## Cuidados ao reproduzir
- Imagem pequena: textos do corpo pouco legíveis.
- Precisa do produto recortado; respingos podem ser PNG separado ou partículas em canvas.
- Branco sobre laranja `#ff7f41` tem contraste baixo (~2.4:1): ok para o display gigante, mas o texto de leitura precisa de laranja mais escuro ou texto escuro.
- Não usar logos de marcas reais no produto.
