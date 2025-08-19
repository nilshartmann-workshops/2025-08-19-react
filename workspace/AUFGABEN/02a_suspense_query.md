# Daten lesen mit TanStack Query

# Dateien
- src/queries.ts (<- anlegen!)
- src/routes/index.tsx

# Aufgabe

- Lade die Liste der Pflanzen vom Backend

# Schritte

1. Definiere die `queryOptions` für den Query in der (neuen) Datei `src/queries.ts`
    - Schreibe und exportiere die Funktion `getPlantListOpts`
    - Verwende die `queryOptions`-Funktion von TanStack Query, um die Optionen zu definieren:
      - `queryKey`: Was kann ein sinnvoller Query-Key sein? Aus welchen Teilen sollte er bestehen
      - `queryFn`: Hier musst du die Daten vom Backend laden:
        - Die URL ist `http://localhost:7200/api/plants`
        - Der TypeScript-Type für die zurückgelieferte Liste ist `Plant[]` (aus `src/types.ts`)
      - Zum Laden der Daten kannst du fetch oder ky benutzen (oder jede andere Bibliothek, die HTTP Requests ausführen kann)
2. Zeige die gelesene Liste in der `/`-Route an (`index.tsx`)
    - Verwende einen Suspense-Query mit deinen `getPlantListOpts`, um die Pflanzenliste zu lesen
    - Zur Darstellung der Liste kannst du die fertige Komponente `PlantCardList` (`src/components/PlantCardList.tsx`) verwenden
   

# Material

## ky und fetch

Zum Laden der Daten kannst du `ky` (im Workspace installiert) oder `fetch` (Browser API) verwenden:
- **ky** library for data fetching: https://github.com/sindresorhus/ky
  - Bei `ky` kannst du die `json`-Funktion nutzen, um die gelesenen Daten als JavaScript-Objekte zu bekommen.
  - Du musst dann dort die TypeScript-Typ-Angabe hinschreiben: `.json<Plant[]>()`
- `fetch` API im Browser:
    - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
    - Beispiele: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch


## TanStack Query
- TanStack Query Bibliothek: https://tanstack.com/query/latest/docs/framework/react/overview
    - Devtools: https://tanstack.com/query/latest/docs/framework/react/devtools
- Queries with TanStack Query: https://tanstack.com/query/latest/docs/framework/react/guides/queries
- Query Function `queryFn`: https://tanstack.com/query/latest/docs/framework/react/guides/query-functions
- Query Key `queryKey`: https://tanstack.com/query/latest/docs/framework/react/guides/query-keys
- `useSuspenseQuery`: https://tanstack.com/query/latest/docs/framework/react/reference/useSuspenseQuery

