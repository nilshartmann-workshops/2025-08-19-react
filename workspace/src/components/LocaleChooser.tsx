import { useLocaleStore } from "./locale-store.ts";

const knownLocales = ["de-DE", "en-GB", "ko-KR"];

export function LocaleChooser() {
  // // todo: lies das Locale aus dem globalen Zustand
  const currentLocale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);

  const handleLocaleChange = (newLocale: string) => {
    setLocale(newLocale);
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
