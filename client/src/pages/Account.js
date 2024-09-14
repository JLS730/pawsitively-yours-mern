import React from "react";
import { useState, useEffect, useRef } from "react";

import { firebaseConfig } from "../scripts/firebase";
import { initializeApp } from "firebase/app";

import { getAuth, onAuthStateChanged, deleteUser, signOut } from "firebase/auth";

import { useNavigate, Link } from "react-router-dom";

import NavigationBar from "../components/NavigationBar";

import "../styles/account.css";

const Account = () => {
  initializeApp(firebaseConfig);

  const auth = getAuth();
  const user = auth.currentUser;

  const navigate = useNavigate();

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const birthDateRef = useRef(null);
  const countryRef = useRef(null);
  const addressOneRef = useRef(null);
  const addressTwoRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const zipCodeRef = useRef(null);

  const morningRef = useRef(null);
  const afternoonRef = useRef(null);
  const nightRef = useRef(null);

  const mondayRef = useRef(null);
  const tuesdayRef = useRef(null);
  const wednesdayRef = useRef(null);
  const thursdayRef = useRef(null);
  const fridayRef = useRef(null);
  const saturdayRef = useRef(null);
  const sundayRef = useRef(null);

  function handleCheckUser() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(uid);
        // ...
      } else {
        // User is signed out
        // ...
        console.log("nothing");
      }
    });
  }

  function handleDeleteUser() {
    const user = auth.currentUser;

    deleteUser(user)
      .then(() => {
        console.log('user deleted')
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });
  }
  
  function handleSignOutUser() {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div className="account-page">
      <NavigationBar />
      <div className="settings-page">
        <div className="settings-about-you-container">
          <h2 className="about-you-title-text">About You</h2>

          <div className="about-you-container">
            <div className="about-you-first-name-container">
              <p className="first-name-text">First Name</p>
              <input
                type="text"
                placeholder="First Name"
                className="first-name-input"
                ref={firstNameRef}
              />
            </div>
            <div className="about-you-last-name-container">
              <p className="last-name-text">Last Name</p>
              <input
                type="text"
                placeholder="Last Name"
                className="last-name-input"
                ref={lastNameRef}
              />
            </div>
            <div className="about-you-phone-container">
              <p className="phone-text">Phone Number</p>
              <input
                type="tel"
                placeholder="XXX-XXX-XXXX"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                maxLength="12"
                className="phone-input"
                ref={phoneNumberRef}
                required
              />
            </div>
            <div className="about-you-birthdate-container">
              <p className="birthdate-text">Birthdate</p>
              <input
                type="date"
                className="birthdate-input"
                ref={birthDateRef}
              />
            </div>
          </div>
        </div>
        <div className="settings-availability-container">
          <h2 className="contact-availability-title-text">
            Contact Availability
          </h2>
          <div className="contact-time-container">
            <h3 className="contact-time-text">Best time(s) to contact you:</h3>
            <p className="contact-time-instruction-text">
              Check all that apply
            </p>
            <div className="times-container">
              <div className="morning-container">
                <input
                  type="checkbox"
                  className="morning-checkbox"
                  id="morning-checkbox"
                  value="Morning"
                  ref={morningRef}
                  onClick={(event) => console.log(event.target.checked)}
                />
                <label htmlFor="morning-checkbox">Morning</label>
              </div>
              <div className="afternoon-container">
                <input
                  type="checkbox"
                  className="afternoon-checkbox"
                  id="afternoon-checkbox"
                  value="Afternoon"
                  ref={afternoonRef}
                />
                <label htmlFor="afternoon-checkbox">Afternoon</label>
              </div>
              <div className="night-container">
                <input
                  type="checkbox"
                  className="night-checkbox"
                  id="night-checkbox"
                  value="Night"
                  ref={nightRef}
                />
                <label htmlFor="night-checkbox">Night</label>
              </div>
            </div>
          </div>
          <div className="contact-day-container">
            <h3 className="contact-day-text">Best day(s) to contact you:</h3>
            <p className="contact-day-instruction-text">Check all that apply</p>
            <div className="days-container">
              <div className="monday-container">
                <input
                  type="checkbox"
                  className="monday-checkbox"
                  id="monday-checkbox"
                  value="Monday"
                  ref={mondayRef}
                />
                <label htmlFor="monday-checkbox">Monday</label>
              </div>
              <div className="tuesday-container">
                <input
                  type="checkbox"
                  className="tuesday-checkbox"
                  id="tuesday-checkbox"
                  value="Tuesday"
                  ref={tuesdayRef}
                />
                <label htmlFor="tuesday-checkbox">Tuesday</label>
              </div>
              <div className="wednesday-container">
                <input
                  type="checkbox"
                  className="wednesday-checkbox"
                  id="wednesday-checkbox"
                  value="Wednesday"
                  ref={wednesdayRef}
                />
                <label htmlFor="wednesday-checkbox">Wednesday</label>
              </div>
              <div className="thursday-container">
                <input
                  type="checkbox"
                  className="thursday-checkbox"
                  id="thursday-checkbox"
                  value="Thursday"
                  ref={thursdayRef}
                />
                <label htmlFor="thursday-checkbox">Thursday</label>
              </div>
              <div className="friday-container">
                <input
                  type="checkbox"
                  className="friday-checkbox"
                  id="friday-checkbox"
                  value="Friday"
                  ref={fridayRef}
                />
                <label htmlFor="friday-checkbox">Friday</label>
              </div>
              <div className="saturday-container">
                <input
                  type="checkbox"
                  className="saturday-checkbox"
                  id="saturday-checkbox"
                  value="Saturday"
                  ref={saturdayRef}
                />
                <label htmlFor="saturday-checkbox">Saturday</label>
              </div>
              <div className="sunday-container">
                <input
                  type="checkbox"
                  className="sunday-checkbox"
                  id="sunday-checkbox"
                  value="Sunday"
                  ref={sundayRef}
                />
                <label htmlFor="sunday-checkbox">Sunday</label>
              </div>
            </div>
          </div>
        </div>

        <div className="settings-address-container">
          <h2 className="address-title-text">Address</h2>

          <div className="address-container">
            <div className="address-country-container">
              <p className="country-text">Country</p>
              <input
                type="text"
                placeholder="United States"
                className="country-input"
                ref={countryRef}
              />
            </div>
            <div className="address-line-1-container">
              <p className="address-line-1-text">Address line 1</p>
              <input
                type="text"
                placeholder="Street address, P.O Box"
                className="address-line-1-input"
                ref={addressOneRef}
              />
            </div>
            <div className="address-line-2-container">
              <p className="address-line-2-text">Address line 2</p>
              <input
                type="text"
                placeholder="Apt, suite, unit, building, floor, etc."
                className="address-line-2-input"
                ref={addressTwoRef}
              />
            </div>
            <div className="city-container">
              <p className="city-text">City</p>
              <input
                type="text"
                placeholder=""
                className="city-input"
                ref={cityRef}
              />
            </div>
            <div className="state-container">
              <p className="state-text">State</p>
              <input
                type="text"
                placeholder=""
                className="state-input"
                ref={stateRef}
              />
            </div>
            <div className="zip-code-container">
              <p className="zip-code-text">ZIP Code</p>
              <input
                type="text"
                placeholder=""
                className="zip-code-input"
                pattern="[0-9]{3}"
                ref={zipCodeRef}
                required
              />
            </div>
          </div>
        </div>
        <button onClick={() => handleSignOutUser()}>Log Out</button>
        <button>Save Information</button>
        <button onClick={() => handleDeleteUser()}>Delete Account</button>
        <button onClick={() => handleCheckUser()}>Check Account</button>
      </div>
    </div>
  );
};

export default Account;
