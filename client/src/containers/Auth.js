import React, { useState, useEffect } from 'react';
import { getUser, logout, login, sendStripeToken } from '../API.js'
import Payment from '../components/Payment'

const Auth = () => {

  const [user, setUser] = useState('');
  const [auth, setAuth] = useState(0);
  const [creditUpdate, setCreditUpdate] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUser()
      .then(res => res.json())
      .then(user => {
        setUser(user);
        console.log(user);
      })
  }, [creditUpdate, user.method]);


  async function handleLogout(e) {
    setIsLoading(true);
    const response = await logout();
    setUser(response);
    setIsLoading(false);
  }

  async function handleLogin(e) {
    setIsLoading(true);
    const response = await login();
    getUser().then(res => res.json())
      .then(user => setUser(user));
    setIsLoading(false);
  }

  async function handleUpdateCredits(token) {
    let sendToken = await sendStripeToken(token);
    let newCredits = creditUpdate + 1;
    let updateCredits = await setCreditUpdate(newCredits);
  }

  return (
    user.method ? (
      <div className="container text-center">
        <h1>Hi {user.email} !</h1>
        <p>You have {user.credits} credits!</p>
        <Payment updateCredits={handleUpdateCredits} />
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
