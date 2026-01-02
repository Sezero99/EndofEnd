// rsf 치고 엔터
// header + menu + Outlet 
import { Outlet, Link, useNavigate } from 'react-router'
import { Box, Toolbar, Typography, AppBar, Container, Stack, Button } from '@mui/material'
import { FaSnowman } from "react-icons/fa6";
import { useQueryClient } from '@tanstack/react-query';
import { useMe } from '../hooks/useMe';
import { clearAuth } from '../api/authApi';

function AppLayout() {
    const queryClient = useQueryClient();
    const { data: me, isLoading: meIsLoading } = useMe();
    const navigate = useNavigate(); // 훅 사용, 새로고침 없이 이동

    // 로그아웃 이벤트 핸들러 
    const handleLogout = () => {
        clearAuth();
        queryClient.setQueryData(["me"], null); // 즉시 업데이트
        navigate("/posts") // 내가 작성을 하고 있더라도 로그아웃을 하는 순간 바로 넘어갈 수 있게끔
    }


    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
            <AppBar position='fixed'>
                <Container maxWidth='md'>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        {/* 로고 */}
                        <Box component={Link} to="/posts" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#fff' }}>
                            {/* font-icon */}
                            <Box sx={{
                                width: 40, height: 40,
                                borderRadius: '50%', // 둥근 모서리
                                bgcolor: '#fff',
                                display: 'grid', // 바둑판 형태의 레이아웃 스타일
                                placeItems: 'center', // grid일 때만 적용 가능한 x,y 중앙 정렬
                                mr: 1.5
                            }}>
                                <FaSnowman style={{ color: '#0a7eddff', fontSize: 30 }} />
                            </Box>
                            <Typography variant='h6' component="h1" sx={{ fontWeight: 700 }}>
                                게시판
                            </Typography>
                        </Box>
                        {/* 회원가입 / 로그인 */}
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            {!meIsLoading && me ? (
                                <Button variant='text' sx={{ color: '#fff' }} onClick={handleLogout}>
                                    로그아웃</Button>
                            ) : (
                                <>
                                    <Button component={Link} to="auth/login" variant='text' sx={{ color: '#fff' }}>로그인</Button>
                                    <Button component={Link} to="auth/register" variant='text' sx={{ color: '#fff' }}>회원가입</Button>
                                </>
                            )

                            }
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>

            <Container maxWidth='md' component="main" sx={{ pt: 10, mb: 4 }}>
                <Outlet />
            </Container>
        </Box >
    );
}

export default AppLayout;