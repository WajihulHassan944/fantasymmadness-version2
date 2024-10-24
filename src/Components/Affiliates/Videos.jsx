import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CLIENT_ID = '';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

const YouTubeChannelData = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [channelInput, setChannelInput] = useState('');
  const [channelData, setChannelData] = useState(null);
  const [videoItems, setVideoItems] = useState([]);
  const defaultChannel = 'techguyweb';

  useEffect(() => {
    const loadGapiScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Google API script failed to load.'));
        document.body.appendChild(script);
      });
    };

    loadGapiScript()
      .then(() => {
        window.gapi.load('client:auth2', initClient);
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to load Google API script');
      });
  }, []);

  const initClient = () => {
    window.gapi.client
      .init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES,
      })
      .then(() => {
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
      })
      .catch(err => {
        console.error('Error during Google API client initialization:', err);
        toast.error(`Failed to initialize Google API client: ${err.message || err}`);
      });
  };

  const updateSigninStatus = (status) => {
    setIsSignedIn(status);
    if (status) {
      getChannel(defaultChannel);
    }
  };

  const handleAuthClick = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  const handleSignoutClick = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  const getChannel = (channel) => {
    window.gapi.client.youtube.channels
      .list({
        part: 'snippet,contentDetails,statistics',
        forUsername: channel,
      })
      .then(response => {
        const channelInfo = response.result.items[0];
        if (channelInfo) {
          setChannelData(channelInfo);
          requestVideoPlaylist(channelInfo.contentDetails.relatedPlaylists.uploads);
        } else {
          toast.error('No Channel By That Name');
        }
      })
      .catch(err => {
        console.error('Error fetching channel data:', err);
        toast.error('Error fetching channel data');
      });
  };

  const requestVideoPlaylist = (playlistId) => {
    window.gapi.client.youtube.playlistItems
      .list({
        playlistId: playlistId,
        part: 'snippet',
        maxResults: 10,
      })
      .then(response => {
        const playListItems = response.result.items;
        setVideoItems(playListItems || []);
      })
      .catch(err => {
        console.error('Error fetching videos:', err);
        toast.error('Error fetching videos');
      });
  };

  const handleChannelChange = (e) => {
    e.preventDefault();
    getChannel(channelInput);
  };

  return (
    <div>
      <nav className="black">
        <div className="nav-wrapper">
          <div className="container">
            <a href="#!" className="brand-logo">YouTube Channel Data</a>
          </div>
        </div>
      </nav>
      <br />
      <section>
        <div className="container">
          <p>Log In With Google</p>
          {isSignedIn ? (
            <button className="btn red" onClick={handleSignoutClick}>Log Out</button>
          ) : (
            <button className="btn red" onClick={handleAuthClick} style={{marginTop:'100px'}}>Log In</button>
          )}
          <br />
          {isSignedIn && (
            <div id="content">
              <form id="channel-form" onSubmit={handleChannelChange}>
                <div className="input-field col s6">
                  <input 
                    type="text" 
                    placeholder="Enter Channel Name" 
                    id="channel-input" 
                    value={channelInput} 
                    onChange={(e) => setChannelInput(e.target.value)} 
                  />
                  <input type="submit" value="Get Channel Data" className="btn grey" />
                </div>
              </form>
              <div id="channel-data">
                {channelData && (
                  <ul className="collection">
                    <li className="collection-item">Title: {channelData.snippet.title}</li>
                    <li className="collection-item">ID: {channelData.id}</li>
                    <li className="collection-item">Subscribers: {numberWithCommas(channelData.statistics.subscriberCount)}</li>
                    <li className="collection-item">Views: {numberWithCommas(channelData.statistics.viewCount)}</li>
                    <li className="collection-item">Videos: {numberWithCommas(channelData.statistics.videoCount)}</li>
                  </ul>
                )}
                {channelData && (
                  <p>{channelData.snippet.description}</p>
                )}
                {channelData && (
                  <hr />
                )}
                {channelData && (
                  <a className="btn grey darken-2" target="_blank" rel="noopener noreferrer" href={`https://youtube.com/${channelData.snippet.customUrl}`}>
                    Visit Channel
                  </a>
                )}
              </div>
              <div className="row" id="video-container">
                {videoItems.length > 0 ? (
                  videoItems.map(item => (
                    <div className="col s3" key={item.id}>
                      <iframe
                        width="100%"
                        height="auto"
                        src={`https://www.youtube.com/embed/${item.snippet.resourceId.videoId}`}
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ))
                ) : (
                  <p>No Uploaded Videos</p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// Helper function to format numbers with commas
const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!))/g, ',');
};

export default YouTubeChannelData;
