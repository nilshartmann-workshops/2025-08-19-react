# Integrationtests

# Dateien

- src/routes/Home.browsertest.tsx (anlegen)

# Aufgabe

* Schreibe einen Testfall für die PlantDetailCard inklusive des Netzwerkverkehrs

# Schritte

1. Beende das Backend, damit du nicht aus Versehen API-Calls gegen das echte Backend machst.
2. Lege die Datei `src/components/PlantDetailsCard.browsertest.tsx` an
    - Achte auf die Dateiendung `.browsertest.tsx`
    - Ein Grundgerüst für die Datei findest am Ende dieser Aufgabenbeschreibung.
3. Du musst mit msw den Request zu `/api/plants` mocken
    - Schreibe dazu einen Request Handler, der auf `get`
      `http://localhost:7200/plants/1`, horcht und ein Pflanzen-Objekt zurückliefert (TypeScript-Type `Plant`)
4. Da wir einen Integrationtest mit "echtem" TanStack Query machen wollen, musst du in deinem Test rendern:
    - den `QueryClientProvider`, den du mit `createQueryClient` (`src/create-query-client.tsx`) erzeugen kannst
5. Render die `PlantDetailCards` mit einer ausgedachten `plantId`
    - Achtung! Die `plantId` muss mit der Id in der Request-Konfiguration von MSW übereinstimmen
    - Stelle sicher, dass die Pflanze angezeigt wird, in dem du z.B. nach der korrekten Überschrift suchst
6. Teste den "Gießen"-Button
    - Erweitere deine MSW-Konfiguration um einen PUT Request für http://localhost:7200/plants/1/lastWatered
    - Diese Konfiguration sollte die aktualisierte Pflanze (mit neuem `lastWatered`) zurückliefern
    - Klicke im Test auf den "Gießen"-Button
    - Stelle sicher, dass in `PlantDetailCards` das neue `Zuletzt gegossen` Datum angezeigt wird
7. **Optional**
    - Der Test wird nur "heute" funktionieren, da als Datum für `lastWatered` die Funktion
      `getTodayString` verwendet wird,
      die mit einem "echten" Datum arbeitet
    - Welche Optionen und Möglichkeiten gibt es, das Problem zu umgehen?

# Material

- MSW: https://mswjs.io/
    - Intercepting Requests: https://mswjs.io/docs/http/intercepting-requests/
    - Mocking Responses: https://mswjs.io/docs/http/mocking-responses/
    - Error Responses: https://mswjs.io/docs/http/mocking-responses/error-responses
- Modules mocken:
    - https://vitest.dev/guide/mocking.html#modules
      - Wenn du `dayjs` mockst, muss deine Mock-Factory-Funktion eine Funktion zurückgeben, und kein Objekt,
        da `dayjs` mit `default export` arbeitet
      - Wenn du `getTodayString` mockst, muss deine Mock-Factory-Funktion dafür sorgen, dass aus `date-utils.ts` nur
        `getTodayString` gemockt wird (siehe https://vitest.dev/api/vi.html#vi-mock "importOriginal")

# Gerüst für die Testdatei PlantDetailsCard.browsertest.tsx

```tsx
import {QueryClientProvider} from "@tanstack/react-query";
import {delay, http, HttpResponse} from "msw";
import {setupWorker} from "msw/browser";
import {BrowserRouter, Route, Routes} from "react-router";
import {afterEach, beforeAll, expect, test} from "vitest";
import {render} from "vitest-browser-react";

import {createQueryClient} from "../create-query-client.tsx";
import {Plant} from "../types.ts";
import Home from "./Home.tsx";

const worker = setupWorker(
	// todo: Handler für GET einfügen
	// todo 2. Schritt: Handler für PUT einfügen, Beispiel:
	//   http.put<never, { lastWatered: string }>(
	//      "http://localhost:7200/api/plants/1/lastWatered",
	//      async ({ request }) => {
	//        // aktualsierte Pflanze zurückgeben
	//     })
);

beforeAll(async () => await worker.start());
afterEach(() => worker.resetHandlers());

test("Updates lastWatered and refreshes the ui", async () => {
	const screen = render(
		<QueryClientProvider client={createQueryClient()}>
			{/*todo: PlantDetailCard-Komponente rendern */}
		</QueryClientProvider>,
	);

	// todo:
	//   Tests implementiere
});

```
