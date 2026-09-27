# 01 · Noir editorial

- **Imagem:** `imagens/01-noir-editorial.webp` (185x2000 px) · origem: prancha com ~17 heros empilhados
- **Tipo:** coleção de heros de sites (portfólio, agência, produto, editorial)
- **Em uma frase:** fundo grafite quase preto, uma foto dramática com luz lateral, tipografia enorme e **um único acento** (amarelo) usado com muita economia.

> A imagem é muito pequena: textos pequenos são ilegíveis. Use como referência de
> clima, composição e paleta, não de detalhes.

## Paleta (medida)
| Papel | Hex | Observação |
|---|---|---|
| Fundo principal | `#202123` / `#222427` | grafite, nunca preto puro nas áreas grandes |
| Fundo profundo | `#030303` | sombras e alguns heros |
| Superfície | `#373638` / `#404245` | faixas, cartões, rodapé do hero |
| Texto | `#e4e5e9` / `#d6d3d4` | branco acinzentado |
| Texto suave | `#7c7b7c` / `#a1a2a2` | menus e legendas |
| Acento | `#fac009` | amarelo-mostarda: um bloco, uma moldura, um botão por tela |

Variações vistas na prancha: vermelho-escuro com branco ("Shadow & Light"), azul-claro com lua ("To space and back"), foto de estrada colorida ("Ring Road").

## Tipografia
- **Display:** três famílias alternadas conforme o hero:
  - grotesca pesada em caixa alta ("RING ROAD", "TATTOOS ARE OUR PASSION") · *Archivo Black*, *Inter Tight 800*
  - serifada editorial grande e fina ("Shadow & Light", "ANOTHER FACE PORCELAIN") · *Playfair Display*, *Cormorant*
  - fina/leve com letras espaçadas ("Minimalis-simo", "TO SPACE AND BACK, SAFELY.") · *Montserrat 300*, *Jost 300*
- **Menus e rótulos:** minúsculos, caixa alta, muito espaçados, cinza.
- Títulos de 1 a 3 linhas; às vezes a palavra é quebrada de propósito ("Minimalis-/simo").

## Layout
- Cada hero ocupa a tela toda, em proporção de tela de notebook (~16:10).
- Composição assimétrica: texto em um terço, foto ocupando dois terços ou sangrando.
- Navegação fina no topo: logo pequeno à esquerda, 4–5 links minúsculos à direita.
- Indicadores laterais: números de slide, linha vertical, setas pequenas nas bordas.

## Camadas e profundidade
- Fotos com luz lateral forte saindo do escuro (rosto meio iluminado, capuz, silhueta).
- Molduras/contornos amarelos sobrepostos à foto ("Minimalis-simo").
- Bloco de acento que sai do alinhamento (retângulo amarelo na borda da tela).

## Componentes
- Botões pequenos retangulares (acento preenchido ou contorno fino).
- Setas finas e controles de slide.
- Cards escuros com foto em algumas variações (calendário "2017 / 24 / 02").

## Detalhes premium
- Contraste de escala: título gigante vs. rótulos de 10–11px.
- Quase nada na tela: 1 foto, 1 título, 1 frase, 1 ação.
- Fotografia com tratamento consistente (escura, contrastada, dessaturada).
- Acento usado 1 vez por tela.

## Cuidados ao reproduzir
- Precisa de fotografia escura de boa qualidade; placeholders genéricos coloridos quebram o clima (use `?grayscale` e escureça com overlay).
- Contraste: texto cinza sobre grafite deve passar AA quando for texto de leitura.
- Escolha **um** dos heros como base; não misture as 17 variações numa página só.
