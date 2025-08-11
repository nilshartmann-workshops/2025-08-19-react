# Daten lesen mit TanStack Query, Teil 2

# Dateien

- src/queries.tsx
- src/routes/index.tsx

# Aufgabe

- Lies eine einzelne Pflanze vom Backend

# Schritte

1. Erweitere die `PlantCard`-Komponente (`src/components/PlantCard.tsx`)
    - Diese Komponente rendert jeweile eine Pflanze in der Pflanzenliste (`/`-Route)
    - Render dort einen `Link` der auf die Einzeldarstellung (`/$plantId`) der Pflanze zeigt
    - (z.B. um den `h2`-Titel)
2. Definiere die `queryOptions` für den Query zum Laden einer einzelnen Pflanze in `src/queries.ts`
    - Schreibe und exportiere die Funktion `getPlantOpts`
    - Verwende die `queryOptions`-Funktion von TanStack Query, um die Optionen zu definieren:
        - `queryKey`: Was kann ein sinnvoller Query-Key sein? Aus welchen Teilen sollte er bestehen?
        - `queryFn`: Hier musst du die Daten vom Backend laden:
            - Die URL ist `http://localhost:7200/api/plants/PLANT_ID`
            - Der TypeScript-Type für die zurückgelieferte Pflanze ist `Plant` (aus `src/types.ts`)
3. Zeige die Pflanze in der `$plantId`-Route an (`index.tsx`)
    - Das Laden der Daten soll in der Komponente `PlantDetailsCard` (`src/components/PlantDetailsCard.tsx`) passieren
        - Diese Komponente erwartet als Property eine `plantId`, die du aus der Routen-Komponente übergeben musst
        - Verwende in `PlantDetailsCard` einen Suspense-Query mit deinen `getPlantOpts`, um die Pflanze zu lesen
        - (s. TODOs dort)
    - Die Navigation von Liste zu Einzeldarstellung sollte jetzt funktionieren
    - Über den globalen "Home"-Link solltest du jederzeit wieder zur Einzeldarstellung zurückkommen
4. Öffne den Netzwerk-Tab
    - Was passiert, wenn du durch die Anwendung navigierst? 🕵️‍♂️
   

