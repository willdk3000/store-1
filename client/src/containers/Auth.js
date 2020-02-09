import React, { useState, useEffect } from 'react';
import { getUser, logout, login } from '../API.js'

const Auth = () => {

  const [user, setUser] = useState('');
  const [auth, setAuth] = useState(0);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getUser()
      .then(res => res.json())
      .then(setUser)
  }, [auth]);

  async function handleLogout(e) {
    setIsLoading(true);
    const response = await logout();
    setAuth(0);
    setIsLoading(false);
  }

  async function handleLogin(e) {
    setIsLoading(true);
    const response = await login();
    setAuth(1);
    setIsLoading(false);
  }

  return (
    auth === 1 ? (
      <div className="container">
        <h1>Hi {user.email} !</h1>
        <button className="info" onClick={(e) => handleLogout(e)}>Logout</button>
      </div >
    )
      : auth === 0 && isLoading === false ? (
        <div className="container">
          <br />
          <button className="info" onClick={(e) => handleLogin(e)}>Sign in with Google</button>
          <br />
        </div >
      ) : (
          <div className="container">
            Loading...
        </div>
        )
  )
}

export default Auth;
