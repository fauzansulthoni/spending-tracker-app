import {
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import welcomeIllustration from "/images/illustration/welcome-illustration.png";
import { HelpOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../theme/ThemeContextProvider";
import { useLayoutContext } from "../../context/LayoutContext";

const Welcome = () => {
  const navigate = useNavigate();
  const { theme } = useThemeContext();
  const { isSmUp } = useLayoutContext();
  return (
    <Grid
      container
      size={12}
      sx={{
        height: "100dvh",
        width: "100dvw",
        boxSizing: "border-box",
        padding: "32px",
        // gap: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: theme.palette.bgColor.light,
      }}
    >
      <Grid
        size={{ md: 12 }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "700" }}>
          SpendWise
        </Typography>
        <IconButton sx={{ position: "absolute", right: 0 }}>
          <HelpOutline />
        </IconButton>
      </Grid>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1000px",
          marginInline: "auto",
          marginBottom: 2,
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <img
          src={welcomeIllustration}
          alt="welcome-illustration"
          style={{
            float: isSmUp ? "left" : "none",
            width: "100%",
            maxWidth: "400px",
            borderRadius: "20px",
            maxHeight: "260px",
            objectFit: "cover",
            marginRight: "32px",
            marginBottom: "32px",
            marginInline: "auto",
          }}
        />
        <Box
          sx={{
            maxWidth: "400px",
            marginInline: "auto",
          }}
        >
          <Typography
            variant="h4"
            fontWeight={600}
            sx={{
              textAlign: isSmUp ? "left" : "center",
            }}
            gutterBottom
          >
            Track, Evaluate, and Improve Your Spending
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: isSmUp ? "left" : "center",
            }}
            color="textSecondary"
            fontSize={18}
          >
            Gain insights into your financial habits and make informed decisions
            to achieve your goals.
          </Typography>
          {isSmUp && (
            <Button
              size="large"
              variant="contained"
              color="primary"
              sx={{ textTransform: "none", marginTop: "20px" }}
              onClick={() => {
                navigate({
                  pathname: "/auth/login",
                });
              }}
            >
              Get Started
            </Button>
          )}
        </Box>
      </Box>
      {!isSmUp ? (
        <Button
          size="large"
          variant="contained"
          color="primary"
          sx={{ textTransform: "none", marginTop: "20px" }}
          onClick={() => {
            navigate({
              pathname: "/auth/login",
            });
          }}
        >
          Get Started
        </Button>
      ) : (
        <Box>
          <Typography>Copyright Fauzan Sulthoni 2024</Typography>
        </Box>
      )}
    </Grid>
  );
};

export default Welcome;
