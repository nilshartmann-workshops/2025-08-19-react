# React Workshop

# Technische Voraussetzungen

- siehe Dokument [Vorbereitung auf das React-Seminar](https://gist.github.com/nilshartmann/6a581328d48540f2663541df9b3eca94)

# Installation

### Schritt 1: Klonen des Repositories

- Bitte dieses Repository von GitHub klonen

### Schritt 2: Öffnen in der IDE / im Editor

- Es reicht, wenn du das Unterverzeichnis `workspace` in deiner IDE bzw. deinem Editor öffnest.

### Schritt 3: Backend

- Im Verzeichnis `backend` die Packages installieren:
  - ```bash
    cd backend
    npm install
    ```

### Schritt 4: Frontend

- Im Verzeichnis `workspace` die Packages installieren:
  - ```bash
    cd workspace
    npm install
    ```

# Starten der Anwendung (zum Prüfen, ob alles funktioniert)

### Schritt 1: Starten des Backends

- Das Backend läuft auf Port **7200**, d.h. dieser Port muss bei dir frei sein.
- Zum Starten im `backend`-Verzeichnis `npm start` verwenden
  - ```bash
      cd backend
      npm start
    ```
- Zum Testen kannst du im Browser (oder per curl, wget etc.) aufrufen: http://localhost:7200/api/plants
  - Es sollte eine Liste von JSON-Objekten zurückkommen.

### Schritt 2: Starten des Frontends

- Das Frontend läuft auf Port **3000**, d.h. dieser Port muss bei dir frei sein.
- Zum Starten im `workspace`-Verzeichnis `npm run dev` verwenden
  - ```bash
      cd workspace
      npm run dev
    ```
- Nun sollte eine (fast) leere Anwendung im Browser zu sehen sein.

- Du kannst Backend und Frontend jetzt bis zur Schulung wieder beenden :-)

## Bei Fragen und Problemen

Wenn du Fragen oder Probleme bei der Installation hast, kannst du mich gerne kontakieren. Meine Kontaktdaten findest du hier: https://nilshartmann.net/kontakt

Ich wünsche dir viel Spaß und Erfolg bei unserem Workshop!
