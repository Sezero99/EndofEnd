import { Typography, Box, Container, Paper, Stack, TextField, Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router";
import { login, setAuth } from "../../api/authApi";


function LoginPage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const loginMutation = useMutation({
        mutationFn: login, // 로그인한 결과값을 받을거임
        onSuccess: async (data) => {
            setAuth(data); // localStorage 저장
            await queryClient.invalidateQueries({ queryKey: ["me"] });
            navigate("/posts");
        }
    });

    // 이벤트 핸들러
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const fd = new FormData(evt.currentTarget);
        loginMutation.mutate({
            email: String(fd.get("email")).trim(),
            password: String(fd.get("password")).trim()
        });
    }

    return (
        <Container maxWidth="sm">
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
                    로그인
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField type="email" label="이메일" name="email"
                            size="small" fullWidth placeholder="test@test.com" required />
                        <TextField type="password" label="비밀번호" name="password" size="small"
                            fullWidth required />

                        {
                            loginMutation.isError && (
                                <Typography variant="body2" color="error">로그인에 실패했습니다</Typography>
                            )
                        }

                        <Button type="submit" variant="contained"
                            sx={{
                                mt: 2,
                                py: 1.2,
                                borderRadius: 2,
                                textTransform: "none",
                                "&:hover": { backgroundColor: "#999" }
                            }} disabled={loginMutation.isPending}
                        >{loginMutation.isPending ? "로그인 중..." : "로그인"}
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
}

export default LoginPage;