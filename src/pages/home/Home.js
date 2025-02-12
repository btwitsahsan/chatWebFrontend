import React from "react";
import "./Home.scss";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";



const Home = () => {

  return (
    <>    
      
    <div className='contact-section'>
        <div className='container contact'>
            <div className="contact-icon">
                <FaFacebookF className='i'/>
                <FaTwitter className='i'/>
                <FaInstagram className='i'/>
                <FaYoutube className='i'/>
            </div>
            <h2>Let's Talk?</h2>
            <Link to='/chat' className='btn btn-dark'>Go Ahead</Link>
        </div>
    </div>
    </>
  );
};

export default Home;
