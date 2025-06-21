import { useEffect, useState } from 'react';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
        const storedUserId = localStorage.getItem('userId') || sessionStorage.getItem('userId');

        if (storedToken) setToken(storedToken);
        if (storedUserId) setUserId(storedUserId);

        const sync = () => {
            const newToken = localStorage.getItem('token') || sessionStorage.getItem('token');
            const newUserId = localStorage.getItem('userId') || sessionStorage.getItem('userId');

            setToken(newToken || null);
            setUserId(newUserId || null);
        };

        window.addEventListener('storage', sync);
        return () => window.removeEventListener('storage', sync);
    }, []);

    return {
        token,
        userId,
        isLoggedIn: !!token,
        logout: () => {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            localStorage.removeItem('userId');
            sessionStorage.removeItem('userId');
            window.dispatchEvent(new Event("storage"));
        },
    };
};