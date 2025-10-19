import { useState } from "react";
import { IconButton } from "@mui/material";
import Edit from "@mui/icons-material/Edit";
import { useThemeContext } from "../../theme/ThemeContextProvider";
interface EditButtonType {
  onClick?: () => void;
}
const EditButton = (props: EditButtonType) => {
  const { onClick } = props;
  const [hovered, setHovered] = useState(false);
  const { theme } = useThemeContext();
  return (
    <IconButton
      size="small"
      sx={{
        color: hovered
          ? theme.palette.primary.main
          : theme.palette.text.secondary,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <Edit />
    </IconButton>
  );
};

export default EditButton;
