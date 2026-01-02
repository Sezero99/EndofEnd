import { Container, TextField, Typography, Paper, Box, Stack, Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { register } from '../../api/authApi';

// 회원가입과 관련 되어있는 부분
function RegisterPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        nickname: "",
        password: "",
        rePassword: ""
    });

    const registerMutation = useMutation({
        mutationFn: register,
        onSuccess: () => navigate("/posts") // 성공하게 되면 첫 페이지로 다시 돌아감
    });

    // 이벤트 핸들러
    const handleChange = (evt) => {
        const { name, value } = evt.target;

        setForm((prev) => ({ ...prev, [name]: value })); // 업데이트를 해줘야함 // 이전 상태 복사 후 변경된 필드만 업데이트
    }

    // 데이터 전송
    const handleSubmit = (evt) => {

        evt.preventDefault(); // 새로고침 방지

        if (form.password !== form.rePassword) { // form의 password와 repassword가 같지 않다면
            alert("비밀번호와 비밀번호 확인이 일치하지 않습니다");
            return;
        }

        registerMutation.mutate({
            email: form.email.trim(), // trim() : 양쪽 여백이 들어가지 않게
            password: form.password.trim(),
            nickname: form.nickname.trim()
        });
    }

    return (
        <Container maxWidth="sm" sx={{ py: 6 }}>
            <Paper
                sx={{
                    width: "100%",
                    borderRadius: 3,
                    px: 4,
                    py: 3,
                    boxShadow: "0 16px 45px rgba(0,0,0,0.06)",
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 600, fontSize: 24, mb: 3 }}>
                    회원가입
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField type="email" label="이메일" name="email"
                            size="small" fullWidth placeholder="test@test.com" required value={form.email} onChange={handleChange}
                        />

                        <TextField
                            type="text" label="별명" name="nickname"
                            size="small" fullWidth placeholder="별명" required value={form.nickname} onChange={handleChange}
                        />

                        <TextField
                            type="password" label="비밀번호" name="password" size="small"
                            fullWidth required value={form.password} onChange={handleChange}
                        />

                        <TextField
                            type="password" label="비밀번호 확인" name="rePassword"
                            size="small" fullWidth required value={form.rePassword} onChange={handleChange}
                        />

                        {
                            registerMutation.isError && (
                                <Typography variant="body2" color="error">회원가입에 실패했습니다</Typography>
                            )
                        }

                        <Button
                            type="submit" variant="contained"
                            sx={{
                                mt: 2,
                                py: 1.2,
                                borderRadius: 2,
                                textTransform: "none",
                                "&:hover": { backgroundColor: "#999" }
                            }}
                            disabled={registerMutation.isPending}>
                            {registerMutation.isPaused ? "회원가입 중..." : "회원가입"}
                        </Button>

                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
}

export default RegisterPage;