import { DateCalendar } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import NutritionEntryCardAlt from "./NutritionEntryCardAlt";
import NutritionEntryForm from "./NutritionEntryForm";

interface NutritionEntry {
  energy: number;
  fat: number;
  carbs: number;
  protein: number;
  fibre: number;
  sugar: number;
  sodium: number;
}

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

const NutritionEntryByDate = ({
  sumHandler,
}: {
  sumHandler: React.Dispatch<React.SetStateAction<NutritionEntry>>;
}) => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [nutritionRecords, setNutritionRecords] = useState<
    UserNutritionRecord[]
  >([]);
  const [createPopupOpen, setCreatePopupOpen] = useState(false);
  const handleCreatePopupOpen = () => setCreatePopupOpen((prev) => !prev);

  const fetchEntries = useCallback(async () => {
    const response = await axiosInstance.post(
      "user/get-nutrition",
      {
        date: currentDate,
      },
      {
        withCredentials: true,
      }
    );
    const data = response?.data;
    if (data !== null) {
      setNutritionRecords(data);
    }
  }, [currentDate]);

  useEffect(() => {
    fetchEntries();
    return () => {
      setNutritionRecords([]);
    };
  }, [fetchEntries]);

  useEffect(() => {
    const sum: NutritionEntry = {
      energy: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
      fibre: 0,
      sugar: 0,
      sodium: 0,
    };
    if (nutritionRecords.length > 0) {
      nutritionRecords.forEach((record) => {
        // TODO: Checking if parsing returns NaN.
        sum.energy += Number.parseFloat(record.nutrition.energy);
        sum.fat += Number.parseFloat(record.nutrition.fat);
        sum.carbs += Number.parseFloat(record.nutrition.carbs);
        sum.protein += Number.parseFloat(record.nutrition.protein);
        sum.fibre += Number.parseFloat(record.nutrition.fibre);
        sum.sugar += Number.parseFloat(record.nutrition.sugar);
        sum.sodium += Number.parseFloat(record.nutrition.sodium);
      });
    }
    sumHandler(() => sum);
  }, [nutritionRecords, sumHandler]);

  return (
    <div className="flex flex-col justify-center items-center p-8 gap-4">
      <div>
        <DateCalendar
          value={currentDate}
          onChange={(newDate) => setCurrentDate(newDate)}
        />
      </div>
      <button
        className="w-full p-4 rounded-md bg-ash-gray-500 hover:bg-ash-gray-800 hover:text-white text-2xl font-roboto-mono font-bold tracking-widest place-self-center"
        onClick={handleCreatePopupOpen}
      >
        ADD NEW ENTRY
      </button>
      {createPopupOpen && <NutritionEntryForm onClose={handleCreatePopupOpen} onSubmit={fetchEntries}/>}

      <div className="w-full">
        {nutritionRecords &&
          nutritionRecords.map((record) => (
            <NutritionEntryCardAlt
              key={record.nutritionId}
              record={record}
              onChange={fetchEntries}
            />
          ))}
      </div>
    </div>
  );
};

export default NutritionEntryByDate;
