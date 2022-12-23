import React from 'react'
import ProfileSide from '../../components/ProfileSide/ProfileSide'
import RightSide from '../../components/RightSide/RightSide'
import PostSide from '../../PostSide/PostSide'
import './Home.css'

const Home = () => {
  return (
    <div className='Home'>
        <ProfileSide />
        <PostSide />
        <RightSide />
    </div>
  )
}

export default Home;