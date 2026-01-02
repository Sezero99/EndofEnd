import { useNavigate, useParams } from 'react-router'
import { Box, Paper } from '@mui/material'
import PostDetailHeader from '../../components/posts/PostDetailHeader';
import PostDetailContent from '../../components/posts/PostDetailContent';
import PostDetailButtons from '../../components/posts/PostDetailButtons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';
import { fetchPostsDetail, deletePosts } from '../../api/postsApi';
import PostComments from '../../components/comments/PostComments';
import { useMe } from '../../hooks/useMe';

/*
  URL에서 ID를 읽음 -> 서버에서 해당 아이디 데이터 가져옴
  -> 화면 출력 
  -> 삭제 버튼 클릭시 삭제 API 호출 -> 목록으로 이동
  -> 수정 버튼 클릭시 -> 수정으로 이동
*/

function PostDetail() {
    const { id } = useParams(); // url에서 id값 갖고옴
    const postId = Number(id);
    const navigate = useNavigate(); // navigate(-1) : 바로 직전 페이지로 이동 navigate(-2) : 전전 페이지로 이동
    const queryClient = useQueryClient();


    // 이미지 경로 설정
    const apiBase = import.meta.env.VITE_API_BASE_URL;
    const { data: me, isLoading: meIsLoading } = useMe();

    //TanStack Query =================
    // 상세 글 조회
    const { data: post, isLoading, isError } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => fetchPostsDetail(postId)
    });

    const checkEdit = (authorId) => {
        return (
            !meIsLoading &&
            me?.id != null &&
            authorId != null &&
            Number(me.Id) === Number(authorId) // 로그인ID 작성자ID 비교
        )
    }

    // 삭제
    const deleteMutation = useMutation({
        mutationFn: () => deletePosts(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            navigate('/posts');
        },
        onError: () => {
            alert('삭제에 실패했습니다')
        }
    });

    if (isLoading) return <Loader />
    if (isError || !post) return <ErrorMessage message="존재하지 않는 게시글입니다. " /> // 포스트가 없거나 오류가 뜨면 알림

    const loginedEdit = checkEdit(post?.author?.id);



    return (
        <Box>
            <Paper sx={{
                width: '100%',
                borderRadius: 3,
                p: 4,
                boxShadow: '0 16px 45px rgba(0,0,0,0.07)'
            }}>
                {/* 제목, 작성자, 조회수, 작성일, 수정일.... 🥲 */}
                <PostDetailHeader post={post} />

                {/* 본문 내용 */}
                <PostDetailContent post={post} apiBase={apiBase} />

                {/* 댓글 */}
                <PostComments postId={postId} />


                {/* 수정, 삭제 버튼 */}
                <PostDetailButtons id={postId} deleteMutation={deleteMutation} loginedEdit={loginedEdit} />

            </Paper>
        </Box>
    );
}

export default PostDetail;