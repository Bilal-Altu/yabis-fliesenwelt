// Anfahrtskarte als eigene Zeichnung: Rhein, Autobahnen, Hauptstraßen, Bergheimer Straße, Laden.
// Daten: karte-daten.json (erzeugt mit Desktop/Yabis/werkzeug/karte-daten.mjs aus OpenStreetMap).
// Einheit im SVG: 1 km = 40. Mitte = Bergheimer Straße 115. Nichts wird nachgeladen.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { esc, Y_STUECKE } from "./helfer.mjs";

const D = JSON.parse(fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), "karte-daten.json"), "utf8"));
const S = 40;
const f = (n) => Math.round(n * S * 10) / 10;
const d = (linien) => linien.map((l) => "M" + l.map(([x, y]) => `${f(x)} ${f(y)}`).join("L")).join("");

// Beschriftete Orte: [Name in den Daten, Anzeige, Rang, Versatz x/y in Einheiten, Anker]
const ORTE = [
  ["Moers", "Moers", 1, 0, -10, "middle"],
  ["Altstadt", "Duisburg-Mitte", 1, 8, 4, "start"],
  ["Homberg", "Homberg", 2, 0, -9, "middle"],
  ["Rheinhausen-Mitte", "Rheinhausen", 2, 8, 4, "start"],
  ["Hochemmerich", "Hochemmerich", 3, 7, 4, "start"],
  ["Asterlagen", "Asterlagen", 3, -7, 4, "end"],
  ["Trompet", "Trompet", 3, -7, 4, "end"],
  ["Rumeln-Kaldenhausen", "Rumeln-Kaldenhausen", 3, 0, 14, "middle"],
  ["Friemersheim", "Friemersheim", 3, 7, 4, "start"],
  ["Hochfeld", "Hochfeld", 3, 7, 4, "start"],
  ["Essenberg", "Essenberg", 3, 7, -4, "start"],
];

// Autobahn-Schilder: [ref, x, y] in km
const SCHILDER = [["A40", -5.6, -2.05], ["A57", -5.15, 1.4], ["A59", 5.6, 2.6]];
// Ausfahrten in der Nähe (je Richtung zwei Knoten in den Daten, einer genügt)
const AUSFAHRTEN = [["Duisburg-Homberg", "11", 0, 18], ["Duisburg-Rheinhausen", "10", 0, -12]];

export function karte() {
  const b = D.box;
  const vb = `${f(b.x0)} ${f(b.y0)} ${f(b.x1 - b.x0)} ${f(b.y1 - b.y0)}`;
  const orte = ORTE.map(([daten, name, rang, dx, dy, anker]) => {
    const o = D.orte.find((x) => x.name === daten);
    if (!o) throw new Error("Ort fehlt in karte-daten.json: " + daten);
    const [x, y] = [f(o.xy[0]), f(o.xy[1])];
    return `<g class="k-ort k-ort--${rang}"><circle cx="${x}" cy="${y}" r="${rang === 1 ? 2.6 : 1.8}"/><text x="${x + dx}" y="${y + dy}" text-anchor="${anker}">${esc(name)}</text></g>`;
  }).join("");
  const schilder = SCHILDER.map(([ref, x, y]) =>
    `<g class="k-schild" transform="translate(${f(x)} ${f(y)})"><rect x="-13" y="-7.5" width="26" height="15" rx="3"/><text y="4" text-anchor="middle">${ref}</text></g>`).join("");
  const ausfahrten = AUSFAHRTEN.map(([name, nr, dx, dy]) => {
    const a = D.ausfahrten.find((x) => x.name === name);
    const [x, y] = [f(a.xy[0]), f(a.xy[1])];
    return `<g class="k-ausfahrt"><circle cx="${x}" cy="${y}" r="3.2"/><text x="${x + dx}" y="${y + dy}" text-anchor="middle">Ausfahrt ${nr} ${esc(name.replace("Duisburg-", ""))}</text></g>`;
  }).join("");

  return `<svg class="karte" viewBox="${vb}" role="img" aria-labelledby="karte-titel karte-text">
  <title id="karte-titel">Anfahrt zu Yabi’s Fliesenwelt</title>
  <desc id="karte-text">Der Laden liegt an der Bergheimer Straße in Duisburg-Rheinhausen, westlich des Rheins, rund zwei Kilometer südlich der A40 mit den Ausfahrten Duisburg-Homberg und Duisburg-Rheinhausen. Moers liegt im Nordwesten, die Duisburger Innenstadt auf der anderen Rheinseite.</desc>
  <rect class="k-grund" x="${f(b.x0)}" y="${f(b.y0)}" width="${f(b.x1 - b.x0)}" height="${f(b.y1 - b.y0)}"/>
  <path class="k-rhein" d="${d(D.rhein)}"/>
  <path class="k-bahn" d="${d(D.bahn)}"/>
  <path class="k-neben" d="${d(D.nebenstrassen)}"/>
  <path class="k-haupt" d="${d(D.hauptstrassen)}"/>
  <path class="k-autobahn-rand" d="${d(Object.values(D.autobahnen).flat())}"/>
  <path class="k-autobahn" d="${d(Object.values(D.autobahnen).flat())}"/>
  <path class="k-bergheimer" d="${d(D.bergheimer)}"/>
  <text class="k-rhein-name" transform="translate(${f(2.55)} ${f(1.6)}) rotate(-78)" text-anchor="middle">Rhein</text>
  ${orte}${ausfahrten}${schilder}
  <text class="k-strasse" transform="translate(${f(-1.05)} ${f(0.42)}) rotate(-36)" text-anchor="middle">Bergheimer Straße</text>
  <g class="k-laden"><circle r="15"/><g transform="translate(-9.5 -9.6) scale(.19)" stroke="#fbfaf8" stroke-width="3" stroke-linejoin="round">${Y_STUECKE}</g></g>
</svg>`;
}

export const KARTE_NACHWEIS = `Kartendaten © <a href="https://www.openstreetmap.org/copyright" rel="noopener">OpenStreetMap-Mitwirkende</a>`;
