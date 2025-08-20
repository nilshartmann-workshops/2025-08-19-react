import { z } from "zod/v4";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getPlantByIdOpts } from "../queries.ts";
import { Plant } from "../types.ts";

const PlantFormState = z.object({
  name: z.string().nonempty(),
  location: z.string().nonempty(),
  lastWatered: z.iso.date().optional()
  //                .transform(
  //   v => v === "" ? undefined : v
  // )
});

// const XPlantFormState = PlantFormState.extend({
//   lastWatered: z.iso.date().optional()
//                  .transform(
//     v => v === "" ? undefined : v
//   )
// })


type PlantFormState = z.infer<typeof PlantFormState>;


export default function PlantForm({existingPlant}:{existingPlant?: Plant}) {

  // const response = useQuery(
  //   {...getPlantByIdOpts("1"),
  //   select
  //   }
  // );

  const form = useForm<PlantFormState>({
    resolver: zodResolver(PlantFormState),
    defaultValues: existingPlant ? existingPlant : {

    },
  });

  const handleFormSubmit = (data: PlantFormState) => {
    console.log("data", data);
  }

  const handleError = (err: any) => {
    console.log("FORM ERRORS", err);
  }

  return <form
    // onReset={() => form.reset()}
    onSubmit={form.handleSubmit(handleFormSubmit,handleError)}>
    <div className={"FormControl"}>
      <label>
        Name
      </label>
      <input
        {...form.register("name")}
      />
    </div>
    <div className={"FormControl"}>
      <label>
        Standort
      </label>
      <select {...form.register("location")}  >
        <option>Wohnzimmer</option>
        <option>Schlafzimmer</option>
        <option>Küche</option>
      </select>
    </div>
    <div className={"FormControl"}>
      <label>Zuletzt gewässert</label>
      <input type={"date"}
        {...form.register("lastWatered", {
          setValueAs: value => value === "" ? undefined : value
        })}
      />
    </div>

    <div className={"FormButtons"}>
      {/*<button type={"reset"}>Reset</button>*/}

      <button type={"button"} onClick={() => form.reset()}>Reset</button>
      <button className={"primary"}>Speichern</button>
    </div>

  </form>
}