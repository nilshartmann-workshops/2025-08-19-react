# Vorbereitung

## Schritt 1: Starten des Backends

- Bitte stelle sicher, dass dein Backend-Prozess läuft!
- Dazu im `backend`-Verzeichnis dieses Repositories das npm-Script `start` ausführen
    - `npm run backend`
- Der Server läuft auf http://localhost:7200
- Du kannst prüfen, ob er läuft, in dem Du http://localhost:7200/api/plants im Browser öffnest
    - Dann sollte eine Liste von JSON-Objekten zurückgeliefert werden


## Schritt 2: Starten des Frontends
- Stelle Sie sicher, dass der Vite Development Server läuft.
- Um den Server zu starten, kannst du das `dev`-Script aus der
  `package.json`-Datei im Root-Verzeichnis des Repositories ausführen:
    - `npm run dev`
- Der Server läuft dann auf Port 3000 laufen.
- **Hinweis:** Wenn der Server läuft und du **Dateien speicherst
  **, sollte die Anzeige im Browser automatisch aktualisiert werden.
    - Falls das nicht funktioniert, lade die Seite im Browser neu
    - Normalerweise musst du den Server nicht neu starten.

# Hintergrund: CSS im Workspace

- Im Workspace ist Tailwind installiert und es gibt ein paar fertige CSS-Klassen
  - siehe dazu `index.css`
    - Das entspricht _nicht_ den Best Practice von Tailwind - ist sogar eher ein Anti-Pattern
    - Für das Arbeiten im Workshop finde ich diesen "hybrid"-Ansatz mit `@apply` aber legitim
  - Du kannst in den Übungen die fertigen Klassen verwenden, oder selbst Tailwind Utility Klassen verwenden 
  - Wenn du kein Tailwind verwenden willst, kannst du alles in `src/index.css` löschen.
      - Dann kannst du darin eigene CSS-Klassen schreiben.
      - Alternativ kannst du dein eigenes CSS in einzelne Dateien aufteilen. Erstelle hierfür eine oder mehrere
        `.css`-Dateien und importiere diese in eine oder mehrere Komponenten, z. B. `import './PlantCard.css';`.
- Egal, ob du Tailwind oder eigenes CSS verwendest: Anstelle von `class` musst du in React das Attribut
  `className` verwenden, um CSS-Klassen festzulegen (https://react.dev/learn#adding-styles).
- Um Inline-Styles (`style`-Property) zu verwenden, musst du in React ein Objekt übergeben.
    - Siehe hier: https://react.dev/learn/javascript-in-jsx-with-curly-braces#using-double-curlies-css-and-other-objects-in-jsx