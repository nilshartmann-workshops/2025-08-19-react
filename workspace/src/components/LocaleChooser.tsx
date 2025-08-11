const knownLocales = ["de-DE", "en-GB", "ko-KR"];

export function LocaleChooser() {
  // // todo: lies das Locale aus dem globalen Zustand
  const currentLocale = "de-DE";

  const handleLocaleChange = (newLocale: string) => {
    // todo: aktualisiere das Locale im globalen Zustand
  };

  return (
    <div className={"LocaleChooser"}>
      {knownLocales.map((l) => (
        <button
          key={l}
          type={"button"}
          className={l === currentLocale ? "primary active" : "primary"}
          onClick={() => handleLocaleChange(l)}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
