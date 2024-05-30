import { AppDispatch } from '@/store';
import { useLazyGetAccountDataQuery } from '@/store/api/accountApi';
import { useRefreshMutation } from '@/store/api/authApi';
import { setAccountData, setEmail, setTokens, setUserId } from '@/store/slices/accountSlice';
import { useRouter, useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

interface TokenHandlerProps {
    noRedirect?: boolean;
}

const TokenHandler: React.FC<TokenHandlerProps> = ({ noRedirect }) => {
    const router = useRouter();
    const params = useParams();
    const [refresh] = useRefreshMutation();
    const dispatch = useDispatch<AppDispatch>();

    const [getAccountApiData] = useLazyGetAccountDataQuery();

    const redirect = (path: string) => {
        if (!noRedirect) {
            router.push(path);
        }
    }

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

            dispatch(setUserId(response.data.user.id));
            dispatch(setEmail(response.data.user.email));

            const accountData = await getAccountApiData(response.data.access_token);
            if ('data' in accountData && accountData.data) {
                dispatch(setAccountData(accountData.data!));
                if (!params.id) {
                    redirect('/crm');
                }
                return;
            }

            redirect('/account');
        };

        handleTokens();

        // Only run once
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <></>
}

export default TokenHandler