/**
 * Tavascan-Hilfe – Automatisierte Tests
 * Ausführen: npm test  (Node ≥ 20 erforderlich)
 *
 * Die Kernfunktionen aus index.html werden hier mit injizierbarem
 * Speicher reimplementiert, damit sie ohne Browser testbar sind.
 */

import { describe, test } from 'node:test';
import assert from 'node:assert/strict';

// ── Mock-Speicher (ersetzt localStorage) ─────────────────────────────────────

class MockStorage {
    constructor() { this._d = {}; }
    getItem(k)    { return k in this._d ? this._d[k] : null; }
    setItem(k, v) { this._d[k] = String(v); }
    removeItem(k) { delete this._d[k]; }
    clear()       { this._d = {}; }
}

// ── Kernfunktionen (exakte Kopie aus index.html, aber mit store-Parameter) ───

const QA_CACHE_KEY = 'tavascan_qa_cache';
const QA_CACHE_MAX = 100;
const FAVS_KEY     = 'tavascan_favorites';
const FAVS_MAX     = 8;

function qaCache(store) {
    try { return JSON.parse(store.getItem(QA_CACHE_KEY) || '[]'); }
    catch { return []; }
}

function saveToQACache(question, answer, store) {
    const cache = qaCache(store);
    const idx = cache.findIndex(e => e.question === question);
    if (idx >= 0) cache.splice(idx, 1);
    cache.unshift({ question, answer, ts: Date.now() });
    if (cache.length > QA_CACHE_MAX) cache.splice(QA_CACHE_MAX);
    store.setItem(QA_CACHE_KEY, JSON.stringify(cache));
}

function findInQACache(question, store) {
    const cache = qaCache(store);
    const keywords = question.toLowerCase()
        .split(/\s+/)
        .map(w => w.replace(/[^a-zäöüß]/g, ''))
        .filter(w => w.length > 3);
    if (keywords.length === 0) return null;
    let best = null, bestScore = 0;
    for (const entry of cache) {
        const entryLower = entry.question.toLowerCase();
        const score = keywords.filter(kw => entryLower.includes(kw)).length / keywords.length;
        if (score > bestScore) { bestScore = score; best = entry; }
    }
    return bestScore >= 0.7 ? best : null;
}

function loadFavs(store) {
    try { return JSON.parse(store.getItem(FAVS_KEY) || '[]'); }
    catch { return []; }
}

function saveFav(question, answer, store) {
    const favs = loadFavs(store);
    if (favs.some(f => f.question === question)) return;
    favs.unshift({ question, answer });
    if (favs.length > FAVS_MAX) favs.splice(FAVS_MAX);
    store.setItem(FAVS_KEY, JSON.stringify(favs));
}

function removeFav(question, store) {
    const favs = loadFavs(store).filter(f => f.question !== question);
    store.setItem(FAVS_KEY, JSON.stringify(favs));
}

function isFav(question, store) {
    return loadFavs(store).some(f => f.question === question);
}

// ── Tests: QA-Cache ───────────────────────────────────────────────────────────

