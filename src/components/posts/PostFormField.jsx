import { TextField } from '@mui/material'

function PostFormField({ title, content, onChangeTitle, onChangeContent }) {
    return (
        <>
            <TextField placeholder='제목' fullWidth
                value={title}
                onChange={(evt) => onChangeTitle(evt.target.value)}
            />

            <TextField placeholder='내용' fullWidth multiline minRows={8} // 8줄까지 쓸 수 있음
                value={content}
                onChange={(evt) => onChangeContent(evt.target.value)}
            />
        </>
    );
}

export default PostFormField;