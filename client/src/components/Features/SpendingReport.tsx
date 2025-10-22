import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import type { TransitionProps } from "@mui/material/transitions";
import { forwardRef, type ReactElement, type Ref } from "react";
import {
  Box,
  DialogContent,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import {
  ArrowUpward,
} from "@mui/icons-material";
import { PieChart, LineChart } from "@mui/x-charts";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<unknown>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const spendingTrendData = [
  { month: "Jan", value: 1800 },
  { month: "Feb", value: 1950 },
  { month: "Mar", value: 2400 },
  { month: "Apr", value: 2100 },
  { month: "May", value: 2600 },
  { month: "Jun", value: 2300 },
  { month: "Jul", value: 2450 },
];

const incomeExpenseData = [
  { label: "Income", value: 4500 },
  { label: "Expenses", value: 3000 },
];

type OpenDialogType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const SpendingReport = (props: OpenDialogType) => {
  const { open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      slots={{
        transition: Transition,
      }}
    >
      <AppBar sx={{ position: "relative", paddingBlock: "6px" }}>
        <Toolbar>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              sx={{ position: "absolute", left: "18px" }}
              //   edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              Spending Report
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Stack spacing={2}>
          {/* Spending Trend Section */}
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Spending Trend
          </Typography>
          <Paper sx={{ p: 2, mb: 4, borderRadius: 3 }}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Typography variant="h4" fontWeight={700}>
                $2,450
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", color: "green" }}
              >
                <ArrowUpward fontSize="small" />
                <Typography variant="body2" fontWeight={600}>
                  +12%
                </Typography>
              </Box>
            </Grid>

            <LineChart
              height={200}
              xAxis={[
                {
                  data: spendingTrendData.map((d) => d.month),
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  data: spendingTrendData.map((d) => d.value),
                  color: "#1976d2",
                },
              ]}
              grid={{ vertical: true, horizontal: true }}
            />
          </Paper>

          {/* Income vs Expenses Section */}
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Income vs. Expenses
          </Typography>
          <Paper sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              $7,450
            </Typography>
            <PieChart
              series={[
                {
                  data: incomeExpenseData,
                  innerRadius: 0,
                  outerRadius: 80,
                  arcLabel: (d) => `${d.label}: $${d.value}`,
                },
              ]}
              height={250}
            />
          </Paper>
        </Stack>
      </DialogContent>
      <Divider />
    </Dialog>
  );
};

export default SpendingReport;
