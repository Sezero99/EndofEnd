import { Box, Typography, Paper, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import PostFormField from '../../components/posts/PostFormField';
import PostFormImage from '../../components/posts/PostFormImage';
import PostFormSubmit from '../../components/posts/PostFormSubmit';
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from 'react-router';
import { createPosts, fetchPostsDetail, updatePosts } from '../../api/postsApi';
import { useQuery } from "@tanstack/react-query";
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';
import { uploadImage } from '../../api/fileApi';




// mode : create -> 새 글 작성 / mode : edit -> 수정
function PostForm({ mode }) {
    const isEdit = mode === 'edit'; // true 수정, false 새 글 작성
    const queryClient = useQueryClient(); // Query 캐시 무효화
    const navigate = useNavigate(); // 다른 페이지로 이동
    const { id } = useParams(); // url에서 :id(동적 파라미터) 읽음
    const postId = Number(id); // 파라미터는 기본적으로 문자열이기 때문에 숫자로 변경

    // 폼 입력 값
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // 이미지
    const [imageName, setImageName] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    // TanStack Query ===============
    // 생성
    const createMutation = useMutation({
        mutationFn: createPosts, // API 함수
        // 성공했을 때
        onSuccess: (create) => {
            // 캐시 초기화, 무효화
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            // 해당 상세 페이지로 이동
            navigate(`/posts/${create.id}`);
        },
        onError: () => {
            alert('게시글 등록에 실패했습니다'); // 실패했을 때
        }
    })


    // 수정일 때 기존 데이터 조회
    const { data: post, isLoading, isError } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => fetchPostsDetail(postId),
        enabled: isEdit // true일 때만 이 쿼리가 동작, false일 대는 작성이기 때문에 굳이 기존 데이터를 가져올 필요 없음
    });
    // 수정
    const updateMutation = useMutation({
        mutationFn: (payload) => updatePosts(postId, payload),
        onSuccess: (update) => {
            // 목록 캐시 무효화 
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            // 상세 페이지 캐시 무효화
            queryClient.invalidateQueries({ queryKey: ['post', postId] });
            navigate(`/posts/${update.id}`); // 수정 완료가 되면 상세페이지 다시 볼 수 있게끔
        },
        onError: () => {
            alert('수정에 실패했습니다');
        }
    });

    // 이미지 업로드 Mutation
    const uploadMutation = useMutation({
        mutationFn: (file) => uploadImage(file),
        onSuccess: (result) => {
            setImageUrl(result.imageUrl);
        },
        onError: () => {
            alert('이미지 업로드에 실패했습니다');
        }
    });

    // side effect: 렌더링 후 정해진 변수의 상태에 따라 실행
    // useEffect(콜백함수, [변수]);
    // useEffect(() => {}, [data]); 한 번만 실행
    useEffect(() => {
        if (isEdit && post) {
            setTitle(post.title); // 내가 저번에 썼던 제목과
            setContent(post.content); // 글의 내용 불러오기 가능
            setImageUrl(post.imageUrl || null);
            // setImageName("");
        }
    }, [isEdit, post]); // 수정 모드이고 데이터가 바뀌면 실행

    // 이벤트 핸들러 ===============
    // 이미지 업로드
    const handleImage = (evt) => {
        // JS의 Files 객체
        const file = evt.target.files?.[0]; // 파일이 있으면 적용시키고 없으면 말아라
        if (!file) return; // 없으면 더 진행하지 말고 여기서 종료

        setImageName(file.name);

        if (file.size > 1024 * 1024 * 5) {
            alert('이미지는 5MB 이하만 가능합니다');
            evt.target.value = "";
            return;
        }

        uploadMutation.mutate(file);

        evt.target.value = "";
    }
    // 폼 전송 **
    const handleSubmit = (evt) => {
        evt.preventDefault();

        const payload = {
            title: title.trim(), // trim : 여백 지우기
            content: content.trim(),
            imageUrl: imageUrl || null
        }
        // 필수값 검증
        if (!title.trim() || !content.trim()) {
            alert('제목과 내용은 필수입니다');
            return;
        }

        // 이미지 업로드 중이면 폼 전송 중지
        if (updateMutation.isPending) {
            alert('이미지 업로드 중입니다');
            return;
        }

        // props에 따라 mutation 호출(생성/수정)
        if (isEdit) {
            updateMutation.mutate(payload); // 수정 값이 들어가야함
        } else {
            createMutation.mutate(payload); // 작성
        }

    }

    if (isEdit && isLoading) return <Loader />
    if (isEdit && isError) return <ErrorMessage message='불러오지 못함' />

    return (
        <Box sx={{ px: 2, py: 6 }}>
            <Paper
                sx={{
                    width: '100%',
                    borderRadius: 3,
                    p: 4,
                    boxShadow: '0 16px 45px rgba(0,0,0,0.7)'
                }}
            >
                {/* 제목 (상태에 따라 바뀜) */}
                <Typography variant='h6' sx={{ fontWeight: 700, mb: 3 }}>
                    {isEdit ? '게시글 수정' : '새 글 작성'}
                </Typography>

                <Box component='form' onSubmit={handleSubmit}>
                    <Stack spacing={2.5}>
                        {/* 입력 필드 */}
                        <PostFormField
                            title={title}
                            content={content}
                            onChangeTitle={setTitle}
                            onChangeContent={setContent}
                        />

                        {/* 이미지 업로드 */}
                        <PostFormImage
                            uploading={updateMutation.isPending}
                            imageName={imageName}
                            onChangeImage={handleImage}
                        />

                        {/* 등록, 수정 버튼 */}
                        <PostFormSubmit isEdit={isEdit} />
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
}

export default PostForm;