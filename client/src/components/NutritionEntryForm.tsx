import React, {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import axiosInstance from "../utils/axios";
import { AxiosError } from "axios";

interface Props {
  record?: UserNutritionRecord;
  onClose: () => void;
  onSubmit: () => Promise<void>;
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

const NutritionEntryForm = (props: Props) => {
  const [formData, setFormData] = useState({
    date: "",
    energy: "",
    fat: "",
    carbs: "",
    protein: "",
    fibre: "",
    sugar: "",
    sodium: "",
  });

  const modalRef = useRef(null);
  function closeModal(e: React.MouseEvent) {
    if (modalRef.current === e.target) {
      props.onClose();
    }
  }

  function getMaxDateString() {
    const nowLocal = new Date();
    const offset = nowLocal.getTimezoneOffset();
    const maxDate = new Date(nowLocal.getTime() - offset * 60 * 1000);
    const maxDateString = maxDate.toISOString().split("T")[0];
    return maxDateString + "T23:59";
  }

  function convertUTCToLocalTime(UTCDateString: string) {
    const UTCDate = new Date(UTCDateString);
    const offset = UTCDate.getTimezoneOffset();
    const localDate = new Date(UTCDate.getTime() - offset * 60 * 1000);
    return localDate.toISOString().split(".")[0];
  }

  const prefillForm = useCallback(() => {
    if (props.record) {
      setFormData({
        date: convertUTCToLocalTime(props.record.date),
        energy: props.record.nutrition.energy,
        fat: props.record.nutrition.fat,
        carbs: props.record.nutrition.carbs,
        protein: props.record.nutrition.protein,
        fibre: props.record.nutrition.fibre,
        sugar: props.record.nutrition.sugar,
        sodium: props.record.nutrition.sodium,
      });
    }
  }, [props.record]);

  useEffect(() => {
    if (props.record) {
      prefillForm();
    }
  }, [props.record, prefillForm]);

  async function postCreateEntry() {
    const response = await axiosInstance.post(
      "/user/intake-create",
      {
        entryDate: formData.date,
        nutrition: {
          energy: formData.energy,
          fat: formData.fat,
          carbs: formData.carbs,
          protein: formData.protein,
          fibre: formData.fibre,
          sugar: formData.sugar,
          sodium: formData.sodium,
        },
      },
      {
        withCredentials: true,
      }
    );
    return response;
  }

  async function postUpdateEntry() {
    const response = await axiosInstance.post(
      "/user/intake-update",
      {
        nutritionId: props.record?.nutritionId,
        entryDate: formData.date,
        nutrition: {
          energy: formData.energy,
          fat: formData.fat,
          carbs: formData.carbs,
          protein: formData.protein,
          fibre: formData.fibre,
          sugar: formData.sugar,
          sodium: formData.sodium,
        },
      },
      {
        withCredentials: true,
      }
    );
    return response;
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log("FORM DATA", formData);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    try {
      if (props.record?.nutritionId !== undefined) {
        await postUpdateEntry();
      } else {
        await postCreateEntry();
      }
      props.onSubmit();
      props.onClose();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (
          error.response?.data instanceof Object &&
          Object.prototype.hasOwnProperty.call(error.response?.data, "errors")
        ) {
          alert(error.response?.data.errors[0].msg);
        }
      } else {
        alert(error);
      }
    }
  }

  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0 bg-gray-500 bg-opacity-30 backdrop-blur-md flex justify-center items-center z-50"
    >
      <div className="flex flex-col justify-center items-center ring-black ring-4 rounded-lg mx-4">
        <button
          className="place-self-end mx-4 mt-4 size-12 icon-[icon-park-outline--close-one] bg-black hover:bg-ash-gray-700"
          onClick={props.onClose}
        ></button>
        <h1 className="p-8 font-roboto-mono font-bold tracking-[0.25em] text-4xl border-b-2 border-black">
          NUTRITION ENTRY
        </h1>
        <form
          className="flex flex-col justify-center items-center gap-4 w-3/4"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center items-center w-fit">
            <label htmlFor="date" className="px-4">
              Date
            </label>
            <input
              id="date"
              type="datetime-local"
              name="date"
              className="m-auto w-max font-work-sans"
              required
              max={getMaxDateString()}
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-7 justify-center items-center gap-8">
            <div className="flex flex-col justify-center items-center">
              <label htmlFor="energy">Energy</label>
              <div className="flex justify-between items-center gap-2 mt-2 mb-4">
                <input
                  id="energy"
                  type="number"
                  min={0}
                  step={1}
                  name="energy"
                  required
                  value={formData.energy}
                  onChange={handleInputChange}
                  className="m-0"
                ></input>
                <span className="font-roboto-mono text-right font-bold">
                  kcal
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <label htmlFor="fat">Fat</label>
              <div className="flex justify-between items-center gap-2 mt-2 mb-4">
                <input
                  id="fat"
                  type="number"
                  min={0}
                  step={0.1}
                  name="fat"
                  required
                  value={formData.fat}
                  onChange={handleInputChange}
                  className="m-0"
                ></input>
                <span className="font-roboto-mono text-right font-bold">g</span>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <label htmlFor="carbs">Carbs</label>
              <div className="flex justify-between items-center gap-2 mt-2 mb-4">
                <input
                  id="carbs"
                  type="number"
                  min={0}
                  step={0.1}
                  name="carbs"
                  required
                  value={formData.carbs}
                  onChange={handleInputChange}
                  className="m-0"
                ></input>
                <span className="font-roboto-mono text-right font-bold">g</span>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <label htmlFor="protein">Protein</label>
              <div className="flex justify-between items-center gap-2 mt-2 mb-4">
                <input
                  id="protein"
                  type="number"
                  min={0}
                  step={0.1}
                  name="protein"
                  required
                  value={formData.protein}
                  onChange={handleInputChange}
                  className="m-0"
                ></input>
                <span className="font-roboto-mono text-right font-bold">g</span>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <label htmlFor="fibre">Fibre</label>
              <div className="flex justify-between items-center gap-2 mt-2 mb-4">
                <input
                  id="fibre"
                  type="number"
                  min={0}
                  step={0.1}
                  name="fibre"
                  required
                  value={formData.fibre}
                  onChange={handleInputChange}
                  className="m-0"
                ></input>
                <span className="font-roboto-mono text-right font-bold">g</span>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <label htmlFor="sugar">Sugar</label>
              <div className="flex justify-between items-center gap-2 mt-2 mb-4">
                <input
                  id="sugar"
                  type="number"
                  min={0}
                  step={0.1}
                  name="sugar"
                  required
                  value={formData.sugar}
                  onChange={handleInputChange}
                  className="m-0"
                ></input>
                <span className="font-roboto-mono text-right font-bold">g</span>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <label htmlFor="sodium">Sodium</label>
              <div className="flex justify-between items-center gap-2 mt-2 mb-4">
                <input
                  id="sodium"
                  type="number"
                  min={0}
                  step={1}
                  name="sodium"
                  required
                  value={formData.sodium}
                  onChange={handleInputChange}
                  className="m-0"
                ></input>
                <span className="font-roboto-mono text-right font-bold">
                  mg
                </span>
              </div>
            </div>
          </div>
          <button type="submit">LET'S A-GO</button>
        </form>
      </div>
    </div>
  );
};

export default NutritionEntryForm;
