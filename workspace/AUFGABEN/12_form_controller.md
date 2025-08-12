# Verwenden einer nicht-React-Hook-Form-kompatiblen Komponente

# Files

- src/components/PlantForm.tsx

# Aufgabe

* Erweitere das Formular mit der `IntervalSelector`-Komponente, damit man das Gießinterval festlegen kann

# Schritte

1. Erweitere dein zod-Schema für das Formular um das `wateringInterval`-Feld
    - Das Feld muss eine Zahl sein (mind. 1, genauso wie im
      `Plant`-Typ. Du kannst die Beschreibung des Feldes aus deinem `Plant`-Typ kopieren)
2. Binde die `IntervalSelector`-Komponente im Formular ein
    - Die `IntervalSelector`-Komponente erwartet zwei Properties:
        - `interval`, aktuell ausgewählter Interval
        -
        `onIntervalChange`: Callback-Funktion, die aufgerufen wird, wenn ein neuer Interval eingegeben wird (Parameter: neuer
        `interval`)
    - Da die API dieser Komponenten nicht mit der `register`-Funktion von React Hook Form kompatibel ist, musst du die
      `Controller`-Komponente von React Hook Form verwenden, um die Komponente für unser Formular zu adaptieren.
    - Wenn das Feld einen Fehler hat, zeige eine Fehlermeldung an. Dazu kannst du dem
      `IntervalSelector` die Fehlermeldung im `error`-Property übergeben
3. Wenn du die `IntervalSelector`-Komponente mit der
   `Controller`-Komponente verbunden hast und die Auswahl funktioniert, überprüfe:
    - wird eine Fehlermeldung angezeigt, wenn du das Formular abschickst, aber kein Interval ausgewählt hast?
    - wenn das Formular korrekt ausgefüllt und submitted ist, wird in den Formular-Daten auf der Konsole das Interval angezeigt?
    - Gibt es auf der Browser Konsole Fehler/Warnungen?

- React Hook Form `Controller` Komponente: https://react-hook-form.com/docs/usecontroller/controller
    - Für uns insbesondere wichtig:
        - `name`
        - `control`
        - und `render` (von den `render`-Parametern brauchst du `field` und `fieldState`)
