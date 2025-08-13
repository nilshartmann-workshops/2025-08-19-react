export default function PlantCardListPlaceholder() {
  return (
    <div className={"PlantCardList"}>
      <div className={"PlantCard h-28 animate-pulse text-gray-600"}>
        <div className={"flex h-full w-full items-center justify-center"}>
          Pflanzen werden geladen...
        </div>
      </div>
      <div className={"PlantCard h-28 animate-pulse"}></div>
      <div className={"PlantCard h-28 animate-pulse"}></div>
      <div className={"PlantCard h-28 animate-pulse"}></div>
      <div className={"PlantCard h-28 animate-pulse"}></div>
    </div>
  );
}
