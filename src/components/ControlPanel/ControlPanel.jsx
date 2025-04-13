import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import SearchBox from "../../components/SearchBox/SearchBox";
import FormModal from "../FormModal/FormModal";
import css from './ControlPanel.module.css';
import { useDispatch } from "react-redux";
import { setCurrentContact } from "../../redux/contacts/actions";

export default function ControlPanel() {
    const dispatch = useDispatch();
    const [isOpenModal, setisOpenModal] = useState(false);

    const handleOpenModal = () => {
        dispatch(setCurrentContact({ name: '', number: '' }));
        setisOpenModal(true);
    }

    const handleCloseModal = () => {
        setisOpenModal(false);
    }
    
    return (
        <div className={css.wrapper}>
            <FormModal isOpen={isOpenModal} onCloseModal={handleCloseModal}/>
            <button className={css.addBtn} onClick={() => handleOpenModal()}>Create contact <FaPlus className={css.icon} /></button>
            <SearchBox />
        </div>
    )
}