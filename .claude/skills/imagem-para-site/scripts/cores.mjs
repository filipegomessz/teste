#!/usr/bin/env node
// Extrai a paleta real de uma imagem de referência (hex + % de área),
// para não chutar cores de olho.
//
// Uso:
//   node cores.mjs <imagem> [--n 10] [--ponto 50%,20%] [--ponto 120,340] [--recorte x,y,l,a]
//
//   --n        quantas cores listar (padrão 10)
//   --ponto    amostra a cor exata num ponto (px da imagem ou %); pode repetir
//   --recorte  limita a paleta a uma área: x,y,largura,altura (px ou %)

import { abrirNavegador, imagemParaDataUrl } from './_playwright.mjs';

const argv = process.argv.slice(2);
const arquivo = argv.find(a => !a.startsWith('--') && !/^[\d.%,]+$/.test(a));
if (!arquivo) {
  console.error('Uso: node cores.mjs <imagem> [--n 10] [--ponto 50%,20%] [--recorte x,y,l,a]');
  process.exit(1);
}
const pontos = [];
let n = 10;
let recorte = null;
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === '--ponto') pontos.push(argv[++i]);
  else if (argv[i] === '--n') n = Number(argv[++i]);
  else if (argv[i] === '--recorte') recorte = argv[++i];
}

const browser = await abrirNavegador();
const page = await browser.newPage();
const resultado = await page.evaluate(async ({ src, n, pontos, recorte }) => {
  const img = new Image();
  img.src = src;
  await img.decode();
  const W = img.naturalWidth, H = img.naturalHeight;
  const conv = (v, total) => String(v).endsWith('%') ? Math.round(parseFloat(v) / 100 * total) : Math.round(Number(v));

  const full = document.createElement('canvas');
  full.width = W; full.height = H;
  const fctx = full.getContext('2d', { willReadFrequently: true });
  fctx.drawImage(img, 0, 0);
  const hex = (r, g, b) => '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');

  const amostras = pontos.map(p => {
    const [x, y] = p.split(',');
    const px = Math.min(W - 1, conv(x, W)), py = Math.min(H - 1, conv(y, H));
    const d = fctx.getImageData(Math.max(0, px - 1), Math.max(0, py - 1), 3, 3).data;
    let r = 0, g = 0, b = 0, c = 0;
    for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i + 1]; b += d[i + 2]; c++; }
    return { ponto: p, px: `${px},${py}`, hex: hex(Math.round(r / c), Math.round(g / c), Math.round(b / c)) };
  });

  let [rx, ry, rw, rh] = [0, 0, W, H];
  if (recorte) {
    const [a, b, c, d] = recorte.split(',');
    rx = conv(a, W); ry = conv(b, H); rw = conv(c, W); rh = conv(d, H);
  }
  const escala = Math.min(1, 240 / Math.max(rw, rh));
  const cw = Math.max(1, Math.round(rw * escala)), ch = Math.max(1, Math.round(rh * escala));
  const cv = document.createElement('canvas');
  cv.width = cw; cv.height = ch;
  const ctx = cv.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, rx, ry, rw, rh, 0, 0, cw, ch);
  const d = ctx.getImageData(0, 0, cw, ch).data;

  // Quantiza em caixas de 4 bits por canal e depois junta caixas parecidas
  const caixas = new Map();
  let total = 0;
  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] < 128) continue;
    const k = (d[i] >> 4) << 8 | (d[i + 1] >> 4) << 4 | (d[i + 2] >> 4);
    const c = caixas.get(k) || { r: 0, g: 0, b: 0, c: 0 };
    c.r += d[i]; c.g += d[i + 1]; c.b += d[i + 2]; c.c++;
    caixas.set(k, c);
    total++;
  }
  const lista = [...caixas.values()].map(c => ({ r: c.r / c.c, g: c.g / c.c, b: c.b / c.c, c: c.c })).sort((a, b) => b.c - a.c);
  const juntas = [];
  for (const c of lista) {
    const perto = juntas.find(j => Math.hypot(j.r - c.r, j.g - c.g, j.b - c.b) < 28);
    if (perto) {
      const t = perto.c + c.c;
      perto.r = (perto.r * perto.c + c.r * c.c) / t;
      perto.g = (perto.g * perto.c + c.g * c.c) / t;
      perto.b = (perto.b * perto.c + c.b * c.c) / t;
      perto.c = t;
    } else juntas.push({ ...c });
  }
  juntas.sort((a, b) => b.c - a.c);
  const paleta = juntas.slice(0, n).map(c => ({
    hex: hex(Math.round(c.r), Math.round(c.g), Math.round(c.b)),
    area: (c.c / total * 100).toFixed(1) + '%',
  }));
  return { tamanho: `${W}x${H}`, paleta, amostras };
}, { src: imagemParaDataUrl(arquivo), n, pontos, recorte });

await browser.close();
console.log(`Imagem: ${arquivo} (${resultado.tamanho})`);
console.log('\nPaleta (por área):');
for (const c of resultado.paleta) console.log(`  ${c.hex}  ${c.area}`);
if (resultado.amostras.length) {
  console.log('\nAmostras:');
  for (const a of resultado.amostras) console.log(`  ${a.ponto} (${a.px}px)  ${a.hex}`);
}
