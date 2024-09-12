import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import TableGoal from "./TableGoal";
import { DateCalendar } from "@mui/x-date-pickers";
import { Link } from "react-router-dom";

interface Goal {
  id: number;
  profileId: number;
  desc: string;
  targetNutritionId?: number;
  targetNutrition?: {
    energy: number;
    fat: number;
    carbs: number;
    protein: number;
    fibre: number;
    sugar: number;
    sodium: number;
  };
}

const DisplayGoal = () => {
  const [goal, setGoal] = useState<Goal>();

  useEffect(() => {
    const fetchGoal = async () => {
      const response = await axiosInstance.get("user/get-goal", {
        withCredentials: true,
      });
      const data = response?.data;
      if (data !== null) {
        setGoal(data.goal);
      }
    };

    fetchGoal();

    return () => {
      setGoal(undefined);
    };
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 gap-8 justify-between items-center text-center w-full">
        <div>
          {goal && (
            <TableGoal
              desc={goal?.desc}
              targetNutrition={goal?.targetNutrition}
            />
          )}
        </div>
        <div className="grid grid-rows-2">
          <div>
            <DateCalendar />
          </div>
          <div className="p-8">
            <Link to={"/goal"}>
              <button className="p-4 rounded-md bg-ash-gray-500 hover:bg-ash-gray-800 hover:text-white text-2xl font-roboto-mono font-bold tracking-widest place-self-center">
                GOAL DETAILS
              </button>
            </Link>
          </div>
        </div>
        <div className="col-span-2">{JSON.stringify(goal)}</div>
      </div>
    </>
  );
};

export default DisplayGoal;

// {goal?.targetNutrition
//   ? Object.entries(goal.targetNutrition).map(([key, val], i) => (
//       <>
//         <div key={key}>{key}</div>
//         <div key={i}>{val}</div>
//       </>
//     ))
//   : null}
