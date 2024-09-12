type Props = {
  desc: string,
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

const nutritionType = [
  ["Energy", "kcal"],
  ["Fat", "g"],
  ["Carbs", "g"],
  ["Protein", "g"],
  ["Fibre", "g"],
  ["Sugar", "g"],
  ["Sodium", "mg"],
];

const TableGoal = (props: Props) => {
  return (
    <table className="border-black border-2 mx-auto min-w-48 w-3/4 table-auto">
      <caption className="font-bold text-2xl">{props.desc}</caption>
        <thead>
          <tr>
            <th scope="col">Nutrition</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {props.targetNutrition &&
            Object.values(props.targetNutrition).map((val, i) => (
              <tr className="border-2 border-black">
                <th scope="row">{nutritionType[i][0]}</th>
                <td className="flex justify-between">
                  <div>{val}</div>
                  <div>{nutritionType[i][1]}</div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
  );
};

export default TableGoal;
