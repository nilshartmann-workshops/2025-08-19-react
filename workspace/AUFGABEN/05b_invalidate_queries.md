# TanStack Query Cache aktualisieren

# Files

- src/queries.ts
- src/components/PlantCard.tsx

# Aufgabe

* Aktualisiere die Pflanzen-Liste, wenn eine Pflanze gegossen wurde

# Hintergrund: React Query Developer Tools

- Um den Inhalt des Caches zu sehen, kannst du die **React Query Developer Tools** aktivieren
    - Dazu fügst du beim `render` in `main.tsx` unterhalb der `QueryClientProvider`-Komponente als Kind ein:
        - `<ReactQueryDevtools />`
    - Die Developer Tools werden als kleine "Insel" in der Anwendung angezeigt. Du kannst darauf klicken, um den Cache zu untersuchen.
    - Die Developer Tools werden in einem Produktionsbuild übrigens automatisch entfernt.

# Schritte

1. Vervollständige die `PlantCard`-Komponente
    - Verwende auch hier die `useWaterPlantMutation`-Mutation um die Pflanze zu "wässern"
    - Füge dazu einen Button in der Komponente ein. Wenn man darauf klickt, soll die Mutation ausgeführt werden.
2. Auch hier haben wir nun das Problem, dass die Darstellung nicht aktualisiert wird
    - Überarbeite also die `onSuccess`-Callback-Funktion deiner Mutation um die Daten in den Pflanzen_listen_ zu aktualisieren
    - Klicke vor dem Ausführen der Mutation einmal auf alle "Sortieren"-Buttons, um den Cache zu befüllen
    - Zum Aktualisieren des Caches kannst du `invalidateQueries` am `queryClient` aufrufen und einen `queryKey` übergeben
      - Der angegebene Query-Key muss nicht "komplett" sein. Alle Queries im Cache, die mit den Segmenten anfangen, die du hier angibst werden invalidiert
        - Welchen Query-Key gibst du hier am besten an?
        - Welche Queries werden nun wann ausgeführt?

# Material

- TanStack Query Devtools: https://tanstack.com/query/latest/docs/framework/react/devtools
- Queries invalidieren: https://tanstack.com/query/latest/docs/framework/react/guides/invalidations-from-mutations
- `invalidateQueries`: https://tanstack.com/query/latest/docs/reference/QueryClient#queryclientinvalidatequeries
- In der useClient-Doku findest du Informationen zum refetching: https://tanstack.com/query/latest/docs/framework/react/reference/useQuery
    - Die Optionen kannst du auch bei useSuspenseQuery verwenden und auch global in den Query Client-Einstellungen (
      `create-query-client.tsx`)

