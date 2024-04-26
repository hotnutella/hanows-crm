'use client';

import React from 'react';
import { useGetInvoiceQuery } from '@/store/api/invoicesApi';

interface InvoicePageProps {
    params: {
        id: string;
        invoice_id: string;
    };
}

const InvoicePage: React.FC<InvoicePageProps> = ({ params }) => {
    const { invoice_id } = params;
    const { data: invoice } = useGetInvoiceQuery(+invoice_id);

    return (
        <>
            {invoice && (
                <iframe src={invoice.additional_info.pdf_url} style={{ width: '100%', height: '100%' }} />
            )}
        </>
    );
};

export default InvoicePage;