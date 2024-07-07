import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import custom components
import ContainerColSec from '../components/layout/ContainerColSec';
import { HeaderUser } from '../components/basic/Header';
import { TabThreeGroup } from '../components/basic/Tab';

import FollowCardList from '../components/user/FollowCardList';
import ReplyLists from '../components/user/ReplyLists';
import TweetsLists from '../components/user/TweetsLists';
import LikeLists from '../components/user/LikeLists';
import ProfileCard from '../components/basic/ProfileCard';
import { useParams } from 'react-router-dom';
//call api
import { getUserInfo } from '../api/userinfo';
import { useAuth } from '../components/context/AuthContext';
import { getUserTweets } from '../api/twitter';
import ModalReply from '../components/basic/ModalReply';
import ModalTweet from '../components/basic/ModalTweet';
import Modal from '../components/basic/Modal';
import palinBg from '../assets/images/gray-bk.jpeg';
import loadingBg from '../assets/images/loading-bk.jpeg';

const UserPage = () => {
  const [tabIndex, setTabIndex] = useState('0');
  const [pathId, setPathId] = useState(Number(useParams().id)); //只是為了與UserOtherPage一樣而設定state
  const [isLoading, setIsLoading] = useState(true); //ProfileCard-圖片元件狀態

  const [imageStatus, setImageStatus] = useState('loading'); // ProfileCard-圖片元件狀態：'loading', 'fetching', 'loaded'

  //取得網址:id
  //向後端 給予(pathid)參數 拿該用戶的資料
  //分別建立一個state儲存tweets like replies資料 若state有資料便不抓取新資料 除非重整頁面
  const navigate = useNavigate();
  const {
    isAuthentic,
    member,
    isLoggedIn,
    modalReplyOpen,
    modalTweetOpen,
    like,
    handleChangeLikeMode,
    modalProOpen,
    userIsFollowing,
  } = useAuth();
  // @串接 server 用這一個
  const [userInfo, setUserInfo] = useState({});
  const [userTweets, setUserTweets] = useState([]);
  //分別建立一個state儲存tweets like replies資料 若state有資料便不抓取新資料 除非重整頁面
 
  const getUserInfoAsync = async () => {
    try {
      const userInfo = await getUserInfo(pathId);
      setImageStatus('fetching'); // 開始獲取圖片
      if (userInfo) {
        setImageStatus('loaded');
        setUserInfo(userInfo);
        setIsLoading(false);
      }
      return;
    } catch (error) {
      console.error('[getUser Info  with Async failed]', error);
      setImageStatus('loading'); // 發生錯誤，設置回 loading 狀態
      setIsLoading(false);
    }
  };

  const getUserTweetsAsync = async () => {
    try {
      const data = await getUserTweets(pathId);
      setUserTweets(data);
    } catch (error) {
      console.log(error);
    }
  };

  //@ profileCard/tweets初始渲染
  useEffect(() => {
    setIsLoading(true);
    getUserTweetsAsync();
  }, []);

  //@ profileCard 渲染後端 userInfo
  useEffect(() => {
    getUserInfoAsync();
    getUserTweetsAsync();
  }, [
    pathId,
    like,
    modalTweetOpen,
    modalProOpen,
    userIsFollowing,
    setIsLoading,
    setImageStatus,
  ]);

  //切換下方tab
  //swtich case 與 if else概念相同，但return component更簡潔(??)
  function switchContext(tabIndex) {
    switch (tabIndex) {
      case '1':
        return <ReplyLists pathId={pathId} />;
      case '2':
        return <LikeLists pathId={pathId} setPathId={setPathId} />;
      default:
        return (
          <TweetsLists
            tweets={userTweets}
            onToggleLike={handleChangeLikeMode}
            isLoading={isLoading}
          />
        );
    }
  }

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate('/login');
  //   }
  // }, [navigate, isAuthentic]); //只要isAuthentic或navigation有變化便執行

  //@ ProfileCard-圖片元件狀態 - 照片載入不同狀態設定圖片來源
  // let avatarSource = '';
  // let bkSource = '';

  // if (imageStatus === 'loading') {
  //   avatarSource = palinBg; // 顯示示意圖，代表圖片尚未拿到
  //   bkSource = palinBg; // 顯示示意圖，代表圖片尚未拿到
  // } else if (imageStatus === 'fetching') {
  //   avatarSource = loadingBg; // 顯示示意圖，代表圖片正在拿取中
  //   bkSource = loadingBg; // 顯示示意圖，代表圖片正在拿取中
  // } else if (imageStatus === 'loaded') {
  //   avatarSource = userInfo.avatar; // 顯示實際使用者的圖片
  //   bkSource = userInfo.banner; // 顯示實際使用者的圖片
  // }

  return (
    <>
      <ContainerColSec role="user" pageIndex={1} memberId={member.id}>
        {modalTweetOpen && <ModalTweet />}
        {modalProOpen && <Modal />}
        <section className="section-outer-m col-7">
          <div className="section-main-m">
            <HeaderUser
              userAccountName={userInfo.name}
              userTweetsLength={userTweets.length || null}
              isLoading={isLoading}
            />

            <ProfileCard
              {...userInfo}
              avatar={userInfo.avatar}
              banner={userInfo.banner}
              imageStatus={imageStatus}
              isLoading={isLoading}
            />
            {/* 沒有使用上imageStatus */}
            <TabThreeGroup tabIndex={tabIndex} setTabIndex={setTabIndex} />
            {modalReplyOpen && <ModalReply />}
            {switchContext(tabIndex)}
            {/* {tabIndex === '0' && <TweetsLists />}
            {tabIndex === '1' && <ReplyLists />}
            {tabIndex === '2' && <LikeLists />} */}
          </div>
        </section>
        <section className="section-right col-3">
          <FollowCardList setPathId={setPathId} />
        </section>
      </ContainerColSec>
    </>
  );
};

export default UserPage;
