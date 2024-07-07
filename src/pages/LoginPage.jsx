import React from 'react';

// import svg
import iconLogo from '../assets/images/icon/logo.svg';

// import custom components
import ContainerColOne from '../components/layout/ContainerColOne';
import LoginForm from '../components/forms/LoginForm';

// import { useState } from 'react';
import { useAuth } from '../components/context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// for login
import '../assets/stylesheets/LoginPage.css';
// import { Helmet } from 'react-helmet';

const LoginPage = () => {
  const { isAuthentic } = useAuth();
  const navigation = useNavigate();

  useEffect(() => {
    if (isAuthentic) {
      navigation('/main');
    }
  }, [navigation, isAuthentic]); //只要isAuthentic或navigation有變化便執行

  return (
    <>
      {/* <Helmet>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>喝咖啡聊是非</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous" />
        <link rel="stylesheet" href="style.css" />
      </Helmet> */}
      <div class='login-body'>

        <header className="header">
            <div href="#" className="logo mx-auto my-2">
                <ion-icon name="cafe"></ion-icon> 喝咖啡聊是非
            </div>
        </header>

        <div className="home loginsection">

            <div className="wrapper-login mx-auto">
              <LoginForm />
              <div className="mt-5 content">
                  <p className="m-3 content">可使用以下資料登入<strong className='content'> 或 </strong>點選註冊您的帳號</p>
                  <p className="m-1 content">帳號:  user1</p>
                  <p className="m-1 content">密碼:  12345678</p>
                  <p className="m-1 content">
                    因雲端資料庫有設置閒置休眠, 
                    首次使用需等待較長時間. <br />(約30秒喚醒)
                  </p>
              </div>
            </div>
        </div>
        {/* <Helmet>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossOrigin="anonymous"></script>
          <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
          <script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
        </Helmet> */}
      </div>
    </>
  );
};

export default LoginPage;