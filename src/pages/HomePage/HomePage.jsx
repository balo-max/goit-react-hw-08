import { NavLink } from 'react-router-dom';
import css from './HomePage.module.css';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

export default function HomePage() {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
            <div className={css.homeWrapper}>
                <div className={css.secondWrapper}>
                    <h1 className={css.title}>Welcome to 'Your Contacts Book'.</h1>
                    <p className={css.titleText}>With us your contacts will be safe and organized. Create, edit, use!</p>
                    {!isLoggedIn ? <div className={css.linkWrapper}>
                        <p className={css.textReg}>Ready to get started? </p>
                        <p className={css.linkText}><NavLink className={css.link} to='/registration'>Register</NavLink> to create an account. <br /> Already registered? <NavLink className={css.link} to='/login'>Login</NavLink>.</p>
                    </div> : <NavLink className={css.linkStart} to='/contacts'>Start</NavLink>}
            
                </div>
        </div>
    )
}