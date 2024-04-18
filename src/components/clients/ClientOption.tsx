import React from 'react'
import { Client } from '@/store/api/clientsApi'
import { Box, Typography } from '@mui/material'
import styles from './ClientOption.module.css'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { selectSelectedClient } from '@/store/slices/clientSearchSlice'

interface ClientOptionProps {
    client: Client
}

const ClientOption: React.FC<ClientOptionProps> = ({ client }) => {
    const selectedClientId = useSelector(selectSelectedClient);
    const isSelected = selectedClientId === client.id;
    const className = isSelected ? `${styles.client} ${styles.selected}` : styles.client

    return (
        <Link href={`/${client.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box className={className}>
                <Typography variant="body1">{client.name}</Typography>
                <Typography variant="body2" color="grey">{client.email}</Typography>
            </Box>
        </Link>
    )
}

export default ClientOption