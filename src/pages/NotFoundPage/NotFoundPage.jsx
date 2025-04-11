import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import css from './NotFoundPage.module.css'

export default function NotFoundPage() {
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
        <div className={css.notFound}>404 Not Found Page...<p>You will be redirected to home page in <span className={css.notFoundSpan}>{countdown}</span> seconds...</p></div>
    )
}