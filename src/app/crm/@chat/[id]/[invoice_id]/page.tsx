'use client';

import React from 'react';
import { useGetInvoiceQuery } from '@/store/api/invoicesApi';
import ChatHeader from '@/components/chat/ChatHeader';
import { useSelector } from 'react-redux';
import { getAccessToken } from '@/store/slices/accountSlice';

interface InvoicePageProps {
    params: {
        id: string;
        invoice_id: string;
    };
}

const InvoicePage: React.FC<InvoicePageProps> = ({ params }) => {
    const accessToken = useSelector(getAccessToken) || '';

    const { id, invoice_id } = params;
    const { data: invoice } = useGetInvoiceQuery({ data: +invoice_id, accessToken });

    return (
        <>
            <ChatHeader clientId={+id} showBackButton={true} />
            {invoice && (
                <iframe 
                    src={invoice.additional_info.pdf_url} 
                    style={{ 
                        marginTop: '58px',
                        width: '100%', 
                        height: 'calc(100vh - 58px)'
                    }} />
            )}
        </>
    );
};

export default InvoicePage;