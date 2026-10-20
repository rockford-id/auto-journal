// Konversi artboard canvas (.dc.html) menjadi halaman HTML mandiri di docs/mockup/.
// Pemakaian: node docs/mockup/_src/build.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, '..');

// Nama artboard -> nama file HTML mandiri
const PAGES = {
    Main: 'index.html',
    Simulasi: 'simulasi.html',
    Detail: 'detail.html',
    Pajak: 'pajak.html',
    Tagihan: 'tagihan.html',
    Parameter: 'parameter.html',
};

// Nilai awal untuk hole teks yang tersisa (diperbarui mockup.js saat filter diklik)
const DEFAULTS = { shown: '8', total: '456.880.000' };

const ASSET_URLS = {
    '/_blob/d4be07ed8fbcf787a3e693a936195e05': 'assets/portal-ui.css',
    '/_blob/b744179f0804797cd156de08bb6aae89': 'assets/summarecon.png',
};

function convert(src, name) {
    let html = src
        .replace('<script src="./support.js"></script>\n', '')
        .replace(/<\/?x-dc>\n?/g, '')
        .replace(/<\/?helmet>\n?/g, '')
        .replace(/<script type="text\/x-dc"[\s\S]*?<\/script>\n?/, '')
        .replace('</body>', '<script src="assets/mockup.js"></script>\n</body>')
        .replace('class="{{wrapperClass}}"', 'class="wrapper"')
        .replace(/class="\{\{tab\w+\}\}"/g, 'class="ds-tabs-link"')
        .replace(/class="\{\{step\w+\}\}"/g, 'class="ds-step"')
        .replace(/ hidden="\{\{[^}]*\}\}"/g, '')
        .replace(/ onClick="\{\{[^}]*\}\}"/g, '')
        // sc-if tanpa data-panel = pesan sementara (retry, jurnal balik): tidak ditampilkan
        .replace(/<sc-if (?![^>]*data-panel)[^>]*>[\s\S]*?<\/sc-if>\n?/g, '')
        .replace(/<sc-if [^>]*?data-panel="([^"]+)">/g, '<div data-panel="$1">')
        .replace(/<\/sc-if>/g, '</div>')
        .replace(/href="(\w+)\.dc\.html"/g, (m, page) => `href="${PAGES[page] ?? page + '.html'}"`);

    for (const [blob, local] of Object.entries(ASSET_URLS)) {
        html = html.split(blob).join(local);
    }
    html = html.replace(/\{\{\s*(\w+)\s*\}\}/g, (m, key) => {
        if (!(key in DEFAULTS)) throw new Error(`${name}: hole {{${key}}} tanpa nilai default`);
        return DEFAULTS[key];
    });

    const leftover = html.match(/\{\{|sc-if|\/_blob\/|\.dc\.html/);
    if (leftover) throw new Error(`${name}: sisa sintaks canvas "${leftover[0]}"`);

    return html.replace('<meta charset="utf-8">', '<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">');
}

for (const [board, file] of Object.entries(PAGES)) {
    const src = readFileSync(join(here, 'canvas', `${board}.dc.html`), 'utf8');
    writeFileSync(join(outDir, file), convert(src, board));
    console.log(`${board}.dc.html -> ${file}`);
}
