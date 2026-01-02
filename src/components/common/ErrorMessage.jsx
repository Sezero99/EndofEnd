export default function ErrorMessage({ message = '오류 발생' }) {
    return <p style={{ color: '#f00' }}>{message}</p>
}