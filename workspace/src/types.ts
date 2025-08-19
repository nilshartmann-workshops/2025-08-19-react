import { z } from "zod/v4";

// export type Plant = {
//   id: string;
//   name: string;
//   location: string;
//   wateringInterval: number;
//   lastWatered?: string;
// };

// zod
export const Plant = z.object({
  id: z.string(),
  name:z.string().nonempty(),
  location: z.string().nonempty(),
  wateringInterval: z.number().min(1),
  lastWatered: z.iso.date().optional(),
});

export type Plant = z.infer<typeof Plant>

// declare function showPlant(plant: Plant): void
//
// declare function loadDataFromApi(): unknown
//
// const response = loadDataFromApi();
//
// const x = Plant.parse(response);
// showPlant(x);



