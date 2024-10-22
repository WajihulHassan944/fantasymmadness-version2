import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./ThreadDetails.css";
const ThreadDetails = () => {
  const { threadId } = useParams(); // Extract threadId from the URL
  const [thread, setThread] = useState(null);
  const [replyBody, setReplyBody] = useState('');
  const user = useSelector((state) => state.user); // Access user details from Redux store
const navigate = useNavigate();
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
      <div className='threadDetailsContainer'>
        <i
        className="fa fa-arrow-circle-left"
        aria-hidden="true"
        onClick={() => navigate(-1)} // Go back to the previous page
        style={{ position: 'absolute', top: '127px', left: '70px', cursor: 'pointer', fontSize: '24px', color: '#007bff', zIndex: '99999' }}
      ></i>
        <h2>{thread.title}</h2>
      <div>  <p>{thread.body}</p>
      <div style={{padding:'0', display:'flex', justifyContent:'space-between', background:'transparent'}}>  <p>Posted by {thread.author.username} on {new Date(thread.createdDate).toLocaleString()}</p>
        <p style={{color:'rgb(255, 193, 7)'}}>{thread.views} views</p> </div></div>
        <h3>Replies</h3>
        {thread.replies && thread.replies.length > 0 ? (
          thread.replies.map(reply => (
            <div key={reply._id}>
              <p className='repliesBody'>{reply.body}</p>
           <div className='toMakeFlexDisplay'>   <p>Reply by {reply.author.username}</p>
              <p style={{color:'rgb(255, 193, 7)'}}>Likes: {reply.likes?.length || 0}</p>
              <button onClick={() => likeReply(reply._id)} style={{paddingTop:'-30px', marginTop:'-7px', height:'30px'}}>Like</button>
          </div>   
            </div>
          ))
        ) : (
          <p>No replies yet.</p>
        )}

        <h3>Add a Reply</h3>
        <form onSubmit={handleReplySubmit} >
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
