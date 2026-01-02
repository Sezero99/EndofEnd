
import { Button, Stack } from "@mui/material";
import { Link } from 'react-router';

function PostDetailButtons({ id, deleteMutation, loginedEdit }) {
    return (
        <Stack direction="row" justifyContent='space-between' spacing={1.5} alignItems='center'>
            <Button component={Link} to="/posts" variant="outlined" size="small">목록</Button>

            {loginedEdit && (
                <Stack direction="row" spacing={1}>
                    <Button component={Link} to={`/posts/${id}/edit`} variant="outlined" size="small">수정</Button>
                    <Button variant="contained" color="info" size="small"
                        disabled={deleteMutation.isPending}
                        onClick={() => {
                            if (window.confirm('정말로 삭제하시겠습니까？')) {
                                deleteMutation.mutate();
                            }
                        }}
                    >삭제</Button>
                </Stack>
            )}
        </Stack>
    );
}

export default PostDetailButtons;