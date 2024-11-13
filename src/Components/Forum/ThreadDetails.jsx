import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./ThreadDetails.css";
import DummyImg from "../../Assets/dummyuserimg.png";
const ThreadDetails = () => {
  const { threadId } = useParams(); // Extract threadId from the URL
  const [thread, setThread] = useState(null);
  const [users, setUsers] = useState([]);
  const [replyBody, setReplyBody] = useState('');
  const user = useSelector((state) => state.user); // Access user details from Redux store
const navigate = useNavigate();


useEffect(() => {
  // Fetch all users once when the component mounts
  fetch('https://fantasymmadness-game-server-three.vercel.app/users')
    .then(response => response.json())
    .then(data => setUsers(data))
    .catch(error => console.error('Error fetching users:', error));
}, []);

  useEffect(() => {
    // Increment view count when the thread details are fetched
    fetch(`https://fantasymmadness-game-server-three.vercel.app/threads/${threadId}/views`, {
      method: 'PUT'
    }).then(() => {
      return fetch(`https://fantasymmadness-game-server-three.vercel.app/threads/${threadId}`);
    })
    .then(res => res.json())
    .then(data => setThread(data))
    .catch(err => console.error(err));
  }, [threadId]);

  const likeReply = (replyId) => {
    fetch(`https://fantasymmadness-game-server-three.vercel.app/threads/${threadId}/replies/${replyId}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user._id })
    })
    .then(() => {
      // After the like is confirmed, update the state
      setThread(prev => ({
        ...prev,
        replies: prev.replies.map(reply => reply._id === replyId
          ? { ...reply, likes: [...reply.likes, user._id] }
          : reply
        )
      }));
    })
    .catch(err => console.error(err));
  };
  const handleReplySubmit = (e) => {
    e.preventDefault();
    fetch(`https://fantasymmadness-game-server-three.vercel.app/threads/${threadId}/replies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body: replyBody, author: { userId: user._id, username: user.firstName } })
    })
    .then(res => res.json())
    .then(() => {
      // After submitting the reply, re-fetch the thread to get the updated data
      fetch(`https://fantasymmadness-game-server-three.vercel.app/threads/${threadId}`)
        .then(res => res.json())
        .then(data => {
          setThread(data); // Update the thread state with the latest data
          setReplyBody(''); // Clear the reply input field
        });
    })
    .catch(err => console.error(err));
  }; 
  return (
    thread ? (
      <div className='threadDetailsContainer-updated'>
        <i
        className="fa fa-arrow-circle-left home-arrow-circle home-arrow-circle-forum"
        aria-hidden="true"
        onClick={() => navigate(-1)} // Go back to the previous page
        
      ></i>
     <h2>{thread.title}</h2>
      
      <div className='threadBodyWrap'>  
      <div className='userImagedetails'><img src={thread.profileUrl} alt='img' /></div>
      <div className='maindetailsOfthread'>
      <p className='threaddetailbody'>{thread.body}</p>
      <div className='tomakespacebet'>  <p className='threadDetailOneP'>Posted by {thread.author.username} on {new Date(thread.createdDate).toLocaleString()}</p>
        <p className='threadDetailTwoP'>{thread.views} views</p> </div>
        </div>
      </div>



      <h3>Replies</h3>
      {thread.replies && thread.replies.length > 0 ? (
        thread.replies.map(reply => {
          // Find the user whose userId matches reply.author.userId
          const user = users.find(u => u._id === reply.author.userId);
                 
          return (
            <div key={reply._id} className='replyItem'>
              <div className='reply-author-image'>
                {/* If user is found, use their profileUrl */}
                {user ? (
                  <img src={user.profileUrl} alt="author" />
                ) : (
                  <img src={DummyImg} alt="default" />
                )}
              </div>

              <div className='reply-author-contents'>
                <p className='repliesBody-updated'>{reply.body}</p>
                <div className='toMakeFlexDisplay-updated'>
                  <p>Reply by {reply.author.username}</p>
                  <p>Likes: {reply.likes?.length || 0}</p>
                  <button
                    onClick={() => likeReply(reply._id)}
                    style={{ paddingTop: '-30px', marginTop: '-7px', height: '30px' }}
                  >
                    Like
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No replies yet.</p>
      )}

        <h3>Add a Reply</h3>
        <form onSubmit={handleReplySubmit} className='threadDetailsForm' >
          <textarea
            value={replyBody}
            onChange={(e) => setReplyBody(e.target.value)}
            required
          />
          <button type="submit">Submit Reply</button>
        </form>
      </div>
    ) : <p>Loading...</p>
  );
};

export default ThreadDetails;
