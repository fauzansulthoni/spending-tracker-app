import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";

const AddTransactionBtn = (props: { open: () => void }) => {
  const { open } = props;
  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      startIcon={<Add />}
      onClick={open}
    >
      Add Transaction
    </Button>
  );
};

export default AddTransactionBtn;
