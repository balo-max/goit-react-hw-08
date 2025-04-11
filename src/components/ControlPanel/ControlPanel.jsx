import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import SearchBox from "../../components/SearchBox/SearchBox";
import FormModal from "../FormModal/FormModal";
import css from './ControlPanel.module.css';

export default function ControlPanel() {
    const [isOpenModal, setisOpenModal] = useState(false);

    const handleOpenModal = () => {
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