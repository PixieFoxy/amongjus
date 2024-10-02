import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import TableGoal from "./TableGoal";
import { useNavigate } from "react-router-dom";

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

const DisplayGoalDashboard = () => {
  const [goal, setGoal] = useState<Goal>();
  const navigate = useNavigate();

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
      <div className="grid grid-cols-3 gap-8 justify-between items-center text-center w-full">
        <div className="col-span-2">
          {/* Display the user's goal if it exists, otherwise display a placeholder paragraph*/}
          {goal ? (
            <TableGoal
              desc={goal?.desc}
              targetNutrition={goal?.targetNutrition}
            />
          ) : (
            <div className="font-roboto-mono text-lg">
              <p>Looks like you haven't set up a goal.</p>
              <p>
                Click the{" "}
                <span className="font-bold text-2xl text-ash-gray-800 tracking-wide">
                  EDIT PROFILE
                </span>{" "}
                button to get started.
              </p>
            </div>
          )}
        </div>
        <div>
          <div className="p-8">
            <button
              className="p-4 rounded-md bg-ash-gray-500 hover:bg-ash-gray-800 hover:text-white text-2xl font-roboto-mono font-bold tracking-widest place-self-center"
              onClick={() => navigate("/goal")}
            >
              GOAL DETAILS
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayGoalDashboard;
