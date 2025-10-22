import { Box, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // ✅ corrected typo from "hight"
        width: "100vw",
        position: "fixed", // ✅ use fixed to stay centered even during scroll
        zIndex: 1000,
        top: 0,
        left: 0,
        backgroundColor: "rgba(255, 255, 255, 0.8)", // optional: semi-transparent backdrop
        backdropFilter: "blur(2px)", // optional: subtle blur effect
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 500 }}>
        Loading...
      </Typography>
    </Box>
  );
};

export default Loading;
