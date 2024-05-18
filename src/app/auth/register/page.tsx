'use client';

import React, { FormEvent, useState } from 'react';
import { TextField, Button, Box, Typography, Stack, FormGroup, Grid, Stepper, Step, StepLabel } from '@mui/material';

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
    const [confirmPassword, setConfirmPassword] = useState('');
    const [activeStep, setActiveStep] = useState(0);

    const handleRegister = (event: FormEvent) => {
        event.preventDefault();
    };

    const steps = [
        'Personal information',
        'Company information',
        'Contact information',
        'Account information',
    ];

    return (
        <form onSubmit={handleRegister}>
            <Stack justifyContent="space-evenly" alignItems="center" height="100vh" width="100vw">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="h4">Create an account</Typography>
                    </Stack>
                    <Stack direction="row" spacing={10} alignContent="center">
                        <Box width="100%">
                            <Stepper activeStep={activeStep} sx={{ mb: 2 }}>
                                {steps.map(label => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>

                            {activeStep === 0 && (
                                <>
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
                                </>
                            )}
                            {activeStep === 1 && (
                                <>
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
                                </>
                            )}
                            {activeStep === 2 && (
                                <>
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
                                </>
                            )}
                            {activeStep === 3 && (
                                <>
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
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        fullWidth
                                    />
                                </>
                            )}

                        </Box>
                    </Stack>

                    <Stack direction="row" justifyContent="space-evenly" width="100%">
                        <Button
                            disabled={activeStep === 0}
                            onClick={() => setActiveStep(prevActiveStep => prevActiveStep - 1)}
                        >
                            Back
                        </Button>
                        {activeStep < steps.length - 1 && <Button
                            onClick={() => setActiveStep(prevActiveStep => prevActiveStep + 1)}
                        >
                            Next
                        </Button>}
                        {activeStep === steps.length - 1 && <Button
                            size="large"
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Sign up
                        </Button>}
                    </Stack>
            </Stack>
        </form >
    );
};

export default RegisterPage;