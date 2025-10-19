import { Box, Grid, Typography, Paper } from "@mui/material";

const insights = [
  {
    title: "Food Expenses Increased",
    description:
      "Your food expenses rose by 20% this month. Consider reviewing your spending habits.",
    bgColor: "#FFE5B4", // light orange
    image: "/images/illustration/insight-1.png",
  },
  {
    title: "Entertainment Spending",
    description:
      "You spent 15% more on entertainment this month. Evaluate if this aligns with your budget.",
    bgColor: "#FFCC80", // orange
    image: "/images/illustration/insight-2.png",
  },
  {
    title: "Transportation Costs",
    description:
      "Transportation costs remained stable this month. Good job maintaining your budget!",
    bgColor: "#C8E6C9", // light green
    image: "/images/illustration/insight-3.png",
  },
  {
    title: "Overall Spending",
    description:
      "Your total spending increased by 5% this month. Review your budget to identify areas for potential savings.",
    bgColor: "#B2DFDB", // teal
    image: "/images/illustration/insight-4.png",
  },
];

const Insight = () => {
  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {insights.map((item, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
          <Paper
            className="layered-black-gradient"
            elevation={3}
            sx={{
              borderRadius: 3,
              // backgroundColor: item.bgColor,
              backgroundImage: `url(${item.image})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 3,
            }}
          >
            {/* Placeholder for illustration */}
            <Box
              sx={{
                height: 20,
                // backgroundColor: "rgba(255,255,255,0.4)",
                // borderRadius: 2,
                mb: 2,
              }}
            />
            <Box sx={{ position: "relative", zIndex: 2 }}>
              <Typography
                variant="h6"
                fontWeight={700}
                gutterBottom
                color="white"
              >
                {item.title}
              </Typography>
              <Typography variant="body2" color="white">
                {item.description}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Insight;
