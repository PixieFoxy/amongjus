interface UserNutritionRecord {
  date: string;
  nutritionId: number;
  nutrition: {
    energy: string;
    fat: string;
    carbs: string;
    protein: string;
    fibre: string;
    sugar: string;
    sodium: string;
  };
}

const NutritionEntryCard = ({ record }: { record: UserNutritionRecord }) => {
  const date = new Date(record.date);
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return (
    <div className="flex-col justify-between items-center p-4 font-roboto-mono w-full border-2 border-black rounded-md">
      <div className="font-bold text-lg">
        {date.toLocaleString("en-GB", dateOptions)}
      </div>
      <div className="flex-col justify-between items-center">
        <div className="flex justify-between items-center gap-4">
          <div>
            <span className="font-bold">Energy: </span>
            {record.nutrition.energy} kcal
          </div>
          <div>
            <span className="font-bold">Fat: </span>
            {record.nutrition.fat} g
          </div>
          <div>
            <span className="font-bold">Carbs: </span>
            {record.nutrition.carbs} g
          </div>
          <div>
            <span className="font-bold">Protein: </span>
            {record.nutrition.protein} g
          </div>
        </div>
        <div className="flex justify-evenly items-center gap-4">
          <div>
            <span className="font-bold">Fibre: </span>
            {record.nutrition.fibre} g
          </div>
          <div>
            <span className="font-bold">Sugar: </span>
            {record.nutrition.sugar} g
          </div>
          <div>
            <span className="font-bold">Sodium: </span>
            {record.nutrition.sodium} mg
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionEntryCard;
