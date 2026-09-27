# 02 · GAZU moda

- **Imagem:** `imagens/02-gazu-moda.png` (736x1238 px) · origem: mockup de página inteira
- **Tipo:** e-commerce de moda (home)
- **Em uma frase:** monocromático cinza-papel com o nome da marca gigante e o modelo caminhando **na frente das letras**; tudo reto, preto e espaçado.

## Paleta (medida)
| Papel | Hex | Observação |
|---|---|---|
| Fundo hero | `#e1e0dd` | cinza quente, cor de papel |
| Fundo claro | `#f6f5f3` | seção de produtos |
| Cinza médio | `#bfbdbb` | faixa "NEW VIBES" e fundos de foto |
| Preto | `#0c0c0c` | texto, botões, barra de aviso, faixa de categorias |
| Grafite | `#302f2e` | textos secundários |
| Cinza texto | `#85827e` | detalhes |

Sem cor de acento: o acento é o preto.

## Tipografia
- **Display "GAZU":** sans geométrica larga, peso 500–600, caixa alta, ocupa ~85% da largura · *Syne*, *Unbounded 500*, *Archivo Expanded*, *Montserrat 600*
- **Logo do topo:** mesma família, ~32px em 1440.
- **Títulos de seção ("NEW VIBES", "BEST OF GAZU"):** grotesca pesada, caixa alta, entrelinha apertada (0.95) · *Inter Tight 800*, *Archivo 800*
- **Rótulos ("FASHION / THAT MOVES / WITH YOU."):** 11–12px, caixa alta, espaçamento de letras ~0.3em, uma palavra por linha, traço curto embaixo.
- **Menu e botões:** 11–12px caixa alta, espaçamento ~0.08em.
- **Corpo:** 14–15px, regular.

## Layout (de cima para baixo, proporções em 1440px)
1. Barra de aviso preta fina (~40px): texto à esquerda, links "DOWNLOAD APP | TRACK ORDER | HELP" à direita.
2. Header (~90px): menu à esquerda (MEN, WOMEN, KIDS, BEAUTY), logo centralizado, ícones com rótulo à direita (SEARCH, LOGIN, WISHLIST, CART (0)).
3. Hero (~900px): rótulo empilhado no alto à esquerda; "GAZU" gigante no meio; modelo de corpo inteiro entre o "A" e o "Z"; botão "SHOP NOW" + link "EXPLORE NEW IN" embaixo à esquerda; "NEW / COLLECTION / 2024" embaixo à direita.
4. Faixa preta de categorias (~290px): 3 colunas, cada uma com foto quadrada + título + 2 linhas + link com seta.
5. Banner "NEW SEASON / NEW VIBES" (~540px): texto à esquerda sobre cinza, retrato P&B grande à direita saindo do topo da faixa.
6. Faixa de benefícios: 4 itens com ícone de linha + título + subtítulo.
7. "BEST OF GAZU" + "VIEW ALL" sublinhado; grade de 4 produtos com coração no canto.

Margens laterais ~6% da largura; conteúdo largo, sem container estreito.

## Camadas e profundidade
- Ordem no hero: fundo → "GAZU" → recorte do modelo (sobrepõe as letras) → botões/rótulos.
- Sombra suave de contato sob os pés do modelo.
- Retrato do banner "NEW VIBES" ultrapassa o limite superior da faixa.

## Componentes
- Botão primário: retângulo preto, raio 0, texto branco 11px caixa alta, padding ~16×28.
- Link secundário: texto caixa alta com sublinhado fino afastado (~6px).
- Links com seta "→".
- Ícones de linha fina (1.5px), estilo *Phosphor Light* / *Tabler*.
- Cards de produto: foto em fundo cinza, raio 0, coração em círculo branco pequeno.

## Detalhes premium
- Escala extrema: letras gigantes vs. rótulos de 11px.
- Fotografia toda P&B ou dessaturada, com o mesmo fundo cinza.
- Traços curtos sob rótulos, sublinhados finos, nada arredondado.
- Muito espaço vazio no hero.

## Cuidados ao reproduzir
- O efeito depende de um **recorte sem fundo** (PNG/WebP com transparência) do modelo.
- Não usar o nome "GAZU": o display deve ser a marca do usuário (ajuste o `vw` para a palavra caber em ~85%).
- Em celular: display ainda grande (~22vw), modelo menor e centralizado, botões empilhados.
