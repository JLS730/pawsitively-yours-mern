import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { firebaseConfig } from '../scripts/firebase'
import { initializeApp } from "firebase/app";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import SiteLogo from '../images/site-logo-removebg-preview.png'

const NavigationBar = () => {
  const [signedInToggle, setSignedInToggle] = useState(false)

  initializeApp(firebaseConfig);
  const auth = getAuth()

  useEffect(() => {

  }, [])

  function handleUserCheck() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignedInToggle(true)
      } else {

      }
    });
  }

  return (
    <nav className="navigation-bar-container">
      <div className="navigation-bar-left">
        {/* <img src="" alt="logo" className="navigation-logo" />
        <div className="navigation-logo-temp"></div> */}
        <img src={SiteLogo} alt="" className='site-logo' />
      </div>
      <div className="navigation-bar-right">
        <div className="navigation-contact-container">
          <div className="navigation-contact-phone-container contact-containers">
            <i className="fa-solid fa-phone-volume"></i>
            <div className="phone-info-container">
              <span>Call Us 24/7</span>
              <span>555-555-5555</span>
            </div>
          </div>
          <div className="navigation-contact-email-container contact-containers">
            <i className="fa-solid fa-envelope"></i>
            <div className="email-info-container">
              <span>Send A Message</span>
              <span>pawsitively.yours@paw.com</span>
            </div>
          </div>
          <div className="navigation-contact-loacation-container contact-containers">
            <i class="fa-solid fa-location-dot"></i>
            <div className="loacation-info-container">
              <span>Location</span>
              <span>123 Bark Lane</span>
            </div>
          </div>
        </div>
        <div className="navigation-links-container">

          <ul className="navigation-links">
            <li className="navigation-link"><Link to={'/'} className="link">Home</Link></li>
            <li className="navigation-link"><Link to={'/search'} className="link">Search</Link></li>
            <li className="navigation-link"><Link to={'/favorites'} className="link">Favorites</Link></li>
            <li className="navigation-link"><Link to={'/faq'} className="link">FAQ</Link></li>
            {signedInToggle === false ? <li className="navigation-link"><Link to={'/account'} className="link">Account</Link></li> : <li className="navigation-link"><Link to={'/login'} className="link">Login</Link></li>}
            {/* <li className="navigation-link"><Link to={'/account'} className="link">Account</Link></li>
          <li className="navigation-link"><Link to={'/login'} className="link">Login</Link></li> */}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavigationBar