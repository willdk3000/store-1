import React from 'react';
import Payment from '../components/Payment'

const Dashboard = ({ logout, sendSurvey, updateCredits, user }) => {
  return (
    <div className="container text-center">

      <div className="d-flex justify-content-between align-items-center">
        <h2 id="dummy"></h2>
        <h2>Hi {user.email}</h2>
        <a href="#" onClick={(e) => logout(e)}>Logout</a>
      </div>

      <div className="row">
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Credits left</h5>
              <p className="card-text">{user.credits}</p>
              <Payment updateCredits={updateCredits} user={user} />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Surveys sent</h5>
              <p className="card-text">Number of surveys</p>
              <button className="btn btn-info" onClick={() => sendSurvey()}>Send survey</button>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-6" id="bottom-button">
        <i className="fas fa-plus-circle" style={{ fontSize: '60px', color: 'red' }}></i>
      </div>
    </div >
  );
};

export default Dashboard;
