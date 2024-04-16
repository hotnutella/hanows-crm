import { Stack, Typography } from '@mui/material';
import React from 'react';
import styles from './ClientsHeader.module.css';
import SearchBar from '@/components/ui/SearchBar';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { setSearchTerm } from '@/store/clientSearchSlice';

const ClientsHeader: React.FC = () => {
    const search = useDispatch<AppDispatch>();

    const handleSearch = (searchTerm: string) => {
        search(setSearchTerm(searchTerm));
    }

    return (
        <Stack spacing={2} className={styles.header}>
            <Typography variant="h4">Clients</Typography>
            <SearchBar onSearch={handleSearch} />
        </Stack>
    );
}

export default ClientsHeader;