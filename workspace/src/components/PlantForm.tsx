import { z } from "zod/v4";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getPlantByIdOpts } from "../queries.ts";
import { Plant } from "../types.ts";
import { useState } from "react";

const PlantFormState = z.object({
  name: z.string().nonempty("Bitte Pflanzenamen eingeben"),
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
    mode: "onBlur",
    // reValidateMode: "onBlur"
  });

  const handleFormSubmit = (data: PlantFormState) => {
    console.log("data", data);
  }

  const handleError = (err: any) => {
    console.log("FORM ERRORS", err);
  }

  const [counter, setCounter] = useState(0)

const plantName  =""
  // const [plantName] = form.watch(["name"])

  return <form
    // onReset={() => form.reset()}
    onSubmit={form.handleSubmit(handleFormSubmit,handleError)}>
    <button type={"button"} onClick={() => setCounter(counter +1 )}>
      Increase{counter}
    </button>
    <p>Pflanzenname: {plantName}</p>
    {/*<PlantName watch={form.watch} />*/}
    <PlantNameMitControl control={form.control} />
    <div className={"FormControl"}>
      <label>
        Name
      </label>
      <input
        {...form.register("name")}
      />
      <p className={"error-message"}> {form.formState.errors.name?.message}</p>
    </div>
    <div className={"FormControl"}>
      <label>
        Standort
      </label>
      <select {...form.register("location")}  >
        <option></option>
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
    <Label />

  </form>
}

function Label() {
  return <div>Huhu</div>
}

function PlantName({watch}: {watch: any}) {
  const [plantName] = watch(["name"])
  return <div>
    Plantname: {plantName}
  </div>
}

function PlantNameMitControl({control}: {control: any}) {
  const plantName = useWatch({
    control,
    name: "name"
  })
  // const [plantName] = watch(["name"])
  return <div>
    Plantname: {plantName}
  </div>
}