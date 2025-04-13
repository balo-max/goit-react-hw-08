import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectUser } from "../../redux/auth/selectors";
import { logoutUser } from "../../redux/auth/operations";
import { Toaster } from 'react-hot-toast';
import clsx from 'clsx';
import css from './UserMenu.module.css';

const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
};

export default function UserMenu() {
    const dispatch = useDispatch()
    const user = useSelector(selectUser);

    const handleLogout = () => {
        dispatch(logoutUser());
    }

    return (
        <div className={css.userMenuWrapper}>
            <NavLink className={buildLinkClass} to='/contacts'>Contacts</NavLink>
            <div className={css.userWrapper}>
                <p className={css.userText}>Hello, <span className={css.userSpan}>{user.name}</span></p>
                <button className={css.userBtn} onClick={handleLogout}>Logout</button>
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    )
}