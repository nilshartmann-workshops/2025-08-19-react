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
  name: z.string().nonempty(),
  location: z.string().nonempty(),
  // lastWatered: z
  //   .string()
  //   .transform((s) => (s === "" ? undefined : s))
  //   .pipe(z.iso.date().optional()),
  lastWatered: z.iso.date().optional(),
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
        <input {...form.register("name")} />
      </div>

      <div className={"FormControl"}>
        <label>Standort</label>
        <select {...form.register("location")}>
          <option value="">Standort wählen...</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      {/* Gießinterval kommt später */}

      <div className={"FormControl"}>
        <label>Zuletzt gegossen</label>
        <input
          {...form.register("lastWatered", {
            setValueAs: (value) => (value === "" ? undefined : value),
          })}
          type={"date"}
        />
      </div>

      <div className={"FormButtons"}>
        <button type={"submit"} className={"primary"}>
          Speichern
        </button>
      </div>
    </form>
  );
}
