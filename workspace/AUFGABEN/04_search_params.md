# Typsichere Suchparamter in TanStack Router

# Files

- Einfach meine Änderungen übernehmen:
- src/queries.ts
- src/routes/index.tsx

# Aufgabe

* Die Pflanzenliste soll sortierbar sein. Das Sortierkriterium soll in der URL stehen und dann an den Backend API-Aufruf
  weitergegeben werden.

# Schritte

1. Lege ein zod `object`-Schema für die Search Params der `/`-Route (in `routes/index.tsx`) an
    - Beim importieren von `z` bitte darauf achten, dass Du von `zod/v4` importierst 
    - Es soll nur einen Suchparameter geben, der `orderBy` heißt.
    - Dieser soll die Werte `id`, `name`, `lastWatered` annehmen.
      - Du musst ein `enum` in zod dafür verwenden
    - Gib das Schema als `validateSearch`-Property in deiner Routen-Konfiguration an
2. Lege Links zum Sortieren in der Index-Route an
    - Render ein `div` mit dem CSS-Klassennamen `SortButtons`
    - Rendere darin für jeden erlaubten `orderBy`-Wert einen Link, der ein `search`-Property hat,
    das `orderBy` auf den jeweiligen Wert setzt.
      - Das Link-Ziel (`to`) ist `/` (wir wollen ja nicht die Route ändern, sondern nur den Search-Parameter)
      - Du kannst bei den Links per `activeProps` einen CSS-Klassennamen setzen, damit der Link hervorgehoben wird, wenn er "aktiv" ist:
        - `activeProps={{ className: "active" }}`
3. Erweitere deine `getPlantListOpts`-Funktion
    - Diese soll nun ebenfalls ein `orderBy`-Property haben, das die Werte `id`, `name` und `lastWatered` akzeptiert. Wenn `orderBy` nicht gesetzt ist, soll `orderBy` auf `id` gesetzt werden
    - Den Wert von `orderBy` kannst du direkt als Search Parameter an die URL für das Backend hängen
      - (Das Backend kennt dieselben Werte für `orderBy` wie auch unsere Frontend URL)
4. Lies im `PlantCardListLoader` den `orderBy`-Wert aus der URL im Browser (`Route.useSearch()`-Hook) und übergib den Wert an `getPlantListOpts`
5. Wenn du jetzt auf die Button klickst, sollte die Liste entsprechend sortiert werden.

# Material
- Search Params mit TanStack Router: https://tanstack.com/router/latest/docs/framework/react/guide/search-params
  - Integration mit Zod: https://tanstack.com/router/latest/docs/framework/react/guide/search-params#zod
    - Achtung! Dort ist ein `zodAdapter` beschrieben. Diesen braucht man mit zod v4 _nicht_ mehr! Du kannst für `validateSearch` direkt dein zod-Schema-Objekt angeben.
- `useSearch`-Hook: https://tanstack.com/router/latest/docs/framework/react/api/router/useSearchHook
- **Enums** mit zod beschreiben: https://zod.dev/api?id=enums

