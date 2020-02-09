import React, { useState, useEffect } from 'react';
import { getUser, logout, login } from '../API.js'

const Auth = () => {

  const [user, setUser] = useState('');
  const [auth, setAuth] = useState(0);

  useEffect(() => {
    getUser()
      .then(res => res.json())
      .then(setUser)
  }, [auth]);

  function handleLogout(e) {
    logout();
    setAuth(0);
    console.log('Logged out', user, auth);
  }

  function handleLogin(e) {
    login();
    setAuth(1);
    console.log('Logged in', user, auth)
  }

  return (
    auth === 1 ? (
      <div className="container">
        <h1>Hi {user.email} !</h1>
        <button className="info" onClick={(e) => handleLogout(e)}>Logout</button>
      </div >
    )
      :
      <div className="container">
        <br />
        <button className="info" onClick={(e) => handleLogin(e)}>Sign in with Google</button>
        <br />
      </div >
  )
}

export default Auth;
