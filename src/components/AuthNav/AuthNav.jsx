import { NavLink } from "react-router-dom";
import clsx from 'clsx';
import css from './AuthNav.module.css'

const buildLinkClass = ({ isActive }) => {
    return clsx(css.navLink, isActive && css.active);
};

export default function AuthNav() {
    return (
        <nav className={css.authNavList}>
            <NavLink to='/login' className={buildLinkClass}>Login</NavLink>
            <NavLink to='/registration' className={buildLinkClass}>Registration</NavLink>
        </nav>
    )
}   