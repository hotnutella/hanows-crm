'use client';

import React from 'react';
import { useGetInvoiceQuery } from '@/store/api/invoicesApi';
import ChatHeader from '@/components/chat/ChatHeader';

interface InvoicePageProps {
    params: {
        id: string;
        invoice_id: string;
    };
}

const InvoicePage: React.FC<InvoicePageProps> = ({ params }) => {
    const { id, invoice_id } = params;
    const { data: invoice } = useGetInvoiceQuery(+invoice_id);

    return (
        <>
            <ChatHeader clientId={+id} showBackButton={true} />
            {invoice && (
                <iframe src={invoice.additional_info.pdf_url} style={{ width: '100%', height: 'calc(100vh - 58px)' }} />
            )}
        </>
    );
};

export default InvoicePage;