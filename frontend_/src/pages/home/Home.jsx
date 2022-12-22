import React from 'react'
import ProfileSide from '../../components/ProfileSide/ProfileSide'
import PostSide from '../../PostSide/PostSide'
import './Home.css'

const Home = () => {
  return (
    <div className='Home'>
        <ProfileSide />
        <PostSide />
        <div className="rightSide">Rightside</div>
    </div>
  )
}

export default Home;