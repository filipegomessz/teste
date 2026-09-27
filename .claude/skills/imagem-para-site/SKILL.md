---
name: imagem-para-site
description: Transforma imagens de referência enviadas pelo usuário (prints, mockups, shots do Dribbble/Behance, frames de vídeo) em site ou tela de app com aparência premium e fiel à referência. Analisa a imagem como especificação, extrai cores reais com script, implementa e compara print do resultado com a referência lado a lado até ficar fiel. Use quando o usuário mandar imagem e pedir "faz igual", "nesse estilo", "fiel a essa referência", "com essa cara", "site premium", "landing page como essa", ou citar uma referência do acervo (skill referencias-design).
argument-hint: "[imagem(ns) ou nome da referência] [o que construir]"
---

# Imagem para site

Objetivo: o resultado precisa parecer **o mesmo design** da referência, traduzido em
código real. Não "inspirado em". Não uma versão genérica. Fidelidade vem antes do
gosto pessoal: se a referência usa texto vertical, números gigantes ou um único
bloco de cor, isso é o design; mantenha.

Scripts nesta pasta (usam o Playwright que já existir; não instalam nada global):
- `scripts/cores.mjs` extrai a paleta real (hex + % de área) e amostra pontos.
- `scripts/print.mjs` tira prints em várias larguras/temas e monta a comparação com a referência.

Rode a partir da raiz do projeto: `node .claude/skills/imagem-para-site/scripts/<script> ...`.
Salve prints em uma pasta temporária (scratchpad), não no repositório.

## 0. Juntar as referências

- **Imagens coladas no chat** aparecem com um caminho (`source: ...`). Use esse caminho
  nos scripts.
- **Referência do acervo** ("no estilo GAZU", "igual a 04"): leia
  `.claude/skills/referencias-design/INDEX.md`, depois só a ficha e a imagem citadas.
- **Vídeo**: o usuário só consegue mandar prints; peça (ou use) a descrição do
  movimento e trate como especificação de animação (seção 5).
- Se a imagem for pequena ou borrada (texto ilegível), diga o que não dá para ler e
  pergunte ou decida de forma coerente com o resto; nunca invente detalhe sem avisar.
- Se o pedido mistura referências ("layout da 02 com as cores da 04"), anote o que
  vem de cada uma antes de começar.

## 1. Ficha de análise (antes de qualquer código)

Escreva a ficha na conversa, curta e concreta. Meça proporções em relação à largura
da imagem e converta para a largura-alvo (normalmente 1440px no desktop).

1. **Estrutura**: lista de seções de cima para baixo, com altura aproximada de cada uma
   (ex.: "hero ≈ 45% da largura de altura → ~650px em 1440").
2. **Grade**: margens laterais, largura do conteúdo, colunas, alinhamentos que se repetem.
3. **Cores**: rode `cores.mjs` na imagem (e com `--ponto` nos botões, links, acentos).
   Use os hex medidos. Defina papéis: fundo, superfície, texto, texto suave, acento, linha.
