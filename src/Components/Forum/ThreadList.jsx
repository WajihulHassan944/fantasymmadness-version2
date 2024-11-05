import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useLocation to check the route
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
    return (
      <>
        <i
          className="fa fa-arrow-circle-left home-arrow-circle"
          aria-hidden="true"
          onClick={() => setRedirectToLogin(false)} // Go back to previous component
         ></i>
        <Login redirectTo={prevAction} />
      </>
    );
  }
  
  if (createThreadVar) {
    return (
      <>
        <i
          className="fa fa-arrow-circle-left "
          aria-hidden="true"
          onClick={() => setCreateThreadVar(false)} // Go back to previous component
          style={{ position: 'absolute', top: '127px', left: '70px', cursor: 'pointer', fontSize: '24px', color: '#007bff', zIndex: '99999' }}
        ></i>
        <CreateThread />
      </>
    );
  }
  
  
  return (
    <div className="thread-list-container-updated">
     <i
        className="fa fa-arrow-circle-left home-arrow-circle home-arrow-circle-forum"
        aria-hidden="true"
        onClick={() => navigate(-1)} // Go back to the previous page
        
      ></i>
      <div className='toFlexHeading'>
     <h1 className="forum-heading-updated">Discussion Forum</h1>
      <button className="create-thread-btn-updated" onClick={createThread}>Have a question?</button>
      </div>
        {threads.length === 0 ? (
        <p className="no-posts-message-updated">No posts yet.</p>
      ) : (
        threads.map(thread => (
          <div key={thread._id} className="thread-item-updated" onClick={() => handleThreadClick(thread._id)}>
           <div className='userImage'><img src={thread.profileUrl} alt='img' /></div>

           <div className='threadMainContent'>
            <p className="thread-meta-updated">Posted by {thread.author.username} on {new Date(thread.createdDate).toLocaleString()}</p>
            <h2 className="thread-title-updated">{thread.title}</h2>
           
            <p className="thread-body-updated">{thread.body}</p>
         <div className='toFlex-updated'>
            <p className="thread-views-updated">{thread.views} views</p>
            {thread.replies.length > 0 && <p className="thread-replies-updated">{thread.replies.length} replies</p>}
            <p className="thread-likes-updated">Liked by: {thread.replies.map(reply => reply.likes.length).reduce((a, b) => a + b, 0)} users</p>
           <button className='respondbtn'>Reply</button>
            </div>
</div>

          </div>
        ))
      )}
    </div>
  );
};


export default ThreadList;
