import { AppDispatch } from '@/store';
import { useLazyGetAccountDataQuery } from '@/store/api/accountApi';
import { useRefreshMutation } from '@/store/api/authApi';
import { setAccountData, setTokens } from '@/store/slices/accountSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const TokenHandler = () => {
    const router = useRouter();
    const [refresh] = useRefreshMutation();
    const dispatch = useDispatch<AppDispatch>();

    const [getAccountData] = useLazyGetAccountDataQuery();

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

            const accountData = await getAccountData(response.data.access_token);
            if ('data' in accountData) {
                dispatch(setAccountData(accountData.data!));
            }

            router.push('/crm');
        };

        handleTokens();

        // Only run once
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <></>
}

export default TokenHandler