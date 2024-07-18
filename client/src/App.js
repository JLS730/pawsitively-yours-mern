import React, { useEffect, useState, useRef } from 'react'

import NavigationBar from './components/NavigationBar'

import HomeBannerLogoImage from './images/Pawsitively Yours Transparent Logo White.png'
import HomeBannerImage from './images/home-banner-image.jpg'
import DogPlaceHolderImage from './images/dog-placholder.png'

import './styles/navigation-bar.css'
import './styles/home.css'
import { Link } from 'react-router-dom'

function App() {
  const [backendData, setBackendData] = useState([{}])

  const breedRef = useRef(null)
  const ageRef = useRef(null)
  const genderRef = useRef(null)
  const sizeRef = useRef(null)

  useEffect(() => {
    handleFetchData()

    console.log(backendData)
  }, [])

  // function dogFilter(breed, age, gender, size) {
  //   let array = []
  //   let array1 = []
  //   let array2 = []
  //   let array3 = []



  //   if (breed === '' && age === '' && gender === '' && size === '') {
  //     return backendData
  //   }

  //   if (breed === '') {
  //     console.log('Breed Empty')
  //   } else {
  //     backendData.filter(dog => {

  //       if (dog.breeds.primary.toLowerCase() === breed.toLowerCase()) {
  //         array.push(dog)
  //       }

  //     })

  //     setBackendData(array)
  //     array = []
  //     // console.log(backendData)
  //     console.log('backendData')
  //     return
  //   }
    
  //   if (age !== '') {
  //     backendData.filter(dog => {

  //       if (dog.age.toLowerCase() === age.toLowerCase()) {
  //         array.push(dog)
  //       }

  //     })

  //     setBackendData(array)
  //     array = []
  //     return
  //   }
    
  //   if (gender !== '') {
  //     // backendData.filter(dog => {

  //     //   if (dog.gender.toLowerCase() === gender.toLowerCase()) {
  //     //     array.push(dog)
  //     //   }

  //     // })

  //     // setBackendData(array)
  //     // array = []
  //   }

  //   console.log(backendData)
  // }

  function handleFetchData() {
    fetch('/api/dog-data').then(response => response.json()).then(data => setBackendData(data))
  }

  function filterAdoption(data, property, value) {
    return data.filter(item => item.property == value)
  }

  return (
    <div>


      <NavigationBar />
      <div className='App'>
        <div className="app-content">
          <div className="home-banner-container">
            <img src={HomeBannerImage} alt="" className="home-banner-image" />
            <div className="home-banner-tint"></div>
            <img src={HomeBannerLogoImage} alt="" className="home-banner-logo-image" />
            <h2 className="banner-header">Adopt a New Friend Today!</h2>
          </div>
          {/* <button onClick={() => console.log(backendData)}>Test</button> */}
          <div className="adoption-content-container">


            <div className="dog-adoption-filter-container">
              <div className="breed-input-container filter-input-containers">
                <label htmlFor="breed-input" className="breed-label filter-labels">Breed</label>
                <input type="text" className="breed-input filter-inputs" ref={breedRef}  onKeyDown={(e) => {
                  if(e.key === 'Enter') {
                    const array = backendData.filter(item => item.breeds.primary.toLowerCase() == e.target.value.toLowerCase())
                    // const array = backendData.filter(item => {
                    //   console.log(item)
                    // })
                    
                    setBackendData(array)

                    console.log(array)
                  }


                  // e.target.disabled = true
                }}/>
              </div>

              <div className="age-input-container filter-input-containers">
                <label htmlFor="age-input" className="age-label filter-labels">Age</label>
                {/* <input type="text" className="age-input filter-inputs" /> */}
                <select name="age" id="age-selection" className="age-selection filter-selections" ref={ageRef}  onChange={(e) => {
                  const array = backendData.filter(item => item.age == e.target.value)

                  setBackendData(array)

                  e.target.disabled = true
                }}>
                  <option value="">Any</option>
                  <option value="Baby">Baby</option>
                  <option value="Young">Young</option>
                  <option value="Adult">Adult</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>

              <div className="gender-input-container filter-input-containers">
                <label htmlFor="gender-input" className="gender-label filter-labels">Gender</label>
                {/* <input type="text" className="gender-input filter-inputs" /> */}
                <select name="gender" id="gender-selection" className="gender-selection filter-selections" ref={genderRef}  onChange={(e) => {
                  const array = backendData.filter(item => item.gender == e.target.value)

                  setBackendData(array)

                  e.target.disabled = true
                }}>
                  <option value="">Any</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="size-input-container filter-input-containers">
                <label htmlFor="size-input" className="size-label filter-labels">Size</label>
                {/* <input type="text" className="size-input filter-inputs" /> */}
                <select name="size" id="size-selection" className="size-selection filter-selections" ref={sizeRef} onChange={(e) => {
                  const array = backendData.filter(item => item.size == e.target.value)

                  setBackendData(array)

                  e.target.disabled = true
                }}>
                  <option value="">Any</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                  <option value="Extra Large">Extra Large</option>
                </select>
              </div>

              <div className="filter-button-container">
                <button className="filter-button" onClick={() => console.log(backendData)}>Apply Filter</button>
                <button className="filter-button" onClick={() => {
                  handleFetchData()

                  const ageSelector = document.querySelector('.age-selection')
                  const genderSelector = document.querySelector('.gender-selection')
                  const sizeSelector = document.querySelector('.size-selection')

                  ageSelector.disabled = false
                  genderSelector.disabled = false
                  sizeSelector.disabled = false
                  
                  ageSelector.value = ''
                  genderSelector.value = ''
                  sizeSelector.value = ''
                  // console.log(test)
                }} >Clear Filter</button>
                {/* <button className="filter-button" onClick={() => handleFetchData()} >Clear Filter</button> */}
              </div>
            </div>

            <div className="dog-adoption-container">
              {backendData.length < 1 ? 'Loading' : backendData.map((dog, index) => {
                return (
                  <Link to={`dog-info/${dog.id}`} className={`adoption-photo-container-${index} adoption-photo-containers`} key={`${dog.id}`} state={{ from: dog.name }}>
                    <div className="dog-information-containers">
                      <img src={dog.primary_photo_cropped === null ? DogPlaceHolderImage : dog.primary_photo_cropped?.medium} alt="" className="dog-information-images" />
                      <div className="dog-description-containers">
                        <span className="dog-name">{dog.name}</span>
                        <div className="dog-age-breed-container">
                          <span className="dog-age">{dog.age}</span>
                          <span className='bullet-point'>&#8226;</span>
                          <span className="dog-breed">{dog.breed == undefined ? 'N/A' : dog.breeds.primary}</span>
                        </div>
                        <span className="dog-gender">{dog.gender === null ? "N/A" : dog.gender}</span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
