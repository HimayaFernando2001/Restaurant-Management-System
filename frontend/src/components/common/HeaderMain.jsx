import React from 'react';
import '../css/HeaderMain.css'; 

const HeaderMain = () => {
  return (
    <div className="header-main-container">
      <div className="logo-container">
        <img src="/images/logo.png" alt="Restaurant Logo" className="logo-main" />
      </div>
    </div>
  );
};

export default HeaderMain;
