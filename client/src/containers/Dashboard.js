import React from 'react';
import Payment from '../components/Payment'
import { Link } from 'react-router-dom'

const Dashboard = ({ logout, updateCredits, user, surveys }) => {
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
              <p className="card-text">{surveys.length}</p>
              <button className="btn btn-info">
                <Link to="/newSurvey" style={{ textDecoration: 'none', color: '#FFFFFF' }}>
                  Create survey
              </Link>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        {surveys.reverse().map((survey) => (
          <div className="card" style={{ marginTop: '15px' }} key={survey._id}>
            <div className="card-header">
              {survey.title}
            </div>
            <div className="card-body">
              <h5 className="card-title">{survey.subject}</h5>
              <p className="card-text">{survey.body}</p>
              <p style={{ display: "inline-block" }}>Yes : {survey.yes}</p>
              <p style={{ display: "inline-block", marginLeft: "5px" }}>No : {survey.no}</p>
              <p className="text-right">Sent on : {new Date(survey.dateSent).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="col-lg-12 text-right" id="bottom-button">
        <Link to="/newSurvey" style={{ textDecoration: 'none', color: '#FFFFFF' }}>
          <i className="fas fa-plus-circle" style={{ fontSize: '60px', color: 'red' }}></i>
        </Link>
      </div>

    </div >
  );
};

export default Dashboard;
