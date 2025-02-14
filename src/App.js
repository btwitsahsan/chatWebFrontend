import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkLoginStatus, getUser } from "./redux/features/auth/authSlice";
import Profile from "./pages/profile/Profile";
import Chat from "./pages/chat/Chat";
import { ChildRoute } from "./components/hiddenLink/hiddenLink";
import Users from "./pages/users/Users";

function App() {

    const { isLoggedIn } = useSelector((state) => state.auth);
  
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkLoginStatus());
  },[dispatch])

   useEffect(() => {
      if (isLoggedIn) {
        dispatch(getUser());
      }
    }, [dispatch, isLoggedIn]);

  return (
    
    <BrowserRouter>
    <ToastContainer/>
      {/* <Loader/> */}
      <Header />
      {/* <Spinner/> */}
      {/* <Routes element={<ChildRoute/>}>
     
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={ <PrivateRoute element={<Chat/>}/> } />
        <Route path="/profile" element={ <PrivateRoute element={<Profile/>}/> } />
  
      </Routes> */}
      <Routes>
        {/* Define the parent route */}
        <Route path="/" element={<ChildRoute />}>
          <Route index element={isLoggedIn? <Users />: <Login/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={isLoggedIn? <Chat />: <Login/>}/>
          <Route path="/profile" element={isLoggedIn?<Profile /> : <Login/>} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
