// Menü am Handy, Öffnungsstatus, Mengenrechner, Anfrageformular (öffnet das eigene E-Mail-Programm).
(function () {
  "use strict";

  /* ---------- Menü ---------- */
  var knopf = document.querySelector(".kopf__menue");
  var menue = document.getElementById("menue-mobil");
  function setzen(offen) {
    knopf.setAttribute("aria-expanded", String(offen));
    knopf.querySelector(".nur-leser").textContent = offen ? "Menü schließen" : "Menü öffnen";
    menue.hidden = !offen;
    document.body.classList.toggle("menue-offen", offen);
  }
  if (knopf && menue) {
    knopf.addEventListener("click", function () { setzen(knopf.getAttribute("aria-expanded") !== "true"); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menue.hidden) { setzen(false); knopf.focus(); } });
    window.matchMedia("(min-width: 1080px)").addEventListener("change", function (m) { if (m.matches) setzen(false); });
  }

  /* ---------- Geöffnet? (Zeit in Duisburg, Feiertage nicht berücksichtigt) ---------- */
  var ZEITEN = { 1: [9, 18], 2: [9, 18], 3: [9, 18], 4: [9, 18], 5: [9, 18], 6: [9, 15] };
  var TAGE = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
  var status = document.querySelectorAll("[data-offen]");
  if (status.length) {
    var teile = {};
    new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Berlin", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" })
      .formatToParts(new Date()).forEach(function (t) { teile[t.type] = t.value; });
    var tag = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(teile.weekday);
    var jetzt = +teile.hour + (+teile.minute) / 60;
    var heute = ZEITEN[tag];
    var offen = heute && jetzt >= heute[0] && jetzt < heute[1];
    var text, unten;
    if (offen) { text = "Jetzt geöffnet"; unten = "heute bis " + heute[1] + " Uhr"; }
    else if (heute && jetzt < heute[0]) { text = "Öffnet heute um " + heute[0] + " Uhr"; unten = "heute bis " + heute[1] + " Uhr"; }
    else {
      var n = tag; do { n = (n + 1) % 7; } while (!ZEITEN[n]);
      text = "Gerade geschlossen"; unten = "öffnet " + (n === (tag + 1) % 7 ? "morgen" : TAGE[n]) + " um " + ZEITEN[n][0] + " Uhr";
    }
    status.forEach(function (el) {
      el.textContent = el.closest(".kw-zeit") ? text + ", " + unten : text;
      var fliese = el.closest(".fliese"); if (fliese && offen) fliese.classList.add("ist-offen");
    });
    document.querySelectorAll("[data-offen-heute]").forEach(function (el) { el.textContent = unten; });
  }

  /* ---------- Mengenrechner ---------- */
  // Format: Kante a, Kante b, Stärke (mm), Fugenbreite (mm), Kleber (kg/m²)
  var FORMATE = {
    mosaik: [25, 25, 6, 2, 2.0], "30x60": [300, 600, 9, 3, 3.0], "60x60": [600, 600, 9, 3, 3.5],
    "60x120": [600, 1200, 9, 2, 5.0], "120x120": [1200, 1200, 9, 2, 5.5], "20x120": [200, 1200, 9, 3, 4.0],
  };
  var rechner = document.getElementById("rechner-form");
  if (rechner) {
    var zahl = function (n, stellen) { return n.toLocaleString("de-DE", { minimumFractionDigits: stellen, maximumFractionDigits: stellen }); };
    var rechnen = function () {
      var f = rechner.elements;
      var flaeche = parseFloat(String(f.flaeche.value).replace(",", "."));
      var aus = function (k, v) { rechner.querySelector('[data-r="' + k + '"]').textContent = v; };
      if (!(flaeche > 0)) { aus("fliesen", "–"); aus("kleber", "–"); aus("fuge", "–"); return; }
      var F = FORMATE[f.format.value], verschnitt = parseFloat(f.verlegung.value);
      var fliesen = Math.ceil(flaeche * (1 + verschnitt) * 10) / 10;
      var kleber = flaeche * F[4];
      // Fugenmörtel (kg/m²) = (a + b) / (a · b) · Fugenbreite · Fugentiefe · 1,6, plus 10 Prozent
      var fuge = flaeche * ((F[0] + F[1]) / (F[0] * F[1])) * F[3] * F[2] * 1.6 * 1.1;
      aus("fliesen", zahl(fliesen, 1) + " m²");
      aus("kleber", "ca. " + zahl(Math.ceil(kleber), 0) + " kg · " + Math.ceil(kleber / 25) + " Sack");
      aus("fuge", "ca. " + zahl(Math.max(1, Math.ceil(fuge)), 0) + " kg");
    };
    rechner.addEventListener("input", rechnen);
    rechner.addEventListener("submit", function (e) { e.preventDefault(); });
    rechnen();
  }

  /* ---------- Anfrageformular ---------- */
  var form = document.querySelector(".formular");
  if (!form) return;
  var VORLAGEN = {
    verlegung: "Ich suche einen Fliesenleger für: ",
    profi: "Wir sind ein Betrieb (Fliesenleger / Bau / Hausverwaltung) und interessieren uns für: ",
  };
  var gewuenscht = new URLSearchParams(location.search).get("anliegen");
  if (gewuenscht && VORLAGEN[gewuenscht] && !form.elements.anliegen.value) form.elements.anliegen.value = VORLAGEN[gewuenscht];
  var fehler = form.querySelector(".formular__fehler");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var f = form.elements;
    var leer = ["name", "telefon", "anliegen"].filter(function (n) { return !f[n].value.trim(); });
    if (leer.length || !f.einwilligung.checked) {
      fehler.hidden = false;
      fehler.textContent = leer.length ? "Bitte füllen Sie Name, Telefon und Anliegen aus." : "Bitte bestätigen Sie die Einwilligung.";
      (leer.length ? f[leer[0]] : f.einwilligung).focus();
      return;
    }
    fehler.hidden = true;
    var zeilen = [f.anliegen.value.trim(), "", "Name: " + f.name.value.trim(), "Telefon: " + f.telefon.value.trim()];
    location.href = "mailto:" + form.dataset.mail + "?subject=" + encodeURIComponent("Anfrage über die Website") + "&body=" + encodeURIComponent(zeilen.join("\n"));
  });
})();
