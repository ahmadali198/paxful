// pages/index.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Index = () => {
    const router = useRouter();

    useEffect(() => {
        // Redirect to /signup as soon as the app is loaded
        router.push('/signup');
    }, [router]);

    return null; // Nothing to render, as it will redirect
};

export default Index;
