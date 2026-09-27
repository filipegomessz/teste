---
name: revisar-ui
description: Revisa código de interface (HTML, CSS, JS, React, PWA) contra um checklist de acessibilidade, foco, formulários, animação, tipografia, performance, toque/mobile, PWA, dark mode e i18n, e aponta problemas no formato arquivo:linha. Use quando pedirem "revisar a UI", "revisar o layout", "checar acessibilidade", "auditar o design", "ver se está bom no celular" ou "checar boas práticas" de um site ou app web. Só revisa; não altera arquivos sem pedido.
argument-hint: "[arquivo-ou-padrão]"
---

# Revisar UI

Revisão de interface web (sites, web apps e PWAs). Inspirada nas *Web Interface
Guidelines* da Vercel (MIT), reescrita e ampliada com regras de mobile e PWA.
Tudo local: nada é buscado na internet.

## Como fazer

1. **Alvo**: use os arquivos do argumento. Sem argumento, revise os arquivos de UI
   do projeto (`*.html`, `*.css`, `*.jsx/tsx`, `*.vue`, `*.svelte`, `manifest*`,
   service worker). Se o projeto for grande, pergunte qual parte revisar.
2. **Leia o checklist** em [checklist.md](checklist.md) e aplique todas as regras
   que fazem sentido para a stack do projeto (ex.: regras de React/hidratação não se
   aplicam a HTML puro; ignore-as em silêncio).
3. **Contexto antes de julgar**: uma regra pode ter exceção justificada (ex.: app
   instalável que bloqueia zoom por decisão de produto). Nesse caso, reporte como
   `⚠ decisão` em vez de erro, dizendo o custo (quem é prejudicado).
4. **Não edite nada** a menos que o usuário peça. Ao final, ofereça corrigir.
5. Se for pedido, a verificação visual (prints em celular/desktop, claro/escuro)
   pode usar o script `../imagem-para-site/scripts/print.mjs`.

## Formato da resposta

Agrupe por arquivo. Uma linha por problema, curta, com `arquivo:linha` (clicável).
Diga o problema e a correção só quando ela não for óbvia. Sem introdução.

```text
## index.html

index.html:5 - viewport bloqueia zoom (user-scalable=no) → remover; prejudica baixa visão
index.html:212 - botão só com ícone sem aria-label
index.html:340 - transition: all → listar propriedades
index.html:410 - animação sem prefers-reduced-motion

## sw.js

✓ ok
```

Termine com um resumo de 1 a 3 linhas: quantos problemas, quais são os mais graves
(priorize acessibilidade e coisas que quebram no celular) e a pergunta "Quer que eu
corrija?".
