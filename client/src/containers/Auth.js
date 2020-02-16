import React, { useState, useEffect } from 'react';
import { getUser, logout, login, sendStripeToken, getSurveys } from '../API.js'
import Dashboard from './Dashboard'

const Auth = () => {

  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [checkUser, setCheckUser] = useState(0);
  const [surveys, setSurveys] = useState([]);

  // When page loads, ask server if user is already logged in
  useEffect(() => {
    getUser()
      .then(res => res.json())
      .then(user => {
        setUser(user);
        //console.log(user);
      })
  }, [checkUser]);

  useEffect(() => {
    getSurveys()
      .then(res => res.json())
      .then(surveys => {
        setSurveys(surveys)
        console.log(surveys)
      })
  }, [])

  async function handleLogout(e) {
    setIsLoading(true);
    const response = await logout();
    setUser(response);
    setIsLoading(false);
  }

  async function handleLogin(e) {
    setIsLoading(true);
    const response = await login();
    // When logged in, update "user" to returned value
    setCheckUser(checkUser + 1);
    setIsLoading(false);
  }

  async function handleUpdateCredits(token) {
    let sendToken = await sendStripeToken(token, user);
    setCheckUser(checkUser + 1);
  }

  return (
    user.method ? (
      <Dashboard
        user={user}
        updateCredits={handleUpdateCredits}
        logout={handleLogout}
        surveys={surveys}
      />
    )
      : user.method === undefined && isLoading === false ? (
        <div className="container text-center">
          <button id="login-button" className="btn btn-primary" onClick={(e) => handleLogin(e)}>Sign in with Google</button>
        </div >
      ) : (
          <div className="container text-center">
            Loading...
        </div>
        )
  )
}

export default Auth;
