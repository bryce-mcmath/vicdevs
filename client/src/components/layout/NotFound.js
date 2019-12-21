import React from "react";

const NotFound = () => {
  return (
    <div className="bg">
      <div className="dark-overlay">
        <div className="container">
          <h1 className="text-primary">
            <i className="fas fa-exclamation-triangle"></i> Page Not Found
          </h1>
          <p>Sorry, this page does not exist :{"("}</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
