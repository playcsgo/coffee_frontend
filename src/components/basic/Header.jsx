import React from 'react';
// import { Link } from 'react-router-dom';
import { Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// import svg
import iconBack from '../../assets/images/icon/back.svg';

const HeaderMain = ({ pageTitle }) => {
  return (
    <div className='header-container header-main'>
      <h5>{pageTitle}</h5>
    </div>
  );
};

const HeaderUser = ({ userAccountName, userTweetsLength, isLoading }) => {
  const navigate = useNavigate();

  return (
    <div className="header-container">
      {/* <Link to='/main'> */}
      <img
        src={iconBack}
        alt="Back to pre page"
        className="icon-back cursor-point"
        onClick={() => {
          //@ 回上頁
          navigate(-1);
        }}
      />
      {/* </Link> */}

      <div className="header-user-info">
        <h5>{userAccountName || <Skeleton />}</h5>
        <p>{userTweetsLength} 推文 </p>
      </div>
    </div>
  );
};

export { HeaderMain, HeaderUser };
