import React, { memo, type RefObject } from "react";
import { Box, Chip, Avatar, Typography } from "@mui/material";
import { useThemeContext } from "../../theme/ThemeContextProvider";
import type { AccountType } from "../../types/Account";

interface AccountChipType {
  item: AccountType;
  activeAccount: string;
  setActiveItem: (clickedItem: string) => void;
  chipRefs: RefObject<Record<string, HTMLDivElement | null>>;
}
const AccountChip = memo(
  ({ item, activeAccount, setActiveItem, chipRefs }: AccountChipType) => {
    return (
      <Chip
        key={item._id}
        ref={(el) => {
          if (item._id) chipRefs.current[item._id] = el;
        }}
        avatar={
          <Avatar
            alt={item.name}
            src={`http://localhost:5000/uploads/${item.photo}`}
            slotProps={{
              img: {
                loading: "lazy",
                onError: () => console.warn("Image failed to load"),
              },
            }}
          />
        }
        label={item.name}
        color="primary"
        variant={item._id === activeAccount ? "filled" : "outlined"}
        onClick={() => item._id && setActiveItem(item._id)}
        clickable
        sx={{
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            boxShadow: 2,
          },
        }}
      />
    );
  }
);
interface AccountSelectorType {
  filteredAccounts: AccountType[];
  activeAccount: string;
  setActiveItem: (clickedItem: string) => void;
  chipRefs: RefObject<Record<string, HTMLDivElement | null>>;
}
export const AccountSelector = ({
  filteredAccounts,
  activeAccount,
  setActiveItem,
  chipRefs,
}: AccountSelectorType) => {
  const { theme } = useThemeContext();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: { sm: "space-between", md: "flex-start" },
        gap: 2,
      }}
    >
      <Typography
        variant="h6"
        fontWeight={600}
        color={theme.palette.bgColorPrimary.contrastText}
      >
        Account:
      </Typography>
      <Box
        className="no-scroll-btn"
        sx={{
          borderRadius: 4,
          maxWidth: "100%",
          display: "flex",
          alignItems: "center",
          overflowX: "auto",
          whiteSpace: "nowrap",
          gap: 1,
        }}
      >
        {filteredAccounts.map((item) => (
          <AccountChip
            key={item._id}
            item={item}
            activeAccount={activeAccount}
            setActiveItem={setActiveItem}
            chipRefs={chipRefs}
          />
        ))}
      </Box>
    </Box>
  );
};
