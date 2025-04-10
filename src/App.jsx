import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import SyncLoader from "react-spinners/SyncLoader";
import './App.css'
import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { selectisRefreshing } from './redux/auth/selectors';
import { refreshUser } from './redux/auth/operations';
import RestrictedRoute from './components/RestrictedRoute/RestrictedRoute';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


const Home = lazy(() => import('./pages/HomePage/HomePage'));
const Login = lazy(() => import('./pages/LoginPage/LoginPage'));
const Registration = lazy(() => import('./pages/RegistrationPage/RegistrationPage'));
const Contacts = lazy(() => import('./pages/ContactsPage/ContactsPage'))

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectisRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);


  return isRefreshing ?
    (<SyncLoader />)
    :
    (<Layout>
      <Suspense fallback={<SyncLoader />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/login' element={<RestrictedRoute component={<Login />} redirectTo='/contacts'/>} />
          <Route path='/contacts' element={<PrivateRoute component={<Contacts />} redirectTo='/login'/>} />
        </Routes>
      </Suspense>
    </Layout>)
};

export default App








  // const dispatch = useDispatch();
  // const contacts = useSelector(selectContacts);
  // const loading = useSelector(selectLoading);
  // const error = useSelector(selectError);

  // useEffect(() => {
  //   dispatch(fetchContacts());
  // }, [dispatch]);


     {/* <ContactForm />
      <SearchBox />
      {loading && <SyncLoader />}
      {error ? <ErrorMessage /> : contacts?.length > 0 && <ContactList />} */}