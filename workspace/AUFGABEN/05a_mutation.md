# Daten schreiben mit Mutations

# Files

- src/queries.ts
- src/components/ReservationDetailCard.tsx

# Aufgabe

* Implementiere die Mutation zum "Wässern" einer Pflanze

# Schritte

1. Beschreibe die Mutation in `queries.ts`
    - Es gibt eine Funktion `mutationOptions` (vergleichbar mit `queryOptions`)
    - ⛔️ Der Sinn davon wird/wurde heftig diskutiert https://github.com/TanStack/query/discussions/6096, insb. da es 
      für Mutations nur `useMutation` gibt (im Gegensatz zu Queries: `useQuery`, `useSuspenseQuery`, ...)
    - ✅ Implementiere deshalb in `queries.ts` stattdessen einen Custom Hook, der die Mutation ausführt
    - Die Mutation soll für eine angegebene Pflanze (`plantId`) den Endpunkt `http://localhost:7200/api/plants/${plantId}/lastWatered` aufrufen.
      - Die Mutation wird immer für ein Pflanze erzeugt, deswegen muss deine Custom-Hook-Funktion die `plantId` als Argument entgegennehmen
      - HTTP Methode soll `PUT` sein
      - Der Payload ist ein Json-Objekt, das aus dem Feld `lastWatered` besteht.
      - Der Wert für `lastWatered` muss ein Datum im Format `YYYY-MM-DD` sein (`2025-08-19`)
      - Der Wert für `lastWatered` soll als _Variable_ direkt an die Mutation übergeben werden (also nicht an den Hook) 
        - Dazu braucht die `mutationFn` ein Funktionsargument, das den String im Format `YYYY-MM-DD` entgegennnimmt 
        - Warum `lastWatered` als _Variable_ und `plantId` als _Funktionsargument_ des Custom Hooks?
          - Grundsätzlich gehen auch alle anderen Kombinationen
          - Auf diese Weise könntest du einen `mutationKey` für die Mutation einer Pflanze erzeugen und anderen Stellen der Anwendung damit prüfen, ob die Mutation für eine konkrete Pflanze ausgeführt wird.
2. Verwende die Mutation in der Komponente `PlantDetailCard`
    - Hier gibt es bereits Buttons, die aber noch nichts tun, wenn man drauf drückt 😢
    - Wenn man darauf drückt, soll das `lastWatered`-Datum entsprechend verändert werden
    - Wenn du die Mutation mit `mutate` ausführst, muss du ein Datum angeben
      - Das heutige Datum im geforderten Format kannst du mit `getTodayString()` aus `date-utils.ts` erzeugen (oder du denkst dir ein Datum aus)
3. Denk dran, dass die Mutation den Cache aktualisieren muss!
    - Wenn die Mutation ausgeführt wird, wird die Darstellung leider nicht aktualisiert
    - Füge die `onSuccess`-Callback-Funktion in deiner Mutation hinzu und aktualisiere dort mit dem `queryClient` und `setQueryData` den Cache 
    - Wenn der Status aktualisiert wurde, und du wieder auf die Übersichtsseite gehst (per `Home`-Link im App Header), welche Netzwerk Requests werden ausgeführt?
        - Woran liegt das?
4. (Optional, nur wenn Zeit ist): Während die Mutation ausgeführt wird, soll der Button disabled sein
    - Setze dazu `disabled` am `button` auf `true`, während die Mutation läuft
    - Zum Testen kannst du die Mutation mit dem Search Parameter `?slow=2000` künstlich verlangsamen


# Material

- Mutations mit TanStack Query: https://tanstack.com/query/latest/docs/framework/react/guides/mutations
  - `useMutation` API: https://tanstack.com/query/latest/docs/framework/react/reference/useMutation
  - `mutationOptions`: https://tanstack.com/query/latest/docs/framework/react/reference/mutationOptions
    - Die Doku sagt auch einiges über den Stellenwert von `mutationOptions`
- `useQueryClient`: https://tanstack.com/query/latest/docs/framework/react/reference/useQueryClient
  - Cache nach Mutations aktualisieren mit `setQueryData`: https://tanstack.com/query/latest/docs/framework/react/guides/updates-from-mutation-responses#immutability