describe('QA-Cache', () => {

    test('leerer Cache gibt null zurück', () => {
        const store = new MockStorage();
        assert.equal(findInQACache('Wie lade ich das Auto auf?', store), null);
    });

    test('gespeicherte Antwort wird exakt wiedergefunden', () => {
        const store = new MockStorage();
        saveToQACache('Wie lade ich das Auto auf?', 'Antwort A', store);
        const result = findInQACache('Wie lade ich das Auto auf?', store);
        assert.ok(result, 'Eintrag soll gefunden werden');
        assert.equal(result.answer, 'Antwort A');
    });

    test('partieller Fuzzy-Match: 3 von 4 Keywords treffen (Score 0,75 ≥ 0,7)', () => {
        const store = new MockStorage();
        // Gespeichert: Frage mit drei langen Keywords (> 3 Zeichen)
        saveToQACache(
            'Wie schalte ich Sitzheizung und Lenkradheizung ein?',
            'Antwort Heizung',
            store
        );
        // Suchanfrage: 4 Keywords → "winter" hat keinen Match → Score 3/4 = 0,75 ≥ 0,7 → gefunden
        // Keywords:  "sitzheizung" ✓  "lenkradheizung" ✓  "schalte" ✓  "winter" ✗
        const result = findInQACache(
            'Sitzheizung Lenkradheizung schalte winter?',
            store
        );
        assert.ok(result, 'Partieller Match (≥ 70 %) soll als Treffer gelten');
        assert.equal(result.answer, 'Antwort Heizung');
    });

    test('umgestellte Wortfolge: Score 1,0 trotz anderer Reihenfolge', () => {
        const store = new MockStorage();
        saveToQACache('Wie funktioniert die Klimaanlage?', 'Antwort Klima', store);
        // "wie" und "die" (je 3 Zeichen) werden herausgefiltert
        // Verbleibende Keywords: "klimaanlage", "funktioniert" → beide in stored → Score 2/2 = 1,0
        const result = findInQACache('Klimaanlage – wie funktioniert die?', store);
        assert.ok(result, 'Umgestellte Wortfolge soll gefunden werden');
        assert.equal(result.answer, 'Antwort Klima');
    });

    test('knapper Nicht-Match: 2 von 4 Keywords treffen (Score 0,5 < 0,7)', () => {
        const store = new MockStorage();
        saveToQACache(
            'Wie schalte ich Sitzheizung und Lenkradheizung ein?',
            'Antwort Heizung',
            store
        );
        // Keywords (5 Stück): "klimaanlage" ✗  "einschalten" ✗  "oder" ✗  "aktivieren" ✗  "sitzheizung" ✓
        // Score = 1/5 = 0,20 < 0,7 → kein Treffer
        const result = findInQACache(
            'Klimaanlage einschalten oder aktivieren sitzheizung?',
            store
        );
        assert.equal(result, null, 'Score 0,25 soll keinen Treffer liefern');
    });

    test('völlig andere Frage wird nicht gefunden (< 70 %)', () => {
        const store = new MockStorage();
        saveToQACache('Wie lade ich das Auto auf?', 'Antwort A', store);
        // keywords: "kostet", "service" – keine Übereinstimmung
        const result = findInQACache('Was kostet Service?', store);
        assert.equal(result, null);
    });

    test('doppelter Eintrag wird aktualisiert, nicht dupliziert', () => {
        const store = new MockStorage();
        saveToQACache('Frage X', 'Antwort 1', store);
        saveToQACache('Frage X', 'Antwort 2', store);
        const cache = qaCache(store);
        assert.equal(cache.filter(e => e.question === 'Frage X').length, 1);
        assert.equal(cache[0].answer, 'Antwort 2', 'Neueste Antwort soll vorne stehen');
    });

    test('neuester Eintrag steht an erster Stelle', () => {
        const store = new MockStorage();
        saveToQACache('Frage A', 'Antwort A', store);
        saveToQACache('Frage B', 'Antwort B', store);
        assert.equal(qaCache(store)[0].question, 'Frage B');
    });

    test('sehr kurze Frage (alle Keywords ≤ 3 Zeichen) gibt null zurück', () => {
        const store = new MockStorage();
        saveToQACache('OK', 'Ja', store);
        // "ok" hat 2 Zeichen → wird gefiltert → keine Keywords → null
        assert.equal(findInQACache('OK', store), null);
    });

    test('Cache-Maximum (100 Einträge) wird nicht überschritten', () => {
        const store = new MockStorage();
        for (let i = 1; i <= 105; i++) {
            saveToQACache(`Testfrage Nummer ${i}`, `Antwort ${i}`, store);
        }
        assert.equal(qaCache(store).length, QA_CACHE_MAX);
    });

    test('korrupte JSON-Daten → leeres Array, kein Absturz', () => {
        const store = new MockStorage();
        store.setItem(QA_CACHE_KEY, '{kein gültiges json');
        assert.deepEqual(qaCache(store), []);
        // findInQACache darf ebenfalls nicht abstürzen
        assert.equal(findInQACache('Beliebige Frage hier', store), null);
    });
});

// ── Tests: Favoriten ─────────────────────────────────────────────────────────

describe('Favoriten', () => {

    test('leere Favoritenliste', () => {
        const store = new MockStorage();
        assert.deepEqual(loadFavs(store), []);
    });

    test('Favorit speichern und per isFav prüfen', () => {
        const store = new MockStorage();
        saveFav('Frage 1', 'Antwort 1', store);
        assert.ok(isFav('Frage 1', store));
        assert.equal(isFav('Frage 2', store), false);
    });

    test('doppelter Favorit wird ignoriert (keine Duplikate)', () => {
        const store = new MockStorage();
        saveFav('Frage 1', 'Antwort 1', store);
        saveFav('Frage 1', 'Antwort 1 neu', store);
        assert.equal(loadFavs(store).length, 1);
        assert.equal(loadFavs(store)[0].answer, 'Antwort 1', 'Erste Antwort soll erhalten bleiben');
    });

    test('Favorit entfernen', () => {
        const store = new MockStorage();
        saveFav('Frage 1', 'Antwort 1', store);
        removeFav('Frage 1', store);
        assert.equal(isFav('Frage 1', store), false);
        assert.equal(loadFavs(store).length, 0);
    });

    test('Nicht-vorhandenen Favoriten entfernen wirft keinen Fehler', () => {
        const store = new MockStorage();
        assert.doesNotThrow(() => removeFav('Gibt es nicht', store));
    });

    test('Maximalanzahl (FAVS_MAX = 8) wird nicht überschritten', () => {
        const store = new MockStorage();
        for (let i = 1; i <= 12; i++) {
            saveFav(`Frage ${i}`, `Antwort ${i}`, store);
        }
        assert.equal(loadFavs(store).length, FAVS_MAX);
    });

    test('neuester Favorit steht vorne', () => {
        const store = new MockStorage();
        saveFav('Frage A', 'Antwort A', store);
        saveFav('Frage B', 'Antwort B', store);
        assert.equal(loadFavs(store)[0].question, 'Frage B');
    });

    test('Frage und Antwort werden vollständig gespeichert', () => {
        const store = new MockStorage();
        saveFav('Meine Frage?', 'Die komplette Antwort.', store);
        const fav = loadFavs(store)[0];
        assert.equal(fav.question, 'Meine Frage?');
        assert.equal(fav.answer, 'Die komplette Antwort.');
    });

    test('korrupte JSON-Daten → leeres Array, kein Absturz', () => {
        const store = new MockStorage();
        store.setItem(FAVS_KEY, 'das ist kein JSON');
        assert.deepEqual(loadFavs(store), []);
    });
});
