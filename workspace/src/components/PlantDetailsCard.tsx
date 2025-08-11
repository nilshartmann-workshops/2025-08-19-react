import { useSuspenseQuery } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";

import { getPlantOpts } from "../queries.ts";
import { getDaysUntilWatering } from "./date-utils.ts";
import { useFormatDate } from "./use-format-date.ts";

type PlantDetailsCardProps = {
  plantId: string;
};
export default function PlantDetailsCard({ plantId }: PlantDetailsCardProps) {
  // todo:
  //    - Die Zeile '@ts-expect-error' entfernen
  //    - statt 'const plant: Plant = {};' die Pflanze mit useUseSuspenseQuery
  //      laden

  const { data: plant } = useSuspenseQuery(getPlantOpts(plantId));
  const formatDate = useFormatDate();

  const lastWatered = plant.lastWatered || new Date().toDateString();
  const daysUntilWatering = getDaysUntilWatering(
    lastWatered,
    plant.wateringInterval,
  );
  const needsWatering = daysUntilWatering <= 0;
  const nextWateringDate = new Date(
    new Date(lastWatered).getTime() +
      plant.wateringInterval * 24 * 60 * 60 * 1000,
  );

  return (
    <div className="plant-detail-container">
      <div className="plant-detail-card">
        <div className="detail-title-section">
          <h2 className="detail-title">{plant.name}</h2>
          <button
            className={twMerge(
              needsWatering ? "watering-alert-large" : "primary",
            )}
          >
            <span>💧 Gießen!</span>
          </button>
        </div>

        <div className="detail-grid">
          <div className="detail-section">
            <h3 className="section-title">Standort</h3>
            <p className="section-content">📍 {plant.location}</p>
          </div>

          <div className="detail-section">
            <h3 className="section-title">Gießintervall</h3>
            <p className="section-content">
              Alle {plant.wateringInterval} Tag
              {plant.wateringInterval !== 1 ? "e" : ""}
            </p>
          </div>

          <div className="detail-section">
            <h3 className="section-title">Zuletzt gegossen</h3>
            <p className="section-content">
              {plant.lastWatered ? formatDate(plant.lastWatered) : "Unbekannt"}
            </p>
          </div>

          <div className="detail-section">
            <h3 className="section-title">Nächstes Gießen</h3>
            <p className={`section-content ${needsWatering ? "overdue" : ""}`}>
              {formatDate(nextWateringDate.toISOString())}
              {needsWatering && " (überfällig)"}
            </p>
          </div>
        </div>

        <div className="watering-status-section">
          {needsWatering ? (
            <div className="status-card overdue">
              <h3>⚠️ Gießen erforderlich!</h3>
              <p>Diese Pflanze sollte bereits gegossen werden.</p>
            </div>
          ) : (
            <div className="status-card">
              <h3>✅ Alles in Ordnung</h3>
              <p>
                Nächstes Gießen in {daysUntilWatering} Tag
                {daysUntilWatering !== 1 ? "en" : ""}
              </p>
            </div>
          )}
        </div>

        {/*{plant.notes && (*/}
        {/*  <div className="notes-section">*/}
        {/*    <h3 className="section-title">Notizen</h3>*/}
        {/*    <p className="notes-content">{plant.notes}</p>*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>
    </div>
  );
}
