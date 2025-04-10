import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectUser } from "../../redux/auth/selectors";
import { logoutUser } from "../../redux/auth/operations";


export default function UserMenu() {
    const dispatch = useDispatch()
    const user = useSelector(selectUser);

    const handleLogout = () => {
        dispatch(logoutUser());
    }

    return (
        <div>
            <NavLink to='/contacts'>Contacts</NavLink>
            <p>Hello, {user.name}</p>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    )
}