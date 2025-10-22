import {
  AttachMoneyOutlined,
  ChevronRight,
  ContrastOutlined,
  LayersClearOutlined,
  LockOutlined,
  LogoutOutlined,
  NotificationsOutlined,
  PersonOutlineOutlined,
  VerifiedUserOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  ListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useThemeContext } from "../../theme/ThemeContextProvider";
import EditUser from "../../components/Features/EditUser";
import { useLogout } from "../../hooks/useLogout";
import IOSSwitch from "../../components/Common/IOSSwitch";
import { useState } from "react";

type SettingItemProps = {
  onClick?: () => void;
  icon: React.ReactElement;
  title: string;
  description: string;
  control?: React.ReactNode;
};

const SettingItem = ({
  onClick,
  icon,
  title,
  description,
  control,
}: SettingItemProps) => {
  const { theme } = useThemeContext();
  return (
    <ListItem>
      <Box
        onClick={onClick}
        sx={{
          paddingBlock: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <IconButton
            sx={{
              backgroundColor: theme.palette.bgColorPrimary.light,
              width: "40px",
              height: "40px",
              padding: 3,
            }}
          >
            {icon}
          </IconButton>
          <Box>
            <Typography
              variant="body1"
              sx={{ fontSize: 18, fontWeight: 600 }}
              color={theme.palette.bgColorPrimary.contrastText}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.bgColor.contrastText }}
              gutterBottom
            >
              {description}
            </Typography>
          </Box>
        </Stack>
        {control !== undefined && <Box>{control}</Box>}
      </Box>
    </ListItem>
  );
};

const Settings = () => {
  const { theme, toggleColorMode } = useThemeContext();
  const { handleLogout } = useLogout();
  const [openEditUser, setOpenEditUser] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const handleClickOpenEditUser = () => {
    setOpenEditUser(true);
  };
  return (
    <Box>
      <Grid container size={12} spacing={2}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <Box>
            <Typography
              variant="body1"
              fontWeight={700}
              fontSize={18}
              color={theme.palette.bgColorPrimary.contrastText}
              gutterBottom={true}
            >
              Account {editPassword ? "on" : "off"}
            </Typography>
            <Paper
              sx={{
                backgroundColor: theme.palette.bgColorPrimary.light,
                color: theme.palette.bgColorPrimary.contrastText,
                borderRadius: 3,
                boxShadow: "none",
                border: `1px solid ${theme.palette.customColor.dark}`,
              }}
            >
              <SettingItem
                icon={<PersonOutlineOutlined color="primary" />}
                title="Personal Information"
                description="Manage your personal information"
                control={
                  <FormControlLabel
                    control={<ChevronRight />}
                    label=""
                    sx={{ m: 1 }}
                    aria-label="Toggle dark mode"
                    onClick={handleClickOpenEditUser}
                  />
                }
              />  
              <Divider />
              <SettingItem
                icon={<LockOutlined color="primary" />}
                title="Password"
                description="Change your password"
                control={
                  <FormControlLabel
                    control={<ChevronRight />}
                    label=""
                    sx={{ m: 1 }}
                    aria-label="Toggle reminders"
                    onClick={() => {
                      handleClickOpenEditUser();
                      setEditPassword(true);
                    }}
                  />
                }
              />
              <Divider />
              <SettingItem
                onClick={handleLogout}
                icon={
                  <LogoutOutlined
                    sx={{ transform: "rotate(180deg)" }}
                    color="primary"
                  />
                }
                title="Logout"
                description=""
              />
            </Paper>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <Box>
            <Typography
              variant="body1"
              fontWeight={700}
              fontSize={18}
              color={theme.palette.bgColorPrimary.contrastText}
              gutterBottom={true}
            >
              Preferences
            </Typography>
            <Paper
              sx={{
                backgroundColor: theme.palette.bgColorPrimary.light,
                color: theme.palette.bgColorPrimary.contrastText,
                borderRadius: 3,
                boxShadow: "none",
                border: `1px solid ${theme.palette.customColor.dark}`,
              }}
            >
              <SettingItem
                icon={<ContrastOutlined color="primary" />}
                title="Theme"
                description="Choose between light and dark mode"
                control={
                  <FormControlLabel
                    control={
                      <IOSSwitch defaultChecked onChange={toggleColorMode} />
                    }
                    label=""
                    sx={{ m: 1 }}
                    aria-label="Toggle dark mode"
                  />
                }
              />
              <Divider />
              <SettingItem
                icon={<AttachMoneyOutlined color="primary" />}
                title="Currency"
                description="Set your prefered currency"
                control={
                  <FormControlLabel
                    control={<ChevronRight />}
                    label=""
                    sx={{ m: 1 }}
                    aria-label="Select Currency"
                  />
                }
              />
            </Paper>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
          <Box>
            <Typography
              variant="body2"
              fontWeight={700}
              fontSize={18}
              color={theme.palette.bgColorPrimary.contrastText}
              gutterBottom={true}
            >
              App Settings
            </Typography>
            <Paper
              sx={{
                backgroundColor: theme.palette.bgColorPrimary.light,
                color: theme.palette.bgColorPrimary.contrastText,
                borderRadius: 3,
                boxShadow: "none",
                border: `1px solid ${theme.palette.customColor.dark}`,
              }}
            >
              <SettingItem
                icon={<NotificationsOutlined color="primary" />}
                title="Notification"
                description="Manage notifications"
                control={
                  <FormControlLabel
                    control={<IOSSwitch defaultChecked />}
                    label=""
                    sx={{ m: 1 }}
                    aria-label="Toggle reminders"
                  />
                }
              />
              <Divider />
              <SettingItem
                icon={<LayersClearOutlined color="primary" />}
                title="Clear Data"
                description="Clear all app data"
                control={
                  <FormControlLabel
                    control={<ChevronRight />}
                    label=""
                    sx={{ m: 1 }}
                    aria-label="Clear all app data"
                  />
                }
              />
              <Divider />
              <SettingItem
                icon={<VerifiedUserOutlined color="primary" />}
                title="Privacy Policy"
                description="Terms of Service"
                control={
                  <FormControlLabel
                    control={<ChevronRight />}
                    label=""
                    sx={{ m: 1 }}
                    aria-label="Toggle reminders"
                  />
                }
              />
            </Paper>
          </Box>
        </Grid>
        <EditUser
          open={openEditUser}
          setOpen={setOpenEditUser}
          editPassword={editPassword}
          setEditPassword={setEditPassword}
        />
      </Grid>
    </Box>
  );
};

export default Settings;
