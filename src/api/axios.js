import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://15.164.220.91:8080', // API 서버 주소
});

export default instance;