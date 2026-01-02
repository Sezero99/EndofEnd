import { api } from "./api";

/*
이미지 업로드 API
사용자 이미지 입력: <input type="file" /> -> 서버로 전송 -> 이미지 업로드
서버에서 생성된 URL을 다시 프론트로 전송
-> 게시글 작성, 수정시 그 URL 포함 서버로 전송
*/

export async function uploadImage(file) {

    // 브라우저에서 바이너리 데이터 전송시 반드시 FormData 사용
    const formData = new FormData(); // FormData라고 되어있는 생성자 객체 만듦
    formData.append('file', file); // append : 추가한다는 의미 // 값을 추가

    const res = await api.post('/api/files/image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }); // formData값 넘겨주기

    return res.data; // {imageUrl: "...png"} // 우리가 여기에다가 추가하는 값은 imageUrl이라는 값?


}