'use client';

import React from 'react';
import ChatHeader from '@/components/chat/ChatHeader';
import ClientDetails from '@/components/details/ClientDetails';

interface ClientDetailsPageProps {
    params: {
        id: string;
    };
}

const ClientDetailsPage: React.FC<ClientDetailsPageProps> = ({ params }) => {
    const { id } = params;

    return (
        <>
            <ChatHeader clientId={+id} showBackButton={true} />
            <ClientDetails clientId={+id} />
        </>
    );
};

export default ClientDetailsPage;