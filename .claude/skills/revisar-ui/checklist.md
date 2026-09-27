# Checklist de UI

Regras curtas. Aplique só as que valem para a stack do projeto.

## Acessibilidade
- Botão só com ícone precisa de `aria-label`
- Todo campo de formulário precisa de `<label>` (ou `aria-label`)
- Ação = `<button>`; navegação = `<a>`. Nunca `<div onclick>` / `<span onclick>`
- Elementos interativos customizados precisam responder a teclado (Enter/Espaço)
- Imagens com `alt` (ou `alt=""` se decorativas); ícones decorativos com `aria-hidden="true"`
- Atualizações assíncronas (toast, erro de validação, "salvo!") com `aria-live="polite"`
- HTML semântico antes de ARIA; títulos em ordem (`h1` → `h2` → `h3`)
- Contraste mínimo WCAG AA: 4.5:1 texto normal, 3:1 texto grande e ícones
- Informação não pode depender só de cor (ex.: feito/não feito precisa de ícone ou texto também)
- Modais/sheets: foco vai para dentro ao abrir, `Esc` fecha, foco volta ao botão de origem

## Foco
- Todo interativo com foco visível (`:focus-visible` com anel/contorno)
- Nunca `outline: none` sem substituto
- Preferir `:focus-visible` a `:focus`; `:focus-within` em controles compostos
- Barra fixa/overlay não pode cobrir o elemento focado

## Formulários
- `name` significativo e `autocomplete` correto
- `type` e `inputmode` certos (`email`, `tel`, `number`, `numeric`…)
- Nunca bloquear colar (`paste` + `preventDefault`)
- Label clicável (`for`/`htmlFor` ou envolvendo o campo); checkbox/radio sem área morta
- `spellcheck="false"` em e-mail, código, usuário
- Botão de enviar só desabilita quando o envio começa; mostrar carregamento
- Erro ao lado do campo, com como corrigir; focar o primeiro erro ao enviar
- Placeholder mostra exemplo e termina com `…`
- Avisar antes de sair com alterações não salvas

## Animação
- Respeitar `prefers-reduced-motion` (versão reduzida ou desligada)
- Animar só `transform` e `opacity` (roda na GPU)
- Nunca `transition: all`; listar as propriedades
- `transform-origin` correto; em SVG, transformar um `<g>` com `transform-box: fill-box`
- Animações interrompíveis pelo usuário
- Movimento automático por mais de 5s precisa de pausa/parar, e para com reduced-motion

## Tipografia e texto
- `…` em vez de `...`; aspas curvas `“ ”`
- Espaço não separável em `10&nbsp;MB`, `⌘&nbsp;K`, nomes de marca
- Estados de carregamento terminam com `…` ("Carregando…", "Salvando…")
- `font-variant-numeric: tabular-nums` em números que se comparam/alinham (contadores, horários)
- `text-wrap: balance` em títulos; `text-wrap: pretty` em parágrafos
- Tamanho mínimo de texto legível no celular: 16px em campos (evita zoom automático no iOS)

## Conteúdo
- Textos longos tratados: `text-overflow`, `line-clamp` ou `overflow-wrap: anywhere`
- Filhos de flex precisam de `min-width: 0` para truncar
- Estado vazio desenhado (lista sem itens não pode parecer quebrada)
- Testar conteúdo curto, médio e muito longo (nome de hábito com 60 caracteres, por ex.)

## Imagens
- `<img>` com `width` e `height` (evita pulo de layout)
- Abaixo da dobra: `loading="lazy"`; imagem principal do topo: `fetchpriority="high"`
- Formatos modernos (`webp`/`avif`) e tamanho adequado (`srcset`/`sizes`)

