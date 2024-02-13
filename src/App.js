import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import Offers from './pages/Offers.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import PrivateRoute from "./components/PrivateRoute.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Header from "./components/Header.jsx";
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CreateListing from "./pages/CreateListing.jsx";

function App() {
  return (
    <>
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="profile" element={<PrivateRoute/>}>
         <Route path="/profile" element={<Profile/>}/>
        </Route>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/offers" element={<Offers/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/create-listing" element={<PrivateRoute/>}>
         <Route path="/create-listing" element={<CreateListing/>}/>
        </Route>
      </Routes>
    </Router>
    <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>

    </>
  );
}

export default App;
