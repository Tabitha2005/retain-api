import { useState, type ReactNode } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardOutlined from "@mui/icons-material/DashboardOutlined";
import ReceiptLongOutlined from "@mui/icons-material/ReceiptLongOutlined";
import SavingsOutlined from "@mui/icons-material/SavingsOutlined";
import InsightsOutlined from "@mui/icons-material/InsightsOutlined";
import CategoryOutlined from "@mui/icons-material/CategoryOutlined";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import Logo from "./Logo";
import { useAuth } from "../hooks/useAuth";

const WIDTH = 256;

interface NavItem {
  to: string;
  label: string;
  icon: ReactNode;
  end?: boolean;
}

const userNav: NavItem[] = [
  { to: "/", label: "Dashboard", icon: <DashboardOutlined />, end: true },
  { to: "/expenses", label: "Expenses", icon: <ReceiptLongOutlined /> },
  { to: "/budget", label: "Budget", icon: <SavingsOutlined /> },
];

const adminNav: NavItem[] = [
  { to: "/admin", label: "Insights", icon: <InsightsOutlined />, end: true },
  { to: "/admin/categories", label: "Categories", icon: <CategoryOutlined /> },
];

function NavGroup({ items, onNavigate }: { items: NavItem[]; onNavigate: () => void }) {
  return (
    <List disablePadding>
      {items.map((item) => (
        <ListItemButton
          key={item.to}
          component={NavLink}
          to={item.to}
          end={item.end}
          onClick={onNavigate}
          sx={{
            borderRadius: 2,
            mb: 0.5,
            py: 1.1,
            color: "text.secondary",
            "& .MuiListItemIcon-root": { color: "inherit", minWidth: 40 },
            "&.active": {
              bgcolor: "primary.main",
              color: "#FFFFFF",
              "&:hover": { bgcolor: "primary.dark" },
            },
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} slotProps={{ primary: { sx: { fontWeight: 700, fontSize: "0.95rem" } } }} />
        </ListItemButton>
      ))}
    </List>
  );
}

function SidebarContent({ onNavigate }: { onNavigate: () => void }) {
  const { user, isAdmin, signOut } = useAuth();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", p: 2 }}>
      <Box sx={{ px: 1.5, py: 1.5, mb: 2 }}>
        <Logo />
      </Box>

      {isAdmin ? (
        <>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, px: 1.5, mb: 1 }}>
            Admin console
          </Typography>
          <NavGroup items={adminNav} onNavigate={onNavigate} />
        </>
      ) : (
        <NavGroup items={userNav} onNavigate={onNavigate} />
      )}

      <Box sx={{ flexGrow: 1 }} />
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 0.5 }}>
        <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36, fontSize: "0.95rem", fontWeight: 700 }}>
          {user?.name.charAt(0).toUpperCase()}
        </Avatar>
        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
          <Typography noWrap sx={{ fontWeight: 700, fontSize: "0.9rem" }}>
            {user?.name}
          </Typography>
          <Typography noWrap variant="caption" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>
        <IconButton aria-label="Sign out" onClick={signOut}>
          <LogoutOutlined fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}

export default function AppLayout() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {!isDesktop && (
        <AppBar position="fixed" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Toolbar>
            <IconButton edge="start" aria-label="Open menu" onClick={(e) => {
                e.currentTarget.blur();
                setOpen(true);
              }} sx={{ mr: 1 }}>
              <MenuIcon />
            </IconButton>
            <Logo />
          </Toolbar>
        </AppBar>
      )}

      <Drawer
        variant={isDesktop ? "permanent" : "temporary"}
        open={isDesktop || open}
        onClose={() => setOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{ "& .MuiDrawer-paper": { width: WIDTH, boxSizing: "border-box", borderRight: 1, borderColor: "divider" } }}
      >
        <SidebarContent onNavigate={() => setOpen(false)} />
      </Drawer>

      <Box component="main" sx={{ ml: { md: `${WIDTH}px` }, pt: { xs: 8, md: 0 }, minWidth: 0 }}>
        <Box sx={{ maxWidth: 1120, mx: "auto", px: { xs: 2, sm: 3, md: 5 }, py: { xs: 3, md: 5 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
