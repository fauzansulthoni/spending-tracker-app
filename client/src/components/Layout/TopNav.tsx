import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useThemeContext } from "../../theme/ThemeContextProvider";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  InsightsOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { useLogout } from "../../hooks/useLogout";
import { useAppSelector } from "../../hooks/hook";

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

function TopNav() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const { theme } = useThemeContext();
  const { handleLogout } = useLogout();
  const { user } = useAppSelector((state) => state.auth);
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.bgColor.main,
        color: theme.palette.bgColorPrimary.contrastText,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SpendWise
          </Typography>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SpendWise
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {navItems.map(({ to, label }) => (
              <Button
                key={to}
                component={Link}
                to={to}
                sx={{ my: 2, display: "block" }}
              >
                {label}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={user ? user.name : "User name"}
                  src={
                    user
                      ? `http://localhost:5000/uploads/${user.photo}`
                      : "/avatar.jpg"
                  }
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                component={Link}
                to={"/user/settings"}
                onClick={handleCloseUserMenu}
              >
                <Typography sx={{ textAlign: "center" }}>Settings</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  handleLogout();
                }}
              >
                <Typography sx={{ textAlign: "center" }}>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TopNav;
