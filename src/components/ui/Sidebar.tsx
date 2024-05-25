import React from 'react';
import { IconButton, Stack, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from './Sidebar.module.css';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
    const router = useRouter();

    const handleProfileClick = () => {
        router.push('/account');
    }

    const handleLogoutClick = () => {
        localStorage.removeItem('refreshToken');
        router.push('/');
    }
    
    return (
        <Stack className={styles.sidebar} justifyContent="space-between">
            <Stack>
                <Tooltip title="Profile">
                    <IconButton className={styles.button} onClick={handleProfileClick}>
                        <AccountCircleIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
            <Stack>
                <Tooltip title="Logout">
                    <IconButton className={styles.button} onClick={handleLogoutClick}>
                        <LogoutIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
        </Stack>
    );
}

export default Sidebar;