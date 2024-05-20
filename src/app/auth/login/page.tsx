'use client';

import { AppDispatch } from '@/store';
import { useLoginMutation } from '@/store/api/authApi';
import { setTokens } from '@/store/slices/accountSlice';
import { Button, Stack, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

const LoginPage: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const [login] = useLoginMutation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event: FormEvent) => {
        event.preventDefault();

        const response = await login({
            email,
            password,
        });

        if (!('data' in response)) {
            return;
        }

        const tokens = {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
        }

        dispatch(setTokens(tokens));
        router.push('/');
    }


    return (
        <form onSubmit={handleLogin}>
            <Stack
                justifyContent="start"
                alignItems="center"
                height="100vh"
                width="100vw"
                spacing={10}
                mt={5}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="h4">Login to your account</Typography>
                </Stack>
                <Stack width={350} spacing={2}>
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        value={password}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                    />
                </Stack>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary">
                    Login
                </Button>
                <Link 
                    href="/auth/register"
                    style={{ textDecoration: 'none' }}>
                    <Typography color="primary">
                        Don&apos;t have an account? Register here.
                    </Typography>
                </Link>
            </Stack>
        </form >
    );
};

export default LoginPage;