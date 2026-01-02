import { Typography, Box, Container, Button } from "@mui/material";
import { Link } from "react-router";

function NotFoundPage() {
    return (
        <Container maxWidth="md">
            <Box sx={{ m: 4 }}>
                <Typography variant="h2" sx={{ fontSize: '3rem', fontWeight: 600, color: '#999', mt: 10, mb: 5 }}>
                    페이지를 찾을 수 없습니다
                </Typography>
                <Button component={Link} to="/posts" variant="outlined">홈으로 이동</Button>
            </Box>
        </Container>
    );
}

export default NotFoundPage;