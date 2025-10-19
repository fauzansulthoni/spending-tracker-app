import { Box, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        hight: "100dvh",
        width: "100dvw",
        position: "absolute",
        zIndex: 1000,
        left: "0",
        top: "0",
      }}
    >
      <Typography variant="h6">Loading...</Typography>
    </Box>
  );
};

export default Loading;
