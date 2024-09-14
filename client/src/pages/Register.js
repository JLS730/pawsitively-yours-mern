import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import { firebaseConfig } from '../scripts/firebase';

import NavigationBar from '../components/NavigationBar'

import '../styles/navigation-bar.css'
import '../styles/register.css'

const Register = () => {
    initializeApp(firebaseConfig);
    const auth = getAuth()

    const navigate = useNavigate()

    const emailRef = useRef(null)
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)

    function handleUserCreateUser(email, password) {
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {

            const user = userCredential.user;

            if (user) (
                updateProfile(auth.currentUser, {
                    displayName: usernameRef.current.value
                }).then(() => {
                    // Profile updated!
                    // ...
                }).catch((error) => {
                    // An error occurred
                    // ...
                })
            )

            // axios.post('/api/users', {
            //     id: user.uid
            // }).then(response => {
            //     if (user) {
            //         navigate('/api/users')
            //     }

            //     console.log(response)
            // }).catch(error => {
            //     console.log(error)
            // })

            axios({
                method: 'post',
                url: '/api/users',
                headers: {},
                data: {
                    email: emailRef.current.value,
                    username: usernameRef.current.value,
                    password: passwordRef.current.value,
                    id: user.uid.toLocaleLowerCase(), // This is the body part
                }
            }).then(response => {
                if(user) {
                    navigate('/api/users')
                }
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

    return (
        <div>
            <NavigationBar />
            <div className="create-account-container">
                <div className="create-account-credentials-container">
                    <div className="create-account-credentials-intro-container">
                        <div className="create-account-credentials-user-container">
                            <i class="fa-solid fa-user fa-2xl"></i>
                        </div>
                        <p className="create-account-credentials-intro-text">Sign-up Today!</p>
                    </div>
                    <form method='POST' action='/api/users' className="create-account-credentials-input-container">
                        <input type="text" ref={emailRef} className="create-account-credentials-input-email" name='email' placeholder='Email Address' />
                        <input type="text" ref={usernameRef} className="create-account-credentials-input-username" name='username' placeholder='Username' />
                        <input type="password" className="create-account-credentials-input-password" placeholder='Password' />
                        <input type="password" ref={passwordRef} className="create-account-credentials-input-password" placeholder='Confirm Password' />
                        <div className="create-account-credentials-sign-in-btn-container">
                            {/* <button type='submit' className="create-account-credentials-sign-in-btn">Create Account</button> */}
                            <button onClick={(e) => {
                                e.preventDefault()

                                handleUserCreateUser(emailRef.current.value, passwordRef.current.value)
                            }} className="create-account-credentials-sign-in-btn">Test Create Account</button>
                            <button onClick={(e) => {
                                e.preventDefault()

                                handleUserCheck()
                            }} className="create-account-credentials-sign-in-btn">Check User</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register