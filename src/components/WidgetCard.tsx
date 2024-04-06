import React from 'react';
import { Card, CardContent } from '@mui/material';
import styles from './WidgetCard.module.css';
import Link from 'next/link';

interface WidgetCardProps {
    route?: string
    children: React.ReactNode
}

const WidgetCard: React.FC<WidgetCardProps> = (props) => {
    const { children } = props;

    return (
        <Link href={props.route || ''} className={styles.link}>
            <Card className={styles.card}>
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </Link>
    );
};

export default WidgetCard;