// pages/JournalistVideos.js
import React from 'react';
import { useParams } from 'react-router-dom';
import VideoList from '../components/VideoList';

const JournalistVideos = () => {
  const { userId } = useParams();

  return (
    <div>
      <h2>Journalist's Uploaded Videos</h2>
      <VideoList userId={userId} />
    </div>
  );
};

export default JournalistVideos;
