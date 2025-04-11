import { NavLink } from "react-router-dom";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import css from './RegistrationPage.module.css';


export default function RegistrationPage() {
    return (
        <div className={css.regFormWrapper}>
            <RegistrationForm />
            <p>Already have an account? <NavLink className={css.link} to='/login'>Log in.</NavLink></p>
        </div>
    )
}