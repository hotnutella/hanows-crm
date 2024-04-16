import React from 'react'
import { Client } from '@/store/clientsApi'
import { Box, Typography } from '@mui/material'
import styles from './ClientOption.module.css'
import Link from 'next/link'

interface ClientOptionProps {
    client: Client
    isSelected?: boolean
}

const ClientOption: React.FC<ClientOptionProps> = ({ client, isSelected }) => {
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