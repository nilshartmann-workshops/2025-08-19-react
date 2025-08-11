# Daten Validieren mit "zod"

# Dateien

- src/components/types.ts
- src/components/types.test.ts (bekommst du von mir)

# Aufgabe

- Im weiteren Verlauf der Entwicklung wollen wir `Plant`-Daten validieren:
    - um sicherzustellen, dass die Daten in einem Formular gültig sind
    - um sicherzustellen, dass Daten, die vom Backend gelesen werden, gültig sind
- Beschreibe deshalb den `Plant` Typ mit zod

# Schritte

1. Beschreibe den `Plant`-Type in `types.ts` mit zod
    - Achtung! **Wir verwenden zod v4**. Der Import des `z`-Objektes muss so aussehen:
        * ```typescript
          import { z } from "zod/v4"; // <--- Achtung "/v4" benutzen!
          ```
    - Die Properties entsprechen denen des TypeScript-Typen
    - zusätzlich:
        - `name` und `location` sollen nicht leer sein dürfen
        - `lastWatered`: soll optional sein (d.h. `undefined` ist erlaubt)
          _oder_ ein String im ISO Date-Format (YYYY-MM-DD)
        - `wateringInterval` soll eine Zahl >= 1 sein (`wateringInterval` von 0 oder kleiner macht keinen Sinn)
    - exportiere den beschriebenen Typen
2. Lass dir von zod mit `infer` den TypeScript-Typen erzeugen
    - `export type Plant = z.infer<typeof Plant>;`
    - Den "handgeschriebenen" TypeScript-Typen `Plant` brauchst du dann nicht mehr
3. Wenn du alles richtig gemacht hast, sollte deine Anwendung weiterhin ohne TypeScript-Fehler sein
    - Prüfe das, in dem du z.B. die `PlantDetailsCard` und `PlantCardList`-Komponenten öffnest, in denen der `Plant`-Typ verwendet wird
4. Kopiere die Datei `types.test.ts` von mir in deinen Workspace (ins `src/`-Verzeichnis)
    - Die Tests darin kannst du von der Kommandozeile mit `npm run test:zod` ausführen
        - Der Testrunner beendet sich dabei nicht. Immer wenn du Änderungen machst und speicherst, werden die Tests automatisch neu ausgeführt.
    - Alternativ kannst du die Tests auch aus deiner IDE ausführen (IntelliJ:
      `Run`-Menü mit rechter Maustaste oder grüne Dreiecke in der Test-Datei anklicken)
5. Validiere die vom Server gelesenen Daten
    - Verwende die `parse`-Methode deines `Plant` zod-Objektes in `queries.ts` um die Rückgabe-Werte zu validieren
      - Du kannst das Typ-Argument von `json()` entfernen
      - Übergib den gelesenen Wert stattdessen an `parse` und liefer das Ergebnis zurück
      - Achte auf `await` beim Lesen der Daten :-)
      - 

# Material

* TypeScript
    * Funktionssignaturen beschreiben: https://www.typescriptlang.org/docs/handbook/2/functions.html#function-type-expressions
    * `null` and `undefined`: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#null-and-undefined
* React
    * explizite Typ-Angaben für `useState`: https://react.dev/learn/typescript#typing-usestate
    * State zwischen Komponenten teilen: https://react.dev/learn/sharing-state-between-components
    * "Controlled and uncontrolled components": https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components

# Material

- zod: https://zod.dev/
    - zod v4: https://zod.dev/v4
    - Why `zod/v4` in import: https://github.com/colinhacks/zod/issues/4371
- basic usage: https://zod.dev/basics
- define schemas: https://zod.dev/api
- iso dates: https://zod.dev/api#iso-dates
- infering typescript types: https://zod.dev/basics?id=inferring-types
- parse function: https://zod.dev/basics?id=parsing-data
