# Formulare: Validierung und Fehlermeldungen

# Dateien

- src/components/PlantForm.tsx

# Aufgabe

* Baue den ersten Schritt für ein Formular zum Anlegen neuer Pflanzen
    * Ein paar Dinge lassen wir noch weg (z.B. Speichern, Fehlermeldungen anzeigen etc.). Das machen wir später.

# Aufgabe

* Gib visuelles Feedback aus, wenn die Felder im Formular nicht korrekt befüllt sind

# Schritte

1. Die Text-Felder sollen Fehlermeldungen darstellen
    - die Fehlermeldungen stehen in einem Objekt in `form.formState`
    - Du kannst am `input` bzw. `select` die CSS-Klasse `error` setzen, um einen roten Rahmen anzuzeigen
    - Du kannst die CSS-Klasse `error-message` für den Text einer (roten) Fehlermeldung verwenden
    - Wenn es dir hilfreich erscheint, kannst du dir auch eine eigenen Komponente
      `ErrorMessage` o.ä. anlegen, die die Fehlermeldung anzeigt
        - Die Komponente kannst du in der selben Datei (`PlantForm.tsx`) anlegen, aber _außerhalb_ der Komponente
          `PlantForm`
    - die Fehlermeldungen sollten spätestens angezeigt werden, wenn auf den "Pflanze hinzufügen"-Button gedrückt wird
2. Füge bei mindestensm einem Feld eine eigene Fehlermeldung hinzu
    - Ergänze dazu das zod-Objekt um eine oder mehrere Fehlermeldungen
3. Kannst du einen "Clear" oder "Eingabe löschen"-Button bauen, der das Formular - samt Fehlermeldungen - wieder leer macht?

# Material

- React Hook Form `formState`: https://react-hook-form.com/docs/useform/formstate
- Zod Custom Error Messages: https://zod.dev/error-customization
