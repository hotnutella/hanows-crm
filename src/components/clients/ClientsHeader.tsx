import { Stack, Typography } from '@mui/material';
import React from 'react';
import styles from './ClientsHeader.module.css';
import SearchBar from '../ui/SearchBar';

const ClientsHeader: React.FC = () => {
    return (
        <Stack spacing={2} className={styles.header}>
            <Typography variant="h4">Clients</Typography>
            <SearchBar />
        </Stack>
    );
}

export default ClientsHeader;