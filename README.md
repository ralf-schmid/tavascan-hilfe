# 🚗 Cupra Tavascan Sprachassistent

Eine Progressive Web App (PWA) für den Cupra Tavascan, die per Sprachsteuerung Fragen zur Bedienung des Fahrzeugs beantwortet.

## 🎯 Features

- 🎤 **Sprachsteuerung:** Fragen per Mikrofon stellen, Antworten per Text-to-Speech (iOS-optimiert)
- 🌍 **Zweisprachig:** Deutsch und Englisch – Sprache im Setup wählbar (Spracherkennung, TTS und Antworten)
- 📱 **PWA:** Installierbar wie eine native App auf dem iPhone
- 📄 **Anleitung als Wissensbasis:** Markdown-Bedienungsanleitung direkt aus dem Repo
- 💾 **Offline Q&A Cache:** Häufige Fragen werden lokal gespeichert und sofort beantwortet
- 📋 **Gesprächsexport:** Konversation als TXT-Datei herunterladen (im Setup)
- 🌓 **Dark/Light Mode:** Umschaltbar per Knopfdruck, Einstellung wird gespeichert
- 🔒 **Lokal gespeichert:** API Key, Spracheinstellung und Cache bleiben auf dem Gerät

## 🚀 Live Demo

Die App ist live unter: **[DEINE-URL-HIER]**

> ⚠️ Du benötigst einen Claude API Key von [Anthropic](https://console.anthropic.com/)

## 📋 Voraussetzungen

- iPhone mit iOS 14.5 oder neuer (empfohlen: Safari)
- Claude API Key (ab $5 Guthaben bei Anthropic)

## 🔧 Installation

### Für Endnutzer

1. **Öffne die App-URL** in Safari auf dem iPhone
2. **Setup durchführen:** ⚙️ tippen → API Key eintragen → Sprache wählen → Speichern
3. **Zum Home-Bildschirm hinzufügen:** Teilen-Symbol → „Zum Home-Bildschirm"
4. **Fertig!** Mikrofon-Button drücken und Frage stellen

### Für Entwickler

Siehe [GITHUB_DEPLOYMENT.md](GITHUB_DEPLOYMENT.md) für detaillierte Anleitung.

## 💰 Kosten

- **Hosting:** Kostenlos (GitHub Pages)
- **Claude API:**
  - Pro Anfrage: ~$0.02-0.10
  - Mit Prompt Caching: 90% günstiger
  - Erwartete Kosten: ~$2-10/Monat bei 100 Fragen

**Tipp:** Setze ein Budget-Limit in der Anthropic Console!

## 🛠️ Technologie-Stack

- **Frontend:** Vanilla JavaScript, HTML5, CSS3
- **PWA:** Service Worker, Web App Manifest
- **Speech:** Web Speech API (Speech Recognition + Text-to-Speech)
- **AI:** Anthropic Claude API (Sonnet 4)
- **Hosting:** GitHub Pages

## 🎨 Anpassungen

### System-Prompt ändern

Der Prompt ist optimiert für einen 75-jährigen Nutzer mit wenig Geduld:
- Kurze, direkte Antworten (max 2-3 Sätze)
- Schritt-für-Schritt Anleitungen
- Einfache Sprache ohne Fachbegriffe

Anpassen in `index.html`, Zeile ~280.

### Design anpassen

Farben ändern:
```css
--primary-color: #e94560;     /* Hauptfarbe */
--background: #1a1a2e;        /* Hintergrund */
--accent: #4ecca3;            /* Akzentfarbe */
```

### Icons ändern

Ersetze `icon-192.png` und `icon-512.png` mit deinen eigenen Icons.

## 📱 Browser-Kompatibilität

| Feature | Safari iOS | Chrome Android | Firefox |
|---------|-----------|----------------|---------|
| PWA Installation | ✅ | ✅ | ⚠️ |
| Speech Recognition | ✅ | ✅ | ❌ |
| Text-to-Speech | ✅ | ✅ | ✅ |
| PDF Upload | ✅ | ✅ | ✅ |

**Empfohlen:** Safari auf iOS für beste Erfahrung

## 🐛 Bekannte Probleme

- Speech Recognition funktioniert nur über HTTPS
- iOS erlaubt Speech Recognition nur in Safari
- TTS auf iOS benötigt expliziten Button-Klick zum Entsperren (wird automatisch gehandhabt)
- Service Worker Cache ist begrenzt (~50 MB)

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

- [ ] Favoriten/Schnellzugriff
- [ ] Bilder hochladen (z.B. Fehlermeldungen fotografieren)
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
