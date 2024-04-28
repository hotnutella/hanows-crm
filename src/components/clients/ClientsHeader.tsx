import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react';
import styles from './ClientsHeader.module.css';
import SearchBar from '@/components/ui/SearchBar';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { setSearchTerm } from '@/store/slices/clientSearchSlice';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useRouter } from 'next/navigation';

const ClientsHeader: React.FC = () => {
    const search = useDispatch<AppDispatch>();
    const router = useRouter();

    const handleSearch = (searchTerm: string) => {
        search(setSearchTerm(searchTerm));
    }

    return (
        <Stack spacing={2} className={styles.header}>
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h4">Clients</Typography>
                <Tooltip title="Add client">
                    <IconButton size="small" color="primary" onClick={() => router.push('/new')}>
                        <AddCircleIcon color="primary" fontSize="large" />
                    </IconButton>
                </Tooltip>
            </Stack>
            <SearchBar onSearch={handleSearch} />
        </Stack>
    );
}

export default ClientsHeader;