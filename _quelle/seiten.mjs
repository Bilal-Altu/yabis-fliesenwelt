// Inhalte aller Seiten. Rahmen (Kopf, Fuß, Anrufleiste) steht in bauen.mjs.
import { BETRIEB, PFEIL, HOERER, SCHEMA_BETRIEB, faqSchema, esc } from "./helfer.mjs";
import { SORTIMENT } from "./sortiment.mjs";

/* ---------- Bausteine ---------- */

// Eine Fliese mit Foto. Mit href wird sie zum Link, das Schild nennt das Ziel.
function fotoFliese(s, { klasse, bild, alt, schild, href, sizes, prio }) {
  const innen = `${s.bild(bild, { alt, sizes, prio })}${schild ? `<span class="fliese__schild">${schild}${href ? PFEIL : ""}</span>` : ""}`;
  return href
    ? `<a class="fliese fliese--foto ${klasse}" href="${href}">${innen}</a>`
    : `<figure class="fliese fliese--foto ${klasse}">${innen}</figure>`;
}

// Kopf jeder Unterseite: Textfliese plus Foto- oder Farbfliesen im gleichen Fugenraster wie die Startseite.
function kopfwand({ ueber, h1, lead, rechts, klasse = "" }) {
  return `<section class="rahmen-breit kopfwand ${klasse}" aria-labelledby="seiten-titel">
  <div class="fliese fliese--weiss kopfwand__text">
    <p class="ueber">${ueber}</p>
    <h1 class="titel-gross" id="seiten-titel">${h1}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ""}
  </div>
  ${rechts}
</section>`;
}

const fragenListe = (fragen) => `<dl class="fragen">${fragen.map(([f, a]) => `<div><dt>${f}</dt><dd>${a}</dd></div>`).join("")}</dl>`;
const tippsListe = (tipps) => `<ol class="tipps">${tipps.map(([t, x]) => `<li><h3>${t}</h3><p>${x}</p></li>`).join("")}</ol>`;
const kennwerteListe = (zeilen) => `<dl class="kennwerte">${zeilen.map(([k, w]) => `<div><dt>${k}</dt><dd>${w}</dd></div>`).join("")}</dl>`;

/* ---------- Startseite ---------- */

const FRAGEN_START = [
  ["Muss ich einen Termin machen?", "Nein, kommen Sie einfach zu den Öffnungszeiten vorbei. Planen Sie ein ganzes Bad oder Haus, rufen Sie kurz vorher an. Dann ist am Tisch Zeit für Sie."],
  ["Was kostet ein Quadratmeter?", "Das hängt von Material, Format und Oberfläche ab, darum stehen die Preise direkt an den Mustern. Für Ihre Fläche rechnen wir Fliesen, Kleber, Fuge und Zubehör zusammen und geben Ihnen ein Angebot mit."],
  ["Verlegen Sie auch?", "Wir verkaufen. Für die Verlegung vermitteln wir Fliesenleger aus der Region. Sagen Sie bei der Beratung einfach, dass Sie das möchten."],
  ["Wie lange dauert es, bis ich die Fliesen habe?", "Was auf Lager ist, nehmen Sie gleich mit. Bei Bestellware nennen wir Ihnen den Liefertermin des Herstellers, bevor Sie bestellen. Ein Bad mit rund 25 Quadratmetern Fliesenfläche verlegt ein Fliesenleger meist in drei bis fünf Arbeitstagen, dazu kommen Trockenzeiten."],
  ["Wie viele Fliesen brauche ich?", "Die Fläche in Quadratmetern plus Verschnitt: bei gerader Verlegung etwa 7 Prozent, im Verband 10 Prozent, diagonal oder im Fischgrät 15 Prozent. Unser Mengenrechner gibt Ihnen einen ersten Wert."],
  ["Was soll ich zur Beratung mitbringen?", "Grundriss oder Maße der Räume, ein paar Fotos vom jetzigen Zustand und, wenn Sie haben, Muster von Möbelfront, Armatur oder Wandfarbe. Dann sehen wir am Tisch, was zusammenpasst."],
  ["Liefern Sie auch?", "Ja, auf Wunsch bringen wir die Ware zu Ihnen. Was das kostet, steht mit im Angebot."],
];

