import disasterGirlImg from '../../assets/images/disaster-girl.jpg';
import css from './ErrorMessage.module.css'

export default function ErrorMessage() {
    return (
        <div className={css.errorWrapper}>
            <p className={css.errorText}>ERROR !!!</p>
            <img src={disasterGirlImg} alt="img" width='450'/>
            <span className={css.errorTextLinkBack}>But don't worry, click <a className={css.errorLink} href="/">Reload</a> to try again.</span>
        </div>
    )
}