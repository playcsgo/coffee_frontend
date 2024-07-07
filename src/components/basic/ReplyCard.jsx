import React from 'react';
import TweetUserName3 from './TweetUserName3';
import UserAvatar from './UserAvatar';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ReplyCard = ({ tweetInfo, isLoading, isUserLoading }) => {
  return (
    <div className='tweet-card-basic'>
      {isUserLoading && (
        <Skeleton
          circle
          width={50}
          height={50}
          style={{
            marginRight: '8px',
          }}
        />
      )}
      {!isUserLoading && (
        <UserAvatar avatar={tweetInfo.User.avatar} isLoading={isLoading} />
      )}
      <div className='tweet-card-left-info'>
        <TweetUserName3
          name={tweetInfo.User.name}
          account={tweetInfo.User.account}
          time={tweetInfo.createdAt}
        />
        <p className='tweet-card-basic-description'>{tweetInfo.description}</p>
        <p className='tweet-card-basic-reply'>
          回覆給
          <span className='reply-user-account'>@{tweetInfo.User.account}</span>
        </p>
      </div>
    </div>
  );
};
//回覆的帳號相同

export default ReplyCard;
