// Baut die Seite für Yabi’s Fliesenwelt (Duisburg-Rheinhausen).
//
//   node _quelle/bauen.mjs
//
// Erzeugte HTML-Dateien nie von Hand ändern: Inhalte in seiten.mjs und sortiment.mjs,
// Rahmen (Kopf, Menü, Fuß mit Anfahrt, Anrufleiste) hier. CSS und JS in assets/ bekommen ?v=<Prüfsumme>.

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { alleSeiten, MENUE } from "./seiten.mjs";
import { DOMAIN, BETRIEB, esc, logo, HOERER, ROUTE } from "./helfer.mjs";
import { karte, KARTE_NACHWEIS } from "./karte.mjs";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// 404.html wird unter beliebigen Adressen ausgeliefert, dort gehen keine relativen Pfade.
// Vorschau auf GitHub Pages: "/yabis-fliesenwelt/". Beim Livegang: "/".
const BASIS_404 = "/yabis-fliesenwelt/";
// Vorschau bleibt aus Suchmaschinen draußen. Beim Livegang: "index, follow".
const ROBOTS = "noindex, nofollow";

/* ---------- Bilder: Breiten und Maße aus bilder/ lesen ---------- */
const BILDER = {};
for (const datei of fs.readdirSync(path.join(REPO, "bilder"))) {
  const m = datei.match(/^(.+)-(\d+)\.webp$/);
  if (m) (BILDER[m[1]] ||= []).push(+m[2]);
}
for (const k in BILDER) BILDER[k].sort((a, b) => a - b);

function webpMasse(datei) {
  const b = fs.readFileSync(datei);
  const typ = b.toString("ascii", 12, 16);
  if (typ === "VP8 ") return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
  if (typ === "VP8L") { const bits = b.readUInt32LE(21); return { w: (bits & 0x3fff) + 1, h: ((bits >> 14) & 0x3fff) + 1 }; }
  if (typ === "VP8X") return { w: 1 + b.readUIntLE(24, 3), h: 1 + b.readUIntLE(27, 3) };
  throw new Error("Unbekanntes WebP: " + datei);
}

/* ---------- Kontext je Seite: relative Pfade, Bilder ---------- */
function kontext(pfad) {
  const tiefe = pfad.endsWith(".html") ? 0 : pfad.split("/").filter(Boolean).length;
  const wurzel = "../".repeat(tiefe);
  const u = (ziel = "") => (wurzel + ziel) || "./";
  const bild = (name, o = {}) => {
    const breiten = BILDER[name];
    if (!breiten) throw new Error("Bild fehlt: " + name);
    const gross = breiten[breiten.length - 1];
    const m = webpMasse(path.join(REPO, "bilder", `${name}-${gross}.webp`));
    const sizes = o.sizes || "100vw";
    const set = (ext) => breiten.map((w) => `${u(`bilder/${name}-${w}.${ext}`)} ${w}w`).join(", ");
    const laden = o.prio ? ' fetchpriority="high"' : ' loading="lazy"';
    return `<picture><source type="image/avif" srcset="${set("avif")}" sizes="${sizes}"><img src="${u(`bilder/${name}-${gross}.webp`)}" srcset="${set("webp")}" sizes="${sizes}" width="${m.w}" height="${m.h}" alt="${esc(o.alt || "")}"${laden} decoding="async"></picture>`;
  };
  return { pfad, u, bild };
}

/* ---------- Kopf, Fuß, Anrufleiste ---------- */
function kopf(s, seite) {
  const { u } = s;
  const aktiv = (ziel) => seite.pfad === ziel ? ' aria-current="page"' : seite.pfad.startsWith(ziel) ? ' class="ist-drin"' : "";
  const punkte = MENUE.map(([ziel, name]) => `<li><a href="${u(ziel)}"${aktiv(ziel)}>${name}</a></li>`).join("");
  // Auf der Kontaktseite steht die Nummer groß im Inhalt, dort nicht zusätzlich oben.
  const telefon = seite.ohneKopfTelefon ? "" : `<a class="kopf__telefon" href="${BETRIEB.telefonLink}">${HOERER}${BETRIEB.telefon}</a>`;
  return `<header class="kopf">
  <a class="kopf__logo" href="${u()}" aria-label="${BETRIEB.name} – zur Startseite">${logo()}</a>
  <nav class="nav" aria-label="Hauptmenü"><ul>${punkte}</ul></nav>
  ${telefon}
  <button class="kopf__menue" type="button" aria-expanded="false" aria-controls="menue-mobil"><span class="nur-leser">Menü öffnen</span><i></i><i></i></button>
  <nav class="menue-mobil" id="menue-mobil" aria-label="Menü" hidden>
    <ul><li><a href="${u()}"${seite.pfad === "" ? ' aria-current="page"' : ""}>Startseite</a></li>${punkte}</ul>
  </nav>
</header>`;
}

const KARTE = karte();

