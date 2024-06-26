import { Client, useUpdateClientMutation, useCreateClientMutation, useLazyGetClientQuery } from '@/store/api/clientsApi';
import { Autocomplete, Box, Button, Stack, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { getAccessToken } from '@/store/slices/accountSlice';
import React, { useEffect } from 'react';

// TODO: Fetch countries from API
const ALL_COUNTRIES = [
    'Estonia',
    'Latvia',
    'Lithuania',
];

interface DetailsContentProps {
    clientId?: number;
}

const ClientDetails: React.FC<DetailsContentProps> = ({ clientId }) => {
    const router = useRouter();
    const [getClient] = useLazyGetClientQuery();
    const [client, setClient] = React.useState<Client | undefined>(undefined);

    const accessToken = useSelector(getAccessToken) || '';

    const [clientName, setClientName] = React.useState('');
    const [clientRegNumber, setClientRegNumber] = React.useState('');
    const [clientVatNumber, setClientVatNumber] = React.useState('');
    const [clientEmail, setClientEmail] = React.useState('');
    const [clientPhone, setClientPhone] = React.useState('');
    const [clientAddressLine1, setClientAddressLine1] = React.useState('');
    const [clientAddressLine2, setClientAddressLine2] = React.useState('');
    const [clientCountry, setClientCountry] = React.useState('Estonia');

    const [updateClient, { isLoading: isSubmitting }] = useUpdateClientMutation();
    const [createClient, { isLoading: isCreating }] = useCreateClientMutation();

    useEffect(() => {
        async function fetchData() {
            if (clientId && accessToken) {
                const response = await getClient({ data: String(clientId), accessToken});
                if ('data' in response) {
                    setClient(response.data as Client);
                }
            }
        }
        fetchData();
    }, [clientId, getClient, accessToken]);

    useEffect(() => {
        if (client) {
            setClientName(client.name);
            setClientRegNumber(client.reg_number);
            setClientVatNumber(client.vat_number);
            setClientEmail(client.email);
            setClientPhone(client.phone);
            setClientAddressLine1(client.address?.line1 || '');
            setClientAddressLine2(client.address?.line2 || '');
            setClientCountry(client.address?.country || 'Estonia');
        }
    }, [client]);

    const createOrUpdateClient = async (data: Client) => {
        if (clientId) {
            updateClient({data, accessToken});
        } else {
            const newClient = await createClient({ data, accessToken });
            if ('data' in newClient) {
                router.push(`/crm/${newClient.data.id}`);
            }
        }
    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let oldData = {} as Client;

        if (client) {
            oldData = { ...client }
        }

        const submitData = {
            ...oldData,
            name: clientName,
            reg_number: clientRegNumber,
            vat_number: clientVatNumber,
            email: clientEmail,
            phone: clientPhone,
            address: {
                line1: clientAddressLine1,
                line2: clientAddressLine2,
                country: clientCountry,
            }
        };
        createOrUpdateClient(submitData);
    }

    return (
        <Box
            height={`calc(100vh - 58px)`}
            width="100%"
        >
            <Stack
                justifyContent="center"
                alignItems="center"
                height="100%"
            >
                <Box width="20rem">
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                label="Name"
                                value={clientName || ''}
                                onChange={(e) => setClientName(e.target.value)}
                                fullWidth />

                            <TextField
                                label="Reg number"
                                value={clientRegNumber || ''}
                                onChange={(e) => setClientRegNumber(e.target.value)}
                                fullWidth />

                            <TextField
                                label="VAT number"
                                value={clientVatNumber || ''}
                                onChange={(e) => setClientVatNumber(e.target.value)}
                                fullWidth />

                            <TextField
                                label="Email"
                                value={clientEmail || ''}
                                onChange={(e) => setClientEmail(e.target.value)}
                                fullWidth />

                            <TextField
                                label="Phone"
                                value={clientPhone || ''}
                                onChange={(e) => setClientPhone(e.target.value)}
                                fullWidth />

                            <TextField
                                label="Address Line 1"
                                value={clientAddressLine1 || ''}
                                onChange={(e) => setClientAddressLine1(e.target.value)}
                                fullWidth />

                            <TextField
                                label="Address Line 2"
                                value={clientAddressLine2 || ''}
                                onChange={(e) => setClientAddressLine2(e.target.value)}
                                fullWidth />

                            <Autocomplete
                                value={clientCountry || ''}
                                onChange={(e, newValue) => setClientCountry(newValue?.toString() || '')}
                                options={ALL_COUNTRIES}
                                renderInput={(params) => <TextField {...params} label="Country" />}
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={isSubmitting || isCreating}
                            >
                                Save
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Box>
    );
}

export default ClientDetails;