import React from 'react';
import ClientsPage from '../page'; 

interface SelectedClientOptionPageProps {
    params: {
        id: string;
    };
}

const SelectedClientOptionPage: React.FC<SelectedClientOptionPageProps> = ({ params }) => {
    return <ClientsPage selectedClient={params.id} />;
};

export default SelectedClientOptionPage;