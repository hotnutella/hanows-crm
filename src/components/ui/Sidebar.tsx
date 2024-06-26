import React from "react";
import { IconButton, Stack, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChatIcon from "@mui/icons-material/Chat";
import styles from "./Sidebar.module.css";
import { useRouter } from "next/navigation";

interface SidebarProps {
  direction?: "row" | "column";
}

const Sidebar: React.FC<SidebarProps> = ({ direction }) => {
  const router = useRouter();

  const handleProfileClick = () => {
    router.push("/account");
  };

  const handleChatClick = () => {
    router.push("/crm");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("refreshToken");
    router.push("/");
  };

  const handleSettingsClick = () => {
    router.push("/settings");
  };

  const dir = direction || "column";
  const className =
    dir === "row"
      ? `${styles.sidebar} ${styles.row}`
      : `${styles.sidebar} ${styles.column}`;

  return (
    <Stack className={className} justifyContent="space-between" direction={dir}>
      <Stack direction={dir}>
        <Tooltip title="Profile">
          <IconButton className={styles.button} onClick={handleProfileClick}>
            <AccountCircleIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Clients">
          <IconButton className={styles.button} onClick={handleChatClick}>
            <ChatIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <Stack direction={dir}>
        <Tooltip title="Settings">
          <IconButton className={styles.button} onClick={handleSettingsClick}>
            <SettingsIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Logout">
          <IconButton className={styles.button} onClick={handleLogoutClick}>
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default Sidebar;
