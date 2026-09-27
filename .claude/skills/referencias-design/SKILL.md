---
name: referencias-design
description: Acervo de referências visuais do usuário (imagens + fichas de design com cores medidas, tipografia, layout e detalhes premium). Use quando o usuário citar um estilo do acervo ("no estilo GAZU", "igual à referência 04", "com a cara do lab."), pedir para ver/listar as referências, ou mandar novas imagens pedindo para "salvar", "guardar" ou "adicionar ao acervo/às referências".
---

# Referências de design

Acervo em `.claude/skills/referencias-design/`:

- `INDEX.md`: uma linha por referência (leia sempre primeiro; é barato).
- `fichas/NN-nome.md`: ficha completa de uma referência (~1 mil tokens cada).
- `imagens/NN-nome.ext`: a imagem original.
- `modelo.md`: modelo para fichas novas.

## Usar uma referência

1. Leia `INDEX.md` e ache a referência pelo nome, número ou estilo descrito.
2. Leia **só** a ficha dela. Abra a imagem só se precisar de detalhe que a ficha não
   cobre (imagem custa mais tokens que a ficha).
3. Para construir a página, siga a skill `imagem-para-site`, usando a ficha como
   ponto de partida da análise e a imagem como `--ref` na comparação.
4. Combinações ("layout da 02 com cores da 04") são válidas: diga o que vem de cada uma.

Nunca carregue o acervo inteiro. Nunca copie logotipo/nome das marcas das referências
para um produto real; use o estilo com a marca do usuário.

## Adicionar referências novas

Quando o usuário mandar imagens para o acervo (ou aceitar salvar uma referência usada):

1. Próximo número livre em `INDEX.md` (01, 02, …). Nome curto em minúsculas com
   hífens que descreva o estilo (ex.: `06-cafe-editorial`).
2. Copie a imagem do caminho informado no chat (`source: ...`) para
   `imagens/NN-nome.ext`, mantendo a extensão. Se vier de vídeo, anote isso.
3. Meça as cores:
   `node .claude/skills/imagem-para-site/scripts/cores.mjs imagens/NN-nome.ext --n 8`
   e use `--ponto x,y` nos acentos (botões, detalhes coloridos).
4. Escreva `fichas/NN-nome.md` seguindo `modelo.md`. Seja concreto (hex, pesos,
   proporções); se algo for ilegível, escreva "ilegível" em vez de inventar.
5. Acrescente a linha em `INDEX.md`.
6. Se o usuário descrever algo que a imagem não mostra (animação, hover, vídeo),
   registre em "Movimento" com as palavras dele.
7. Faça commit das imagens e fichas novas quando o usuário pedir para salvar.

## Remover ou editar

Apague/edite a imagem, a ficha e a linha do `INDEX.md` juntas, e mantenha a numeração
das outras (não renumere).
