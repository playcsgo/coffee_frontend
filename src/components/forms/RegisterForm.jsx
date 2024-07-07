import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import InputGroup from './InputGroup';
import { useAuth } from '../context/AuthContext';
//modal dialog套件
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

import iconNotiSuccess from '../../assets/images/icon/alert-success-2.svg';
import iconNotiWanrning from '../../assets/images/icon/alert-warning-2.svg';
import ClipLoader from 'react-spinners/ClipLoader';

const RegisterForm = () => {
  const { signUp, isAuthentic } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // using react-form-hook-set-up
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

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
    if (data.password.length === 0) {
      return;
    }
    setIsLoading(true);
    // -- 掛載useAuth context 寫法
    const { success, errorMessage } = await signUp({
      account: data.account,
      email: data.email,
      password: data.password,
      checkPassword: data.cpassword,
      name: data.username,
    });

    if (success) {
      // alert('註冊成功!');
      // console.log('Register: ', success);
      setIsLoading(false)
      ToastSuccess.fire({
        title: '註冊成功!',
      });
      reset();
      navigate('/login');

      return;
    } else {
      // console.log('Register: ', success);
      ToastWarning.fire({
        title: `${errorMessage.message}`,
      });
      setIsLoading(false)
    }
  };
  useEffect(() => {
    if (isAuthentic) {
      navigate('/main');
    }
  }, [navigate, isAuthentic]); //只要isAuthentic或navigation有變化便執行

  return (
    <div className='formLayout login-form wrapper-login'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-box">
            <input type="text"
              name="account"
              {...register('account')} required/>
            <label>帳號</label>
        </div>
        <div className="input-box">
            <input type="text"
              name="username"
              {...register('username')} required/>
            <label>name</label>
        </div>
        <div className="input-box">
            <input type="text"
              name="email"
              {...register('email')} required/>
            <label>email</label>
        </div>
        <div className="input-box">
            <input type="password"
              name="password"
              {...register('password')} required/>
            <label>密碼</label>
        </div>
        <div className="input-box">
            <input type="password"
              name="cpassword"
              {...register('cpassword')} required/>
            <label>確認密碼</label>
        </div>
      
        <button
          className='button-filled button-lg login-btn'
          type='submit'
          disabled={isLoading ? true : false}
        >
          {isLoading === false && '註冊'}
          {isLoading && (
            <ClipLoader color='#36d7b7' loading={isLoading} size={35} />
          )}
        </button>
      </form> 
      <div className='button-group-row button-group-column'>
        <Link to='/login' className='button-link login-content'>
          取消
        </Link>
      </div>
    </div>  
  );
};

export default RegisterForm;
