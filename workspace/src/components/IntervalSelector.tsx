import { ChangeEvent } from "react";

type IntervalSelectorProps = {
  interval?: number;
  onIntervalChange(newInterval: number): void;
  error?: boolean;
};

export default function IntervalSelector({
  interval,
  onIntervalChange,
  error,
}: IntervalSelectorProps) {
  const handleIntervalChange = (e: ChangeEvent<HTMLInputElement>) => {
    const valueAsString = e.target.value;

    // alternativ parseInt
    onIntervalChange(Number(valueAsString));
  };

  return (
    <div>
      <label>Interval</label>
      <input
        type={"number"}
        value={interval || ""}
        onChange={handleIntervalChange}
        className={error ? "error" : undefined}
      />
      <button
        type="button"
        className={"sm"}
        onClick={() => onIntervalChange(7)}
      >
        Weekly
      </button>
      <button
        type="button"
        className={"sm"}
        onClick={() => onIntervalChange(14)}
      >
        Biweekly
      </button>
      {interval !== undefined && (
        <div className={"px-1 text-sm"}>Alle {interval} Tage gießen</div>
      )}
    </div>
  );
}
