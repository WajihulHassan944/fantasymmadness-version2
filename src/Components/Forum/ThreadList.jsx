import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import CreateThread from './CreateThread';
import Login from '../Login/Login';
import "./threads.css";
const ThreadList = () => {
  const [threads, setThreads] = useState([]);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Check the correct authentication state
  const [createThreadVar, setCreateThreadVar] = useState(null);
  const [redirectToLogin, setRedirectToLogin] = useState(false); // Track if login is needed
  const [prevAction, setPrevAction] = useState(null); // Track previous action (view thread or create post)
  const navigate = useNavigate(); // Use useNavigate to handle navigation

  useEffect(() => {
    fetch('https://fantasymmadness-game-server-three.vercel.app/threads')
      .then(res => res.json())
      .then(data => setThreads(data))
      .catch(err => console.error(err));
  }, []);

  const handleThreadClick = (threadId) => {
    if (!isAuthenticated) {  // Check if the user is authenticated
      setPrevAction({ type: 'view-thread', threadId });
      setRedirectToLogin(true);
    } else {
      navigate(`/threads/${threadId}`);
    }
  };

  const createThread = () => {
    if (!isAuthenticated) {  // Check if the user is authenticated
      setPrevAction({ type: 'create-thread' });
      setRedirectToLogin(true);
    } else {
      setCreateThreadVar(true);
    }
  };

  if (redirectToLogin) {
    return <Login redirectTo={prevAction} />;
  }

  if (createThreadVar) {
    return <CreateThread />;
  }

  
  return (
    <div className="thread-list-container">
      <h1 className="forum-heading">Discussion Forum</h1>
      <button className="create-thread-btn" onClick={createThread}>Have a question?</button>
      {threads.length === 0 ? (
        <p className="no-posts-message">No posts yet.</p>
      ) : (
        threads.map(thread => (
          <div key={thread._id} className="thread-item" onClick={() => handleThreadClick(thread._id)}>
            <h2 className="thread-title">{thread.title}</h2>
            <p className="thread-meta">Posted by {thread.author.username} on {new Date(thread.createdDate).toLocaleString()}</p>
            <p className="thread-body">{thread.body}</p>
         <div className='toFlex'>
            <p className="thread-views">{thread.views} views</p>
            {thread.replies.length > 0 && <p className="thread-replies">{thread.replies.length} replies</p>}
            <p className="thread-likes">Liked by: {thread.replies.map(reply => reply.likes.length).reduce((a, b) => a + b, 0)} users</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};


export default ThreadList;
