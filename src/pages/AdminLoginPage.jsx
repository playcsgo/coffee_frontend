import React from 'react';

// import svg
import iconLogo from '../assets/images/icon/logo.svg';

// import custom components
import ContainerColOne from '../components/layout/ContainerColOne';
import AdminLoginForm from '../components/forms/AdminLoginForm';
// import { useState } from 'react';
import { useAuth } from '../components/context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const { isAuthentic } = useAuth();
  const navigation = useNavigate();

  useEffect(() => {
    if (isAuthentic) {
      navigation('/admin');
    }
  }, [navigation, isAuthentic]); //只要isAuthentic或navigation有變化便執行

  return (
    <>
      <ContainerColOne>
        <header className="header d-flex flex-column">
          <div href="#" className="logo mx-auto my-2">
              <ion-icon name="cafe"></ion-icon> 後台登入
          </div>
          <div className='my-2'>
            <p className="login-content">帳號: root</p>
            <p className="login-content">密碼: 12345678</p>
          </div>
        </header>
        <div className='loginsection login-container col-4 flex_col_cc m-5'>
          <div className='my-3'>
            <AdminLoginForm />
          </div>
        </div>
      </ContainerColOne>
    </>
  );
};

export default LoginPage;