function fuss(s, seite) {
  const { u } = s;
  const zeiten = BETRIEB.zeiten.map(([t, z]) => `<div><dt>${t}</dt><dd>${z}</dd></div>`).join("");
  // Auf der Kontaktseite stehen Telefon und E-Mail groß im Inhalt, im Fuß nicht noch einmal.
  const telefon = `<a href="${BETRIEB.telefonLink}">${BETRIEB.telefon}</a><br>`;
  return `<footer class="wegweiser" id="anfahrt">
  <div class="rahmen wegweiser__innen">
    <div class="wegweiser__daten">
      <h2 class="titel-klein">So finden Sie uns</h2>
      <address><strong>${BETRIEB.name}</strong><br>${BETRIEB.strasse}<br>${BETRIEB.plz} ${BETRIEB.ort}</address>
      <dl class="zeiten">${zeiten}</dl>
      ${seite.ohneFussTelefon ? "" : `<p class="wegweiser__kontakt">${telefon}<a href="mailto:${BETRIEB.mail}">${BETRIEB.mail}</a></p>`}
      <a class="knopf knopf--rand wegweiser__route" href="${BETRIEB.route}" rel="noopener">${ROUTE}Route planen</a>
    </div>
    <figure class="wegweiser__karte">
      ${KARTE}
      <figcaption>Rund zwei Kilometer südlich der A40. ${KARTE_NACHWEIS}</figcaption>
    </figure>
  </div>
  <div class="rahmen wegweiser__unten">
    <nav aria-label="Seiten"><ul>${MENUE.map(([ziel, name]) => `<li><a href="${u(ziel)}">${name}</a></li>`).join("")}</ul></nav>
    <ul class="wegweiser__recht">
      <li><a href="${BETRIEB.instagram}" rel="noopener">Instagram</a></li>
      <li><a href="${BETRIEB.tiktok}" rel="noopener">TikTok</a></li>
      <li><a href="${u("impressum/")}">Impressum</a></li>
      <li><a href="${u("datenschutz/")}">Datenschutz</a></li>
      <li>© 2026 ${BETRIEB.firma}</li>
    </ul>
  </div>
</footer>
${seite.ohneFussTelefon ? "" : `<nav class="ruf-leiste" aria-label="Schnellkontakt">
  <a class="ruf-leiste__anruf" href="${BETRIEB.telefonLink}">${HOERER}Anrufen</a>
  <a href="${BETRIEB.route}" rel="noopener">${ROUTE}Route</a>
</nav>`}`;
}

/* ---------- Seite zusammensetzen ---------- */
const pruefsumme = (datei) => crypto.createHash("sha1").update(fs.readFileSync(path.join(REPO, datei))).digest("hex").slice(0, 8);
const V_CSS = pruefsumme("assets/stil.css");
const V_JS = pruefsumme("assets/seite.js");

function html(s, seite) {
  const canonical = DOMAIN + (seite.datei ? "" : seite.pfad);
  const schema = (seite.schema || []).map((o) => `<script type="application/ld+json">\n${JSON.stringify(o, null, 2)}\n</script>`).join("\n");
  const basis = seite.datei === "404.html" ? `<base href="${BASIS_404}">\n` : "";
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${basis}<title>${esc(seite.titel)}</title>
<meta name="description" content="${esc(seite.beschreibung)}">
<meta name="robots" content="${seite.robots || ROBOTS}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:locale" content="de_DE">
<meta property="og:site_name" content="${BETRIEB.name}">
<meta property="og:title" content="${esc(seite.titel)}">
<meta property="og:description" content="${esc(seite.beschreibung)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${DOMAIN}bilder/teilen.jpg">
<meta name="theme-color" content="#f4f1ec">
<link rel="icon" href="${s.u("favicon.svg")}" type="image/svg+xml">
<link rel="icon" href="${s.u("bilder/signet-32.png")}" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="${s.u("bilder/signet-180.png")}">
<link rel="preload" href="${s.u("schrift/familjen-grotesk-wght.woff2")}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${s.u("assets/stil.css")}?v=${V_CSS}">
<script src="${s.u("assets/seite.js")}?v=${V_JS}" defer></script>
${schema}
</head>
<body class="${[seite.klasse, seite.ohneFussTelefon && "ohne-leiste"].filter(Boolean).join(" ")}">
<a class="springen" href="#inhalt">Zum Inhalt springen</a>
${kopf(s, seite)}
<main id="inhalt">
${seite.inhalt}
</main>
${fuss(s, seite)}
</body>
</html>
`;
}

/* ---------- Bauen ---------- */
const seiten = alleSeiten(kontext);
const karteXml = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];
for (const seite of seiten) {
  const s = kontext(seite.pfad);
  const datei = seite.datei || path.join(seite.pfad, "index.html");
  const ziel = path.join(REPO, datei);
  const fertig = html(s, seite);
  fs.mkdirSync(path.dirname(ziel), { recursive: true });
  fs.writeFileSync(ziel, fertig);
  if (!seite.datei && !(seite.robots || "").startsWith("noindex")) karteXml.push(`  <url><loc>${DOMAIN}${seite.pfad}</loc></url>`);
  // Prüfungen: genau eine h1, Titel ≤ 60, Beschreibung ≤ 155, Telefon-Links zählen (Regel „keine Doppelungen“)
  const h1 = (fertig.match(/<h1[\s>]/g) || []).length;
  const tel = (fertig.match(/href="tel:/g) || []).length;
  const warn = [h1 !== 1 && `h1: ${h1}`, seite.titel.length > 60 && `Titel ${seite.titel.length}`, seite.beschreibung.length > 155 && `Beschreibung ${seite.beschreibung.length}`].filter(Boolean);
  console.log(datei.padEnd(40), `Tel ${tel}`, `${(Buffer.byteLength(fertig) / 1024).toFixed(0)} KB`, warn.length ? "!! " + warn.join(", ") : "");
}
karteXml.push("</urlset>");
fs.writeFileSync(path.join(REPO, "sitemap.xml"), karteXml.join("\n") + "\n");
console.log(`${seiten.length} Seiten gebaut, CSS ${V_CSS}, JS ${V_JS}`);
