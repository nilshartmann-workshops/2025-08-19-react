export function useFormatDate() {
  // todo: Locale aus dem globalen Store lesen!
  const locale = "de-DE";

  function dateFormatter(dateString: string) {
    return new Date(dateString).toLocaleDateString(locale);
  }

  return dateFormatter;
}
