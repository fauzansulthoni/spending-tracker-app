import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import useSpeedDialTrigger from "../../hooks/useSpeedDialTrigger";
import {
  AccountCircleOutlined,
  AddCardOutlined,
  CategoryOutlined,
  WalletOutlined,
} from "@mui/icons-material";
import { useSummary } from "../../hooks/useSummary";
import type React from "react";
interface CustomSpeedDialType {
  setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenAddCategory: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenAddAccount: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSpendingBudget: React.Dispatch<React.SetStateAction<boolean>>;
}
const CustomSpeedDial = (props: CustomSpeedDialType) => {
  const {
    setOpenAdd,
    setOpenAddCategory,
    setOpenAddAccount,
    setOpenSpendingBudget,
  } = props;
  const { filteredCategories } = useSummary();
  const { speedDialProps } = useSpeedDialTrigger();
  const actions = [
    {
      icon: <AddCardOutlined />,
      name: "Transaction",
      control: () => {
        if (filteredCategories.length > 0) {
          setOpenAdd(true);
        } else {
          alert(
            "You don't have any category, please add category before adding budget"
          );
        }
      },
    },
    {
      icon: <CategoryOutlined />,
      name: "Category",
      control: () => setOpenAddCategory(true),
    },
    {
      icon: <AccountCircleOutlined />,
      name: "Account",
      control: () => setOpenAddAccount(true),
    },
    {
      icon: <WalletOutlined />,
      name: "Budget",
      control: () => {
        if (filteredCategories.length > 0) {
          setOpenSpendingBudget(true);
        } else {
          alert(
            "You don't have any category, please add category before adding budget"
          );
        }
      },
    },
  ];

  return (
    <SpeedDial
      ariaLabel="SpeedDial tooltip example"
      sx={{ position: "absolute", bottom: 88, right: 24 }}
      icon={<SpeedDialIcon />}
      {...speedDialProps}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          slotProps={{
            tooltip: {
              open: true,
              title: action.name,
            },
          }}
          onClick={action.control}
        />
      ))}
    </SpeedDial>
  );
};

export default CustomSpeedDial;
