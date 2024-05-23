'use client';

import React, { FormEvent, useState } from 'react';
import { TextField, Button, Typography, Stack, Stepper, Step, StepLabel, Box } from '@mui/material';
import { useCreateAccountMutation } from '@/store/api/authApi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface StepData {
    label: string;
    fields: React.ReactNode[];
}

const RegisterPage: React.FC = () => {
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
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [activeStep, setActiveStep] = useState(0);

    const [createAccount, { isLoading: isCreatingAccount }] = useCreateAccountMutation();

    const handleRegister = async (event: FormEvent) => {
        event.preventDefault();

        try {
            await createAccount({
                email,
                password,
            });
            router.push('/');
        } catch (error) {
            console.error(error);
            return;
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <Stack
                justifyContent="start"
                alignItems="center"
                height="100vh"
                width="100vw"
                spacing={10}
                mt={5}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="h4">Create an account</Typography>
                </Stack>
                <Stack width={350} spacing={2}>
                    <TextField
                        key="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        key="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        key="confirmPassword"
                        label="Confirm password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        fullWidth
                    />
                    <Button
                        disabled={isCreatingAccount}
                        type="submit"
                        variant="contained"
                        color="primary">
                        Register
                    </Button>
                    <Link
                        href="/auth/login"
                        style={{ textDecoration: 'none' }}>
                        <Typography color="primary">
                            Already have an account? Login here.
                        </Typography>
                    </Link>
                </Stack>
            </Stack>
        </form >
    );
};

export default RegisterPage;