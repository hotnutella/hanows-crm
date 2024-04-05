'use client'

import React from 'react';
import { useGetClientsQuery } from '../../../store/clientsApi';

const ClientsPage: React.FC = () => {
    const { data: clients } = useGetClientsQuery({});
    console.log(clients)
    
    return (
        <div>
            <h1>Clients Page</h1>
            {/* Add your content here */}
        </div>
    );
};

export default ClientsPage;