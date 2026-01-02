import { Box, Divider, Typography } from "@mui/material";

function PostDetailContent({ post, apiBase }) { // 풀옵스로 받는 값 추가
    const { title, content, imageUrl } = post;
    const imageSrc = imageUrl ? `${apiBase}${imageUrl}` : null;


    return (
        <>
            {imageSrc && (
                <Box sx={{ mb: 1.5 }}>
                    <img src={imageSrc} alt={title} style={{ maxWidth: 400, display: 'block' }} />
                </Box>
            )}
            <Typography sx={{ lineHeight: 1.6, p: 1.8 }}>
                {/* 내용 출력 */}
                {content}
            </Typography>

            <Divider sx={{ mb: 2.5 }} />
        </>
    );
}

export default PostDetailContent;