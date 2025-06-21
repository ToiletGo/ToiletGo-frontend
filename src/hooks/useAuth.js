import { useEffect, useState } from 'react';

export const useAuth = () => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (storedToken) setToken(storedToken);

        const sync = () => {
            const newToken = localStorage.getItem('token') || sessionStorage.getItem('token');
            setToken(newToken || null);
        };

        window.addEventListener('storage', sync);
        return () => window.removeEventListener('storage', sync);
    }, []);

    return {
        token,
        isLoggedIn: !!token,
        logout: () => {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            window.dispatchEvent(new Event("storage"));
        },
    };
};