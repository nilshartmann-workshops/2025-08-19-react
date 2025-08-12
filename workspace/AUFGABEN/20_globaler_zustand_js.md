# Globaler Zustand mit zustand.js

# Files

- src/routes/__root.tsx
- src/components/timezone-store.ts (anlegen!)
- src/components/LocaleChooser.tsx
- src/components/use-format-date.ts

# Aufgabe

* Das Locale der Anwendung soll global einstellbar sein
* Das Datum (lastWatered) soll dann entsprechend des Locales angezeigt werden

# Schritte

1. Füge in der Layout-Route unserer Anwendung (`_root.tsx`) die (fast) fertige Komponente `<LocaleChooser />` ein
    - Hierüber soll ein Benutzer sein Locale einstellen können
2. Erstelle einen Zustand Store, der das aktuelle Locale verwaltet
    - Der State soll zwei Eigenschaften haben:
        - Property `locale` als `string` (z. B. `de-DE`)
        - Eine Funktion `setLocale`, die ein `string` mit dem neuen Locale entgegennimmt
    - Wenn `setLocale` aufgerufen wird, soll das Property `locale` im State auf den übergebenen Wert gesetzt werden
3. Verwende den Store in `LocaleChooser`, um das Locale einstellbar zu machen (s. TODOs dort)
4. In
   `use-format-date.ts` musst du das aktuelle Locale auslesen und und verwenden (s. TODOs dort)
    - Wenn du das Locale über die Chooser-Komponente änderst, sollten Datumsangaben ("zuletzt gegossen") entsprechend aktualisiert werden
    - Das sollte in der Liste und in der Einzeldarstellung passieren
5. **Optional**: Erweitere deinen State, um feingranualare Updates zu testen
    - Füge dem State ein weiteres Property inklusive setter-Funktion hinzu (z.B. `counter`)
    - Bau dir eine einfache Hello-World-Komponente und lies dort den `counter` aus
        - Binde die Hello-World-Komponente irgendwo in einer der bestehenden Komponenten ein
            - (z.B. `PlantCardList`)
        - Die Hello-World-Komponente sollte nicht neu gerendert werden, wenn du im Chooser das Locale änderst (ansonsten ist der Selector falsch)
        - Füge in der Hello-World-Komponente einen Button hinzu, der den Counter erhöht
            - Jetzt gilt: wenn sich der Counter erhöht, darf sich die Liste (bzw. die Einzeldarstellung) und auch der TimeChooser nicht neu rendern
        - Das Rendern kannst du mit den React Developer Tools oder `console.log` überprüfen
            - Achtung! Für die React Developer Tools bitte **Chrome** verwenden. Im Firefox sind die Tools zzt. nicht aktuell! 
            - Developer Tools: in den Settings `Highlight when component render` anklicken

# Material

* Zustand: https://zustand.docs.pmnd.rs/
    * Store erzeugen: https://zustand.docs.pmnd.rs/getting-started/introduction#first-create-a-store
    * TypeScript Support: https://zustand.docs.pmnd.rs/guides/typescript
    * State abfragen: https://zustand.docs.pmnd.rs/getting-started/introduction#then-bind-your-components,-and-that's-it!
