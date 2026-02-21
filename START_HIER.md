# 📦 Projektübersicht - Cupra Tavascan PWA

## 🎯 Was ist das hier?

Dies ist eine vollständige Progressive Web App (PWA) für den Cupra Tavascan. 
Dein Vater kann per Sprachsteuerung Fragen zum Auto stellen und erhält Antworten basierend auf der Bedienungsanleitung.

---

## 📁 Dateien-Übersicht

### 🌐 App-Dateien (MÜSSEN auf GitHub hochgeladen werden)

| Datei | Größe | Beschreibung | Wichtig |
|-------|-------|--------------|---------|
| **index.html** | 23 KB | Haupt-App (HTML/CSS/JavaScript) | ⭐⭐⭐ |
| **manifest.json** | 537 B | PWA-Konfiguration | ⭐⭐⭐ |
| **sw.js** | 1.3 KB | Service Worker (Offline-Funktion) | ⭐⭐⭐ |
| **icon-192.png** | 2.3 KB | App-Icon klein | ⭐⭐⭐ |
| **icon-512.png** | 6.5 KB | App-Icon groß | ⭐⭐⭐ |

**Diese 5 Dateien sind ZWINGEND erforderlich für die Funktion der App!**

---

### 📖 Dokumentation (Optional, aber empfohlen)

| Datei | Größe | Beschreibung | Für wen? |
|-------|-------|--------------|----------|
| **README.md** | 4.5 KB | Projekt-Dokumentation | GitHub-Besucher |
| **GITHUB_DEPLOYMENT.md** | 8.4 KB | Detaillierte Deployment-Anleitung | Dich (Entwickler) |
| **QUICKSTART.md** | 3.8 KB | Einfache Anleitung | Deinen Vater |
| **DEPLOYMENT_CHECKLIST.md** | 3.2 KB | Schritt-für-Schritt Checkliste | Dich (Setup) |
| **LICENSE** | 1.1 KB | MIT-Lizenz | Rechtliches |
| **.gitignore** | 686 B | Git-Ignore-Regeln | Git |

---

## 🚀 Was musst DU tun?

### Option A: Alles auf einmal hochladen (Empfohlen)

1. **GitHub Repository erstellen** (siehe GITHUB_DEPLOYMENT.md)
2. **ALLE 11 Dateien hochladen**
3. **GitHub Pages aktivieren**
4. **Fertig!**

### Option B: Nur Minimum

1. **GitHub Repository erstellen**
2. **Nur die 5 App-Dateien hochladen:**
   - index.html
   - manifest.json
   - sw.js
   - icon-192.png
   - icon-512.png
3. **GitHub Pages aktivieren**
4. **README.md später hinzufügen** (optional)

---

## 📱 Was muss dein VATER tun?

**Fast nichts!** Wenn du alles hochgeladen hast:

1. URL öffnen in Safari
2. Setup durchführen (API Key + PDF hochladen)
3. Zum Home-Bildschirm hinzufügen
4. Loslegen!

**Detaillierte Anleitung für ihn:** QUICKSTART.md

---

## 🔧 Wie funktioniert die App technisch?

```
┌─────────────────────────────────────────┐
│  iPhone (Safari)                        │
│                                         │
│  ┌─────────────────────────────────┐  │
│  │  index.html (PWA)               │  │
│  │  - Spracherkennung (Mikrofon)   │  │
│  │  - Text-to-Speech (Lautsprecher)│  │
│  │  - PDF in Base64 gespeichert    │  │
│  └─────────────┬───────────────────┘  │
│                │                        │
└────────────────┼────────────────────────┘
                 │ HTTPS
                 ▼
┌─────────────────────────────────────────┐
│  Anthropic API (Claude Sonnet 4)        │
│  - Erhält Frage + PDF                   │
│  - Generiert Antwort                    │
│  - Nutzt Prompt Caching (90% günstiger) │
└─────────────────────────────────────────┘
```

**Wichtig:**
- **Alles läuft im Browser** (kein Backend nötig!)
- **PDF wird lokal gespeichert** (nicht auf GitHub!)
- **API Key bleibt auf dem iPhone** (localStorage)

---

## 🎨 Anpassungen möglich?

### Farben ändern

In `index.html` (im `<style>` Bereich):

```css
background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);  /* Hintergrund */
background: #e94560;  /* Hauptfarbe (Rot) */
background: #4ecca3;  /* Akzentfarbe (Grün) */
```

### Icons ersetzen

- Eigene PNG-Dateien erstellen (192x192 und 512x512 Pixel)
- Als `icon-192.png` und `icon-512.png` speichern
- Auf GitHub hochladen und ersetzen

### System-Prompt anpassen

In `index.html`, Zeile ~280:

```javascript
const systemPrompt = `Du bist Horsts persönlicher Cupra Tavascan Experte...`
```

Hier kannst du die Anweisungen für Claude ändern:
- Tonalität (formell/locker)
- Antwortlänge (kürzer/länger)
- Detailgrad (mehr/weniger Details)

---

## 💰 Kosten-Übersicht

