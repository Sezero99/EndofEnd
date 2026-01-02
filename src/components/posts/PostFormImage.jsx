import { Box, Stack, Button, Typography } from "@mui/material";

function PostFormImage({ imageName, onChangeImage, uploading }) { // 풀옵스
    return (
        <Box>
            <Stack direction='row' alignItems='center' spacing={1.6} mb={1}>
                <Button variant="outlined" component="label" disabled={uploading}> {/* component의 값 label로 바꿔줌 */}
                    이미지 선택
                    <input type="file" hidden accept="image/*" onChange={onChangeImage} /> {/* 이미지 안에 들어가있는 파일들은 다 허용하겠다, file이라 되어있는 객체들이 갖고 있는 내용 */}
                    {/*<input type="file" hidden accept="image/*" onChange={(evt) => onChangeImage(evt.target.files[0], evt)} /> */}
                </Button>

                {!uploading && imageName && (
                    <Typography variant="body2" color="#666">
                        {imageName}
                    </Typography>
                )}
            </Stack>
        </Box>
    );
}

export default PostFormImage;