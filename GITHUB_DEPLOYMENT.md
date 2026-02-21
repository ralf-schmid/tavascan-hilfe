# 🚀 GitHub Pages Deployment - Schritt für Schritt

## Voraussetzungen
- ✅ GitHub Account (hast du bereits)
- ✅ Die heruntergeladenen Dateien aus diesem Projekt
- ✅ Claude API Key von https://console.anthropic.com/
- ✅ PDF der Cupra Tavascan Bedienungsanleitung

---

## 📦 Schritt 1: GitHub Repository erstellen

1. **Gehe zu GitHub:** https://github.com/
2. **Klicke oben rechts** auf das **+** Symbol → **New repository**
3. **Repository-Name:** `cupra-assistent` (oder einen Namen deiner Wahl)
4. **Beschreibung:** `Sprachassistent für Cupra Tavascan` (optional)
5. **Sichtbarkeit:** 
   - ⚠️ **Public** (kostenlos, aber jeder kann den Code sehen)
   - 💎 **Private** (nur für dich, erfordert GitHub Pro)
6. **Haken setzen bei:** ✅ "Add a README file"
7. **Klicke:** "Create repository"

---

## 📁 Schritt 2: Dateien hochladen

### Option A: Web-Interface (Einfacher für Anfänger)

1. **Im neu erstellten Repository:**
   - Klicke auf **"Add file"** → **"Upload files"**

2. **Ziehe folgende Dateien** in den Browser:
   ```
   index.html
   manifest.json
   sw.js
   icon-192.png
   icon-512.png
   ```

3. **Scroll nach unten:**
   - Commit message: `Initiales Setup`
   - Klicke: **"Commit changes"**

### Option B: Git Command Line (Für Fortgeschrittene)

```bash
# Repository klonen
git clone https://github.com/DEIN-USERNAME/cupra-assistent.git
cd cupra-assistent

# Dateien kopieren (passe den Pfad an)
cp /pfad/zu/den/dateien/* .

# Dateien hinzufügen
git add .
git commit -m "Initiales Setup"
git push
```

---

## 🌐 Schritt 3: GitHub Pages aktivieren

1. **Im Repository:** Klicke auf **"Settings"** (Zahnrad-Symbol oben)

2. **Linke Seitenleiste:** Scrolle zu **"Pages"**

3. **Source-Einstellung:** ⚠️ **Wichtig – nicht "Branch", sondern "GitHub Actions" wählen!**
   - Klicke auf das Dropdown unter „Build and deployment → Source"
   - Wähle: **„GitHub Actions"** (nicht „Deploy from a branch")
   - Klicke: **"Save"**

   > **Warum?** Das Projekt deployt automatisch über den CI-Workflow (`.github/workflows/ci.yml`).
   > Der Workflow führt erst Tests aus und erzeugt dann eine `version.json` mit dem aktuellen
   > Build-Datum, die in der App unter ⚙️ Setup angezeigt wird.
   > Mit „GitHub Actions" als Quelle laufen Tests und Deploy in einem Schritt.

4. **Ersten Deploy auslösen:** Pushe einen Commit auf `main` (z. B. eine kleine Änderung in README.md)
   - Im Reiter **„Actions"** siehst du den laufenden Workflow
   - Grünes Häkchen → Seite ist live

5. **Warte 1-2 Minuten**
   - Oben erscheint: "Your site is live at https://DEIN-USERNAME.github.io/cupra-assistent/"

6. **Kopiere diese URL** – das ist deine App-Adresse!

---

## 🔧 Schritt 4: Custom Domain (Optional)

Falls du eine eigene Domain hast (z.B. `cupra.meine-domain.de`):

1. **In GitHub Pages Settings:**
   - Custom domain: `cupra.meine-domain.de`
   - ✅ Enforce HTTPS

2. **Bei deinem Domain-Provider (z.B. Strato, Ionos):**
   - **DNS Einstellungen öffnen**
   - **CNAME Record erstellen:**
     - Name: `cupra` (oder `@` für Hauptdomain)
     - Ziel: `DEIN-USERNAME.github.io`
   - **Speichern** (DNS-Änderungen brauchen 1-24h)

---

## 📱 Schritt 5: App auf dem iPhone installieren

