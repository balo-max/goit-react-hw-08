import css from './Section.module.css';

export default function Section({children}) {
    return (
        <section className={css.section}>{children}</section>
    )
}