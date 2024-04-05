import { Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

interface LogoProps {
    mobile?: boolean;
}

const Logo: React.FC<LogoProps> = (props: LogoProps) => {
    const { mobile } = props;

    if (mobile) {
        return (
            <Link href="/" style={{ textDecoration: 'none', color: "rgba(0, 0, 0, 0.87)" }}>
                <Typography variant="h6">Hanows CRM</Typography>
            </Link>
        );
    }

    return (
        <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
            <Link href="/" style={{ textDecoration: 'none', color: "#fff" }}>
                Hanows CRM
            </Link>
        </Typography>
    )
};

export default Logo;