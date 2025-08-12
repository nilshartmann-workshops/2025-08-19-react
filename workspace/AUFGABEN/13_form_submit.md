# Formular speichern

# Dateien

- src/queries.ts
- src/components/PlantForm.tsx

# Aufgabe

- Speicher die Daten aus dem Formular mit einer Mutation aus der "TanStack Query" Bibliothek

# Schritte

1. Erzeuge in `queries.ts` einen neuen Custom-Hook mit einer Mutation zum Speichern der Formulardaten
    - Die Daten des Formulars kannst du 1:1 so auf den Server speichern
    - Verwende dazu den Endpunkt "http://localhost:7200/api/plants" mit einem POST Request
        - Der Body sind die Daten aus dem Formular
        - Wenn du ky verwendest, kannst du die Eigenschaft `json` setzen
        - Wenn du fetch verwendest, musst du `body` verwenden und das Objekt selbst in einen String verwandeln (
          `JSON.stringify()`)
            - Außerdem musst dann selbst den HTTP Header `content-type` auf `application/json` setzen
2. Führe die Mutation im Formular aus, wenn auf den Speichern-Button gedrückt wird (`handleSave`-Funktion)
3. Gib Feedback im Formular aus
    - Wenn das Speichern erfolgreich war, zeige eine entsprechende Meldung unter dem Formular an (Du kannst die CSS-Klasse
      `success-message` verwenden)
    - Wenn das Speichern nicht geklappt hat, zeige eine Fehlermeldung an (CSS-Klasse `error-message`)
        - Du kannst einen Fehler im Server simulieren, in dem du einen Pflanzennamen nur in Großbuchstaben eingibst

# Material

- TanStack Query Bibliothek: https://tanstack.com/query/latest/docs/framework/react/overview
- Mutations mit TanStack Query: https://tanstack.com/query/latest/docs/framework/react/guides/mutations
- `useMutation` (https://tanstack.com/query/latest/docs/framework/react/reference/useMutation#usemutation)
    - insb. `mutate`, `reset`, `isError`, `isSuccess`, `isPending`
- Queries nach einer Mutation invalidieren: https://tanstack.com/query/latest/docs/framework/react/guides/invalidations-from-mutations
- QueryClient: https://tanstack.com/query/latest/docs/reference/QueryClient#queryclientinvalidatequeries
- useQueryClient: https://tanstack.com/query/latest/docs/framework/react/reference/useQueryClient
