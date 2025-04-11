import { NavLink } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import css from './LoginPage.module.css';

export default function LoginPage() {
    return (
        <div className={css.loginFormWrapper}>
            <LoginForm />
            <p>Don't have an account? <NavLink className={css.link} to='/registration'>Register.</NavLink></p>
        </div>
    )
}