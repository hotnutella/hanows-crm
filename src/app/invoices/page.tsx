'use client'

import React from 'react';
import { useGetInvoicesQuery } from '../../store/invoicesApi';

const InvoicesPage: React.FC = () => {
    const { data: invoices } = useGetInvoicesQuery();
    console.log(invoices)
    
    return (
        <div>
            <h1>Invoices Page</h1>
            {/* Add your content here */}
        </div>
    );
};

export default InvoicesPage;