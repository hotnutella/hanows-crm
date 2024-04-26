'use client';

import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import InvoiceDocument from '@/components/pdf/InvoiceDocument';
import { useGetInvoiceQuery } from '@/store/api/invoicesApi';
import { useGetClientQuery } from '@/store/api/clientsApi';
import { useGetInvoiceLinesByInvoiceQuery } from '@/store/api/invoiceLinesApi';

interface InvoicePageProps {
    params: {
        id: string;
        invoice_id: string;
    };
}

const InvoicePage: React.FC<InvoicePageProps> = ({ params }) => {
    const { id, invoice_id } = params;
    const { data: invoice } = useGetInvoiceQuery(+invoice_id);
    const { data: invoiceLines } = useGetInvoiceLinesByInvoiceQuery(+invoice_id);
    const { data: client } = useGetClientQuery(id);

    return (
        <>
            {invoice && invoiceLines && client && (
                    <PDFViewer style={{ width: '100%', height: '100%' }}>
                        <InvoiceDocument invoice={invoice} invoiceLines={invoiceLines} client={client} />
                    </PDFViewer>
            )}
        </>
    );
};

export default InvoicePage;