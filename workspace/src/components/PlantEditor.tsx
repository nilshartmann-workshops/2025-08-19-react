import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";

import { useAddPlantMutation } from "../queries.ts";

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
  wateringInterval: z
    .number("Bitte gib an, wie häufig die Pflanze gegossen werden muss")
    .min(1, "Bitte gib die Anzahl in Tagen ein, mindestens jeden Tag"),
  // lastWatered: z
  //   .string()
  //   .transform((s) => (s === "" ? undefined : s))
  //   .pipe(z.iso.date().optional()),
  lastWatered: z.iso.date("Bitte gib ein gültiges Datum ein").optional(),
  addNotes: z.boolean(),
  notes: z.string(),
});
type PlantFormState = z.infer<typeof PlantFormState>;

export default function PlantEditor() {
  const form = useForm({
    resolver: zodResolver(PlantFormState),
  });

  const addPlantMutation = useAddPlantMutation();

  const handleSave = (data: PlantFormState) => {
    console.log("DATA", data);

    addPlantMutation.mutate(data);
  };

  const handleError = (errs: any) => {
    console.log("Form Errors", errs);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave, handleError)}>
        <DevTool control={form.control} />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
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
