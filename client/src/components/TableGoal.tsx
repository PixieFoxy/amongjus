import TableGridEntry from "./TableGridEntry";

type Props = {
  desc: string;
  targetNutrition?: {
    energy: number;
    fat: number;
    carbs: number;
    protein: number;
    fibre: number;
    sugar: number;
    sodium: number;
  };
};

const TableGoal = (props: Props) => {
  return (
    <div className="grid grid-cols-6 auto-rows-max gap-4 items-center justify-center p-4">
      <div className="col-span-6 py-4 border-b-2 border-black">
        <span className="font-roboto-mono font-bold text-3xl tracking-wider">
          GOAL: {props.desc}
        </span>
      </div>
      <div className="col-span-6">
        <TableGridEntry
          title="Energy"
          unit="kcal"
          value={props.targetNutrition?.energy}
        />
      </div>
      <div className="col-span-2">
        <TableGridEntry
          title="Fat"
          unit="g"
          value={props.targetNutrition?.fat}
        />
      </div>
      <div className="col-span-2">
        <TableGridEntry
          title="Carbs"
          unit="g"
          value={props.targetNutrition?.carbs}
        />
      </div>
      <div className="col-span-2">
        <TableGridEntry
          title="Protein"
          unit="g"
          value={props.targetNutrition?.protein}
        />
      </div>
      <div className="col-span-2">
        <TableGridEntry
          title="Fibre"
          unit="g"
          value={props.targetNutrition?.fibre}
        />
      </div>
      <div className="col-span-2">
        <TableGridEntry
          title="Sugar"
          unit="g"
          value={props.targetNutrition?.sugar}
        />
      </div>
      <div className="col-span-2">
        <TableGridEntry
          title="Sodium"
          unit="mg"
          value={props.targetNutrition?.sodium}
        />
      </div>
      <div className="col-span-6 auto-rows-max text-left font-work-sans py-4">
        <p>This is the recommended daily nutrition intake based on the goal.</p>
        <p>
          The calculation is <span className="font-bold">NOT ACCURATE</span> at
          the moment.
        </p>
      </div>
    </div>
  );
};

export default TableGoal;
