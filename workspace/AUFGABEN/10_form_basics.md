# Formulare mit React Hook Form

# Dateien

- src/routes/add.tsx
- src/components/PlantForm.tsx (anlegen)

# Aufgabe

* Baue den ersten Schritt für ein Formular zum Anlegen neuer Pflanzen
    * Ein paar Dinge lassen wir noch weg (z.B. Speichern, Fehlermeldungen anzeigen etc.). Das machen wir später.

# Schritte

1. Lege die Datei `components/PlantForm.tsx` an, in der du das Formular baust
2. Beschreibe mit Zod das Objekt für den State unseres Formulars.
    - `PlantFormState` soll dieselben Eigenschaften haben, wie `Plant`
        - `id` brauchen wir nicht (wird auf dem Server beim Speichern vergeben und nicht im Formular eingegeben)
        - `wateringInterval` brauchen wir noch nicht (unser `IntervalSelector`-Komponente integrieren wir später)
    - Du kannst den Code für den bestehenden `Plant`-Typen einfach in
      `PlantForm.tsx` kopieren und die beiden o.g. Properties entfernen
3. Verwende `useForm` mit dem `zodResolver` für die Formularverwaltung mit dem `PlantFormState`
4. Lege das Formular an
    - Die Root-Komponente muss das `form`-Element sein
    - Darin soll es Eingabemöglichkeiten geben für:
        - `name` (normales `input`-Feld)
        - `location` (`select`-Feld mit einigen ausgedachten Optionen, z.B. unterschiedliche Raum-Namen)
        - `lastWatered` (`input`-Feld mit `type="date"`)
    - Du kannst jedes der Felder in einem `div` wrappen, das die CSS-Klasse `FormControl` bekommt
        - Dann sollte das Layout passen
        - Du kannst außerdem in dem `div` die `label`-Komponente benutzen, um ein Label zu vergeben
    - Verwende die `form.register`-Funktion, um die drei Textfelder in React Hook Form zu registrieren
        - Besonderheit:
            - Das Kalender-Feld liefert einen Leerstring als `value`, wenn kein Datum ausgewählt ist
            - Unser `PlantFormState` erwartet aber `undefined`
              _oder_ ein _gültiges` ISO-Datum (Leerstring) ist nicht erlaubt
            - Du musst das Feld mit der Option `setValueAs` von `register` nach `undefined`
              "konvertieren", wenn der Wert ein Leerstring ist, z.B.
                - `{...form.register("lastWatered", { setValueAs: (value) => (value === "" ? undefined : value) })}`
    - Render einen `submit` Button (Du kannst für das Styling die CSS-Klasse `primary` angeben)
    - Lege eine `handleSave` und `handleError`-Funktion in deiner Komponente an, und verwende diese als
      `onSubmit`-Handler in deinem `form`-Element (mit `handleSubmit` von React Hook Form)
        - Das "richtige" Speichern machen wir später. Im ersten Schritt reicht es, wenn du in `handleSave` und
          `handleError` jeweils nur die Formulardaten bzw. die Fehler mit `console.log` auf die Konsole schreibst
5. Render die die Formular-Komponente in der `add`-Route, so dass du das Formular testen kannst, in dem du auf den entsprechenden Button klickst
# Material

- `useForm`: https://react-hook-form.com/docs/useform
    - resolver: https://react-hook-form.com/docs/useform#resolver
        - `zodResolver`: https://github.com/react-hook-form/resolvers?tab=readme-ov-file#zod
    - `register`: https://react-hook-form.com/docs/useform/register
        - siehe dort auch `setValueAs` für das ISO-Date-Field `lastWatered`
    - `handleSubmit`: https://react-hook-form.com/docs/useform/handlesubmit
