'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const RootPage: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        // TODO: redirect only if user is logged in
        router.push('/crm');

        // Only run once
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <></>;
};

export default RootPage;