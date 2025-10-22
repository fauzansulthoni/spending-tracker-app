import {
  HomeOutlined,
  InsightsOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import {
  BottomNavigation,
  BottomNavigationAction,
  Divider,
} from "@mui/material";
import { useThemeContext } from "../../theme/ThemeContextProvider";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
type NavItem = {
  label: string;
  icon: React.ReactNode;
  to: string;
};

const navItems: NavItem[] = [
  { label: "Home", icon: <HomeOutlined />, to: "/user/home" },
  {
    label: "Dashboard",
    icon: <InsightsOutlined />,
    to: "/user/main-dashboard",
  },
  { label: "Settings", icon: <SettingsOutlined />, to: "/user/settings" },
];
interface CustomBottomNavigationType {
  setHeaderName: React.Dispatch<React.SetStateAction<string>>;
}

const CustomBottomNavigation = (props: CustomBottomNavigationType) => {
  const { setHeaderName } = props;
  const { theme } = useThemeContext();

  const location = useLocation();
  const [value, setValue] = useState(location.pathname);
  useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);
  return (
    <BottomNavigation
      sx={{
        position: "fixed",
        width: "100%",
        height: "65px",
        bgcolor: theme.palette.bgColor.main,
        bottom: 0,
        display: { xs: "flex", md: "none" },
      }}
      value={value}
      onChange={(_, newValue) => setValue(newValue)}
    >
      <Divider />
      {navItems.map(({ to, label, icon }) => (
        <BottomNavigationAction
          sx={{ color: theme.palette.bgColor.contrastText }}
          key={to}
          label={label}
          icon={icon}
          component={Link}
          to={to}
          value={to}
          onClick={() => setHeaderName(label)}
        />
      ))}
    </BottomNavigation>
  );
};

export default CustomBottomNavigation;
