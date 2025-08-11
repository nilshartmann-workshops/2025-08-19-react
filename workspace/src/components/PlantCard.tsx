import { Link } from "@tanstack/react-router";

import { useFormatDate } from "./use-format-date.ts";

type PlantCardProps = {
  id: string;
  name: string;
  location: string;
  wateringInterval: number;
  lastWatered?: string;
};

export default function PlantCard({
  id,
  name,
  location,
  wateringInterval,
  lastWatered,
}: PlantCardProps) {
  const formatDate = useFormatDate();

  const wateringInfo =
    wateringInterval === 1
      ? "Jeden Tag gießen!"
      : `Alle ${wateringInterval} Tage gießen`;

  return (
    <div className={"PlantCard"}>
      <header>
        <Link to={"/$plantId"} params={{ plantId: id }}>
          <h2>{name}</h2>
        </Link>
        <div>📍{location}</div>
      </header>
      <section>
        <div>{wateringInfo}</div>
        {lastWatered ? <div>Zuletzt: {formatDate(lastWatered)}</div> : null}
      </section>
    </div>
  );
}
