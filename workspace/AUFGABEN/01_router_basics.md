# Übung: TanStack Router Basics

# Dateien

- src/routes/index.tsx
- src/routes/$plantId.tsx (anlegen!)
- src/routes/add.tsx (anlegen!)

### Hinweise zum Datei-basierten Routing mit dem TanStack Router

- Wir arbeiten im Verzeichnis `routes`!
    - **_Alle_ Dateien im Verzeichnis
      `routes` (und darunter) werden vom TanStack Router als Routen-Dateien interpretiert.**
    - Um Dateien oder Verzeichnisse von der Routen-Interpretation auszuschließen, wähle einen Namen, der mit
      `-` beginnt (`-Title.tsx` oder `-components/`)
      - (In unserem Workshop legen wir Komponenten, die keine Routen sind, in das `src/components`-Verzeichnis, also außerhalb des `src/routes`-Verzeichnisses) 
- Wenn du eine neue (Routen-)Datei im Verzeichnis
  `routes` erstellst, generiert das Router-Plugin im Vite Devserver automatisch eine Konfiguration für diese Route in der Datei.
    - Es kann ein paar Augenblicke dauern, bis deine IDE/dein Editor die Änderungen erkennt.
    - In IntelliJ kannst du die erstellte Datei neu laden, um sicherzustellen, dass die vom Plugin vorgenommenen Änderungen übernommen wurden. Verwende dazu das Kontextmenü im Projekt-Explorer und wähle
      `Reload from disc` (oder `File -> Reload all from disc`)
- Weitere Informationen zu den Konventionen der dateibasierten Navigation findest du in der Doku: https://tanstack.com/router/v1/docs/framework/react/routing/file-based-routing

# Aufgabe

- Baue zwei neue Routen, die wir später für die Darstellung und Bearbeitung der Pflanzen verwenden
- Füge Links zur Anwendung hinzu

# Schritte

1. Lege eine neue Route `/add` an.
    - Es reicht, wenn diese Route "Hello World" o.ä. ausgibt
    - Später werden wir hier das Formular zum Anlegen neuer Pflanzen anlegen
2. Lege die Route für `$plantId` an
    - Gib hier einfach den Wert von `$plantId` aus der URL aus
    - Später nutzen wir die Route, um eine einzelne Pflanze darzustellen
3. Füge Links in deiner Anwendung hinzu
    - Im globalen Layout deiner Anwendung soll ein Link ("Home") gerendert werden, der auf die `/`-Route zeigt
    - Nicht wundern: wenn du die `Link`-Komponente vom TanStack Router verwendest, sehen diese (bzw. die gerenderten
      `a`-Elemente) der Anwendung "ungestyled" aus (keine Unterstreichung etc). Das liegt am Default-Styling von Tailwind.
      - Du kannst die CSS-Klasse `primary` am `Link` setzen, dann haben die Links Styling
    - Lege in der `/`-Route (`index.tsx`) einen Link auf `/add` und einen Link auf die Einzeldarstellungsroute (
      `$plantId`) an. Für letztere übergib zum Testen irgendeine ausgedachte Id, den Link werden wir später mit echten Ids rendern.

# Material

- TanStack Router: https://tanstack.com/router/latest/docs/framework/react/overview
    - Filebased routing: https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing
    - Navigation:
        - Links: https://tanstack.com/router/latest/docs/framework/react/guide/navigation#link-component
        - Link Component API: https://tanstack.com/router/latest/docs/framework/react/api/router/linkComponent
    - (Hintergrund: Vite plugin for code generation https://tanstack.com/router/latest/docs/framework/react/routing/installation-with-vite)
- 