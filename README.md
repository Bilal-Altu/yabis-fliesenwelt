# Yabi’s Fliesenwelt – Entwurf „Römischer Verband“

Ungefragter Gratis-Entwurf für die **Yabis Fliesenwelt GmbH**, Bergheimer Straße 115, 47228 Duisburg
(Rheinhausen-Bergheim), Geschäftsführer Joel Amerkamp, Amtsgericht Duisburg HRB 41027.
Fliesenhandel mit Ausstellung, Musterbädern und Außenfläche; Verlegung über Partnerbetriebe.
Die bestehende Seite yabisfliesenwelt.de ist ein WordPress-Baukasten vom August 2026.

## Idee

- **Römischer Verband:** Jede Fläche ist eine Fliese, dazwischen liegt eine sichtbare Fuge. Die Startseite
  ist eine Wand aus Fotos, Steinfarben und Text in verschiedenen Formaten. Dasselbe Raster trägt die Köpfe
  aller Unterseiten.
- **Farben aus Logo und Fassade:** Steintöne des Logo-„Y“, Anthrazit der Schildleiste, Papier als Grund.
- **Schrift:** Familjen Grotesk (variabel, OFL), selbst ausgeliefert.
- **Logo:** Das „Y“ ist als SVG nachgezeichnet (sechs Steinstücke mit Fugen). Die Datei des Kunden ist
  nur eine 3D-Ansicht auf schwarzem Grund.
- **Nur eigene Fotos** aus der Mediathek der alten Seite. Stockbilder (Laptop, Elektriker, Küche,
  Mosaik-Motive) sind bewusst weggelassen.
- **Anfahrt im Fuß jeder Seite** als eigene Karte aus OpenStreetMap-Daten. Nichts wird von fremden
  Servern geladen, kein Cookie-Hinweis nötig.
- **Mengenrechner** auf der Service-Seite (Fliesen mit Verschnitt, Kleber, Fugenmörtel als Richtwerte).

## Seiten

Startseite, Sortiment (Übersicht + Feinsteinzeug, Naturstein, Mosaik, Terrassenplatten,
Verlegezubehör), Ausstellung, Service, Für Profis, Über uns, Kontakt (Formular öffnet das eigene
E-Mail-Programm), Impressum, Datenschutz, 404.

## Bauen

```bash
node _quelle/bauen.mjs
```

Die HTML-Dateien werden erzeugt – nie von Hand ändern. Inhalte: `_quelle/seiten.mjs` und
`_quelle/sortiment.mjs`, Stammdaten und Logo: `_quelle/helfer.mjs`, Karte: `_quelle/karte.mjs`
(Daten in `_quelle/karte-daten.json`). CSS/JS bekommen die Prüfsumme als `?v=` automatisch.
Das Bauskript meldet je Seite die Zahl der Telefon-Links und warnt bei mehr als einer h1 oder zu
langem Titel bzw. zu langer Beschreibung.

Werkzeuge außerhalb des Repos in `Desktop\Yabis\`: `quelle\` (Originale der alten Seite),
`werkzeug\bilder-bauen.sh` (AVIF + WebP, bricht ab, wenn ein Bild größer als seine Vorlage würde),
`werkzeug\karte-daten.mjs` (OSM-Daten aus `geo\` → `_quelle/karte-daten.json`), `werkzeug\schirm.sh`
(Bildschirmfoto eines Fensters), `werkzeug\seite-ganz.mjs` (ganze Seite per DevTools-Protokoll,
prüft Schrift, Überlaufen und aufgeblasene Bilder). Lokal: launch.json „yabis“, Port 4800,
Adresse `/yabis/`. Die drei Startbildschirm-Entwürfe liegen in `_entwurf/` (nicht im Repo).

## Offene Punkte (nur der Kunde kann sie beantworten)

| Punkt | Wo | Stand |
|---|---|---|
| Logo als Vektordatei (SVG/PDF/AI) – bis dahin der Nachbau | überall | fehlt |
| USt-IdNr. – die alte Seite nennt die Steuernummer 119/5004/4113 als USt-IdNr., das ist falsch | Impressum | fehlt |
| Wer ist „Yabi“? Foto und ein Satz von Joel Amerkamp für „Über uns“ | Über uns | fehlt |
| Welche Marken und Serien führt der Laden? Gibt es Naturstein wirklich (Schild: ja)? | Sortiment | Vorschlag |
| Fachangaben je Bereich gegenlesen (Formate, Stärken, Zubehör) | Sortimentsseiten | Vorschlag |
| Lieferung: wird geliefert, was kostet es? (Schild zeigt einen Lkw) | Service, Fragen | nicht bestätigt |
| Verlegung durch Vermittlung: mit welchen Betrieben, wie läuft es ab? | Service, Für Profis | nicht bestätigt |
| Konditionen für Fliesenleger, Verlegepartner gesucht? | Für Profis | nicht bestätigt |
| Preisrahmen je m² (Master-Prompt verlangt ihn in den Fragen) | Startseite | fehlt |
| „Bad mit 25 m² in drei bis fünf Arbeitstagen“ ist ein Branchenwert | Startseite | nicht bestätigt |
| Anzahl der Musterbäder (Fotos zeigen drei, vielleicht vier) – steht nirgends als Zahl | Ausstellung | offen |
| Parkplätze vor dem Laden? | Fuß | offen |
| Google-Unternehmensprofil vorhanden? Bewertungen? | Startseite | offen |
| Hoster und AV-Vertrag | Datenschutz | beim Livegang |

## Vorschläge für weitere Seiten (bringen später Anfragen über Google)

1. **Was kostet Fliesen verlegen pro m²?** – Material, Verlegung, Zubehör, Beispielrechnung für ein Bad.
2. **Großformat 120 × 120 im Bad: worauf achten?** – Untergrund, Gewicht, Fugenbild, Gefälle in der Dusche.
3. **Terrassenplatten auf Stelzlagern verlegen** – Balkon und Dachterrasse, Höhen, Abdichtung.

## Livegang

In `_quelle/bauen.mjs`: `ROBOTS` auf `"index, follow"`, `BASIS_404` auf `"/"`. `robots.txt`
freigeben. Canonical und Sitemap zeigen schon auf https://yabisfliesenwelt.de/.