| Was | Kosten | Anmerkung |
|-----|--------|-----------|
| **GitHub Pages** | 0€ | Kostenlos für Public Repos |
| **Domain (optional)** | ~12€/Jahr | Falls eigene Domain gewünscht |
| **Claude API** | ~2-10€/Monat | Bei 100 Fragen, mit Caching |
| **Apple Developer** | 0€ | Nicht nötig (PWA, keine native App) |

**Budget-Tipp:** Setze in der Anthropic Console ein Limit von 20€/Monat!

---

## 🔒 Sicherheitshinweise

### ✅ Sicher:
- API Key wird NUR lokal gespeichert (localStorage)
- PDF wird NUR lokal gespeichert (base64 im localStorage)
- Kein Backend → keine Server-seitigen Risiken
- HTTPS über GitHub Pages (automatisch)

### ⚠️ Zu beachten:
- Jeder mit Zugriff auf das iPhone kann theoretisch den API Key auslesen
- Deshalb: Separaten Key nur für diese App verwenden!
- Budget-Limit setzen (max. 20-50€/Monat)

### ❌ NICHT sicher:
- API Key direkt im Code speichern (machen wir NICHT!)
- Bedienungsanleitung im Repository hochladen (machen wir NICHT!)

---

## 🐛 Häufige Probleme & Lösungen

### "GitHub Pages zeigt 404"
➡️ Warte 2-5 Minuten, Build dauert
➡️ Prüfe ob Branch auf `main` steht
➡️ Prüfe ob `index.html` im Root liegt

### "Mikrofon funktioniert nicht"
➡️ Nur Safari unterstützt Spracherkennung auf iOS
➡️ iPhone Einstellungen → Safari → Mikrofon erlauben
➡️ URL muss HTTPS sein (GitHub Pages ist automatisch HTTPS)

### "PDF lädt nicht hoch"
➡️ Datei zu groß (max ~25 MB empfohlen)
➡️ PDF komprimieren: https://www.ilovepdf.com/compress_pdf
➡️ Nur Safari verwenden (nicht Chrome/Firefox auf iOS)

### "API antwortet nicht"
➡️ API Key prüfen (beginnt mit `sk-ant-`?)
➡️ Guthaben auf console.anthropic.com checken
➡️ Internet-Verbindung prüfen

---

## 📊 Überwachung & Monitoring

### API-Nutzung checken:
1. Gehe zu: https://console.anthropic.com/settings/usage
2. Sieh Kosten pro Tag/Woche/Monat
3. Setze Budgets und Alerts

### GitHub Pages Status:
1. Repository → Actions Tab
2. Sieh Build-Logs
3. Grüner Haken = alles OK

---

## 🎯 Nächste Schritte nach Deployment

### Tag 1:
- [ ] Ausgiebig testen mit verschiedenen Fragen
- [ ] Feedback von deinem Vater einholen
- [ ] Erste API-Kosten überprüfen

### Woche 1:
- [ ] Wöchliche Nutzung analysieren
- [ ] Evtl. System-Prompt optimieren
- [ ] Häufigste Fragen dokumentieren

### Monat 1:
- [ ] Monatliche Kosten prüfen
- [ ] Evtl. Features hinzufügen (siehe README.md Roadmap)
- [ ] Feedback-Runde mit deinem Vater

---

## 📞 Support-Optionen

### Bei technischen Problemen:
1. **GITHUB_DEPLOYMENT.md** lesen (Fehlersuche-Sektion)
2. **GitHub Issues** erstellen
3. **Anthropic Support:** support@anthropic.com

### Bei Nutzungsfragen:
1. **QUICKSTART.md** durchgehen
2. Gemeinsam mit deinem Vater durchgehen
3. Notfalls: Neue Test-Session

---

## 🚀 Erweiterungsmöglichkeiten

Falls die App gut läuft und du mehr willst:

### Einfach umsetzbar:
- **Favoriten-Buttons** für häufige Fragen
- **Dark Mode Toggle**
- **Größere Schrift-Option**

### Mittelschwer:
- **Conversation Export** (als PDF)
- **Bilder hochladen** (z.B. Fehlermeldungen fotografieren)
- **Sprachauswahl** (Deutsch/Englisch)

### Komplex:
- **Offline-Modus** für häufige Fragen
- **Backend mit User-Management**
- **Native iOS App** (statt PWA)

---

## ✅ Zusammenfassung

**Du hast erhalten:**
- ✅ Vollständige, funktionierende PWA
- ✅ Detaillierte Deployment-Anleitung
- ✅ Anleitung für deinen Vater
- ✅ Deployment-Checkliste
- ✅ Dokumentation für GitHub

**Was du tun musst:**
1. GitHub Repository erstellen
2. Dateien hochladen
3. GitHub Pages aktivieren
4. Deinem Vater die URL geben
5. Gemeinsam erstes Setup durchführen

**Zeitaufwand:**
- Deployment: ~15-30 Minuten
- Erstes Setup mit deinem Vater: ~10 Minuten
- Fertig! 🎉

---

**Viel Erfolg mit dem Projekt! 🚗✨**

Bei Fragen: Einfach einen neuen Chat mit mir (Claude) starten!
