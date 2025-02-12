import React, { useEffect, useState } from "react";
import styles from "./auth.module.scss";
import registerImg from "../../assets/register.png";
// import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { register, RESET_AUTH } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

const initialState = {
  name: "",
  email: "",
  password: "",
  cpassword: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, cpassword } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Must fill all fileds");
    }
    if (password < 6) {
      return toast.error("Password must at least 6 characters");
    }
    if (password !== cpassword) {
      return toast.error("password and confirm password is not matched");
    }

    const userData = {
      name,
      email,
      password,
    };
    await dispatch(register(userData));
  };

  useEffect(()=>{
    if(isSuccess && isLoggedIn){
      navigate("/")
    }
    dispatch(RESET_AUTH());
  }, [isLoggedIn, isSuccess, navigate, dispatch,])

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
      
          <div className={styles.form}>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={onChangeHandler}
              />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={onChangeHandler}
              />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={onChangeHandler}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                name="cpassword"
                value={cpassword}
                onChange={onChangeHandler}
              />
              <button type="submit" className="anmoBTN2 anmoBTN2WithFull">
                Login
              </button>
            </form>
            <span className={styles.register}>
              <p>Already have an account? <Link to="/login">Login</Link></p>
              
            </span>
          </div>
        
        <div className={styles.img}>
          <img src={registerImg} alt="Login" width="400" />
        </div>
      </section>
    </>
  );
};

export default Register;
