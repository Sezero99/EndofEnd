import { useState } from 'react';
import { Box, Paper, Typography } from '@mui/material'
import PostSearch from "../../components/posts/PostSearch";
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import PostTable from "../../components/posts/PostTable";
import PostPagenation from "../../components/posts/PostPagenation";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import { fetchPosts } from "../../api/postsApi";
import { useMe } from '../../hooks/useMe';

// useQuery({});

function PostList(props) {
    // 현재 페이지 상태
    const [page, setPage] = useState(0);
    // 키워드 상태
    const [keyword, setKeyword] = useState('');

    // 조회 Query
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['posts', page, keyword],
        queryFn: () => fetchPosts({ page, size: 10, keyword }),
        placeholderData: keepPreviousData // 페이지 전환시 기존 데이터 유지, 화면에 빈 화면이 생기지 않음
    });

    const { data: me, isLoading: meIsLoading } = useMe(); // 훅 불러와서 사용

    if (isLoading) {
        return <Loader />
    }
    if (isError) {
        return <ErrorMessage />
    }

    const { content, totalPages, logined } = data;

    // 이벤트 핸들러 =================
    // 검색
    const handleSearch = (evt) => {
        evt.preventDefault();
        setPage(0);
    }

    // 페이지 이동
    const handlePrev = () => {
        setPage((prev) => Math.max(prev - 1, 0));
    }

    const handleNext = () => {
        setPage((prev) => prev + 1 < totalPages ? prev + 1 : prev); // 페이지 업데이트
    }

    return (
        <Box sx={{ px: 2, py: 2.5 }}>
            <Paper elevation={0}
                sx={{
                    width: '100%',
                    borderRadius: 3,
                    px: 4,
                    py: 3,
                    boxShadow: '0 16px 45px rgba(0,0,0,0.06)' // x축 y축 번짐 색상 (rgba alpha: 투명도 0-1)
                }}>
                <Box>
                    {/* 상단 제목 */}
                    <Typography variant='h5' sx={{
                        fontWeight: 600, fontSize: 24
                    }}>게시글 목록</Typography>

                    {/* 검색 */}
                    <PostSearch
                        keyword={keyword}
                        onChangeKeyword={setKeyword}
                        onSubmit={handleSearch}
                    />

                    {/* 테이블 */}
                    <PostTable posts={content} />

                    {/* 페이지네이션 */}
                    <PostPageNation
                        page={page}
                        totalPages={totalPages}
                        onPrev={handlePrev}
                        onNext={handleNext}
                        logined={!meIsLoading && !!me}
                    />
                </Box>
            </Paper>
        </Box>
    );
}


export default PostList;