## Performance
- Listas grandes (>50 itens): virtualizar ou `content-visibility: auto`
- Não ler layout (`getBoundingClientRect`, `offsetHeight`) dentro de loops/render; agrupar leituras e escritas no DOM
- `<link rel="preconnect">` para domínios de CDN/fontes
- Fontes críticas com `preload` e `font-display: swap`
- Vídeo curto em loop `<video autoplay muted loop playsinline>` em vez de GIF, com imagem estática de reserva

## Navegação e estado
- Estado importante refletido na URL (aba, filtro, página) quando fizer sentido
- Links reais (`<a>`) para permitir abrir em nova aba
- Ação destrutiva (apagar) pede confirmação ou oferece desfazer; nunca imediata

## Toque e mobile
- Área de toque mínima de 44×44px (Apple) / 48×48dp (Android), com espaço entre alvos
- `touch-action: manipulation` (tira o atraso de toque duplo)
- `-webkit-tap-highlight-color` definido de propósito
- `overscroll-behavior: contain` em modais, drawers e sheets
- Durante arrasto: desabilitar seleção de texto
- Gestos (arrastar, deslizar, pinçar) precisam de alternativa por toque simples/teclado
- `autofocus` só no desktop; no celular abre o teclado sem o usuário pedir
- Altura de tela cheia com `100dvh`/`min-height: 100dvh`, nunca `100vh` (barra do Safari)
- Não bloquear zoom: evitar `user-scalable=no` e `maximum-scale=1` (reportar como `⚠ decisão` se for intencional)

## Safe areas e layout
- Layout de ponta a ponta usa `env(safe-area-inset-*)` (notch, barra de gestos) com `viewport-fit=cover`
- Sem rolagem horizontal acidental no celular (testar em 360px de largura)
- Layout com flex/grid, não com medição por JavaScript

## PWA
- `manifest` com `name`, `short_name`, `start_url`, `display`, `theme_color`, `background_color` e ícones 192 e 512 (+ `maskable`)
- `apple-touch-icon` e metas `apple-mobile-web-app-*` para iPhone
- Service worker: versão do cache muda a cada deploy e caches antigos são apagados no `activate`
- Funciona offline de verdade: página principal e arquivos essenciais no cache
- Dados em `localStorage`: tratar erro (modo privado/cota cheia) e oferecer exportar/backup se o dado for importante

## Dark mode e tema
- `color-scheme: light dark` (ou `dark`) no `:root` para corrigir barras de rolagem e campos nativos
- `<meta name="theme-color">` combina com o fundo (pode ter uma por `media="(prefers-color-scheme: dark)"`)
- `<select>` nativo com `background-color` e `color` explícitos
- Checar contraste nos dois temas

## Idioma e formatos
- `lang` correto no `<html>`
- Datas/horas com `Intl.DateTimeFormat`, números/moeda com `Intl.NumberFormat`
- Nomes de marca e códigos com `translate="no"`

## React/SSR (só se aplicar)
- Input com `value` precisa de `onChange` (ou usar `defaultValue`)
- Datas renderizadas no servidor podem divergir do cliente; proteger contra erro de hidratação
- `suppressHydrationWarning` só onde for inevitável

## Estados interativos
- Botões e links com estado de hover/pressionado visível
- Estados (hover, ativo, foco) com mais contraste que o repouso
- Estados de carregando, vazio e erro existem

## Texto da interface
- Voz ativa e segunda pessoa ("Crie seu hábito", não "O hábito será criado")
- Rótulo específico no botão ("Salvar hábito", não "Continuar")
- Mensagem de erro diz como resolver
- Números em algarismos ("8 dias", não "oito dias")

## Anti-padrões (sempre apontar)
- `user-scalable=no` / `maximum-scale=1`
- `paste` com `preventDefault`
- `transition: all`
- `outline: none` sem substituto
- `<div>`/`<span>` clicável
- Imagem sem dimensões
- Campo sem label; botão-ícone sem `aria-label`
- Data/número com formato fixo no código
- Gesto sem alternativa
- Apagar sem confirmação ou desfazer
