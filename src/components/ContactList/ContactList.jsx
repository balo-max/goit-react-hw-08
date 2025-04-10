import css from './ContactList.module.css'

import Contact from '../Contact/Contact'
import { useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/contacts/selectors';

export default function ContactList() {
    const contacts = useSelector(selectFilteredContacts);

    return (
        <div className={css.listWrapper}>
            <ul className={css.contactList}>
                {contacts.map(contact =>
                    <li className={css.contactItem} key={contact.id}>
                        <Contact contact={contact}/>
                    </li>
                )}
            </ul>
        </div>
    );
}