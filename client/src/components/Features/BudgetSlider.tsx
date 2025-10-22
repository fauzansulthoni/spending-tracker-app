import { Slider } from "@mui/material";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useAppDispatch } from "../../hooks/hook";
import { updateBudget } from "../../store/budgetSlice";
import { useSummary } from "../../hooks/useSummary";
interface BudgetSliderType {
  budgetId: string;
  budget: number;
  anotherCategoryBudget: number;
  totalIncome: number;
}
const BudgetSlider = (props: BudgetSliderType) => {
  const { budgetId, anotherCategoryBudget, budget, totalIncome } = props;
  const percentage = Math.round((Math.abs(budget) / totalIncome) * 100);
  const [sliderValue, setSliderValue] = useState(percentage);
  const [newBudgetValue, setNewBudgetValue] = useState(budget);

  const handleChange = (
    _event: Event,
    value: number | number[],
    _activeThumb: number
  ) => {
    const valuePercentage = typeof value === "number" ? value : value[0];
    const newBudget = Math.round((valuePercentage / 100) * totalIncome);
    if (newBudget + anotherCategoryBudget > totalIncome) {
      return;
    } else {
      setSliderValue(valuePercentage);
      setNewBudgetValue(newBudget);
    }
  };
  const { setFilterBudget, activeAccount } = useSummary();
  const debouncedAmount = useDebounce(newBudgetValue, 500);
  const dispatch = useAppDispatch();
  // Save to backend or trigger side effect
  useEffect(() => {
    if (debouncedAmount !== 0) {
      dispatch(
        updateBudget({
          _id: budgetId,
          limitAmount: debouncedAmount,
        })
      ).then((action) => {
        typeof activeAccount === "string" &&
          setTimeout(
            () =>
              setFilterBudget((prev) => ({
                ...prev,
                accountId: activeAccount,
                month: action.payload.data.month,
              })),
            500
          );
      });
    }
  }, [debouncedAmount]);
  return (
    <>
      <Slider
        track={false}
        aria-labelledby="track-false-slider"
        defaultValue={percentage}
        value={sliderValue}
        onChange={handleChange}
      />
    </>
  );
};

export default BudgetSlider;