function startseite(k) {
  const s = k("");
  const { u } = s;
  const A = SORTIMENT;
  return {
    pfad: "",
    titel: "Fliesen in Duisburg-Rheinhausen | Yabi’s Fliesenwelt",
    beschreibung: "Fliesenhandel mit Ausstellung und Musterbädern in Duisburg-Rheinhausen: Feinsteinzeug, Naturstein, Mosaik, Terrassenplatten. Kommen Sie vorbei.",
    klasse: "seite-start",
    schema: [SCHEMA_BETRIEB, faqSchema(FRAGEN_START)],
    inhalt: `
<section class="rahmen-breit start-wand" aria-labelledby="start-titel">
  <div class="fliese fliese--weiss start-text">
    <h1 class="titel-start" id="start-titel"><span class="ueber">Fliesenhandel mit Ausstellung in Duisburg-Rheinhausen</span>Ihr neues Bad steht schon bei uns im Regal.</h1>
    <p class="lead">Feinsteinzeug, Naturstein, Mosaik und Terrassenplatten für Bad, Küche, Wohnraum und draußen. In Originalgröße zum Anfassen, mit fertigen Musterbädern und Beratung am Tisch.</p>
    <div class="knoepfe">
      <a class="knopf" href="${u("ausstellung/")}">Zur Ausstellung ${PFEIL}</a>
      <a class="knopf knopf--rand" href="${u("sortiment/")}">Sortiment</a>
    </div>
  </div>
  ${fotoFliese(s, { klasse: "s-fassade", bild: "fassade", prio: true, alt: "Eingang von Yabi’s Fliesenwelt mit Schaufenster und Musterplatten davor", schild: "Der Eingang", sizes: "(min-width: 768px) 34vw, 100vw" })}
  <a class="fliese fliese--anthrazit s-zeit" href="#anfahrt"><span class="zeit__status" data-offen>Öffnungszeiten</span><span class="zeit__unten"><span data-offen-heute>${BETRIEB.zeitenKurz}</span><span>Anfahrt ↓</span></span></a>
  ${fotoFliese(s, { klasse: "s-regal", bild: "regal", alt: "Plattenregal mit großformatigen Fliesen in Marmoroptik", schild: "Großformate", href: u("sortiment/feinsteinzeug/"), sizes: "(min-width: 768px) 17vw, 50vw" })}
  ${fotoFliese(s, { klasse: "s-lounge", bild: "lounge", alt: "Zwei Sessel vor einem Musterbad mit Fischgrät-Wand", schild: "Beratung am Tisch", href: u("service/"), sizes: "(min-width: 768px) 17vw, 50vw" })}
  <div class="fliese fliese--sand s-sand"></div>
  ${fotoFliese(s, { klasse: "s-bad", bild: "bad-marmor", alt: "Musterbad mit dunklen Marmorfliesen, Regendusche und weißem Waschtisch", schild: "Musterbad", href: u("ausstellung/"), sizes: "(min-width: 768px) 17vw, 50vw" })}
  ${fotoFliese(s, { klasse: "s-empfang", bild: "empfang", alt: "Empfangstheke mit Fliesenverkleidung und Logo an der Holzwand", sizes: "(min-width: 768px) 17vw, 50vw" })}
  ${fotoFliese(s, { klasse: "s-aussen", bild: "aussen", alt: "Musterplatten für Terrassen auf dem Rasen vor dem Schaufenster", schild: "Terrassenplatten draußen", href: u("sortiment/terrassenplatten/"), sizes: "(min-width: 768px) 34vw, 100vw" })}
  <div class="fliese fliese--taupe s-taupe"></div>
  <div class="fliese s-stein"></div>
  <a class="fliese fliese--weiss s-profis" href="${u("fuer-profis/")}"><span>Für Fliesenleger</span>${PFEIL}</a>
  <div class="fliese fliese--grau s-grau"></div>
</section>

<section class="rahmen abschnitt" aria-labelledby="sortiment-titel">
  <div class="kopfzeile">
    <h2 class="titel-mittel" id="sortiment-titel">Vom Mosaikstein bis zur Platte, die über einen Meter misst.</h2>
    <p>Für Wand, Boden und draußen. Was Sie im Laden sehen, gibt es meist auch in anderen Formaten und Farben, und das passende Zubehör liegt gleich daneben.</p>
  </div>
  <div class="wand sortiment-wand">
    ${fotoFliese(s, { klasse: "w-fein", bild: A[0].bild, alt: A[0].bildAlt, schild: `<b>${A[0].name}</b> ${A[0].kurz}`, href: u(`sortiment/${A[0].slug}/`), sizes: "(min-width: 768px) 32vw, 100vw" })}
    <a class="fliese fliese--travertin w-natur" href="${u(`sortiment/${A[1].slug}/`)}"><b>${A[1].name}</b><span>${A[1].kurz}</span>${PFEIL}</a>
    ${fotoFliese(s, { klasse: "w-mosaik", bild: A[2].bild, alt: A[2].bildAlt, schild: `<b>${A[2].name}</b>`, href: u(`sortiment/${A[2].slug}/`), sizes: "(min-width: 768px) 300px, 50vw" })}
    ${fotoFliese(s, { klasse: "w-terrasse", bild: A[3].bild, alt: A[3].bildAlt, schild: `<b>${A[3].name}</b> ${A[3].kurz}`, href: u(`sortiment/${A[3].slug}/`), sizes: "(min-width: 768px) 740px, 100vw" })}
    <div class="fliese fliese--sand w-deko"></div>
    <a class="fliese w-zubehoer" href="${u(`sortiment/${A[4].slug}/`)}"><b>${A[4].name}</b><span>${A[4].kurz}</span>${PFEIL}</a>
  </div>
</section>

<section class="rahmen abschnitt ausstellung-band" aria-labelledby="ausstellung-titel">
  <div class="ausstellung-band__text">
    <h2 class="titel-mittel" id="ausstellung-titel">Musterbäder statt Prospekt.</h2>
    <p>Auf einem Foto sieht jede Fliese gut aus. In unserer Ausstellung sehen Sie, wie sie wirklich wirkt: großformatig an der Wand, mit Armatur und Licht, neben Holz, Glas und schwarzem Rahmen. Die Platten stehen in Originalgröße im Regal, die Terrassenplatten liegen draußen auf dem Rasen.</p>
    <a class="textlink" href="${u("ausstellung/")}">Rundgang durch die Ausstellung ${PFEIL}</a>
  </div>
  <div class="wand ausstellung-band__bild">
    ${fotoFliese(s, { klasse: "", bild: "rundgang-1", alt: "Rundum-Aufnahme der Ausstellung: Musterdusche im Fischgrätmuster, Schaufenster, Regale mit Holzoptik-Fliesen", sizes: "(min-width: 1100px) 760px, 170vw" })}
  </div>
</section>

<section class="rahmen abschnitt zweispaltig" aria-labelledby="ablauf-titel">
  <div><h2 class="titel-mittel" id="ablauf-titel">Von der Auswahl bis zur verlegten Fliese.</h2></div>
  <ol class="ablauf">
    <li><h3>Vorbeikommen</h3><p>Ohne Termin, montags bis samstags.</p></li>
    <li><h3>Aussuchen</h3><p>An den Regalen, in den Musterbädern und draußen auf der Fläche. Am Tisch legen wir Fliese, Fuge und Profil nebeneinander, bis es passt.</p></li>
    <li><h3>Rechnen</h3><p>Menge mit Verschnitt, Kleber, Fugenmörtel, Abdichtung. Sie bekommen ein Angebot, das vollständig ist.</p></li>
    <li><h3>Mitnehmen oder liefern lassen</h3><p>Lagerware gleich, Bestellware zum genannten Termin.</p></li>
    <li><h3>Verlegen lassen</h3><p>Wenn Sie keinen Fliesenleger haben, vermitteln wir einen aus der Region. <a class="textlink" href="${u("service/")}">Mehr zum Service ${PFEIL}</a></p></li>
  </ol>
</section>

<section class="rahmen-breit profis-band" aria-labelledby="profis-titel">
  <div class="fliese fliese--anthrazit">
    <h2 class="titel-mittel" id="profis-titel">Sie verlegen Fliesen?</h2>
    <p>Material aus einer Charge, Objektmengen auf Bestellung, und Ihre Bauherren suchen bei uns in Ruhe aus. Fliesenleger mit freien Kapazitäten bringen wir mit Kunden zusammen.</p>
    <a class="knopf knopf--hell" href="${u("fuer-profis/")}">Für Profis ${PFEIL}</a>
  </div>
</section>

<section class="rahmen abschnitt zweispaltig" aria-labelledby="fragen-titel">
  <div><h2 class="titel-mittel" id="fragen-titel">Was am Tresen am häufigsten gefragt wird.</h2></div>
  ${fragenListe(FRAGEN_START.map(([f, a]) => [f, a.replace("Unser Mengenrechner", `Unser <a href="${u("service/")}#rechner">Mengenrechner</a>`)]))}
</section>`,
  };
}

