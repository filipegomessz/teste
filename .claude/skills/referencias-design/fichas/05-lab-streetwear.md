# 05 · lab. streetwear

- **Imagem:** `imagens/05-lab-streetwear.webp` (947x2000 px) · origem: apresentação com 2 telas desktop e 2 telas de celular
- **Tipo:** landing de marca streetwear (desktop + mobile)
- **Em uma frase:** fundo cinza-claro, logo "lab." grosso, **um bloco vermelho-laranja** atrás do recorte da pessoa/produto e textos minúsculos técnicos; mostra como o layout vai do desktop para o celular.

## Paleta (medida)
| Papel | Hex | Observação |
|---|---|---|
| Fundo | `#f6f5f5` | quase branco, levemente cinza |
| Cinza linha | `#d2d2d2` / `#afafaf` | divisórias e bolinhas de paginação |
| Acento | `#fd512f` | vermelho-laranja: bloco atrás do recorte e botão de canto |
| Preto | `#1f1e1e` | logo, textos, botão de seta |
| Sombra do acento | `#4e0d03` | partes escuras da jaqueta vermelha |

As esferas brancas e a moldura preta dos aparelhos são da **apresentação**, não do site.

## Tipografia
- **Logo "lab.":** sans geométrica arredondada, peso extra pesado, minúsculas, ponto final · *Outfit 800*, *Lexend 800*, *Nunito Sans 900*
- **Número "1001":** mesma família, girado 90°, na lateral esquerda.
- **Textos técnicos:** 8–10px, caixa alta, pesados, blocos curtos de 3–4 linhas ("FOR AUTHENTICATION OF X/LABS…").
- **Texto vertical:** "X-LAB / MATERIALS / OF CREATION" girado 90°, na lateral direita.

## Layout
- **Desktop 1 (hero):** header fino ("+1" à esquerda, PROJECTS; SHOP, NEW ARRIVALS ▾ e hambúrguer à direita). "lab." grande à esquerda no meio; "1001" girado no canto inferior esquerdo; bloco vermelho horizontal ocupando ~55% da largura na metade de baixo à direita; pessoa recortada em pé saindo pelo topo do bloco; botão quadrado preto com seta no canto do bloco; textos minúsculos no topo; texto vertical à direita.
- **Desktop 2:** luva preta recortada no centro com um cartão vermelho pequeno ("EXPLORE >") sobreposto; "EXHIBITION" com miniatura de vídeo à esquerda; paginação de pontos; "lab." embaixo à esquerda; blocos de texto e "— 01" à direita; botão quadrado vermelho com seta ↓ no canto inferior direito.
- **Celular:** "lab." no topo à esquerda, texto vertical sob ele, recorte grande ocupando a metade de baixo com o bloco vermelho; ou luva no centro e "lab." no rodapé; botão quadrado vermelho com seta no canto inferior direito, colado à borda.

## Camadas e profundidade
- Fundo → bloco vermelho → recorte (sai para fora do bloco) → botões e textos.
- Partes do recorte ultrapassam os limites do bloco e da tela.

## Componentes
- Botões quadrados (raio 0) com seta: preto no hero, vermelho no canto da tela.
- Paginação com pontos (ativo vermelho).
- Linhas finas horizontais com legenda.
- Seletor de idioma "EN" minúsculo.

## Detalhes premium
- Estética técnica/industrial: números de série, textos de especificação, rotações de 90°.
- Um único acento forte num mar de cinza-claro.
- Muito espaço vazio; tudo alinhado às bordas.
- Coerência total entre desktop e celular (mesmos elementos, reorganizados).

## Cuidados ao reproduzir
- Precisa de recortes sem fundo (pessoa, luva).
- Textos de 8–10px são decorativos no original; no site real, mantenha pelo menos 11–12px para leitura.
- Texto girado com `writing-mode: vertical-rl` ou `rotate`, com cuidado para não gerar rolagem horizontal no celular.
