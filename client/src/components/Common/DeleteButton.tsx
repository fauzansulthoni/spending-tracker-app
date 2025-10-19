import { useState } from "react";
import { IconButton } from "@mui/material";
import DeleteForever from "@mui/icons-material/DeleteForever";
import { useThemeContext } from "../../theme/ThemeContextProvider";
interface DeleteButtonType {
  onDelete: () => void;
}
const DeleteButton = (props: DeleteButtonType) => {
  const { onDelete } = props;
  const [hovered, setHovered] = useState(false);
  const { theme } = useThemeContext();
  return (
    <IconButton
      size="small"
      sx={{
        color: hovered
          ? theme.palette.error.main
          : theme.palette.text.secondary,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onDelete}
    >
      <DeleteForever />
    </IconButton>
  );
};

export default DeleteButton;
