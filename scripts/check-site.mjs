// Verificación estática del sitio (sin dependencias). Uso: node scripts/check-site.mjs
// Falla (exit 1) si encuentra enlaces/recursos locales rotos, anclas inexistentes, JSON-LD inválido
// o URLs del sitemap que no existen.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';

const root = resolve(process.argv[2] || '.');
const htmlFiles = readdirSync(root).filter(f => f.endsWith('.html'));
const errors = [];
const err = (file, msg) => errors.push(`${file}: ${msg}`);

const idsOf = (html) => new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
const pages = Object.fromEntries(htmlFiles.map(f => [f, readFileSync(join(root, f), 'utf8')]));

for (const [file, html] of Object.entries(pages)) {
  // Enlaces y recursos locales
  for (const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    let url = m[1];
    if (/^(https?:|mailto:|tel:|data:|\/\/|javascript:)/.test(url)) continue;
    if (url.includes('${')) continue;                       // plantillas de JS
    const [pathPart, hash] = url.split('#');
    const clean = pathPart.split('?')[0];
    if (clean === '' || clean === '/') { // ancla en la misma página o raíz
      if (hash && clean === '' && !idsOf(html).has(hash)) err(file, `ancla #${hash} no existe`);
      continue;
    }
    const target = resolve(root, clean.replace(/^\//, ''));
    if (!existsSync(target)) { err(file, `no existe ${url}`); continue; }
    if (hash && clean.endsWith('.html') && !idsOf(readFileSync(target, 'utf8')).has(hash)) err(file, `ancla #${hash} no existe en ${clean}`);
  }
  // JSON-LD
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { err(file, 'JSON-LD inválido: ' + e.message); }
  }
  // Canonical presente en páginas indexables
  if (!/noindex/.test(html) && file !== '404.html' && !/rel="canonical"/.test(html)) err(file, 'falta <link rel="canonical">');
  if (!/<title>[^<]{3,}<\/title>/.test(html)) err(file, 'falta <title>');
}

// Scripts/estilos referenciados desde JS (recursos que se cargan dinámicamente)
for (const f of readdirSync(root).filter(f => f.endsWith('.js'))) {
  const js = readFileSync(join(root, f), 'utf8');
  for (const m of js.matchAll(/['"`]((?:img\/)[\w./-]+)['"`]/g)) if (!existsSync(join(root, m[1]))) err(f, `no existe ${m[1]}`);
}

// Sitemap
if (existsSync(join(root, 'sitemap.xml'))) {
  const sm = readFileSync(join(root, 'sitemap.xml'), 'utf8');
  for (const m of sm.matchAll(/<loc>https:\/\/aligndata\.cl\/?([^<]*)<\/loc>/g)) {
    const p = m[1] || 'index.html';
    if (!existsSync(join(root, p))) err('sitemap.xml', `la URL /${p} no existe`);
  }
}

if (errors.length) {
  console.error(`✗ ${errors.length} problema(s):\n` + errors.map(e => '  - ' + e).join('\n'));
  process.exit(1);
}
console.log(`✓ ${htmlFiles.length} páginas HTML revisadas: enlaces, anclas, JSON-LD y sitemap correctos.`);
