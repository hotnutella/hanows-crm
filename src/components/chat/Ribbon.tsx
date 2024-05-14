import React from 'react';
import styles from './Ribbon.module.css';
import { Box, Typography } from '@mui/material';

interface RibbonProps {
    text: string;
}

const Ribbon: React.FC<RibbonProps> = ({ text }) => {
    return (
        <Box className={styles.ribbon}>
            <Typography variant="body2" className={styles.text}>{text}</Typography>
        </Box>
    );
};

export default Ribbon;