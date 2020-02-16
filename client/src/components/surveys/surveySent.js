import React from 'react';

const surveySent = () => {
  return (
    <div className="container">
      <div className="jumbotron" style={{ marginTop: '10px' }}>
        <div className="container">
          <h1 className="display-4"><i className="far fa-check-square" style={{ color: "green", marginRight: "30px" }}></i>
            Survey sent!
          </h1>
        </div>
      </div>
    </div>
  );
};

export default surveySent;