4. **Tipografia**: para cada nível (display, título, corpo, rótulo, botão):
   categoria (grotesca, geométrica, condensada, serifada editorial, arredondada),
   peso, caixa (alta/baixa), espaçamento entre letras, altura relativa. Escolha a fonte
   mais próxima no Google Fonts e diga qual é (ex.: condensada pesada → *Anton*/*Bebas
   Neue*; geométrica larga → *Syne*/*Unbounded*/*Archivo* expandida; arredondada
   geométrica → *Outfit*/*Lexend*; editorial → *Playfair Display*/*Fraunces*).
5. **Camadas e profundidade**: o que está na frente do quê. Atenção especial a
   **texto atrás da pessoa/produto** (letras gigantes com o recorte por cima), blocos de
   cor atrás de recortes, sobreposições que saem do container.
6. **Componentes**: botões (forma, raio, preenchido/contorno, padding, seta/ícone),
   links (sublinhado fino?), cards, navegação, ícones (traço fino? preenchido?).
7. **Detalhes que dão o "premium"**: rótulos minúsculos com letras espaçadas, linhas
   finas, números grandes, texto vertical, contraste enorme de escala, espaço vazio.
8. **Imagens necessárias**: liste cada foto/recorte, com proporção e tratamento
   (P&B, dessaturada, recorte sem fundo, sombra no chão).
9. **Movimento** (se houver vídeo ou descrição).

## 2. Assets (fotos e recortes)

- Nunca substitua uma foto por um retângulo de `div` ou por um SVG desenhado à mão.
- Se o usuário tiver as fotos, use-as. Recortes sem fundo precisam de PNG/WebP com
  transparência; se só houver foto com fundo, diga isso e use a foto no lugar certo
  com a mesma proporção.
- Sem fotos: use placeholders com a **mesma proporção e o mesmo tratamento**
  (ex.: `https://picsum.photos/seed/<palavra>/<l>/<a>?grayscale` para P&B) e liste no
  final quais imagens o usuário deve trocar.
- Não copie logotipo, nome ou fotos de marca real para um produto publicado; use a
  marca e o conteúdo do usuário, mantendo o layout e o estilo.

## 3. Implementação

- Siga a stack do projeto. Projeto sem stack: HTML + CSS puro (um arquivo, ou
  `index.html` + `style.css`), sem framework, a não ser que o usuário peça.
- **Tokens primeiro**: variáveis CSS com as cores medidas, fontes, escala de tamanhos,
  raio e espaçamentos tirados da ficha.
- Tamanhos grandes com `clamp()` calibrado para bater com a referência em 1440px
  (ex.: letra display que ocupa 85% da largura → calcule o `vw`).
- Texto atrás do recorte: pilha com `position`/`z-index` (fundo → texto gigante →
  recorte → UI). Grade com CSS Grid; sobreposições com posicionamento, não com margens
  negativas soltas.
- Mantenha: ordem das seções, proporções, espaço vazio, alinhamentos, caixa alta,
  espaçamento de letras, peso das fontes, raio (inclusive raio 0).
- Não "melhore" o design: não adicione cards, sombras, gradientes, ícones ou seções
  que não existem na referência; não troque o layout por um padrão genérico.
- Texto: use o conteúdo e o idioma do usuário (se a referência estiver em outro
  idioma, traduza/adapte mantendo tamanho e quantidade de linhas parecidos).
- Acessibilidade sem mudar o visual: HTML semântico, `alt`, foco visível, contraste
  AA no texto de leitura, `prefers-reduced-motion`.

## 4. Comparar e corrigir (obrigatório)

```bash
node .claude/skills/imagem-para-site/scripts/print.mjs index.html \
  --ref <imagem-referencia> --larguras 1440,390 --saida <scratchpad>/prints
```

Gera `lado-a-lado.png`, `sobreposto.png` (diferença; áreas escuras = iguais) e prints
por largura. Abra as imagens e liste as diferenças nesta ordem:

1. estrutura e proporções das seções
2. tamanho e posição dos elementos grandes (display, fotos, blocos de cor)
3. tipografia (fonte, peso, tamanho, espaçamento de letras, quebras de linha)
4. espaçamentos e alinhamentos
5. cores
6. detalhes (linhas, ícones, setas, sublinhados)

Corrija e compare de novo. Faça no mínimo 2 rodadas; pare quando as diferenças
restantes forem só de conteúdo/foto ou após 4 rodadas (diga o que ficou diferente e
por quê). Se a referência for de celular, use `--largura-ref 390`.

## 5. Movimento (referências em vídeo)

- Descreva a animação em uma linha por elemento: o quê, de onde para onde, duração,
  curva, se repete e o que dispara (carregar, rolar, hover, clique).
- Sincronizar várias coisas (ex.: fundo + líquido + personagem mudando de cor juntos):
  uma única variável animada (`@property --tom` + `@keyframes`, ou Web Animations API)
  que todas as cores leem (`hsl(var(--tom) ...)`, `filter: hue-rotate(...)`).
- Personagem ou objeto que anda de verdade exige vídeo, sequência de imagens ou
  Lottie fornecidos pelo usuário; diga isso em vez de simular com CSS.
- Só `transform`, `opacity` e `filter`; nada de `transition: all`; tudo desligado ou
  reduzido com `prefers-reduced-motion`.

## 6. Responsivo

Se a referência só mostra desktop, derive o celular com a mesma lógica: mesma
hierarquia, display grande ainda dominante, recortes empilhados, CTA visível sem
rolar. Confira em 390px e 1440px (sem rolagem horizontal).

## 7. Entrega

- Mostre o `lado-a-lado.png` final.
- Liste: fontes usadas, cores (hex), imagens que o usuário deve trocar, diferenças que
  sobraram.
- Se a imagem não estiver no acervo, pergunte se quer salvá-la com a skill
  `referencias-design`.
