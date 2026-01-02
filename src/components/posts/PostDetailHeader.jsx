import { Box, Chip, Divider, Typography } from '@mui/material'

function PostDetailHeader({ post }) {
    const { title, readCount, createdAt, author, updateAt } = post;

    return (
        <>
            <Typography variant='h6' sx={{ fontWeight: 700, fontSize: 24, mt: 1, mb: 2 }}>
                {title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant='body2' sx={{ color: '#666' }}>
                    작성자 :
                </Typography>
                <Chip label={author.nickname} size='small' sx={{ ml: 0.5, px: 1.5, borderRadius: 999, bgcolor: 'primary.main', color: '#fff' }}
                />
                <Typography variant='body2' sx={{ color: '#666', ml: 4 }}> 조회수 : {readCount} </Typography>
            </Box>

            <Typography variant='caption' sx={{ color: '#999', display: 'inline-block', my: 1.8 }}>
                작성일 : {new Date(createdAt).toLocaleDateString()}
                {updateAt && <> | 수정일 : {new Date(updateAt).toLocaleDateString()}</>}
            </Typography>

            <Divider sx={{ my: 2 }} />
        </>
    );
}

export default PostDetailHeader;