# 03 · Chroma Juice

- **Imagem:** `imagens/03-chroma-juice.png` (422x654 px) · origem: **frame de vídeo** (apresentação com o site dentro de uma janela de navegador sobre a arte ampliada)
- **Tipo:** landing de produto (suco/smoothie)
- **Em uma frase:** produto real (garrafa) + personagem (camaleão) num fundo de cor única; a identidade é a **cor que muda**.

## Paleta (medida neste frame)
| Papel | Hex | Observação |
|---|---|---|
| Fundo | `#3f6f83` → `#124f66` | azul-petróleo, mais escuro nos cantos (vinheta) |
| Fundo claro | `#6f8e9a` / `#85a4b0` | reflexos e névoa |
| Líquido | `#763149` / `#3f1f33` | frutas vermelhas; muda junto com o fundo |
| CTA | `#b3d467` | verde-limão, botão "Comprar" |
| Texto | `#ffffff` | títulos e menu |
| Card | branco com transparência sobre o fundo | card do produto no canto |

Essas cores valem para **um sabor**. No vídeo, fundo, líquido e camaleão mudam de cor juntos.

## Tipografia
- **Display "Chroma Juice":** sans geométrica pesada, 2 linhas, entrelinha ~0.95, alinhada à esquerda · *Manrope 800*, *Onest 800*, *Montserrat 800*
- **Menu:** 13–14px regular branco.
- **Corpo:** 12–13px, 4 linhas curtas, branco com opacidade.
- **Na garrafa:** mesma família do display (rótulo coerente com o site).
- Texto original em russo: adapte o conteúdo ao idioma do usuário.

## Layout
- Header: logo (círculo "C" verde) à esquerda; menu (Loja ▾, Empresa, Avaliações, Contatos) após o logo; telefone + botão verde com ícone de sacola + menu hambúrguer à direita.
- Hero em uma tela: título grande à esquerda no terço superior; parágrafo e botão de contorno "Para o catálogo →" embaixo à esquerda; garrafa no centro-esquerda cortada pela base; camaleão andando à direita da garrafa; card do produto no alto à direita (miniatura + nome + sabor + botão verde).

## Camadas e profundidade
- Fundo → garrafa (grande, com reflexo de vidro) → camaleão (na frente da parte direita da garrafa) → texto e UI por cima.
- O título sobrepõe parte da garrafa.

## Componentes
- Botão primário: verde-limão, raio ~10px, texto escuro + ícone.
- Botão secundário: contorno branco fino, raio ~10px, seta.
- Card de produto: fundo claro translúcido, raio ~12px.

## Detalhes premium
- Um único objeto herói, bem iluminado, em alta resolução.
- Personagem inesperado (camaleão) que explica o conceito (sabor = cor).
- Paleta de 3 cores no máximo por sabor.

## Movimento (descrito pelo usuário)
- O camaleão **anda** pela cena e **troca de cor**; o fundo e o líquido da garrafa trocam de cor **junto**, no mesmo tempo.
- Reprodução: uma variável única de tom (`@property --tom` animada ou Web Animations) lida pelo fundo, pelo líquido (camada colorida mascarada sobre a garrafa ou `hue-rotate`) e pelo camaleão (`filter: hue-rotate`).
- Caminhar de verdade exige vídeo, sequência de frames ou Lottie do camaleão; sem isso, faça só um deslocamento lento e sutil.
- Com `prefers-reduced-motion`: cor fixa, sem caminhada.

## Cuidados ao reproduzir
- Imagem pequena (frame de vídeo): textos do corpo praticamente ilegíveis.
- Precisa de garrafa e camaleão recortados; a mudança de cor funciona melhor com o líquido numa camada separada da garrafa.
