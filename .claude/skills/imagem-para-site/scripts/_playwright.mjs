// Carrega o Playwright do projeto ou da instalação global, sem instalar nada.
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';

const require = createRequire(import.meta.url);

export function carregarPlaywright() {
  const tentativas = [
    () => require('playwright'),
    () => require('@playwright/test'),
    () => require(path.join(process.cwd(), 'node_modules', 'playwright')),
    () => require(path.join(execSync('npm root -g').toString().trim(), 'playwright')),
  ];
  for (const t of tentativas) {
    try { return t(); } catch {}
  }
  console.error(
    'Playwright não encontrado.\n' +
    'Instale só no projeto (não global):  npm i -D playwright && npx playwright install chromium'
  );
  process.exit(1);
}

export async function abrirNavegador() {
  const { chromium } = carregarPlaywright();
  const opcoes = {};
  // Ambientes com Chromium pré-instalado fora do caminho padrão
  const fixo = '/opt/pw-browsers/chromium';
  if (!process.env.PLAYWRIGHT_BROWSERS_PATH && fs.existsSync(fixo)) opcoes.executablePath = fixo;
  return chromium.launch(opcoes);
}

const MIME = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', gif: 'image/gif', avif: 'image/avif' };

export function imagemParaDataUrl(arquivo) {
  const ext = path.extname(arquivo).slice(1).toLowerCase();
  const mime = MIME[ext];
  if (!mime) throw new Error(`Formato de imagem não suportado: ${arquivo}`);
  return `data:${mime};base64,${fs.readFileSync(arquivo).toString('base64')}`;
}

export function alvoParaUrl(alvo) {
  if (/^https?:\/\//.test(alvo) || alvo.startsWith('file://')) return alvo;
  const abs = path.resolve(alvo);
  if (!fs.existsSync(abs)) throw new Error(`Arquivo não encontrado: ${alvo}`);
  return 'file://' + abs;
}

export function lerArgs(argv) {
  const pos = [];
  const opt = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const [k, v] = a.slice(2).split('=');
      if (v !== undefined) opt[k] = v;
      else if (argv[i + 1] && !argv[i + 1].startsWith('--')) opt[k] = argv[++i];
      else opt[k] = true;
    } else pos.push(a);
  }
  return { pos, opt };
}
