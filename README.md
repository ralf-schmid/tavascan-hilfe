# 🚗 Cupra Tavascan Assistent

Eine Progressive Web App (PWA) für den Cupra Tavascan — per Sprache oder Foto Fragen zur Bedienung stellen, Claude antwortet aus der Original-Bedienungsanleitung.

## 🎯 Features

- 🎤 **Sprachsteuerung:** Fragen per Mikrofon stellen, Antworten per Text-to-Speech (iOS-optimiert)
- 📷 **Foto-Analyse:** Fehlermeldungen oder Displayanzeigen fotografieren → Claude erklärt und sagt, was zu tun ist
- 🌍 **Zweisprachig:** Deutsch und Englisch – Sprache im Setup wählbar (Spracherkennung, TTS und Antworten)
- 🔊 **Sprachausgabe optional:** TTS per Toggle im Setup ein-/ausschalten
- 📱 **PWA:** Installierbar wie eine native App auf dem iPhone
- 📄 **Anleitung als Wissensbasis:** Markdown-Bedienungsanleitung direkt aus dem Repo
- 💾 **Offline Q&A Cache:** Häufige Fragen werden lokal gespeichert und sofort beantwortet
- 📋 **Gesprächsexport:** Konversation als TXT-Datei herunterladen (im Setup)
- 🌓 **Dark/Light Mode:** Umschaltbar per Knopfdruck, Einstellung wird gespeichert
- ⭐ **Favoriten:** Antworten mit Stern markieren → als Schnellzugriff-Chips abrufbar
- 🔒 **Lokal gespeichert:** API Key, Spracheinstellung, Cache und Favoriten bleiben auf dem Gerät

## 🚀 Live Demo

Die App ist live unter: **[https://ralf-schmid.github.io/tavascan-hilfe/](https://ralf-schmid.github.io/tavascan-hilfe/)**

> ⚠️ Du benötigst einen Claude API Key von [Anthropic](https://console.anthropic.com/)

## 📋 Voraussetzungen

- iPhone mit iOS 14.5 oder neuer (empfohlen: Safari)
- Claude API Key (ab $5 Guthaben bei Anthropic)

## 🔧 Installation

### Für Endnutzer

1. **Öffne die App-URL** in Safari auf dem iPhone
2. **Setup durchführen:** ⚙️ tippen → API Key eintragen → Sprache & TTS wählen → Speichern
3. **Zum Home-Bildschirm hinzufügen:** Teilen-Symbol → „Zum Home-Bildschirm"
4. **Fragen per Sprache:** Mikrofon-Button 🎤 drücken und Frage stellen
5. **Fragen per Foto:** Kamera-Button 📷 drücken → Foto machen oder aus Galerie wählen

### Für Entwickler

Siehe [GITHUB_DEPLOYMENT.md](GITHUB_DEPLOYMENT.md) für detaillierte Anleitung.

## 💰 Kosten

- **Hosting:** Kostenlos (GitHub Pages)
- **Claude API:**
  - Textfrage: ~$0.02–0.10
  - Foto-Analyse (Vision): ~$0.05–0.20 je nach Bildgröße
  - Erwartete Kosten: ~$2–15/Monat bei 100 Anfragen

**Tipp:** Setze ein Budget-Limit in der Anthropic Console!

## 🛠️ Technologie-Stack

- **Frontend:** Vanilla JavaScript, HTML5, CSS3
- **PWA:** Service Worker, Web App Manifest
- **Speech:** Web Speech API (Speech Recognition + Text-to-Speech)
- **Vision:** Claude Vision API (Base64-Bildübertragung, kein eigener Server)
- **AI:** Anthropic Claude API (claude-sonnet-4-20250514)
- **Hosting:** GitHub Pages

## 🎨 Anpassungen

### System-Prompt ändern

Der Prompt ist optimiert für einen 75-jährigen Nutzer mit wenig Geduld:
- Kurze, direkte Antworten (max 2-3 Sätze)
- Schritt-für-Schritt Anleitungen
- Einfache Sprache ohne Fachbegriffe

Anpassen in `index.html` in der Funktion `getSystemPrompt()`.

### Design anpassen

Farben ändern:
```css
--bg-start: #1a1a2e;          /* Hintergrund oben */
--bg-end:   #16213e;          /* Hintergrund unten */
--text:     white;            /* Textfarbe (dark mode) */
```

### Icons ändern

Ersetze `icon-192.png` und `icon-512.png` mit deinen eigenen Icons.

## 📱 Browser-Kompatibilität

| Feature | Safari iOS | Chrome Android | Firefox |
|---------|-----------|----------------|---------|
| PWA Installation | ✅ | ✅ | ⚠️ |
| Spracherkennung | ✅ | ✅ | ❌ |
| Text-to-Speech | ✅ | ✅ | ✅ |
| Foto hochladen | ✅ | ✅ | ✅ |
| Kamera direkt | ✅ | ✅ | ✅ |

**Empfohlen:** Safari auf iOS für beste Erfahrung

## 🐛 Bekannte Probleme

- Speech Recognition funktioniert nur über HTTPS
- iOS erlaubt Speech Recognition nur in Safari
- TTS auf iOS benötigt expliziten Button-Klick zum Entsperren (wird automatisch gehandhabt)
- Fotos werden vor dem Upload auf max. 1920 px / JPEG komprimiert (Claude-API-Limit: 5 MB)
- Gesprächskontext: Die letzten 10 Fragen/Antworten werden mitgeschickt, ältere werden verworfen

## 🔒 Sicherheit

- API Key wird lokal im Browser gespeichert (localStorage)
- Q&A Cache wird lokal gespeichert (bis zu 100 Einträge)
- Keine Daten werden an externe Server gesendet (außer Anthropic API)
- Empfehlung: Separaten API Key mit Budget-Limit verwenden

## 📊 Monitoring

### API-Nutzung überwachen

1. Gehe zu: https://console.anthropic.com/settings/usage
2. Setze Budget Limits
3. Aktiviere Email Alerts

### Fehler-Logs

Öffne Developer Console in Safari:
- Einstellungen → Safari → Erweitert → Web-Inspektor

## 🚧 Roadmap

- [x] Favoriten/Schnellzugriff – Antworten per ⭐ merken, als Chip-Button abrufen
- [x] Bilder hochladen – Fehlermeldungen fotografieren, Claude analysiert und erklärt
- [x] Sprachausgabe per Toggle ein-/ausschaltbar
- [x] Conversation History Export (TXT-Download im Setup)
- [x] Mehrsprachigkeit DE/EN (Spracherkennung, TTS, Antworten)
- [x] Dark/Light Mode Toggle
- [x] Offline-Antworten für häufige Fragen (Q&A Cache im localStorage)

## 🤝 Beitragen

Contributions sind willkommen! Bitte:

1. Fork das Repository
2. Erstelle einen Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit deine Änderungen (`git commit -m 'Add AmazingFeature'`)
4. Push zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

## 📝 Lizenz

MIT License - siehe [LICENSE](LICENSE) für Details.

## 🙏 Credits

- **Claude AI** von [Anthropic](https://www.anthropic.com/)
- **Icons:** Erstellt mit PIL/Pillow
- **Entwickelt für:** Horst's Cupra Tavascan

## 📞 Support

Bei Fragen oder Problemen:
- GitHub Issues öffnen
- Anthropic Support: https://support.anthropic.com/

---

**Entwickelt mit ❤️ für einfache Bedienung im Alter**
