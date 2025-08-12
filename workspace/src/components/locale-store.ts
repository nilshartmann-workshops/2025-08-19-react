import { create } from "zustand/react";

type LocaleState = {
  locale: string;
  setLocale(newLocale: string): void;
};

//                            TypeScript! -------v
export const useLocaleStore = create<LocaleState>()((set) => ({
  locale: "de-DE",
  setLocale(newLocale: string) {
    set({ locale: newLocale });
  },
}));