/* ---------- Sortiment: Übersicht ---------- */

const RAEUME = [
  ["Bad, Wand", ["ja", "ja", "ja", "–", "Kleber, Abdichtung"]],
  ["Dusche, Boden", ["matt, R10 B", "rutschhemmend", "ja", "–", "Abdichtung, Gefälle"]],
  ["Küche", ["ja", "Granit, Schiefer", "Rückwand", "–", "Kleber, Fuge"]],
  ["Wohnraum", ["ja, auch Großformat", "ja", "Akzente", "–", "Nivelliersystem"]],
  ["Terrasse, Balkon", ["2 cm, R11", "Granit, Quarzit", "–", "ja", "Stelzlager, Splitt"]],
];

function sortimentUebersicht(k) {
  const s = k("sortiment/");
  const { u } = s;
  const A = SORTIMENT;
  return {
    pfad: "sortiment/",
    titel: "Sortiment: Fliesen, Naturstein, Mosaik | Yabi’s Fliesenwelt",
    beschreibung: "Feinsteinzeug, Naturstein, Mosaik, Terrassenplatten und Verlegezubehör: was wofür passt. Alles in unserer Ausstellung in Duisburg-Rheinhausen.",
    inhalt: `
${kopfwand({
  ueber: "Sortiment",
  h1: "Fünf Bereiche, ein Laden.",
  lead: "Für jeden Raum und jeden Untergrund. Hier steht, was welches Material kann, im Laden sehen Sie, wie es aussieht.",
  rechts: `${fotoFliese(s, { klasse: "kw-a", bild: "regal", alt: "Plattenregal mit großformatigen Fliesen in Marmoroptik", prio: true, sizes: "(min-width: 768px) 20vw, 50vw" })}
  ${fotoFliese(s, { klasse: "kw-b", bild: "holzoptik", alt: "Feinsteinzeug in Holzoptik vor dem Empfang", sizes: "(min-width: 768px) 20vw, 50vw" })}
  <div class="fliese fliese--sand kw-c"></div>`,
})}

<section class="rahmen abschnitt" aria-label="Bereiche">
  <ul class="bereiche">${A.map((a) => `
    <li>
      <a class="bereiche__name" href="${u(`sortiment/${a.slug}/`)}">${a.name} ${PFEIL}</a>
      <p>${a.kurz}</p>
    </li>`).join("")}
  </ul>
</section>

<section class="rahmen abschnitt zweispaltig" aria-labelledby="raum-titel">
  <div>
    <h2 class="titel-mittel" id="raum-titel">Was passt in welchen Raum?</h2>
    <p>Eine erste Orientierung. Am Ende entscheiden Untergrund, Nutzung und Geschmack, das klären wir am Tisch.</p>
  </div>
  <div class="tabelle-rahmen">
    <table class="tabelle">
      <thead><tr><th scope="col">Raum</th>${A.map((a) => `<th scope="col">${a.name}</th>`).join("")}</tr></thead>
      <tbody>${RAEUME.map(([raum, werte]) => `<tr><th scope="row">${raum}</th>${werte.map((w) => `<td>${w}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>
  </div>
</section>`,
  };
}

/* ---------- Sortiment: je Bereich ---------- */

function bereichSeite(k, a, i) {
  const s = k(`sortiment/${a.slug}/`);
  const { u } = s;
  const andere = SORTIMENT.filter((x) => x !== a);

  // Rechte Seite des Kopfes: Foto oder, ohne eigenes Foto, ein Musterfeld aus Farbfliesen
  let rechts;
  if (a.bild) {
    rechts = `${fotoFliese(s, { klasse: "kw-gross", bild: a.bild, alt: a.bildAlt, prio: true, schild: a.bildText, sizes: "(min-width: 768px) 680px, 100vw" })}
  <div class="fliese fliese--sand kw-d"></div>`;
  } else if (a.gesteine) {
    rechts = `<div class="musterfeld">${a.gesteine.map(([n]) => `<div class="fliese stein--${n.toLowerCase()}"><span>${n}</span></div>`).join("")}</div>`;
  } else {
    rechts = `<div class="musterfeld musterfeld--zubehoer">${a.gruppen.slice(0, 5).map(([n], j) => `<div class="fliese ton-${j}"><span>${n}</span></div>`).join("")}</div>`;
  }

  const teile = [];
  if (a.galerie) teile.push(`<section class="rahmen abschnitt-klein"><div class="wand galerie galerie--${a.galerie.length}">${a.galerie.map(([b, alt]) => fotoFliese(s, { klasse: "", bild: b, alt, schild: alt, sizes: a.galerie.length === 1 ? "(min-width: 768px) 900px, 100vw" : "(min-width: 768px) 560px, 100vw" })).join("")}</div></section>`);
  if (a.kennwerte) teile.push(`<section class="rahmen abschnitt zweispaltig" aria-labelledby="werte-titel"><div><h2 class="titel-mittel" id="werte-titel">Das kann ${a.name}.</h2></div>${kennwerteListe(a.kennwerte)}</section>`);
  if (a.gesteine) teile.push(`<section class="rahmen abschnitt zweispaltig" aria-labelledby="gestein-titel"><div><h2 class="titel-mittel" id="gestein-titel">Welcher Stein wofür?</h2><p>Welche Sorten gerade im Laden stehen, sehen Sie in der Ausstellung.</p></div>
  <div class="tabelle-rahmen"><table class="tabelle"><thead><tr><th scope="col">Gestein</th><th scope="col">Eigenschaft</th><th scope="col">Gut für</th></tr></thead><tbody>${a.gesteine.map(([n, e, g]) => `<tr><th scope="row">${n}</th><td>${e}</td><td>${g}</td></tr>`).join("")}</tbody></table></div></section>`);
  if (a.einsatz) teile.push(`<section class="rahmen abschnitt zweispaltig" aria-labelledby="einsatz-titel"><div><h2 class="titel-mittel" id="einsatz-titel">Wo Mosaik seine Stärken hat.</h2></div>${kennwerteListe(a.einsatz)}</section>`);
  if (a.material) teile.push(`<section class="rahmen abschnitt-klein zweispaltig" aria-labelledby="material-titel"><div><h2 class="titel-klein" id="material-titel">Material</h2></div>${kennwerteListe(a.material)}</section>`);
  if (a.verlegung) teile.push(`<section class="rahmen abschnitt zweispaltig" aria-labelledby="verlegung-titel"><div><h2 class="titel-mittel" id="verlegung-titel">Drei Arten, sie zu verlegen.</h2></div>
  <div class="tabelle-rahmen"><table class="tabelle"><thead><tr><th scope="col">Verlegung</th><th scope="col">Eigenschaft</th><th scope="col">Gut für</th></tr></thead><tbody>${a.verlegung.map(([n, e, g]) => `<tr><th scope="row">${n}</th><td>${e}</td><td>${g}</td></tr>`).join("")}</tbody></table></div></section>`);
  if (a.gruppen) teile.push(`<section class="rahmen abschnitt zweispaltig" aria-labelledby="gruppen-titel"><div><h2 class="titel-mittel" id="gruppen-titel">Was es gibt.</h2><p><a class="textlink" href="${u("service/")}#rechner">Mengen ausrechnen ${PFEIL}</a></p></div>${kennwerteListe(a.gruppen)}</section>`);
  teile.push(`<section class="rahmen abschnitt zweispaltig" aria-labelledby="tipps-titel"><div><h2 class="titel-mittel" id="tipps-titel">Worauf Sie achten sollten.</h2></div>${tippsListe(a.tipps)}</section>`);
  teile.push(`<section class="rahmen abschnitt-klein zweispaltig" aria-labelledby="fragen-titel"><div><h2 class="titel-klein" id="fragen-titel">Häufige Fragen</h2></div>${fragenListe(a.fragen)}</section>`);

  return {
    pfad: `sortiment/${a.slug}/`,
    titel: a.titel,
    beschreibung: a.beschreibung,
    schema: [faqSchema(a.fragen)],
    inhalt: `
${kopfwand({ ueber: `<a href="${u("sortiment/")}">Sortiment</a> · ${a.name}`, h1: a.h1, lead: a.lead, rechts })}
${teile.join("\n")}
<section class="rahmen abschnitt weiter" aria-labelledby="weiter-titel">
  <h2 class="titel-klein" id="weiter-titel">Weiter im Sortiment</h2>
  <ul>${andere.map((x) => `<li><a href="${u(`sortiment/${x.slug}/`)}">${x.name} ${PFEIL}</a></li>`).join("")}</ul>
</section>`,
  };
}

/* ---------- Ausstellung ---------- */

function ausstellung(k) {
  const s = k("ausstellung/");
  const { u } = s;
  return {
    pfad: "ausstellung/",
    titel: "Fliesenausstellung in Duisburg-Rheinhausen | Yabi’s",
    beschreibung: "Musterbäder, Großformate in Originalgröße und Terrassenplatten zum Drüberlaufen: unsere Fliesenausstellung an der Bergheimer Straße in Duisburg.",
    inhalt: `
${kopfwand({
  ueber: "Ausstellung",
  h1: "Fliesen in Originalgröße, Bäder in echt.",
  lead: "Ein großer heller Raum hinter Schaufenstern, davor eine Rasenfläche mit Platten für draußen. Kommen Sie ohne Termin vorbei und nehmen Sie sich Zeit.",
  rechts: `${fotoFliese(s, { klasse: "kw-a", bild: "fassade", alt: "Eingang von Yabi’s Fliesenwelt mit Schaufenster und Musterplatten davor", prio: true, sizes: "(min-width: 768px) 680px, 100vw" })}
  <div class="fliese fliese--anthrazit kw-b kw-zeit"><span data-offen>Öffnungszeiten</span></div>
  <div class="fliese fliese--sand kw-c"></div>`,
})}

<section class="rahmen abschnitt" aria-labelledby="rundgang-titel">
  <div class="kopfzeile">
    <h2 class="titel-mittel" id="rundgang-titel">Ein Rundgang in zwei Bildern.</h2>
    <p>Rundum-Aufnahmen aus dem Laden: Musterbäder, Sitzecke und der Blick über die Ausstellungsfläche bis zum Schaufenster.</p>
  </div>
  <div class="wand rundgang">
    ${fotoFliese(s, { klasse: "", bild: "rundgang-1", alt: "Rundum-Aufnahme: Musterdusche mit Fischgrät-Wand, Blick durchs Schaufenster, Regale mit Holzoptik-Fliesen", sizes: "(min-width: 1100px) 1100px, 160vw" })}
    ${fotoFliese(s, { klasse: "", bild: "rundgang-2", alt: "Rundum-Aufnahme: Musterbad in Betonoptik, Sitzecke, Gang mit Großformaten", sizes: "(min-width: 1100px) 1100px, 160vw" })}
  </div>
</section>

<section class="rahmen abschnitt zweispaltig" aria-labelledby="baeder-titel">
  <div>
    <h2 class="titel-mittel" id="baeder-titel">Die Musterbäder</h2>
    <p>Fertig gefliest, mit Armaturen, Glas und Licht. So sehen Sie, wie ein Großformat an der Wand wirkt, wie viel Fuge ein Fischgrät hat und wie dunkel ein dunkler Stein in einem kleinen Raum wird.</p>
  </div>
  <div class="wand baeder">
    ${fotoFliese(s, { klasse: "", bild: "bad-marmor", alt: "Musterbad mit dunklen Marmorfliesen und weißem Waschtisch", schild: "Dunkler Marmor, großformatig", sizes: "(min-width: 768px) 22vw, 100vw" })}
    ${fotoFliese(s, { klasse: "", bild: "fischgraet", alt: "Musterdusche mit Fischgrät-Wand und Messing-Armatur", schild: "Fischgrät mit Messing", sizes: "(min-width: 768px) 22vw, 100vw" })}
    ${fotoFliese(s, { klasse: "", bild: "bad-beton", alt: "Musterbad in Betonoptik mit Waschtisch und schwarzer Duschwand", schild: "Betonoptik mit Schwarz", sizes: "(min-width: 768px) 22vw, 100vw" })}
  </div>
</section>

<section class="rahmen abschnitt zweispaltig" aria-labelledby="regal-titel">
  <div>
    <h2 class="titel-mittel" id="regal-titel">Großformate im Regal</h2>
    <p>Große Platten lassen sich auf einem Muster von 30 Zentimetern kaum beurteilen. Darum stehen sie bei uns in voller Größe, Platte an Platte, zum Durchblättern.</p>
    <p><a class="textlink" href="${u("sortiment/feinsteinzeug/")}">Feinsteinzeug ${PFEIL}</a></p>
  </div>
  <div class="wand paar">
    ${fotoFliese(s, { klasse: "", bild: "regal", alt: "Plattenregal mit Großformaten in Marmoroptik", sizes: "(min-width: 768px) 820px, 100vw" })}
    ${fotoFliese(s, { klasse: "", bild: "grossformate", alt: "Gang mit großformatigen Platten in Marmor- und Steinoptik", sizes: "(min-width: 768px) 820px, 100vw" })}
  </div>
</section>

<section class="rahmen abschnitt zweispaltig" aria-labelledby="draussen-titel">
  <div>
    <h2 class="titel-mittel" id="draussen-titel">Draußen vor der Tür</h2>
    <p>Auf dem Rasen vor dem Schaufenster stehen und liegen die Platten für Terrasse und Balkon, eine davon auf Stelzlagern. Treten Sie ruhig drauf, auch bei Regen.</p>
    <p><a class="textlink" href="${u("sortiment/terrassenplatten/")}">Terrassenplatten ${PFEIL}</a></p>
  </div>
  <div class="wand paar">
    ${fotoFliese(s, { klasse: "", bild: "aussen", alt: "Musterplatten auf dem Rasen vor dem Schaufenster", sizes: "(min-width: 768px) 820px, 100vw" })}
    ${fotoFliese(s, { klasse: "", bild: "stelzlager", alt: "Terrassenplatte auf Stelzlagern vor dem Schaufenster", sizes: "(min-width: 768px) 820px, 100vw" })}
  </div>
</section>

<section class="rahmen abschnitt zweispaltig" aria-labelledby="tisch-titel">
  <div>
    <h2 class="titel-mittel" id="tisch-titel">Am Tisch wird es konkret.</h2>
    <p>Bringen Sie mit, was Sie haben. Je mehr wir über den Raum wissen, desto genauer wird die Beratung und das Angebot.</p>
  </div>
  <ul class="liste">
    <li>Grundriss oder Maße der Räume, gern als Handyfoto einer Skizze</li>
    <li>Fotos vom jetzigen Zustand, auch vom Boden und vom Untergrund</li>
    <li>Muster von Möbelfront, Armatur oder Wandfarbe, wenn schon ausgesucht</li>
    <li>Ob Fußbodenheizung liegt oder geplant ist</li>
  </ul>
</section>`,
  };
}

/* ---------- Service ---------- */

function service(k) {
  const s = k("service/");
  const { u } = s;
  const formate = [
    ["mosaik", "Mosaik 2,5 × 2,5"], ["30x60", "30 × 60"], ["60x60", "60 × 60", true], ["60x120", "60 × 120"], ["120x120", "120 × 120"], ["20x120", "20 × 120 (Holzoptik)"],
  ];
  return {
    pfad: "service/",
    titel: "Beratung, Mengenrechner, Verlegung | Yabi’s Fliesenwelt",
    beschreibung: "Beratung am Tisch, Mengen mit Verschnitt, Kleber und Fuge berechnen, Lieferung und Vermittlung von Fliesenlegern. Yabi’s Fliesenwelt, Duisburg.",
    inhalt: `
${kopfwand({
  ueber: "Service",
  h1: "Von der Auswahl bis zur Verlegung.",
  lead: "So steht es bei uns über dem Schaufenster, und so ist es gemeint: Wir beraten, rechnen, liefern und vermitteln Ihnen auf Wunsch den Fliesenleger.",
  rechts: `${fotoFliese(s, { klasse: "kw-gross", bild: "lounge", alt: "Zwei Sessel vor einem Musterbad", prio: true, sizes: "(min-width: 768px) 680px, 100vw" })}
  <div class="fliese fliese--taupe kw-d"></div>`,
})}

<section class="rahmen abschnitt zweispaltig" aria-labelledby="beratung-titel">
  <div><h2 class="titel-mittel" id="beratung-titel">Beratung</h2></div>
  <div class="fliesstext">
    <p>Wir legen Fliese, Fugenfarbe und Profil nebeneinander, bis es passt. Dabei fragen wir nach Untergrund, Heizung, Nutzung und Budget, denn davon hängt ab, welche Fliese und welcher Kleber in Frage kommen.</p>
    <p>Für ein ganzes Bad oder mehrere Räume lohnt sich ein kurzer Anruf vorher. Dann haben wir die Zeit, die so eine Planung braucht.</p>
  </div>
</section>

<section class="rahmen abschnitt rechner-abschnitt" id="rechner" aria-labelledby="rechner-titel">
  <div class="kopfzeile">
    <h2 class="titel-mittel" id="rechner-titel">Wie viel brauche ich?</h2>
    <p>Fläche eingeben, Format und Verlegung wählen. Das Ergebnis sind Richtwerte, die genaue Menge mit Paketgrößen rechnen wir mit Ihnen am Tisch.</p>
  </div>
  <form class="rechner wand" id="rechner-form" aria-label="Mengenrechner">
    <div class="fliese fliese--weiss rechner__eingabe">
      <label class="feld">Fläche in m²<input name="flaeche" type="number" inputmode="decimal" min="0.5" max="2000" step="0.1" value="12"></label>
      <label class="feld">Format in cm<select name="format">${formate.map(([w, t, an]) => `<option value="${w}"${an ? " selected" : ""}>${t}</option>`).join("")}</select></label>
      <fieldset class="feld">
        <legend>Verlegung</legend>
        <label class="wahl"><input type="radio" name="verlegung" value="0.07" checked><span>gerade, Fuge auf Fuge</span></label>
        <label class="wahl"><input type="radio" name="verlegung" value="0.10"><span>versetzt im Verband</span></label>
        <label class="wahl"><input type="radio" name="verlegung" value="0.15"><span>diagonal oder Fischgrät</span></label>
      </fieldset>
    </div>
    <div class="fliese rechner__ergebnis" aria-live="polite">
      <div><span>Fliesen bestellen</span><b data-r="fliesen">–</b></div>
      <div><span>Fliesenkleber</span><b data-r="kleber">–</b></div>
      <div><span>Fugenmörtel</span><b data-r="fuge">–</b></div>
      <p class="klein">Mit Verschnitt. Kleber und Fuge als Faustwert für Boden, Wandfliesen brauchen etwas weniger.</p>
    </div>
  </form>
</section>

<section class="rahmen abschnitt zweispaltig" aria-labelledby="liefern-titel">
  <div><h2 class="titel-mittel" id="liefern-titel">Mitnehmen oder liefern lassen</h2></div>
  <div class="fliesstext">
    <p>Was auf Lager ist, laden wir Ihnen ins Auto. Bei großen Mengen oder schweren Großformaten bringen wir die Ware auf Wunsch zu Ihnen, die Kosten dafür stehen im Angebot.</p>
    <p>Bestellware kommt vom Hersteller. Den Liefertermin nennen wir Ihnen, bevor Sie bestellen, nicht danach.</p>
  </div>
</section>

<section class="rahmen abschnitt zweispaltig" aria-labelledby="verlegen-titel">
  <div><h2 class="titel-mittel" id="verlegen-titel">Verlegen lassen</h2></div>
  <div class="fliesstext">
    <p>Wir verlegen nicht selbst, aber wir kennen Fliesenleger aus der Region, die mit unseren Platten arbeiten. Sagen Sie uns, was gemacht werden soll und bis wann, wir stellen den Kontakt her. Angebot und Auftrag laufen dann direkt zwischen Ihnen und dem Betrieb.</p>
    <p><a class="textlink" href="${u("kontakt/?anliegen=verlegung")}">Fliesenleger anfragen ${PFEIL}</a></p>
  </div>
</section>`,
  };
}

/* ---------- Für Profis ---------- */

function profis(k) {
  const s = k("fuer-profis/");
  const { u } = s;
  const punkte = [
    ["Material aus einer Charge", "Bei größeren Flächen achten wir darauf, dass alle Platten aus derselben Produktion kommen: gleicher Farbton, gleiches Kaliber. Nachlieferungen sprechen wir vorher ab."],
    ["Objektmengen auf Bestellung", "Was nicht auf Lager ist, bestellen wir beim Hersteller. Den Liefertermin erfahren Sie vorher, nicht hinterher."],
    ["Ihre Bauherren suchen bei uns aus", "Schicken Sie Ihre Kunden in die Ausstellung. Sie suchen in Ruhe aus, Sie bekommen die Liste mit Artikeln und Mengen und müssen keinen halben Tag im Laden stehen."],
    ["Verlegepartner werden", "Privatkunden fragen bei uns jeden Tag nach einem Fliesenleger. Wenn Sie Kapazität haben, melden Sie sich: Wir geben Ihre Nummer weiter, den Auftrag machen Sie direkt mit dem Kunden."],
  ];
  return {
    pfad: "fuer-profis/",
    titel: "Fliesen für Fliesenleger und Bauunternehmen | Yabi’s",
    beschreibung: "Für Fliesenleger, Bauunternehmen und Hausverwaltungen in Duisburg und Umgebung: Material aus einer Charge, Objektmengen, Verlegepartner werden.",
    inhalt: `
${kopfwand({
  ueber: "Für Profis",
  h1: "Für Fliesenleger, Bauunternehmen und Hausverwaltungen.",
  lead: "Sie verlegen, wir besorgen das Material. Und wenn ein Privatkunde bei uns nach einem Fliesenleger fragt, kann das Ihr nächster Auftrag sein.",
  rechts: `${fotoFliese(s, { klasse: "kw-gross", bild: "grossformate", alt: "Gang mit großformatigen Platten in der Ausstellung", prio: true, sizes: "(min-width: 768px) 680px, 100vw" })}
  <div class="fliese fliese--grau kw-d"></div>`,
})}

<section class="rahmen abschnitt zweispaltig" aria-labelledby="angebot-titel">
  <div><h2 class="titel-mittel" id="angebot-titel">Was wir für Sie tun</h2></div>
  ${tippsListe(punkte)}
</section>

<section class="rahmen abschnitt zweispaltig" aria-labelledby="konditionen-titel">
  <div><h2 class="titel-mittel" id="konditionen-titel">Konditionen</h2></div>
  <div class="fliesstext">
    <p>Preise für gewerbliche Kunden besprechen wir persönlich, abhängig von Menge und Regelmäßigkeit. Rufen Sie an oder schreiben Sie uns, was Sie typischerweise brauchen.</p>
    <p><a class="knopf" href="${u("kontakt/?anliegen=profi")}">Anfrage als Betrieb ${PFEIL}</a></p>
  </div>
</section>`,
  };
}

/* ---------- Über uns ---------- */

function ueberUns(k) {
  const s = k("ueber-uns/");
  return {
    pfad: "ueber-uns/",
    titel: "Über uns | Yabi’s Fliesenwelt, Duisburg-Rheinhausen",
    beschreibung: "Yabi’s Fliesenwelt: Fliesenhandel mit Ausstellung in Duisburg-Rheinhausen. Fliesen für jeden Stil, für jedes Zuhause.",
    inhalt: `
${kopfwand({
  ueber: "Über uns",
  h1: "Fliesen für jeden Stil. Für jedes Zuhause.",
  lead: "Das steht bei uns groß über dem Schaufenster. Dahinter: ein Laden, in dem es um Fliesen geht und um die Menschen, die damit ihr Zuhause schöner machen wollen.",
  rechts: `${fotoFliese(s, { klasse: "kw-gross", bild: "empfang-quer", alt: "Empfangstheke mit Fliesenverkleidung und Logo an der Holzwand", prio: true, sizes: "(min-width: 768px) 680px, 100vw" })}
  <div class="fliese fliese--sand kw-d"></div>`,
})}

<section class="rahmen abschnitt zweispaltig" aria-labelledby="laden-titel">
  <div><h2 class="titel-mittel" id="laden-titel">Qualität, Vielfalt und Kundennähe</h2></div>
  <div class="fliesstext">
    <p>Mit der Zeit ist unser Sortiment immer größer geworden, in Farben wie in Materialien, von ganz dunklen bis zu ganz hellen Tönen. Unser Anspruch dabei: Wer zu uns kommt, soll seine Lieblingsfliese finden, und das passende Zubehör gleich dazu.</p>
    <p>Wir glauben nicht an Fliesenkauf vom Bildschirm. Darum gibt es bei uns Musterbäder, Platten in Originalgröße und eine Fläche draußen, auf der man stehen kann. Und einen Tisch, an dem wir uns Zeit nehmen.</p>
    <p>Geschäftsführer der ${BETRIEB.firma} ist ${BETRIEB.geschaeftsfuehrer}.</p>
  </div>
</section>

<section class="rahmen abschnitt-klein zweispaltig" aria-labelledby="folgen-titel">
  <div><h2 class="titel-klein" id="folgen-titel">Neue Fliesen zuerst sehen</h2></div>
  <div class="fliesstext">
    <p>Was neu in die Ausstellung kommt, zeigen wir auf <a href="${BETRIEB.instagram}" rel="noopener">Instagram</a> und <a href="${BETRIEB.tiktok}" rel="noopener">TikTok</a>.</p>
  </div>
</section>`,
  };
}

/* ---------- Kontakt ---------- */

function kontakt(k) {
  const s = k("kontakt/");
  return {
    pfad: "kontakt/",
    titel: "Kontakt | Yabi’s Fliesenwelt, Duisburg-Rheinhausen",
    beschreibung: `Yabi’s Fliesenwelt anrufen, schreiben oder besuchen: ${BETRIEB.strasse}, ${BETRIEB.plz} ${BETRIEB.ort}. Telefon ${BETRIEB.telefon}.`,
    ohneKopfTelefon: true,
    ohneFussTelefon: true,
    inhalt: `
${kopfwand({
  ueber: "Kontakt",
  h1: "Anrufen, schreiben oder vorbeikommen.",
  lead: "",
  klasse: "kopfwand--kontakt",
  rechts: `<a class="fliese fliese--anthrazit kontakt-telefon" href="${BETRIEB.telefonLink}"><span>Telefon</span><b>${HOERER}${BETRIEB.telefon}</b></a>
  <a class="fliese fliese--weiss kontakt-mail" href="mailto:${BETRIEB.mail}"><span>E-Mail</span><b>${BETRIEB.mail}</b></a>`,
})}

<section class="rahmen abschnitt zweispaltig" id="anfrage" aria-labelledby="anfrage-titel">
  <div>
    <h2 class="titel-mittel" id="anfrage-titel">Oder schreiben Sie uns hier</h2>
    <p>Beim Absenden öffnet sich Ihr E-Mail-Programm mit der fertigen Nachricht. Über diese Website wird nichts gespeichert.</p>
  </div>
  <form class="formular" data-mail="${BETRIEB.mail}" novalidate>
    <label class="feld">Ihr Name<input name="name" autocomplete="name" required></label>
    <label class="feld">Telefon für Rückruf<input name="telefon" type="tel" autocomplete="tel" required></label>
    <label class="feld breit">Ihr Anliegen<textarea name="anliegen" rows="6" required placeholder="Zum Beispiel: Bad mit 8 m² Boden und 20 m² Wand, Großformat in Steinoptik, bitte Rückruf am Vormittag."></textarea></label>
    <label class="einwilligung breit"><input type="checkbox" name="einwilligung" required><span>Ich bin einverstanden, dass meine Angaben zur Bearbeitung der Anfrage verwendet werden. Mehr dazu in der <a href="${s.u("datenschutz/")}">Datenschutzerklärung</a>.</span></label>
    <div class="breit formular__fuss">
      <button class="knopf" type="submit">Nachricht vorbereiten ${PFEIL}</button>
      <p class="formular__fehler" role="alert" hidden></p>
    </div>
  </form>
</section>`,
  };
}

/* ---------- Impressum ---------- */

function impressum(k) {
  return {
    pfad: "impressum/",
    titel: "Impressum | Yabi’s Fliesenwelt",
    beschreibung: "Impressum der Yabis Fliesenwelt GmbH, Duisburg.",
    robots: "noindex, follow",
    klasse: "seite-recht",
    inhalt: `
<section class="rahmen recht">
  <h1 class="titel-gross">Impressum</h1>
  <h2>Angaben gemäß § 5 DDG</h2>
  <p>${BETRIEB.firma}<br>${BETRIEB.strasse}<br>${BETRIEB.plz} ${BETRIEB.ort}</p>
  <p>Vertreten durch den Geschäftsführer ${BETRIEB.geschaeftsfuehrer}</p>
  <h2>Kontakt</h2>
  <p>Telefon: ${BETRIEB.telefonIntl}<br>E-Mail: <a href="mailto:${BETRIEB.mail}">${BETRIEB.mail}</a></p>
  <h2>Registereintrag</h2>
  <p>Eingetragen im Handelsregister.<br>Registergericht: Amtsgericht Duisburg<br>Registernummer: HRB 41027</p>
  <h2>Umsatzsteuer</h2>
  <!-- TODO Bilal: Auf der alten Seite steht hier die Steuernummer 119/5004/4113 – die gehört nicht ins Impressum. USt-IdNr. (DE…) erfragen. -->
  <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: <span class="luecke">wird ergänzt</span></p>
  <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
  <p>${BETRIEB.geschaeftsfuehrer}, Anschrift wie oben</p>
  <h2>Verbraucherstreitbeilegung</h2>
  <p>Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
  <h2>Bildnachweis</h2>
  <p>Fotos: ${BETRIEB.firma}. Kartendaten: © OpenStreetMap-Mitwirkende, Lizenz ODbL.</p>
</section>`,
  };
}

/* ---------- Datenschutz ---------- */

function datenschutz(k) {
  return {
    pfad: "datenschutz/",
    titel: "Datenschutzerklärung | Yabi’s Fliesenwelt",
    beschreibung: "Datenschutzerklärung der Yabis Fliesenwelt GmbH, Duisburg.",
    robots: "noindex, follow",
    klasse: "seite-recht",
    inhalt: `
<section class="rahmen recht">
  <h1 class="titel-gross">Datenschutz&shy;erklärung</h1>
  <h2>Verantwortlicher</h2>
  <p>${BETRIEB.firma}, vertreten durch ${BETRIEB.geschaeftsfuehrer}<br>${BETRIEB.strasse}, ${BETRIEB.plz} ${BETRIEB.ort}<br>Telefon ${BETRIEB.telefonIntl}, E-Mail <a href="mailto:${BETRIEB.mail}">${BETRIEB.mail}</a></p>

  <h2>Das Wichtigste vorab</h2>
  <p>Diese Website setzt keine Cookies, bindet keine Analyse- oder Werbedienste ein und lädt keine Inhalte von fremden Servern. Schrift und Karte liegen auf demselben Server wie die Seite selbst. Die Anfahrtskarte ist eine eigene Zeichnung auf Grundlage von OpenStreetMap-Daten, dabei wird nichts von OpenStreetMap nachgeladen. Deshalb gibt es auch keinen Cookie-Hinweis.</p>

  <h2>Hosting und Server-Protokolle</h2>
  <!-- TODO Bilal: Hoster eintragen (geplant ALL-INKL, Neue Medien Münnich, Hauptstraße 68, 02742 Friedersdorf) und AV-Vertrag abschließen. -->
  <p>Die Website wird bei einem Hosting-Anbieter in Deutschland betrieben. Beim Aufruf speichert der Server automatisch Angaben, die Ihr Browser übermittelt: IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browser und Betriebssystem. Das ist nötig, um die Seite sicher und fehlerfrei auszuliefern (Art. 6 Abs. 1 lit. f DSGVO). Die Protokolle werden gelöscht, sobald sie dafür nicht mehr gebraucht werden. Mit dem Hosting-Anbieter besteht ein Vertrag zur Auftragsverarbeitung.</p>

  <h2>Kontakt per Telefon, E-Mail oder Formular</h2>
  <p>Wenn Sie uns anrufen oder schreiben, verarbeiten wir Ihre Angaben, um Ihre Anfrage zu beantworten und gegebenenfalls ein Angebot oder einen Kauf vorzubereiten (Art. 6 Abs. 1 lit. b DSGVO). Das Formular auf der Kontaktseite verschickt selbst nichts: Es öffnet Ihr eigenes E-Mail-Programm mit der fertigen Nachricht, und Sie entscheiden, ob Sie sie absenden. Wir löschen Anfragen, wenn sie erledigt sind und keine gesetzlichen Aufbewahrungspflichten bestehen.</p>

  <h2>Links zu Google Maps, Instagram und TikTok</h2>
  <p>Der Knopf „Route“ und die Hinweise auf Instagram und TikTok sind einfache Links. Erst wenn Sie darauf tippen, verlassen Sie diese Seite, und es gelten die Datenschutzbestimmungen des jeweiligen Anbieters. Vorher wird nichts an diese Anbieter übertragen.</p>

  <h2>Ihre Rechte</h2>
  <p>Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21). Eine formlose Nachricht an die oben genannte Adresse genügt.</p>
  <p>Sie können sich außerdem bei einer Aufsichtsbehörde beschweren, zum Beispiel bei der Landesbeauftragten für Datenschutz und Informationsfreiheit Nordrhein-Westfalen, Kavalleriestraße 2–4, 40213 Düsseldorf.</p>
  <p class="klein">Stand: Oktober 2026</p>
</section>`,
  };
}

/* ---------- 404 ---------- */

function fehlerseite(k) {
  const s = k("");
  const { u } = s;
  return {
    pfad: "404.html",
    datei: "404.html",
    titel: "Seite nicht gefunden | Yabi’s Fliesenwelt",
    beschreibung: "Diese Seite gibt es nicht.",
    robots: "noindex, follow",
    inhalt: `
${kopfwand({
  ueber: "Fehler 404",
  h1: "Hier fehlt eine Fliese.",
  lead: "Diese Seite gibt es nicht oder nicht mehr.",
  klasse: "kopfwand--fehler",
  rechts: `<div class="fliese fliese--sand kw-a"></div><div class="fliese kw-luecke" aria-hidden="true"></div><div class="fliese fliese--taupe kw-c"></div>`,
})}
<section class="rahmen abschnitt weiter" aria-label="Weiter">
  <ul>
    <li><a href="${u()}">Startseite ${PFEIL}</a></li>
    <li><a href="${u("sortiment/")}">Sortiment ${PFEIL}</a></li>
    <li><a href="${u("ausstellung/")}">Ausstellung ${PFEIL}</a></li>
    <li><a href="${u("kontakt/")}">Kontakt ${PFEIL}</a></li>
  </ul>
</section>`,
  };
}

export function alleSeiten(k) {
  return [
    startseite(k),
    sortimentUebersicht(k),
    ...SORTIMENT.map((a, i) => bereichSeite(k, a, i)),
    ausstellung(k),
    service(k),
    profis(k),
    ueberUns(k),
    kontakt(k),
    impressum(k),
    datenschutz(k),
    fehlerseite(k),
  ];
}

export const MENUE = [
  ["sortiment/", "Sortiment"],
  ["ausstellung/", "Ausstellung"],
  ["service/", "Service"],
  ["fuer-profis/", "Für Profis"],
  ["ueber-uns/", "Über uns"],
  ["kontakt/", "Kontakt"],
];

export { esc };
