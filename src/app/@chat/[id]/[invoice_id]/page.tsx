'use client';

import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import InvoiceDocument from '@/components/pdf/InvoiceDocument';
import { Invoice, useGetInvoiceQuery } from '@/store/api/invoicesApi';

interface InvoicePageProps {
    params: {
        invoice_id: string;
    };
}

const InvoicePage: React.FC<InvoicePageProps> = ({ params }) => {
    const { invoice_id } = params;
    console.log(params)
    const { data: invoice } = useGetInvoiceQuery(+invoice_id);
    return (
        <>
            {invoice && <PDFViewer style={{ width: '100%', height: '100%' }}>
                <InvoiceDocument invoice={invoice} invoiceLines={[]} />
            </PDFViewer>}
        </>
    );
};

export default InvoicePage;