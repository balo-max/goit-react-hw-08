import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { RiContactsBookFill } from "react-icons/ri";
import css from './Navigation.module.css'
import AuthNav from "../AuthNav/AuthNav";
import UserMenu from "../UserMenu/UserMenu";

export default function Navigation() {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <>
            <header className={css.header}>
                <NavLink to='/' >
                    <div className={css.logoWrapper}>
                        <div className={css.logoText}>
                            <span className={css.logoSpan}>Your</span>
                            <span className={css.logoSpanSecond}>Contacts</span>
                            <span className={css.logoSpan}>Book</span>
                        </div>
                        <RiContactsBookFill className={css.logoIcon} />
                    </div>
                </NavLink>

                {!isLoggedIn ? <AuthNav /> : <UserMenu/>}
            </header>
        </>
    )
}