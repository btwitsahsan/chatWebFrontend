import React from "react";
import styles from "./Loader.module.scss";
// import loaderImg from "../../assets/icegif-1262.gif";
import ReactDOM from "react-dom";
const Loader = () => {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        {/* <img src={loaderImg} alt="loading" /> */}
        <img src="https://media.tenor.com/hQz0Kl373E8AAAAi/loading-waiting.gif" alt="loading" />
      </div>
    </div>,
    document.getElementById("loader")
  );
};
export const Spinner = () => {
    return(
      <div className="elementCenter">
        <img src="https://media.tenor.com/hQz0Kl373E8AAAAi/loading-waiting.gif" alt="loading" width={40}/>
      </div>
   
  );
};

export default Loader;
