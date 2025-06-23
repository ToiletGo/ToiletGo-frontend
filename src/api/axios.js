import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://15.164.220.91:8080', // API 서버 주소
});

// 요청 전에 토큰 자동 추가
/*
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
*/
export default instance;