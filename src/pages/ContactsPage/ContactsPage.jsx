import { useDispatch, useSelector } from "react-redux";
import ContactList from "../../components/ContactList/ContactList";
import { selectFilteredContacts } from "../../redux/contacts/selectors";
import { useEffect } from "react";
import { fetchContacts } from "../../redux/contacts/operations";
import ControlPanel from "../../components/ControlPanel/ControlPanel";
import css from './ContactsPage.module.css';

export default function ContactsPage() {
    const dispatch = useDispatch();
    const contacts = useSelector(selectFilteredContacts);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    return (
        <div className={css.wrapper}>
            <ControlPanel/>
            {contacts.length !== 0 && <ContactList />}
        </div>
    )
}