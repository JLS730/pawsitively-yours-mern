import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './styles/global.css'

import App from './App';
import Search from './pages/Search'
import Favorites from './pages/Favorites'
import Faq from './pages/Faq'
import Account from './pages/Account'
import Login from './pages/Login'
import Register from './pages/Register'
import DogInfo from './pages/DogInfo';
import Success from './pages/Success';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />} path='/' />
      <Route element={<Search />} path='/search' />
      <Route element={<Favorites />} path='/favorites' />
      <Route element={<Faq />} path='/faq' />
      <Route element={<Account />} path='/account' />
      <Route element={<Login />} path='/login' />
      <Route element={<Register />} path='/register' />
      <Route element={<Success />} path='/api/users' />
      <Route path='/dog-info' element={<DogInfo />}>
        <Route path=':id' element={<DogInfo />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
