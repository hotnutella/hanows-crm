import React from 'react';
import styles from './Footer.module.css';
import { Container, Typography } from '@mui/material';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className={styles.footer}>
            <Container>
                <Typography variant="body2" color="white" align="center">
                    &copy; {currentYear} Hanows OÜ. All rights reserved.
                </Typography>
            </Container>
        </footer >
    );
};

export default Footer;