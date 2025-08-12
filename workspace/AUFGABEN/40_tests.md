# Testen von React Komponenten mit Vitest "Browser Mode"

# Dateien

- src/components/IntervalSelector.test.tsx (anlegen)

# Aufgabe

* Schreibe Testfälle für die `IntervalSelector`-Komponente

# Schritte

1. Lege die Datei `src/components/IntervalSelector.browsertest.tsx` an
    - Achtung: Auf die Dateiendung `.browsertest.tsx` achten!
2. Implementiere dort eine oder mehrere Testfälle (mit `test` oder `it` von vitest)
    - Tipps:
        - Du kannst parallel die
          `PlantForm` in der fertigen Anwendung offen haben und darin im Browser das Verhalten der
          `IntervalSelector`-Komponente kontrollieren (z.B. wie die Label etc. heißen)
3. Die `IntervalSelector`-Komponente ist eine "kontrollierte" (controlled) Komponente
    - Das bedeutet, sie hat keinen State, sondern informiert ihre Parent-Komponente per Property, wenn sich etwas ändert
    - Du kannst im Test also "nur" testen, ob nach einer Aktion die `onIntervalChange`-Callback-Funktion mit den korrekten Werten aufgerufen wurde.
        - Die Darstellung wird sich aber nicht verändern, denn die Komponente rendert sich ja nicht eu
    - Wenn du das "kontrollierende" Verhalten testen möchtest, kannst du dir eine einfache Wrapper-Komponente schreiben, die einen State hat und die
      `IntervalSelector`-Komponente rendert. Diese Wrapper-Komponente renderst du dann im Test (anstatt direct `IntervalSelector` zu rendern)
4. Du kannst die Tests ausführen:
    - Entweder direkt aus der IDE (in IntelliJ/Webstorm wie gewohnt über die grünen Pfeile neben einem Testfall)
    - Über die Kommandozeile `npm run test:browser`
        - In diesem Fall wird Vitest im "watch"-Modus gestartet, d.h. der Runner wird nach der Ausführung nicht beendet. Sobald du Änderungen im Source-Code machst und speicherst, werden die Tests so automatisch erneut ausgeführt.

# Material

- Vitest: https://vitest.dev/
    - `expect`: https://vitest.dev/api/expect.html
    - Mock functions: https://vitest.dev/api/mock.html
    - assertions for verifying dom elements: https://vitest.dev/guide/browser/assertion-api
- Vitest Browser Mode: https://vitest.dev/guide/browser/
    - Hilfreiche Beispiele für Tests: https://vitest.dev/guide/browser/#examples
- "vitest-browser-react" (Adapter für React-Komponenten mit Vitest Browser Mode): https://github.com/vitest-dev/vitest-browser-react

### Alternative: React Testing Library

Der Vitest "Browser Mode" ist noch experimentell. "Klassisch" werden React-Anwendungen bislang mit der React Testing Library ohne Browser getestet. Die API ist sehr ähnlich zu Vitest Browser Mode. Informationen dazu findest du hier:

- React Testing Library: https://testing-library.com/docs/react-testing-library/intro/
    - Render React components: https://testing-library.com/docs/react-testing-library/api#render
    - Query functions: https://testing-library.com/docs/react-testing-library/cheatsheet#queries
    - User Events: https://testing-library.com/docs/user-event/intro/#writing-tests-with-userevent
    - Common mistakes with React Testing Library (eine Art Best Practice Guide): https://kentcdodds.com/blog/common-mistakes-with-react-testing-library
