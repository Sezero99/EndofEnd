//authApi.js
import { api } from "./api"

// useMe() 사용자 정의 훅에서 사용
export const ME_QUERY_KEY = ["me"]; // QueryKey

// local storage에서 발급 받은 토큰 읽기
export function getToken() {
    return localStorage.getItem("accessToken");
}

// 로그인 성공 후 토큰 저장
export function setAuth({ accessToken }) {
    localStorage.setItem("accessToken", accessToken);
}

// 로그아웃, 토큰 삭제
export function clearAuth() {
    localStorage.removeItem("accessToken");
}

// 현재 로그인한 사용자 정보 가져오기
export async function fetchMe() {
    const res = await api.get("/api/auth/myinfo");
    return res.data;

}


// 로그인 요청 -> JWT 토큰
export async function login({ email, password }) {
    const res = await api.post("/api/auth/login", { email, password });
    return res.data; // {accessToken: "dtrweds@dfkjg", tokenType: "Bearer"}
}

// 회원가입 요청
export async function register({ email, password, nickname }) {
    await api.post("/api/auth/signup", { email, password, nickname });
}

/*
local storage : 브라우저에서 데이터를 저장하는 공간
- { key : value }로 데이터 저장. 문자열만 저장 가능
- 직접 삭제하지 않는 이상 브라우저를 닫거나 새로고침해도 데이터 유지
- 도메인별 저장 가능
*/

