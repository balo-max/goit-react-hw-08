import css from './Contact.module.css'

import { BiSolidContact } from "react-icons/bi";
import { FiPhoneCall } from "react-icons/fi";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Contact({ contact: { id, name, number }, onEdit, onDelete }) {
    return (
        <>
            <div className={css.wrapper}>
                <div className={css.iconWrapper}>
                    <BiSolidContact />
                    <FiPhoneCall/>
                </div>
                <div className={css.textWrapper}>
                    <p className={css.contactText}>{name}</p>
                    <p className={css.contactText}>{number}</p>
                </div>
            </div>
            <div className={css.btnWrapper}>
                <button className={css.contactBtn} onClick={() => onDelete({ id, name })}><MdDelete className={css.iconDelete} /></button>
                <button className={css.contactBtn} onClick={() => onEdit({ id, name, number })}><FaPencilAlt className={css.iconUpdt} /></button>
            </div>
        </>
    );
}