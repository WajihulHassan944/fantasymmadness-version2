import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import "../../Components/Forum/ThreadDetails.css";

const ThreadDetails = () => {
  const router = useRouter();
  const { threadId } = router.query; // Extract threadId from URL
  const [thread, setThread] = useState(null);
  const [users, setUsers] = useState([]);
  const [replyBody, setReplyBody] = useState('');
  const user = useSelector((state) => state.user); // Access user details from Redux store

  // Fetch all users when the component mounts
  useEffect(() => {
    fetch('https://fantasymmadness-game-server-three.vercel.app/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  // Fetch thread details & increment view count
  useEffect(() => {
    if (!threadId) return; // Ensure threadId is available before fetching

    fetch(`https://fantasymmadness-game-server-three.vercel.app/threads/${threadId}/views`, {
      method: 'PUT'
    }).then(() => {
      return fetch(`https://fantasymmadness-game-server-three.vercel.app/threads/${threadId}`);
    })
    .then(res => res.json())
    .then(data => setThread(data))
    .catch(err => console.error(err));
  }, [threadId]);

  // Like a reply
  const likeReply = (replyId) => {
    fetch(`https://fantasymmadness-game-server-three.vercel.app/threads/${threadId}/replies/${replyId}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user?._id }) // Ensure user exists
    })
    .then(() => {
      // Update the state after liking a reply
      setThread(prev => ({
        ...prev,
        replies: prev.replies.map(reply => 
          reply._id === replyId
            ? { ...reply, likes: [...reply.likes, user._id] }
            : reply
        )
      }));
    })
    .catch(err => console.error(err));
  };

  // Submit a reply
  const handleReplySubmit = (e) => {
    e.preventDefault();
    fetch(`https://fantasymmadness-game-server-three.vercel.app/threads/${threadId}/replies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body: replyBody, author: { userId: user?._id, username: user?.firstName } })
    })
    .then(res => res.json())
    .then(() => {
      // Re-fetch thread details after posting a reply
      fetch(`https://fantasymmadness-game-server-three.vercel.app/threads/${threadId}`)
        .then(res => res.json())
        .then(data => {
          setThread(data);
          setReplyBody(''); // Clear reply input
        });
    })
    .catch(err => console.error(err));
  };

  return (
    thread ? (
      <div className='threadDetailsContainer-updated'>
        {/* Back Button */}
        <i
          className="fa fa-arrow-circle-left home-arrow-circle home-arrow-circle-forum"
          aria-hidden="true"
          onClick={() => router.back()} // Go back to the previous page
        ></i>

        {/* Thread Details */}
        <h2>{thread.title}</h2>
        <div className='threadBodyWrap'>  
          <div className='userImagedetails'>
            <img src={thread.profileUrl} alt='img'  />
          </div>
          <div className='maindetailsOfthread'>
            <p className='threaddetailbody'>{thread.body}</p>
            <div className='tomakespacebet'>  
              <p className='threadDetailOneP'>Posted by {thread.author.username} on {new Date(thread.createdDate).toLocaleString()}</p>
              <p className='threadDetailTwoP'>{thread.views} views</p> 
            </div>
          </div>
        </div>

        {/* Replies Section */}
        <h3>Replies</h3>
        {thread.replies && thread.replies.length > 0 ? (
          thread.replies.map(reply => {
            // Find the user whose userId matches reply.author.userId
            const replyUser = users.find(u => u._id === reply.author.userId);
            return (
              <div key={reply._id} className='replyItem'>
                <div className='reply-author-image'>
                  <img src={replyUser ? replyUser.profileUrl : `https://res.cloudinary.com/dqi6vk2vn/image/upload/v1743084252/home/p26klt7ljw6q29zg0pf3.png`} alt="author"  />
                </div>

                <div className='reply-author-contents'>
                  <p className='repliesBody-updated'>{reply.body}</p>
                  <div className='toMakeFlexDisplay-updated'>
                    <p>Reply by {reply.author.username}</p>
                    <p>Likes: {reply.likes?.length || 0}</p>
                    <button
                      onClick={() => likeReply(reply._id)}
                      style={{ marginTop: '-7px', height: '30px' }}
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

        {/* Reply Form */}
        <h3>Add a Reply</h3>
        <form onSubmit={handleReplySubmit} className='threadDetailsForm'>
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
