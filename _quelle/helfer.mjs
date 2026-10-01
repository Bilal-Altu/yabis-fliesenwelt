// Stammdaten, Logo und kleine Helfer für alle Seiten.

export const DOMAIN = "https://yabisfliesenwelt.de/";

export const BETRIEB = {
  name: "Yabi’s Fliesenwelt",
  firma: "Yabis Fliesenwelt GmbH",
  geschaeftsfuehrer: "Joel Amerkamp",
  strasse: "Bergheimer Straße 115",
  plz: "47228",
  ort: "Duisburg",
  ortsteil: "Duisburg-Rheinhausen",
  telefon: "01514 6353821",
  telefonLink: "tel:+4915146353821",
  telefonIntl: "+49 1514 6353821",
  mail: "info@yabisfliesenwelt.de",
  zeiten: [["Montag bis Freitag", "9–18 Uhr"], ["Samstag", "9–15 Uhr"], ["Sonntag", "geschlossen"]],
  zeitenKurz: "Mo–Fr 9–18 · Sa 9–15 Uhr",
  register: "Amtsgericht Duisburg, HRB 41027",
  geo: { lat: 51.4174289, lon: 6.6967689 },
  route: "https://www.google.com/maps/dir/?api=1&destination=Bergheimer+Stra%C3%9Fe+115%2C+47228+Duisburg",
  instagram: "https://www.instagram.com/yabis.fliesenwelt/",
  tiktok: "https://www.tiktok.com/@yabis.fliesenwelt",
};

export const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Das „Y“ aus dem Logo: sechs Steinstücke, dazwischen Fugen in der Grundfarbe.
// Nachgezeichnet nach dem Schild über dem Eingang, die Originaldatei ist nur eine 3D-Ansicht.
export const Y_STUECKE = `<polygon fill="#6a5a4f" points="0,3 42,3 42,9 32,9 50,36 40,46 36,55 6,9 0,9"/>
<polygon fill="#a89a8c" points="58,3 100,3 100,9 94,9 79,32 59,22.5 68,9 58,9"/>
<polygon fill="#8e7d6f" points="59,22.5 79,32 64,55 60,46 50,36"/>
<polygon fill="#7b6a5d" points="50,36 60,46 50,56 40,46"/>
<polygon fill="#574b43" points="36,55 40,46 50,56 50,97 24,97 24,92 32,92 36,88"/>
<polygon fill="#b9b0a6" points="64,55 60,46 50,56 50,97 76,97 76,92 68,92 64,88"/>`;

export const logo = (fugenfarbe = "var(--papier)") => `<svg class="logo" viewBox="0 0 240 128" aria-hidden="true" focusable="false">
<g stroke="${fugenfarbe}" stroke-width="1.8" stroke-linejoin="round">${Y_STUECKE}</g>
<text x="70" y="97" font-weight="700" font-size="62" letter-spacing="-1">abi’s</text>
<text x="1" y="123" font-weight="600" font-size="15" textLength="232" lengthAdjust="spacing">FLIESENWELT</text>
</svg>`;

const svg = (klasse, inhalt) => `<svg class="${klasse}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${inhalt}</svg>`;
export const PFEIL = svg("pfeil", `<path d="M4 12h15M13 6l6 6-6 6"/>`);
export const HOERER = svg("hoerer", `<path d="M6.6 3.5l2.6-.4 1.6 4.3-1.9 1.3a11 11 0 0 0 5.4 5.4l1.3-1.9 4.3 1.6-.4 2.6c-.2 1.3-1.3 2.2-2.6 2.1C10.7 18 6 13.3 5.5 6.1c-.1-1.3.8-2.4 2.1-2.6Z"/>`);
export const ROUTE = svg("route", `<path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>`);

// Öffnungszeiten für JSON-LD
export const OEFFNUNG = [
  { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
  { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "15:00" },
];

export const SCHEMA_BETRIEB = {
  "@context": "https://schema.org",
  "@type": "Store",
  "@id": DOMAIN + "#betrieb",
  name: BETRIEB.name,
  legalName: BETRIEB.firma,
  description: "Fliesenhandel mit Ausstellung und Musterbädern: Feinsteinzeug, Naturstein, Mosaik, Terrassenplatten und Verlegezubehör.",
  url: DOMAIN,
  image: DOMAIN + "bilder/teilen.jpg",
  logo: DOMAIN + "favicon.svg",
  telephone: BETRIEB.telefonIntl,
  email: BETRIEB.mail,
  address: { "@type": "PostalAddress", streetAddress: BETRIEB.strasse, postalCode: BETRIEB.plz, addressLocality: BETRIEB.ort, addressRegion: "Nordrhein-Westfalen", addressCountry: "DE" },
  geo: { "@type": "GeoCoordinates", latitude: BETRIEB.geo.lat, longitude: BETRIEB.geo.lon },
  openingHoursSpecification: OEFFNUNG,
  areaServed: ["Duisburg", "Moers", "Krefeld", "Neukirchen-Vluyn", "Kamp-Lintfort", "Rheinberg"].map((name) => ({ "@type": "City", name })),
  sameAs: [BETRIEB.instagram, BETRIEB.tiktok],
};

export const faqSchema = (fragen) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: fragen.map(([f, a]) => ({ "@type": "Question", name: f, acceptedAnswer: { "@type": "Answer", text: a.replace(/<[^>]+>/g, "") } })),
});
