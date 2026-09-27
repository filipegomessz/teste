#!/usr/bin/env node
// Tira prints de uma página e, opcionalmente, monta a comparação com a imagem de referência.
//
// Uso:
//   node print.mjs <url|arquivo.html> [opções]
//
// Opções:
//   --larguras 1440,390    larguras de viewport (padrão: 1440,390)
//   --altura 900           altura do viewport (padrão: 900; celular usa 844)
//   --pagina-inteira       captura a página toda (padrão: só a primeira tela)
//   --tema dark|light      força o tema (prefers-color-scheme)
//   --ref imagem.png       gera lado-a-lado.png e sobreposto.png comparando com a referência
//   --largura-ref 1440     largura do viewport usada na comparação (padrão: a 1ª largura)
//   --esperar 800          ms extras antes do print (fontes, animações de entrada)
//   --saida pasta          onde salvar (padrão: .prints/)

import path from 'node:path';
import fs from 'node:fs';
import { abrirNavegador, alvoParaUrl, imagemParaDataUrl, lerArgs } from './_playwright.mjs';

const { pos, opt } = lerArgs(process.argv.slice(2));
if (!pos[0]) {
  console.error('Uso: node print.mjs <url|arquivo.html> [--larguras 1440,390] [--ref imagem.png] [--pagina-inteira] [--tema dark] [--saida pasta]');
  process.exit(1);
}

const url = alvoParaUrl(pos[0]);
const larguras = String(opt.larguras || '1440,390').split(',').map(Number).filter(Boolean);
const saida = path.resolve(opt.saida || '.prints');
const esperar = Number(opt.esperar || 800);
const inteira = Boolean(opt['pagina-inteira']);
fs.mkdirSync(saida, { recursive: true });

const browser = await abrirNavegador();
const gerados = [];

async function capturar(largura, sufixo = '', paginaToda = inteira) {
  const celular = largura < 600;
  const altura = Number(opt.altura || (celular ? 844 : 900));
  const ctx = await browser.newContext({
    viewport: { width: largura, height: altura },
    deviceScaleFactor: celular ? 2 : 1,
    isMobile: celular,
    hasTouch: celular,
    colorScheme: opt.tema === 'dark' || opt.tema === 'light' ? opt.tema : undefined,
    serviceWorkers: 'block',
  });
  const page = await ctx.newPage();
  const erros = [];
  page.on('pageerror', e => erros.push(e.message));
  page.on('console', m => { if (m.type() === 'error') erros.push(m.text()); });
  await page.goto(url, { waitUntil: 'networkidle' }).catch(() => page.goto(url, { waitUntil: 'load' }));
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.waitForTimeout(esperar);
  const nome = path.join(saida, `print-${largura}${opt.tema ? '-' + opt.tema : ''}${sufixo}.png`);
  await page.screenshot({ path: nome, fullPage: paginaToda });
  const rolagemH = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  await ctx.close();
  gerados.push(nome);
  if (rolagemH) console.log(`⚠ ${largura}px: página tem rolagem horizontal`);
  for (const e of erros) console.log(`⚠ ${largura}px erro no console: ${e}`);
  return nome;
}

for (const l of larguras) await capturar(l);

if (opt.ref) {
  const ref = path.resolve(opt.ref);
  const larguraRef = Number(opt['largura-ref'] || larguras[0]);
  // Para comparar, captura a página inteira na largura da referência
  const render = await capturar(larguraRef, '-comparar', true);
  const refUrl = imagemParaDataUrl(ref);
  const renUrl = imagemParaDataUrl(render);
  const col = 720;

  const page = await browser.newPage({ viewport: { width: col * 2 + 48, height: 800 } });
  await page.setContent(`<!doctype html><html><body style="margin:0;background:#888;font:600 14px system-ui">
    <div style="display:flex;gap:16px;padding:16px;align-items:flex-start">
      <figure style="margin:0;width:${col}px"><figcaption style="color:#fff;padding:0 0 6px">REFERÊNCIA</figcaption><img src="${refUrl}" style="width:100%;display:block"></figure>
      <figure style="margin:0;width:${col}px"><figcaption style="color:#fff;padding:0 0 6px">RESULTADO (${larguraRef}px)</figcaption><img src="${renUrl}" style="width:100%;display:block"></figure>
    </div></body></html>`);
  await page.waitForLoadState('load');
  const ladoALado = path.join(saida, 'lado-a-lado.png');
  await page.screenshot({ path: ladoALado, fullPage: true });

  await page.setViewportSize({ width: col + 32, height: 800 });
  await page.setContent(`<!doctype html><html><body style="margin:0;background:#fff">
    <div style="position:relative;width:${col}px;margin:16px">
      <img src="${refUrl}" style="width:100%;display:block">
      <img src="${renUrl}" style="position:absolute;inset:0 auto auto 0;width:100%;opacity:.5;mix-blend-mode:difference">
    </div></body></html>`);
  await page.waitForLoadState('load');
  const sobreposto = path.join(saida, 'sobreposto.png');
  await page.screenshot({ path: sobreposto, fullPage: true });
  gerados.push(ladoALado, sobreposto);
}

await browser.close();
console.log(gerados.map(g => path.relative(process.cwd(), g)).join('\n'));
