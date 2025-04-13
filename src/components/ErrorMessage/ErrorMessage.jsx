import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './ErrorMessage.module.css'

export default function ErrorMessage() {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        const redirectTimer = setTimeout(() => {
            navigate("/");
        }, 3000);

        return () => {
            clearInterval(timer);
            clearTimeout(redirectTimer);
        };
    }, [navigate]);

    return (
            <div className={css.error}>Somthing is wrong...<p>You will be redirected to home page in <span className={css.errorSpan}>{countdown}</span> seconds...</p></div>
    )
}