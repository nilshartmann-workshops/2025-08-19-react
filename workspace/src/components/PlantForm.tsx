import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { z } from "zod/v4";

import { useAddPlantMutation } from "../queries.ts";
import IntervalSelector from "./IntervalSelector.tsx";

const locations = [
  "Wohnzimmer",
  "Arbeitszimmer",
  "Küche",
  "Schlafzimmer",
  "Bad",
];

const Note = z.object({
  title: z.string(),
  text: z.string(),
});

const CareInstruction = z.object({
  order: z.number().min(1),
  instruction: z.string().nonempty(),
});

// im richtigen Leben könnte man hier evtl. auch den
// Plant State verwenden, ich habe die Definition hierher kopiert,
// weil wir keine id brauchen und im ersten Schritt auch kein wateringInterval
const PlantFormState = z.object({
  name: z.string().nonempty("Bitte gib den Namen deiner Pflanze ein"),
  location: z.string().nonempty("Bitte wähle den Standort deiner Pflanze aus"),
  wateringInterval: z
    .number("Bitte gib an, wie häufig die Pflanze gegossen werden muss")
    .min(1, "Bitte gib die Anzahl in Tagen ein, mindestens jeden Tag"),
  // lastWatered: z
  //   .string()
  //   .transform((s) => (s === "" ? undefined : s))
  //   .pipe(z.iso.date().optional()),
  lastWatered: z.iso.date("Bitte gib ein gültiges Datum ein").optional(),
  note: Note,
  instructions: CareInstruction.array().min(1),
});
type PlantFormState = z.infer<typeof PlantFormState>;

export default function PlantForm() {
  const form = useForm({
    resolver: zodResolver(PlantFormState),
    defaultValues: {
      note: {
        title: "",
        text: "",
      },
      instructions: [
        {
          order: 0,
          instruction: "",
        },
      ],
    },
  });

  const addPlantMutation = useAddPlantMutation();

  const handleSave = (data: PlantFormState) => {
    console.log("DATA", data);

    // addPlantMutation.mutate(data);
  };

  const handleError = (errs: any) => {
    console.log("Form Errors", errs);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSave, handleError)}>
        <DevTool control={form.control} />
        <div className={"FormControl"}>
          <label>Name der Pflanze</label>
          <input
            {...form.register("name")}
            className={
              form.formState.errors.name?.message ? "error" : undefined
            }
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

        <div className={"FormControl"}>
          <Controller
            control={form.control}
            name={"wateringInterval"}
            render={(field) => {
              return (
                <IntervalSelector
                  interval={field.field.value}
                  onIntervalChange={field.field.onChange}
                  error={field.fieldState.error?.message !== undefined}
                />
              );
            }}
          />
          <ErrorMessage msg={form.formState.errors.wateringInterval?.message} />
        </div>

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
          <button
            className={"secondary"}
            type={"button"}
            onClick={() =>
              form.setValue(
                "lastWatered",
                new Date().toLocaleDateString("sv-SE"),
                {
                  shouldDirty: true,
                },
              )
            }
          >
            Jetzt
          </button>

          <button
            className={"secondary"}
            type={"button"}
            onClick={() =>
              form.resetField("lastWatered", {
                defaultValue: "2025-08-15",
              })
            }
          >
            Jetzt (Reset)
          </button>
        </div>

        <NoteEditor />

        <CareInstructionEditor />

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
        {addPlantMutation.isError && (
          <div className={"error-message"}>Speichern fehlgeschlagen</div>
        )}
        {addPlantMutation.isSuccess && (
          <div className={"success-message"}>Pflanze angelegt</div>
        )}
      </form>
    </FormProvider>
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

function NoteEditor() {
  const form = useFormContext<PlantFormState>();

  const prefix = "note";

  return (
    <fieldset>
      <h3>Note</h3>
      <div className={"FormControl"}>
        <label>Title</label>
        <input {...form.register(`${prefix}.title`)} />
      </div>

      <div className={"FormControl"}>
        <label>Text</label>
        <input {...form.register("note.text")} />
      </div>
    </fieldset>
  );
}

function CareInstructionEditor() {
  const form = useFormContext<PlantFormState>();

  const instructions = useFieldArray({
    control: form.control,
    name: "instructions",
  });

  return (
    <fieldset>
      <h3>Care Instructions</h3>
      <p className={"error-message"}>
        {form.formState.errors.instructions?.message}
      </p>
      {instructions.fields.map((entry, ix) => {
        return (
          <div key={entry.id}>
            <p>
              {ix} / {entry.id}
            </p>
            <div className={"FormControl"}>
              <label>Order</label>
              <input
                {...form.register(`instructions.${ix}.order`, {
                  valueAsNumber: true,
                })}
              />
              <p className={"form-error"}>
                {form.formState.errors.instructions?.[ix]?.order?.message}
              </p>
            </div>
            <div className={"FormControl"}>
              <label>Title</label>
              <input {...form.register(`instructions.${ix}.instruction`)} />
            </div>
            <button
              type={"button"}
              className={"secondary"}
              onClick={() => {
                instructions.insert(ix + 1, {
                  instruction: "neu",
                  order: 100,
                });
              }}
            >
              Add
            </button>
          </div>
        );
      })}
    </fieldset>
  );
}
