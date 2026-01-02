import { createBrowserRouter, Navigate } from "react-router";
import AppLayout from "../layouts/AppLayout";
import PostList from "../pages/posts/PostList";
import PostForm from "../pages/posts/PostForm";
import PostDetail from "../pages/posts/PostDetail";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import NotFoundPage from "../pages/auth/NotFoundPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                index: true,
                // 리다이렉트 컴포넌트. "/" 접근하면 "/posts"로 자동 이동
                element: <Navigate to="posts" replace />
            },
            {
                path: 'posts',
                element: <PostList />
            },
            {
                // 게시글 작성
                path: 'posts/new',
                element: <PostForm mode="create" />
            },
            {
                // 게시글 상세
                path: 'posts/:id', // id 동적 파라미터 -> useParams()을 통해 id 값을 가져옴
                element: <PostDetail />
            },
            {
                // 게시글 수정
                path: 'posts/:id/edit',
                element: < PostForm mode="edit" />
            },
            {
                // 로그인
                path: 'auth/login',
                element: <LoginPage />
            },
            {
                // 회원가입
                path: 'auth/register',
                element: <RegisterPage />
            },
            {
                path: '*',
                element: <NotFoundPage />
            }
        ]
    }
]);