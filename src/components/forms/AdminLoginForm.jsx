import { useEffect, useState } from 'react';
// import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import InputGroup from './InputGroup';
import { useAuth } from '../context/AuthContext';
//modal dialog套件

import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
// import withReactContent from 'sweetalert2-react-content';
import iconNotiSuccess from '../../assets/images/icon/alert-success-2.svg';
import iconNotiWanrning from '../../assets/images/icon/alert-warning-2.svg';

import ClipLoader from 'react-spinners/ClipLoader'

const AdminLoginForm = () => {
  // using react-form-hook-set-up
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();
  const { adminLogin, isAuthentic } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)

  // 客製toast 元件
  const ToastSuccess = Swal.mixin({
    toast: true,
    html: `<div>
    <img src="${iconNotiSuccess}" class="icon-alert-noti"/>
    </div>`,
    showConfirmButton: false,
    position: 'top',
    width: '394px',
    // height: '96px',
    timer: 3000,
    timerProgressBar: false,
    showClass: {
      popup: 'animate__animated animate__fadeInDown',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp',
    },
  });

  const ToastWarning = Swal.mixin({
    toast: true,
    html: `<div>
    <img src="${iconNotiWanrning}" class="icon-alert-noti"/>
    </div>`,
    showConfirmButton: false,
    position: 'top',
    width: '394px',
    height: '96px',
    timer: 3000,
    timerProgressBar: false,
    showClass: {
      popup: 'animate__animated animate__fadeInDown',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp',
    },
    // didOpen: (toast) => {
    //   toast.addEventListener('mouseenter', Swal.stopTimer);
    //   toast.addEventListener('mouseleave', Swal.resumeTimer);
    // },
  });

  const onSubmit = async (data) => {
    if (data.username.length === 0) {
      return;
    }
    if (data.password.length === 0) {
      return;
    }
    setIsLoading(true);
    const { success, errorMessage } = await adminLogin({
      account: data.username,
      password: data.password,
    });

    if (success) {
      // console.log('adminLogin: ', success);
      setIsLoading(false)
      ToastSuccess.fire({
        title: 'admin登入成功!',
      });
      reset();
      return;
    } else {
      // console.log('adminLogin: ', success);
      ToastWarning.fire({
        title: `${errorMessage.message}`,
      });
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (isAuthentic) {
      navigate('/admin');
    }
  }, [navigate, isAuthentic]); //只要isAuthentic或navigation有變化便執行

  return (
    <div className='formLayout login-form wrapper-login'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-box">
            <span className="icon">
                <ion-icon name="mail"></ion-icon>
            </span>
            <input type="text"
              name="username"
              {...register('username')} required/>
            <label>帳號</label>
        </div>
        <div className="input-box">
            <span className="icon">
                <ion-icon name="lock-closed"></ion-icon>
            </span>
            <input type="password"
              name="password"
              {...register('password')} required/>
            <label>密碼</label>
        </div>
        <button
          className='button-filled button-lg login-btn'
          type='submit'
          disabled={isLoading ? true : false}
        >
          {isLoading === false && '登入'}
          {isLoading && (
            <ClipLoader color='#36d7b7' loading={isLoading} size={35} />
          )}
        </button>
      </form>
      <div className='button-group-row login-button-group'>
        <Link to='/login' className='button-link login-content'>
          前台登入
        </Link>
      </div>
    </div>
  );
};

export default AdminLoginForm;
