import { NavLink } from 'react-router-dom';
import css from './HomePage.module.css';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

export default function HomePage() {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <div className={css.homeWrapper}>
            <div className={css.secondWrapper}>
                <h1 className={css.title}>Welcome to the web application "Your Contacts Book".</h1>
                <p className={css.titleText}>With us, your contacts will be safe and organized. Create, edit, sort!</p>
                {!isLoggedIn && <div className={css.linkWrapper}>
                    <p className={css.linkText}>Ready to get started? <NavLink className={css.link} to='/login'>Login</NavLink> if you don't have an account <NavLink className={css.link} to='/registration'>Register</NavLink>.</p>
                </div>}
            </div>
        </div>
    )
}