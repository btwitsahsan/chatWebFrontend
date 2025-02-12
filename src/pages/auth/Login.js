import React, { useEffect, useState } from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
// import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login, RESET_AUTH } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  const loginUser = async (e)=>{
      e.preventDefault();
      if (!email || !password) {
        return toast.error("Must fill all fileds");
      }
  
      const userData = {
        email,
        password
      };
      await dispatch(login(userData));
  };
  useEffect(()=>{
    if(isSuccess && isLoggedIn){
      navigate("/")
    }
    dispatch(RESET_AUTH());
  }, [isLoggedIn, isSuccess, navigate, dispatch])
  return (
    <>
    {isLoading && <Loader/>}
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={loginImg} alt="Login" width="400" />
      </div>
      
        <div className={styles.form}>
          <h2>Login</h2>
          <form onSubmit={loginUser}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="anmoBTN2 anmoBTN2WithFull">
              Login
            </button>
          </form>
          <span className={styles.register}>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
            
          </span>
        </div>
      
    </section>
    </>
  );
};

export default Login;
