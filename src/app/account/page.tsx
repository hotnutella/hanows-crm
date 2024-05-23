'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { TextField, Button, Typography, Stack, Stepper, Step, StepLabel } from '@mui/material';
import { useCreateAccountDataMutation, useUpdateAccountDataMutation } from '@/store/api/accountApi';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { getAccessToken, getAccountData, getEmail, getUserId } from '@/store/slices/accountSlice';
import TokenHandler from '@/components/auth/TokenHandler';

interface StepData {
    label: string;
    fields: React.ReactNode[];
}

const AccountPage: React.FC = () => {
    const router = useRouter();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyRegNumber, setCompanyRegNumber] = useState('');
    const [vatNumber, setVatNumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [country, setCountry] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [activeStep, setActiveStep] = useState(0);

    const [createAccountData, { isLoading: isCreatingAccountData }] = useCreateAccountDataMutation();
    const [updateAccountData, { isLoading: isUpdatingAccountData }] = useUpdateAccountDataMutation();

    const userId = useSelector(getUserId);
    const accountEmail = useSelector(getEmail);
    const accessToken = useSelector(getAccessToken);
    const accountData = useSelector(getAccountData);

    const createOrUpdate = accountData ? updateAccountData : createAccountData;

    const handleSave = async (event: FormEvent) => {
        event.preventDefault();
        if (!userId || !accessToken) {
            return;
        }

        const data = {
            id: accountData?.id,
            first_name: firstName,
            last_name: lastName,
            company_name: companyName,
            company_reg_number: companyRegNumber,
            vat_number: vatNumber,
            address,
            city,
            zip_code: zipCode,
            country,
            phone,
            email,
            user_id: userId,
        }

        await createOrUpdate({ data, accessToken });

        router.push('/');
    };

    useEffect(() => {
        if (accountData) {
            setFirstName(accountData.first_name);
            setLastName(accountData.last_name);
            setCompanyName(accountData.company_name);
            setCompanyRegNumber(accountData.company_reg_number);
            setVatNumber(accountData.vat_number);
            setAddress(accountData.address);
            setCity(accountData.city);
            setZipCode(accountData.zip_code);
            setCountry(accountData.country);
            setPhone(accountData.phone);
            setEmail(accountData.email);
        }
    }, [accountData]);

    useEffect(() => {
        if (accountEmail) {
            setEmail(accountEmail);
        }
    }, [accountEmail]);

    const steps: StepData[] = [
        {
            label: 'Personal information',
            fields: [
                <TextField
                    key="firstName"
                    label="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    fullWidth
                />,
                <TextField
                    key="lastName"
                    label="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    fullWidth
                />,
            ],
        },
        {
            label: 'Company information',
            fields: [
                <TextField
                    key="companyName"
                    label="Company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    fullWidth
                />,
                <TextField
                    key="companyRegNumber"
                    label="Company registration number"
                    value={companyRegNumber}
                    onChange={(e) => setCompanyRegNumber(e.target.value)}
                    fullWidth
                />,
                <TextField
                    key="vatNumber"
                    label="VAT number"
                    value={vatNumber}
                    onChange={(e) => setVatNumber(e.target.value)}
                    fullWidth
                />,
            ],
        },
        {
            label: 'Contact information',
            fields: [
                <TextField
                    key="address"
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    fullWidth
                />,
                <TextField
                    key="city"
                    label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    fullWidth
                />,
                <TextField
                    key="zipCode"
                    label="Zip code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    fullWidth
                />,
                <TextField
                    key="country"
                    label="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    fullWidth
                />,
                <TextField
                    key="phone"
                    label="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    fullWidth
                />,
                <TextField
                    key="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                    fullWidth
                />,
            ],
        }
    ];

    const buttons = (
        <Stack direction="row" justifyContent="space-between">
            <Button
                disabled={activeStep === 0}
                onClick={() => setActiveStep(activeStep - 1)}
            >
                Back
            </Button>
            {activeStep < steps.length - 1 && (
                <Button onClick={() => setActiveStep(activeStep + 1)}>
                    Next
                </Button>
            )}
            {activeStep === steps.length - 1 && (
                <Button
                    disabled={isCreatingAccountData || isUpdatingAccountData}
                    type="submit"
                    variant="contained"
                    color="primary">
                    Save
                </Button>
            )}
        </Stack>
    );

    return (
        <form onSubmit={handleSave}>
            <Stack
                justifyContent="start"
                alignItems="center"
                height="100vh"
                width="100vw"
                spacing={10}
                mt={5}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="h4">My Account</Typography>
                </Stack>
                <Stepper activeStep={activeStep} sx={{ mb: 2, width: 350 }} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.label} sx={{ width: '100%' }}>
                            <StepLabel>{step.label}</StepLabel>
                            {activeStep === index && (
                                <Stack spacing={2} width="100%">
                                    {step.fields}
                                    {buttons}
                                </Stack>
                            )}
                        </Step>
                    ))}
                </Stepper>
            </Stack>
            <TokenHandler noRedirect />
        </form >
    );
};

export default AccountPage;