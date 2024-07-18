import React, { Fragment } from 'react'
import { useEffect, useState } from 'react'

import { useParams, Link, useNavigate } from 'react-router-dom'

import { firebaseConfig } from '../scripts/firebase'
import { initializeApp } from "firebase/app";
import { doc, getFirestore, getDoc, setDoc } from "firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import DogPlaceHolderImage from '../images/dog-placholder.png'

import NavigationBar from '../components/NavigationBar'

import '../styles/dog-information.css'
import axios from 'axios';

const DogInfo = () => {
    initializeApp(firebaseConfig);
    const auth = getAuth()

    const navigate = useNavigate()

    const { id } = useParams()
    const [backendData, setBackendData] = useState([{}])

    const [currentDog, setCurrentDog] = useState({})
    const [savePetToggle, setSavePetToggle] = useState(false)
    const [petSavedToggle, setPetSavedToggle] = useState(false)
    const [randomPetsArray, setRandomPetsArray] = useState([])
    const [userId, setUserId] = useState('')

    useEffect(() => {
        if (Object.keys(backendData).length > 1) {
            handleUserCheck()
            findCurrentDog()
            handlePetRandomizer()
            window.scrollTo(0, 0)
            // console.log(user)
            console.log('backend data working')
            return
        }

        handleDataFetch()

        // console.log('Working')
        // console.log(id)
    }, [backendData, id])

    function handleUserCheck() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                let uid = user.uid;
                const currentUser = user;

                uid = uid.toLocaleLowerCase() 
                setUserId(uid)

                console.log(currentUser)
                console.log(uid)
            } else {

            }
        });
    }

    async function handleDataFetch() {
        fetch('/api/dog-data').then(response => response.json()).then(data => setBackendData(data))
    }

    function findCurrentDog() {
        const newArray = backendData.filter((dog) => {
            return dog.id == id
        })

        setCurrentDog(newArray)

        console.log(newArray)
    }

    function handlePetRandomizer() {
        for (let i = 0; i < 4; i++) {
            setRandomPetsArray(oldArray => [...oldArray, backendData[Math.floor(Math.random() * 60)]])
        }
    }

    function handleAddFavorite() {
        axios({
            method: 'post',
            url: '/api/favorites',
            headers: {},
            data: {
                dog: currentDog[0].id,
                user: userId
            }
        }).then(response => {
            // navigate('/api/favorites')
        }).catch(error => {
            console.log(error)
        })
    }

    function HandleDogInformation() {
        return (
            <>
                <NavigationBar />
                <div className="current-dog-container">
                    <div className="current-dog-photos-container">
                        <img src={currentDog[0].primary_photo_cropped === null ? DogPlaceHolderImage : currentDog[0].primary_photo_cropped.medium} alt="" />
                    </div>
                    <div className="current-dog-information-container">
                        <div className="current-dog-name-and-save-container">
                            <h2 className="current-dog-name">{currentDog[0].name}</h2>
                            <div className="current-dog-save-container" onClick={() => handleAddFavorite()} >

                                {savePetToggle === false ? <i className="fa-solid fa-heart"></i> : null}
                                {savePetToggle === false ? <p className="current-dog-save-text">Save this pet</p> : null}

                                {petSavedToggle === true ? <i className="fa-solid fa-heart" style={{ color: 'red' }}></i> : null}
                                {petSavedToggle === true ? <p className="current-dog-save-text" onClick={() => { }}>Pet saved!</p> : null}

                            </div>
                        </div>
                        <div className="current-dog-description-container">
                            <p className="current-dog-location-text">Nestled in the heart of town, Pawsitively Yours Dog Adoption Center is conveniently located at 123 Bark Lane, welcoming visitors to embark on the journey of finding their furry companions. Our central location ensures easy access for all dog lovers seeking a lifelong connection with a canine friend.</p>
                            <p className="current-dog-description-text">{currentDog[0].description}</p>
                            <p className="current-dog-conclusion-text">Join us at Pawsitively Yours Dog Adoption Center, where every wagging tail tells a unique story of love and companionship, and together, we make forever homes for our furry friends.</p>
                        </div>
                        <div className="current-dog-additional-details-container">
                            <h2 className="additional-details-title-text">Additional Details</h2>
                            <div className="additional-details-container">
                                <div className="age-detail-container">
                                    <i className="fa-solid fa-calendar-days fa-xl"></i>
                                    <p className="age-detail-text">Age</p>
                                    <p className="age">{currentDog[0].age}</p>
                                </div>
                                <div className="gender-detail-container">
                                    <i className="fa-solid fa-venus-mars fa-xl"></i>
                                    <p className="gender-detail-text">Gender</p>
                                    <p className="gender">{currentDog[0].gender}</p>
                                </div>
                                <div className="status-detail-container">
                                    <i className="fa-solid fa-clipboard fa-xl"></i>
                                    <p className="status-detail-text">Status</p>
                                    <p className="status">{currentDog[0].status}</p>
                                </div>
                                <div className="size-detail-container">
                                    <i className="fa-solid fa-ruler fa-xl"></i>
                                    <p className="size-detail-text">Size</p>
                                    <p className="size">{currentDog[0].size}</p>
                                </div>
                                <div className="mood-detail-container">
                                    <i className="fa-solid fa-face-smile fa-xl"></i>
                                    <p className="mood-detail-text">Mood</p>
                                    <p className="mood">{currentDog[0].tags[0]}</p>
                                </div>
                                <div className="id-detail-container">
                                    <i className="fa-solid fa-id-card fa-xl"></i>
                                    <p className="id-detail-text">ID</p>
                                    <p className="id">{currentDog[0].id}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="more-pets-container">
                        <h2 className="more-pets-title-text">More Pets</h2>
                        <div className="pets-container">
                            {randomPetsArray.map((info, x) => {
                                return (
                                    <Link to={`${info.id}`} className={`adoption-photo-container-${x} adoption-photo-containers`} key={`${info.id}`} onClick={() => setRandomPetsArray([])}>
                                        <img src={info.primary_photo_cropped === null ? DogPlaceHolderImage : info.primary_photo_cropped.large} alt="" />
                                        <div className="adoption-photo-box-shadow"></div>
                                        <div className="adoption-photo-information-container">
                                            <p className="adoption-photo-name">{`${info.name}`}</p>
                                            <p className="adoption-photo-sex-and-id">{`${info.gender}`} &bull; {`ID# ${info.id}`}</p>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div>
            {currentDog[0] === undefined ? null : <HandleDogInformation />}
            <button className="test" onClick={() => console.log(userId)}>Test</button>
            <button className="test" onClick={() => console.log(currentDog[0].id)}>Test 2</button>
        </div>
    )
}

export default DogInfo