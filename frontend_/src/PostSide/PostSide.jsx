import React from 'react';
import Post from '../components/Posts/Posts';
import PostShare from '../components/PostShare/PostShare';
import './PostSide.css';

const PostSide = () => {
  return (
    <div className="PostSide">
        <PostShare />
        <Post />
    </div>
  )
}

export default PostSide