### 5.1 Setup durchführen

1. **Öffne Safari** auf dem iPhone
2. **Gehe zur URL:** `https://DEIN-USERNAME.github.io/cupra-assistent/`
3. **Tippe oben rechts:** ⚙️ Setup
4. **Claude API Key eingeben:**
   - Gehe auf dem Computer zu: https://console.anthropic.com/
   - Klicke: "API Keys" → "Create Key"
   - Kopiere den Key (beginnt mit `sk-ant-...`)
   - Trage ihn in die App ein
5. **PDF hochladen:**
   - Tippe auf "Datei wählen"
   - Wähle die Cupra Bedienungsanleitung (PDF)
   - Warte bis "✓ PDF erfolgreich hochgeladen" erscheint
6. **Tippe:** "Speichern"

### 5.2 Zum Home-Bildschirm hinzufügen

1. **In Safari:** Tippe auf das **Teilen-Symbol** (Quadrat mit Pfeil nach oben)
2. **Scrolle runter:** Tippe auf **"Zum Home-Bildschirm"**
3. **Name:** "Cupra" (oder wie gewünscht)
4. **Tippe:** "Hinzufügen"

🎉 **Fertig!** Die App ist jetzt auf dem Home-Bildschirm wie eine normale App!

---

## 🧪 Schritt 6: Testen

1. **Öffne die App** vom Home-Bildschirm
2. **Tippe den Mikrofon-Button** 🎤
3. **Erlaube Mikrofon-Zugriff** (einmalig)
4. **Stelle eine Frage:** z.B. "Wie schalte ich die Sitzheizung ein?"
5. **Warte auf Antwort** - Claude antwortet automatisch per Sprache

---

## 🔒 Sicherheitshinweise

### ⚠️ WICHTIG: API Key Sicherheit

Dein API Key wird **lokal im Browser** gespeichert (localStorage), NICHT auf GitHub!

**Aber Achtung:**
- Der Key wird im Klartext im Browser gespeichert
- Jeder mit Zugriff auf das iPhone kann theoretisch darauf zugreifen
- **Für Produktion:** Besser einen Backend-Server verwenden

**Empfehlung für deinen Vater:**
1. Erstelle einen separaten API Key nur für diese App
2. Setze ein **monatliches Limit** in der Anthropic Console (z.B. 20€)
3. So ist der Schaden begrenzt, falls etwas schiefgeht

---

## 💰 Kosten überwachen

1. **Gehe zu:** https://console.anthropic.com/settings/usage
2. **Setze Limits:**
   - Budget Limit: z.B. $20/Monat
   - Email Alerts: Bei 50%, 80%, 100%

**Erwartete Kosten:**
- Pro Frage: ~$0.02-0.10 (je nach Antwortlänge)
- 100 Fragen/Monat: ~$2-10
- **Prompt Caching spart 90% der Kosten** (ist bereits aktiviert!)

---

## 🛠️ Updates und Änderungen

### Dateien aktualisieren:

1. **Im GitHub Repository:**
   - Klicke auf die Datei (z.B. `index.html`)
   - Klicke auf das **Stift-Symbol** (Edit)
   - Mache deine Änderungen
   - Scroll runter: "Commit changes"

2. **Änderungen sind sofort live** (1-2 Min Verzögerung)

3. **Im iPhone:** 
   - App schließen
   - Neu öffnen
   - Bei Bedarf: Cache leeren in Safari-Einstellungen

---

## 🐛 Fehlersuche

### Problem: "API Key ungültig"
✅ **Lösung:** 
- Prüfe ob Key mit `sk-ant-` beginnt
- Erstelle neuen Key in Anthropic Console
- Gehe in App-Settings und trage neuen Key ein

### Problem: "PDF lädt nicht hoch"
✅ **Lösung:**
- Prüfe PDF-Größe (max ~25 MB für beste Performance)
- Nutze Safari (nicht Chrome/Firefox auf iOS)
- Evtl. PDF komprimieren: https://www.ilovepdf.com/compress_pdf

### Problem: "Mikrofon funktioniert nicht"
✅ **Lösung:**
- iOS Einstellungen → Safari → Kamera & Mikrofon
- Erlaube Zugriff für die Seite
- Nur in Safari funktioniert Spracherkennung!

