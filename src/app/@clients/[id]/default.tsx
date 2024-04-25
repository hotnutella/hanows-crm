import React from 'react';
import ClientsPageComponent, { SelectedClientOptionPageProps } from './page';

const ClientsPage: React.FC<SelectedClientOptionPageProps> = (props) => {
    console.log(props)
    return <ClientsPageComponent {...props} />;
};

export default ClientsPage;