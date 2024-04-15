import React from 'react'
import { Client } from '../../../store/clientsApi'
import { Box, Typography } from '@mui/material'
import styles from './ClientOption.module.css'

interface ClientOptionProps {
    client: Client
}

const ClientOption: React.FC<ClientOptionProps> = ({ client }) => {
    return (
        <Box className={styles.client}>
            <Typography variant="body1">{client.name}</Typography>
            <Typography variant="body2" color="grey">{client.email}</Typography>
        </Box>
    )
}

export default ClientOption