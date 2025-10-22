import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useThemeContext } from "../theme/ThemeContextProvider";

const Test = () => {
  const { theme } = useThemeContext();
  return (
    <Box
      sx={{
        width: "100dvw",
        height: "100dvh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: theme.palette.bgColor.light,
        padding: 4
      }}
    >
      <Stack spacing={2} alignItems="center" sx={{ width: "100%" }}>
        <FormControl fullWidth>
          <InputLabel id="select-type-label">Type</InputLabel>
          <Select
            labelId="select-type-label"
            id="select-type"
            label="Type"
            name="type"
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
};

export default Test;
