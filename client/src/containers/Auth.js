import React, { useState, useEffect } from 'react';
import { getUser, logout, login, sendStripeToken, getCredits } from '../API.js'
import Payment from '../components/Payment'

const Auth = () => {

  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [checkUser, setCheckUser] = useState(0);

  // When page loads, ask server if user is already logged in
  useEffect(() => {
    getUser()
      .then(res => res.json())
      .then(user => {
        setUser(user);
        //console.log(user);
      })
  }, [checkUser]);


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
      <div className="container text-center">
        <h1>Hi {user.email} !</h1>
        <p>You have {user.credits} credits!</p>
        <Payment updateCredits={handleUpdateCredits} user={user} />
        <button className="info" onClick={(e) => handleLogout(e)}>Logout</button>
        <br />
      </div >
    )
      : user.method === undefined && isLoading === false ? (
        <div className="container text-center">
          <br />
          <button className="info" onClick={(e) => handleLogin(e)}>Sign in with Google</button>
          <br />
        </div >
      ) : (
          <div className="container text-center">
            Loading...
        </div>
        )
  )
}

export default Auth;
