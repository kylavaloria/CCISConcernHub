import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export default function BackArrow({ label }) {
    const navigate = useNavigate();

    function handleBackClick() {
        navigate(-1);
    }

    return <>
        <div className="flex items-center mb-4 cursor-pointer" onClick={handleBackClick}>
            <FaArrowLeft className="mr-2 text-blue-400" />
            <h1 className="text-3xl font-bold mb-4 text-blue-400">{label}</h1>
        </div>
    </>
}
