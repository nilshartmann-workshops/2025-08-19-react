import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";

const locations = [
  "Wohnzimmer",
  "Arbeitszimmer",
  "Küche",
  "Schlafzimmer",
  "Bad",
];

// im richtigen Leben könnte man hier evtl. auch den
// Plant State verwenden, ich habe die Definition hierher kopiert,
// weil wir keine id brauchen und im ersten Schritt auch kein wateringInterval
const PlantFormState = z.object({
  name: z.string().nonempty("Bitte gib den Namen deiner Pflanze ein"),
  location: z.string().nonempty("Bitte wähle den Standort deiner Pflanze aus"),
  // lastWatered: z
  //   .string()
  //   .transform((s) => (s === "" ? undefined : s))
  //   .pipe(z.iso.date().optional()),
  lastWatered: z.iso.date("Bitte gib ein gültiges Datum ein").optional(),
});
type PlantFormState = z.infer<typeof PlantFormState>;

export default function PlantForm() {
  const form = useForm({
    resolver: zodResolver(PlantFormState),
  });

  const handleSave = (data: PlantFormState) => {
    console.log("DATA", data);
  };

  const handleError = (errs: any) => {
    console.log("Form Errors", errs);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSave, handleError)}>
      <div className={"FormControl"}>
        <label>Name der Pflanze</label>
        <input
          {...form.register("name")}
          className={form.formState.errors.name?.message ? "error" : undefined}
        />
        <ErrorMessage msg={form.formState.errors.name?.message} />
      </div>

      <div className={"FormControl"}>
        <label>Standort</label>
        <select
          {...form.register("location")}
          className={
            form.formState.errors.location?.message ? "error" : undefined
          }
        >
          <option value="">Standort wählen...</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
        <ErrorMessage msg={form.formState.errors.location?.message} />
      </div>

      {/* Gießinterval kommt später */}

      <div className={"FormControl"}>
        <label>Zuletzt gegossen</label>
        <input
          {...form.register("lastWatered", {
            setValueAs: (value) => (value === "" ? undefined : value),
          })}
          type={"date"}
          className={
            form.formState.errors.lastWatered?.message ? "error" : undefined
          }
        />
        <ErrorMessage msg={form.formState.errors.lastWatered?.message} />
      </div>

      <div className={"FormButtons"}>
        <button
          type="button"
          onClick={() => form.reset()}
          className={"secondary"}
        >
          Eingaben löschen 🧹
        </button>

        <button type={"submit"} className={"primary"}>
          Pflanze hinzufügen 🌱
        </button>
      </div>
    </form>
  );
}

type ErrorMessageProps = {
  msg?: string;
};
function ErrorMessage({ msg }: ErrorMessageProps) {
  if (!msg) {
    return null;
  }
  return <span className={"error-message"}>{msg}</span>;
}
