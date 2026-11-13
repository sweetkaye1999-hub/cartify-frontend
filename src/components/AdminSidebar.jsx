import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import {
  DashboardOutlined,
  Inventory2Outlined,
  CategoryOutlined,
  ShoppingCartOutlined,
  SettingsOutlined,
} from "@mui/icons-material";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <DashboardOutlined />,
    disabled: true,
  },
  {
    title: "Products",
    path: "/",
    icon: <Inventory2Outlined />,
    disabled: false,
  },
  {
    title: "Categories",
    path: "/categories",
    icon: <CategoryOutlined />,
    disabled: true,
  },
  {
    title: "Orders",
    path: "/orders",
    icon: <ShoppingCartOutlined />,
    disabled: true,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <SettingsOutlined />,
    disabled: true,
  },
];

function AdminSidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: { xs: 72, sm: 220 },
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: { xs: 72, sm: 220 },
          boxSizing: "border-box",
          position: "static",
          height: "100%",
          bgcolor: "#17243B",
          color: "#FFFFFF",
          borderRight: "none",
        },
      }}
    >
      <Box sx={{ px: 2, py: 3 }}>
        <Typography
          variant="overline"
          sx={{
            color: "#AAB6CC",
            display: { xs: "none", sm: "block" },
          }}
        >
          ADMIN MENU
        </Typography>
      </Box>

      <List sx={{ px: 1 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.title}
            component={item.disabled ? "div" : NavLink}
            to={item.disabled ? undefined : item.path}
            disabled={item.disabled}
            aria-label={item.title}
            sx={{
              borderRadius: 2,
              mb: 1,
              minHeight: 48,
              color: "#D5DCE8",
              "&.active": {
                bgcolor: "#2457C5",
                color: "#FFFFFF",
              },
              "&:hover": {
                bgcolor: "#293B59",
              },
              "&.Mui-disabled": {
                opacity: 0.45,
                color: "#D5DCE8",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "inherit",
                minWidth: { xs: 0, sm: 40 },
                justifyContent: "center",
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText
              primary={item.title}
              sx={{ display: { xs: "none", sm: "block" } }}
            />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

export default AdminSidebar;