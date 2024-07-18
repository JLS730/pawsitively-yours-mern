import React, { Fragment } from 'react'
import { useEffect, useState } from 'react'

import { useParams, Link, useNavigate } from 'react-router-dom'

import { firebaseConfig } from '../scripts/firebase'
import { initializeApp } from "firebase/app";
import { doc, getFirestore, getDoc, setDoc } from "firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import DogPlaceHolderImage from '../images/dog-placholder.png'

import NavigationBar from '../components/NavigationBar'

import '../styles/favorites.css'
import axios from 'axios';

const Favorites = () => {
  initializeApp(firebaseConfig);
  const auth = getAuth()

  const navigate = useNavigate()

  const { id } = useParams()
  const [backendData, setBackendData] = useState([{}])

  const [favoriteListID, setFavoriteListID] = useState([])
  const [favoriteList, setFavoriteList] = useState([])
  const [userCheckedToggle, setUserCheckedToggle] = useState(false)
  const [petSavedToggle, setPetSavedToggle] = useState(false)
  const [userId, setUserId] = useState('')

  useEffect(() => {
    if (userId !== '') {
      // console.log(backendData)
      handleFavoritesList()
      return
    }

    // if(userCheckedToggle) {
    //   handleFavoritesListID(userId)
    //   console.log('favorites runing')
    //   return
    // }

    if (Object.keys(backendData).length > 1) {
      handleUserCheck()

      setUserCheckedToggle(true)
      // handleFavoritesList()
      console.log(favoriteListID)
      console.log('backend data working')
      return
    }

    console.log('test')
    handleDataFetch()
  }, [backendData, id, userId, favoriteListID])

  function handleUserCheck() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        let uid = user.uid;
        const currentUser = user;

        uid = uid.toLocaleLowerCase()

        handleFavoritesListID(uid)

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

  function handleFavoritesListID(id) {
    axios({
      method: 'post',
      url: '/favorites-list',
      headers: {},
      data: {
        user: id
      }
    }).then(response => {
      // navigate('/api/favorites')
      setFavoriteListID(response.data)
      // console.log(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  function handleFavoritesList() {
    let array = []

    backendData.filter(dog => {
      for (let i = 0; i < favoriteListID.length; i++) {
        if (dog.id == favoriteListID[i].animal_id) {
          array.push(dog)
        }
      }
    })

    setFavoriteList(array)

    // console.log(favoriteList)
    console.log('function running')
  }
  
  function handleFavoritesDelete(id) {
    axios({
      method: 'post',
      url: '/api/favorites/delete',
      headers: {},
      data: {
        animal: id
      }
    }).then(response => {
      
    }).catch(error => {
      console.log(error)
    })
  }

  // function handleFavoritesList() {
  //   let array = []

  //   backendData.filter(dog => {
  //     for (let i = 0; i < favoriteListID.length; i++) {
  //       if (dog.id == favoriteListID[i].animal_id) {
  //         array.push(dog)
  //       }
  //     }
  //   })

  //   setFavoriteList(array)

  //   // console.log(favoriteList)
  //   console.log('function running')
  // }


  return (
    <div>
      <NavigationBar />
      <div className="favorites-page">
        {/* {favoriteList.length <= 0 ? null : favoriteList.map(id => {
        return (
          <h2>
            {id.size}
          </h2>
        )
      })} */}
        <div className="favorite-pet-page">
          {favoriteList.length === 0 ? null : favoriteList.map((dog, x) => {
            return (
              <div className={`adoption-photo-container-${x} adoption-photo-containers`}>
                <div className="adoption-delete-button-container">
                  <i class="fa-sharp fa-solid fa-circle-xmark fa-2xl" onClick={() => {
                    handleFavoritesDelete(dog.id)
                    setTimeout(() => {

                      navigate(0)
                    }, 100)
                  }}></i>
                </div>
                <Link to={`/Dog-Information/${dog.id}`} className={`adoption-photo-container-${x} adoption-photo-containers`} key={`${dog.id}`} state={{ from: dog.name }}>
                  <img src={dog.primary_photo_cropped === null ? DogPlaceHolderImage : dog.primary_photo_cropped.full} alt="d" />
                </Link>
                <div className="adoption-photo-box-shadow"></div>
                <div className="adoption-photo-information-container">
                  <p className="adoption-photo-name">{dog.name}</p>
                  <p className="adoption-photo-sex-and-id">{dog.gender} &#x2022; {dog.id}</p>
                </div>
              </div>
            )
          })}
        </div>
        <button className="test" onClick={() => console.log(favoriteList)}>test</button>
      </div>
    </div>
  )
}

export default Favorites