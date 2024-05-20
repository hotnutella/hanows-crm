import { AppDispatch } from '@/store';
import { useRefreshMutation } from '@/store/api/authApi';
import { setTokens } from '@/store/slices/accountSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const TokenHandler = () => {
    const router = useRouter();
    const [refresh] = useRefreshMutation();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const handleTokens = async () => {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                router.push('/auth/login');
                return;
            }

            const response = await refresh({ refresh_token: refreshToken });

            if (!('data' in response)) {
                router.push('/auth/login');
                return;
            }

            dispatch(setTokens({
                accessToken: response.data.access_token,
                refreshToken: response.data.refresh_token,
            }));

            router.push('/crm');
        };

        handleTokens();

        // Only run once
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <></>
}

export default TokenHandler