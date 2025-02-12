import React, { useState } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { logout, RESET_AUTH } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";

export const logo = (
  <div className="logo">
    <Link to="/">
      <h2>
        Web<span>Chat</span>
      </h2>
    </Link>
  </div>
);
const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrollPage, setScrollPage] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fixBar = () => {
    if (window.screenY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(true);
    }
  };
  window.addEventListener("scroll", fixBar);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const hideMenu = () => {
    setShowMenu(false);
  };

  const { user } = useSelector((state) => state.auth);

  const userProfile = user?.photo || "";

  const LogoutUser = async () => {
    await dispatch(logout());
    await dispatch(RESET_AUTH());
    navigate("/login");
  };
  return (
    <header className={scrollPage ? `${styles.fixed}` : null}>
      <div className={styles.header}>
        {logo}
        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>
          <ul>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu} />
            </li>
            <li>
              <NavLink to="/chat" className={activeLink}>
                Chat
              </NavLink>
            </li>
          </ul>

          <div className={styles["header-right"]}>
            <span className={styles.links}>
              <ShowOnLogin>
                <NavLink to="profile" className={activeLink}>
                  <img
                    className="profileName"
                    src={userProfile}
                    alt="User Profile"
                  />
                </NavLink>
              </ShowOnLogin>
              <ShowOnLogout>
                <NavLink to="login" className={activeLink}>
                  login
                </NavLink>
                <NavLink to="register" className={activeLink}>
                  Register
                </NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
                <Link to={"/"} onClick={LogoutUser}>
                  Logout
                </Link>
              </ShowOnLogin>
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
