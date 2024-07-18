import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseConfig } from '../scripts/firebase';

import NavigationBar from '../components/NavigationBar'

import '../styles/navigation-bar.css'
import '../styles/login.css'


const Login = () => {
    initializeApp(firebaseConfig);
    const auth = getAuth()

    const navigate = useNavigate()

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    function handleUserSignIn(email, password) {
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {

            const user = userCredential.user;

            axios.post('/api/users', {
                uid: user.uid
            }).then(response => {
                if (user) {
                    navigate('/api/users')
                }

                console.log(response)
            }).catch(error => {
                console.log(error)
            })

            // console.log(user)

        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

  
            console.log('Hit')
        });
    }

    function handleUserCheck() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                const currentUser = user;

                // if (user) {
                //     navigate('/')
                // }

                console.log(currentUser)
                console.log(uid)
            } else {

            }
        });
    }

    function handleSignOut() {
        signOut(auth).then(() => {
            console.log('User Signed Out')
        }).catch((error) => {

        });
    }

    return (
        <div>
            <NavigationBar />
            <div className="login-container">
                <div className="login-credentials-container">
                    <div className="login-credentials-intro-container">
                        <div className="login-credentials-user-container">
                            <i className="fa-solid fa-user fa-2xl"></i>
                        </div>
                        <p className="login-credentials-intro-text">Have an account?</p>
                    </div>
                    <div className="login-credentials-input-container">
                        <input type="text" ref={emailRef} className="login-credentials-input-email" placeholder='Email Address' />
                        <input type="password" ref={passwordRef} className="login-credentials-input-password" placeholder='Password' />
                        <div className="login-credentials-help-container">
                            <div className="login-credentials-remember-me-container">
                                <input type="checkbox" id="remember-me" name="remember-me" value="Bike" />
                                <label for="remember-me">Remember Me</label>
                            </div>
                            <Link><p className="login-credentials-forgrot-password">Forgot Password?</p></Link>
                        </div>

                        <div className="login-credentials-sign-in-btn-container">
                            <button onClick={() => handleUserSignIn(emailRef.current.value, passwordRef.current.value)} className="login-credentials-sign-in-btn" >Sign-in</button>
                            <button onClick={() => handleUserCheck()} className="login-credentials-sign-in-btn" >Check User</button>
                            <button onClick={() => handleSignOut()} className="login-credentials-sign-in-btn" >Log Out</button>
                        </div>
                        <Link to={'/register'} style={{ textDecoration: 'none' }}><p className="login-credentials-create-account">Create An Account?</p></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login