### Problem: "Seite lädt nicht / 404 Fehler"
✅ **Lösung:**
- Warte 5 Minuten (GitHub Actions Build dauert)
- Prüfe im Reiter **„Actions"** ob der Workflow grün ist
- Stelle sicher, dass Pages-Source auf **„GitHub Actions"** steht (nicht „Branch")

### Problem: "Versionsanzeige zeigt 'Dev' statt Commit-Hash"
✅ **Lösung:**
- `version.json` wird vom CI-Workflow erzeugt und ist nicht im Repository
- Prüfe ob der Deploy-Job im Actions-Workflow erfolgreich war (grünes Häkchen)
- Lokal (ohne Deploy) ist „Dev · …" das erwartete Verhalten

### Problem: "App funktioniert offline nicht"
✅ **Lösung:**
- Service Worker braucht https://
- Einmal online öffnen zum Cachen
- API-Calls funktionieren nicht offline (by design)

---

## 📊 Monitoring & Analytics (Optional)

Falls du sehen möchtest, wie oft die App genutzt wird:

1. **Google Analytics hinzufügen:**
   - Erstelle Google Analytics Account
   - Füge Tracking-Code in `index.html` ein (vor `</head>`)

2. **Plausible Analytics** (Privacy-friendly):
   - Kostenlos bis 10k Views/Monat
   - https://plausible.io/

---

## 🎨 Anpassungen

### Icons ändern:
- Erstelle neue PNG-Dateien (192x192 und 512x512)
- Benenne sie `icon-192.png` und `icon-512.png`
- Lade sie hoch und ersetze die alten

### Farben anpassen:
- In `index.html` suche nach Farben:
  - `#e94560` = Hauptfarbe (Rot/Pink)
  - `#1a1a2e` = Hintergrund (Dunkelblau)
  - `#4ecca3` = Akzentfarbe (Grün)
- Ersetze durch deine Wunschfarben

### System-Prompt verbessern:
- In `index.html` ab Zeile ~280
- Passe die Instruktionen für Claude an
- Z.B. andere Tonalität, mehr Details, etc.

---

## 🎯 Nächste Schritte

Nach erfolgreichem Deployment:

1. ✅ Teste ausgiebig mit verschiedenen Fragen
2. ✅ Beobachte API-Kosten für 1-2 Wochen
3. ✅ Sammle Feedback von deinem Vater
4. ✅ Optimiere System-Prompt basierend auf häufigen Fragen
5. ✅ Evtl. weitere Features hinzufügen (siehe unten)

---

## 🚀 Mögliche Erweiterungen

### Ideen für die Zukunft:

1. **Conversation Export**
   - Button um Gespräche als PDF zu speichern

2. **Favoriten-Fragen**
   - Schnellzugriff auf häufige Fragen
   - Z.B. "Wo ist der Ladeanschluss?"

3. **Sprachauswahl**
   - Deutsch / Englisch umschalten

4. **Dark/Light Mode**
   - Umschaltbar für bessere Lesbarkeit

5. **Offline-Antworten**
   - Häufigste Fragen vorab cachen

6. **Bilder einfügen**
   - Fotos aus dem Auto hochladen
   - "Was bedeutet diese Anzeige?"

---

## 📞 Support

Bei Problemen:

1. **GitHub Issues:** Erstelle ein Issue im Repository
2. **Anthropic Support:** https://support.anthropic.com/
3. **Oder frage mich** (Claude) in einem neuen Chat 😊

---

## ✅ Checkliste für Go-Live

- [ ] Repository erstellt
- [ ] Alle Dateien hochgeladen
- [ ] GitHub Pages aktiviert
- [ ] URL funktioniert in Safari
- [ ] API Key eingetragen und getestet
- [ ] PDF hochgeladen und getestet
- [ ] Zum Home-Bildschirm hinzugefügt
- [ ] Mikrofon-Test erfolgreich
- [ ] Erste Frage gestellt und beantwortet
- [ ] Sprachausgabe funktioniert
- [ ] API Budget-Limit gesetzt

---

**Viel Erfolg! 🚗✨**

Bei Fragen einfach melden!
