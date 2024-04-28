'use client';

import React from 'react';
import ChatHeader from '@/components/chat/ChatHeader';
import ClientDetails from '@/components/details/ClientDetails';

const NewClientPage: React.FC = () => {
    return (
        <>
            <ChatHeader />
            <ClientDetails />
        </>
    );
};

export default NewClientPage;