import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import NutritionProgressCircle from "./NutritionProgressCircle";
import NutritionEntryByDate from "./NutritionEntryByDate";

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

interface NutritionEntry {
  energy: number;
  fat: number;
  carbs: number;
  protein: number;
  fibre: number;
  sugar: number;
  sodium: number;
}

const CurrentGoal = () => {
  const [goal, setGoal] = useState<Goal>();
  const [nutritionSum, setNutritionSum] = useState<NutritionEntry>({
    energy: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
    fibre: 0,
    sugar: 0,
    sodium: 0,
  });

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
      <div className="flex justify-between w-full">
        <div className="flex flex-col justify-center items-center gap-6 w-1/2 p-8 pl-0 m-8 ml-0">
          <div className="flex items-center justify-between gap-8 w-full">
            <div className="w-1/2 text-right">
              <span className="font-overlock font-bold text-4xl tracking-wide">
                Energy
              </span>
            </div>
            <div className="w-1/2">
              <NutritionProgressCircle
                key={"energy"}
                current={nutritionSum.energy}
                target={goal?.targetNutrition?.energy}
                unit={"kcal"}
                color="#aaa0bc"
              />
            </div>
          </div>

          <div className="flex items-center gap-8 justify-between w-full">
            <div className="w-1/2 text-right">
              <span className="font-overlock font-bold text-4xl tracking-wide">
                Fat
              </span>
            </div>
            <div className="w-1/2">
              <NutritionProgressCircle
                key={"fat"}
                current={nutritionSum.fat}
                target={goal?.targetNutrition?.fat}
                unit={"g"}
                color="#915b10"
              />
            </div>
          </div>

          <div className="flex items-center gap-8 justify-between w-full">
            <div className="w-1/2 text-right">
              <span className="font-overlock font-bold text-4xl tracking-wide">
                Carbs
              </span>
            </div>
            <div className="w-1/2">
              <NutritionProgressCircle
                key={"carbs"}
                current={nutritionSum.carbs}
                target={goal?.targetNutrition?.carbs}
                unit={"g"}
                color="#53a39e"
              />
            </div>
          </div>

          <div className="flex items-center gap-8 justify-between w-full">
            <div className="w-1/2 text-right">
              <span className="font-overlock font-bold text-4xl tracking-wide">
                Protein
              </span>
            </div>
            <div className="w-1/2">
              <NutritionProgressCircle
                key={"protein"}
                current={nutritionSum.protein}
                target={goal?.targetNutrition?.protein}
                unit={"g"}
                color="#8c0b0b"
              />
            </div>
          </div>

          <div className="flex items-center gap-8 justify-between w-full">
            <div className="w-1/2 text-right">
              <span className="font-overlock font-bold text-4xl tracking-wide">
                Fibre
              </span>
            </div>
            <div className="w-1/2">
              <NutritionProgressCircle
                key={"fibre"}
                current={nutritionSum.fibre}
                target={goal?.targetNutrition?.fibre}
                unit={"g"}
                color="#abe386"
              />
            </div>
          </div>

          <div className="flex items-center gap-8 justify-between w-full">
            <div className="w-1/2 text-right">
              <span className="font-overlock font-bold text-4xl tracking-wide">
                Sugar
              </span>
            </div>
            <div className="w-1/2">
              <NutritionProgressCircle
                key={"sugar"}
                current={nutritionSum.sugar}
                target={goal?.targetNutrition?.sugar}
                unit={"g"}
                color="#4f246e"
              />
            </div>
          </div>

          <div className="flex items-center gap-8 justify-between w-full">
            <div className="w-1/2 text-right">
              <span className="font-overlock font-bold text-4xl tracking-wide">
                Sodium
              </span>
            </div>
            <div className="w-1/2">
              <NutritionProgressCircle
                key={"sodium"}
                current={nutritionSum.sodium}
                target={goal?.targetNutrition?.sodium}
                unit={"mg"}
                color="#e38686"
              />
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <NutritionEntryByDate sumHandler={setNutritionSum} />
        </div>
      </div>
    </>
  );
};

export default CurrentGoal;
