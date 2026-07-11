# Meus Hábitos 🌱

App simples para controlar hábitos. **Funciona 100% offline** e guarda tudo no próprio celular — não precisa de internet nem de conta.

## O que ele faz
- ✅ Marcar os hábitos que você cumpriu hoje
- 🔥 Contar sua sequência de dias seguidos (streak)
- 📅 Ver o histórico num calendário mês a mês
- ✏️ Criar, editar e apagar hábitos

## Como instalar no celular (via GitHub Pages)

O botão "Instalar / Adicionar à tela inicial" só aparece quando o app é aberto por um endereço `https://` (não abrindo o arquivo local). Por isso usamos o GitHub Pages — um link https grátis.

### 1. Ligar o GitHub Pages (uma vez só, pelo navegador)
1. Abra o repositório no GitHub → **Settings** (Configurações).
2. No menu lateral, clique em **Pages**.
3. Em **Build and deployment → Source**, escolha **Deploy from a branch**.
4. Em **Branch**, selecione `claude/offline-mobile-app-x2e3x6` e pasta `/ (root)` → **Save**.
5. Aguarde ~1 minuto. O endereço aparece no topo, algo como:
   `https://filipegomessz.github.io/teste/`

### 2. Instalar no celular
1. Abra esse endereço no navegador do celular.
2. Toque para instalar:
   - **Android (Chrome):** menu ⋮ → *Instalar aplicativo* / *Adicionar à tela inicial*
   - **iPhone (Safari):** botão compartilhar → *Adicionar à Tela de Início*
3. Abra pelo ícone. Depois da primeira vez, **funciona offline**.

> Os dados ficam salvos no navegador do celular. Se você limpar os dados do navegador ou desinstalar, o histórico é perdido — então evite "limpar dados do site".

## Detalhes técnicos
- Um único arquivo `index.html`, sem dependências.
- Dados salvos em `localStorage` (no aparelho).
- Nada é enviado para servidor nenhum.
