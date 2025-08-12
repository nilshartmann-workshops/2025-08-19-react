# Suspense Boundaries und Background Fetching

# Files

- src/queries.ts
- src/routes/index.tsx

# Aufgabe

* Baue Feedback ein, um anzuzeigen, dass Daten geladen werden

# Verzögern der Queries

Um zu testen, ob die Suspense Boundaries und andere Loading Indicatoren richtig funktionieren, müssen die Queries natürlich entsprechend langsam sein.
Dazu gibt es zwei Möglichkeiten:
1. Du kannst in `queries.ts` jeden Query künstlich langsam machen, indem du den Search Parameter `?slow=2000` anhängst (statt der `2000` kannst du jede andere Zahl eintragen. Die Zahl gibt eine Zeit in Millisekunden an, die der Query verzögert wird). Achtung! Beim Listen-Query haben wir schon einen Search-Parameter, d.h. du musst `&slow=2000` _hinzufügen_.
2. In den TanStack Query Devtools kannst du einen Cache-Eintrag anklicken und in den Details in der rechten Spalte dann "Trigger Loading" anklicken. Dann bleibt der Query solange im Loading-Zustand bis du auf "Restore Loading" klickst

# Schritte

1. Baue Suspense Boundaries ein, damit der Benutzer ein Feedback bekommt, während die Liste der Pflanzen geladen wird wird
    - Als `fallback`-Komponente kannst Du die Komponente `PlantCardListPlaceholder` verwenden
2. Wenn die Daten für die Tabelle im Hintergrund _aktualisiert_ werden (refetching), gib ebenfalls visuelles Feedback aus

# Material

- React Suspense Komponente: https://react.dev/reference/react/Suspense
- Fetching Indicators: https://tanstack.com/query/latest/docs/framework/react/guides/background-fetching-indicators
