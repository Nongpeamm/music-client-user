import React, {useState, useEffect} from "react";
//Pages
import Register from "./components/pages/auth/register";
import Login from "./components/pages/auth/login";
import Home from './components/pages/homepage';
//admin page
import AdminHome from './components/pages/admin/Home';
import ManageAdmin from './components/pages/admin/ManageAdmin';
import AddsongAdmin from './components/pages/admin/Addsong';
//user page
import UserHome from './components/pages/user/Home2';
import Showtrackinfofrom from'./components/pages/user/showTrack';
import ShowProfile from'./components/pages/user/userProfile';
//Layouts
import Navbar from './components/layouts/navbar';
//function
import { currentUser } from "./components/functions/auth";
//redux 
import { useDispatch } from 'react-redux';

import {Routes, Route} from 'react-router-dom'
import UserRoute from './components/routes/UserRoute'
import AdminRoute from './components/routes/AdminRoute'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './bootstrap.min.css'
import Play from "./components/pages/user/play";

function App() {
  const dispatch = useDispatch();
  const idToken = localStorage.token;
  if(idToken){
    currentUser(idToken)
    .then(res => {
      dispatch({
        type:"Login",
        payload: {
            token: idToken,
            username: res.data.username,
            role: res.data.role,
        }
    });
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Play />
      <Routes>
          <Route path="/" element = {<Home /> } />
          <Route path="/register" element = {<Register />} />
          <Route path="/login" element = {<Login />} />
          <Route path="/admin/home" element = {
            <AdminRoute>
              <AdminHome/>
            </AdminRoute> 
          } />
          <Route path="/admin/manage-admin" element = {
            <AdminRoute>
              <ManageAdmin/>
            </AdminRoute> 
          } />
          <Route path="/admin/song-admin" element = {
            <AdminRoute>
              <AddsongAdmin/>
            </AdminRoute> 
          } />
          
          <Route path="/user/home" element = {
            <UserRoute>
              <UserHome/>
            </UserRoute>  
          } />

          <Route path="/user/listen/:id" element = {
            <UserRoute>
              <Showtrackinfofrom/>
            </UserRoute>  
          } />

          <Route path="/user/profile" element = {
            <UserRoute>
              <ShowProfile/>
            </UserRoute>  
          } />
      </Routes>
    </div>
  );
}

export default App;
