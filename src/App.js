import { Main } from './views/Main'
import React, { useEffect, useState, useCallback } from 'react'
import './custom.css'
import firebase from './firebase'
import { useAuth } from './context/AuthProvider'

export const App = () => {
  const [posts, setPosts] = useState([]);
  const db = firebase.firestore();
  const { signIn } = useAuth();

  const getPosts = useCallback(() => {
    let newPosts = []

    db.collection('posts').get().then(ourPosts => {
      ourPosts.forEach(post => {
        newPosts.push({...post.data(), postId: post.id})
      })
      setPosts(newPosts)
    })
  }, [db])

  useEffect(() => {
    getPosts();
  }, [getPosts])

  return (
    <div>
      <Main signIn={signIn} posts={posts} />
    </div>
  )
}

