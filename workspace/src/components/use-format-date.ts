import { useLocaleStore } from "./locale-store.ts";

export function useFormatDate() {
  // todo: Locale aus dem globalen Store lesen!
  const locale = useLocaleStore((s) => s.locale);

  function dateFormatter(dateString: string) {
    return new Date(dateString).toLocaleDateString(locale);
  }

  return dateFormatter;
}
