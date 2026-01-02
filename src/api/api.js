import axios from 'axios'
import { getToken, clearAuth } from './authApi';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

// 요청 interceptor

// 서버로 나가는 모든 요청에 JWT 자동 추가
api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`; // 토큰이 있으면 헤더에 
    return config; // 수정된 설정 반환
});

// 응답 interceptor
api.interceptors.response.use(
    (response) => response, // 성공
    (error) => {
        if (error.response?.status === 401) {
            clearAuth();

            if (!window.location.pathname.includes('/auth/login')) {
                window.location.href = '/auth/login'; // 401은 인증 실패 -> 새로고침으로 초기화

            }
        }

        return Promise.reject(error);
    }
);