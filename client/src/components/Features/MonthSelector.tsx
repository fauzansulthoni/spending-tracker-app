import { useState } from "react";
import { months } from "../../config/monthConfig";
import dayjs from "dayjs";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useSummary } from "../../hooks/useSummary";

const MonthSelector = () => {
  const currentMonthStart = dayjs().startOf("month").format("YYYY-MM-DD");
  const [month, setMonth] = useState(currentMonthStart);
  const { setFilterTransaction } = useSummary();
  const handleChangeMonth = (value: string) => {
    setMonth(value);
    if (value === "All Months") {
      setFilterTransaction((prev) => ({ ...prev, month: "" }));
    } else {
      setFilterTransaction((prev) => ({ ...prev, month: value }));
    }
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="select-month-label" size={"small"}>
        Month
      </InputLabel>
      <Select
        labelId="select-month-label"
        id="select-month"
        label="Month"
        name="month"
        size={"small"}
        value={month}
        onChange={(e) => {
          handleChangeMonth(e.target.value);
        }}
      >
        <MenuItem value="All Months">All Months</MenuItem>
        {months.map((month, index) => {
          const currentYear = dayjs().year(); // Move inside the loop to ensure freshness
          const firstDay = dayjs(`${currentYear}-${index + 1}-01`).startOf(
            "month"
          );
          return (
            <MenuItem key={month} value={firstDay.format("YYYY-MM-DD")}>
              {month}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default MonthSelector;
