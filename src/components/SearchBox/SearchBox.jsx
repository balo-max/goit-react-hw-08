import { useDispatch, useSelector } from 'react-redux';
import { useId } from 'react';
import { changeFilter } from '../../redux/filters/slice';
import { selectNameFilter } from '../../redux/filters/selectors';
import css from './SearchBox.module.css';

export default function SearchBox() {
    const dispatch = useDispatch();
    const value = useSelector(selectNameFilter);
    const searchID = useId();

    const handleSearch = (query) => {
        dispatch(changeFilter(query));
    }

    return (
        <div className={css.searchWrapper}>
            <label className={css.searchLabel} htmlFor={searchID}>Find contacts by name</label>
            <input className={css.searchInput} value={value} type="text" name="username" id={searchID} onChange={(e) => handleSearch(e.target.value)} />
        </div>
    )
};