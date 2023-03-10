import React from 'react';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft';
import PostSide from '../../PostSide/PostSide';
import RightSide from '../../components/RightSide/RightSide'
import './Profile.css';

const Profile = () => {
  return (
    <div className="Profile">
      <ProfileLeft />

      <div className="Profile-center">
        <ProfileCard />
        <PostSide />
      </div>

      <RightSide />
    </div>
  )
}

export default Profile;