'use client';

import React, { FormEvent, useState } from 'react';
import { TextField, Button, Box, Typography, Stack, FormGroup, Grid } from '@mui/material';

const RegisterPage: React.FC = () => {
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

    const handleRegister = (event: FormEvent) => {
        event.preventDefault();

    };

    return (
        <form onSubmit={handleRegister}>
            <Stack justifyContent="space-evenly" alignItems="center" height="100vh" width="100vw">
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="h3">Create an account</Typography>
                </Stack>

                <Stack direction="row" spacing={10} alignContent="center">
                    <Stack spacing={2} alignItems="center" width={300}>
                        <TextField
                            label="First name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Company name"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Company registration number"
                            value={companyRegNumber}
                            onChange={(e) => setCompanyRegNumber(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="VAT number"
                            value={vatNumber}
                            onChange={(e) => setVatNumber(e.target.value)}
                            fullWidth
                        />
                    </Stack>
                    <Stack spacing={2} alignItems="center" width={300}>
                        <TextField
                            label="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Zip code"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Confirm password"
                            type="password"
                            fullWidth
                        />
                    </Stack>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={2}>
                    <Button size="large" type="submit" variant="contained" color="primary">Sign up</Button>
                </Stack>
            </Stack>
        </form>
    );
};

export default RegisterPage;