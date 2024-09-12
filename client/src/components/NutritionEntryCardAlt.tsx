import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import NutritionEntryForm from "./NutritionEntryForm";

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

const NutritionEntryCardAlt = ({
  record,
  onChange,
}: {
  record: UserNutritionRecord;
  onChange: () => Promise<void>;
}) => {
  const date = new Date(record.date);
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const handleEditPopupOpen = () => setEditPopupOpen((prev) => !prev);
  const handleDeletePopupOpen = () => setDeletePopupOpen((prev) => !prev);

  async function handleDelete() {
    try {
      await axiosInstance.post(
        "/user/intake-delete",
        {
          nutritionId: record.nutritionId,
        },
        {
          withCredentials: true,
        }
      );
      onChange();
    } catch (error) {
      if (error instanceof AxiosError) {
        alert([error.response?.data, error.response?.status]);
      }
    }
  }

  useEffect(() => {
    if (editPopupOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [editPopupOpen]);

  return (
    <div className="flex-col justify-between items-center mb-4 p-4 font-roboto-mono w-full border-2 border-black rounded-md">
      <div className="font-bold text-lg">
        {date.toLocaleString("en-GB", dateOptions)}
      </div>
      <div className="flex justify-between items-center gap-4">
        <div className="flex-col justify-center items-center text-center">
          <div className="font-bold">Energy</div>
          <div>{record.nutrition.energy} kcal</div>
        </div>
        <div className="flex-col justify-center items-center text-center">
          <div className="font-bold">Fat</div>
          <div>{record.nutrition.fat} g</div>
        </div>
        <div className="flex-col justify-center items-center text-center">
          <div className="font-bold">Carbs</div>
          <div>{record.nutrition.carbs} g</div>
        </div>
        <div className="flex-col justify-center items-center text-center">
          <div className="font-bold">Protein</div>
          <div>{record.nutrition.protein} g</div>
        </div>
        <div className="flex-col justify-center items-center text-center">
          <div className="font-bold">Fibre</div>
          <div>{record.nutrition.fibre} g</div>
        </div>
        <div className="flex-col justify-center items-center text-center">
          <div className="font-bold">Sugar</div>
          <div>{record.nutrition.sugar} g</div>
        </div>
        <div className="flex-col justify-center items-center text-center">
          <div className="font-bold">Sodium</div>
          <div>{record.nutrition.sodium} mg</div>
        </div>
      </div>
      <div className="flex justify-evenly items-center p-4 text-center gap-16">
        <div className="flex justify-end items-center w-1/2">
          <button
            className="icon-[material-symbols--edit-outline] w-8 h-8 hover:bg-red-200 focus:bg-red-500"
            onClick={handleEditPopupOpen}
          ></button>
        </div>
        <div className="flex justify-start items-center gap-4 w-1/2">
          <button
            className="icon-[material-symbols--delete-outline] w-8 h-8 hover:bg-red-200 focus:bg-red-500"
            onClick={handleDeletePopupOpen}
          ></button>
          {deletePopupOpen && (
            <button
              className="py-1 px-2 rounded-md font-bold tracking-wider hover:bg-timberwolf-dark hover:text-ash-gray-200"
              onClick={handleDelete}
            >
              delete
            </button>
          )}
        </div>
      </div>
      {editPopupOpen && (
        <NutritionEntryForm
          record={record}
          onClose={handleEditPopupOpen}
          onSubmit={onChange}
        />
      )}
    </div>
  );
};

export default NutritionEntryCardAlt;
