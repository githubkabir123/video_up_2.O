import React, { useEffect, useState } from "react";
import API from "../api/axios";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  font-family: 'Segoe UI', sans-serif;
`;

const Heading = styled.h2`
  text-align: center;
  color: #111827;
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
`;

const Message = styled.p`
  text-align: center;
  font-size: 1rem;
  color: #6b7280;
`;

const VideoList = styled.ul`
  list-style: none;
  padding: 0;
`;

const VideoItem = styled.li`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
`;

const VideoTitle = styled.strong`
  font-size: 1.1rem;
  color: #1f2937;
`;

const VideoPlayer = styled.video`
  width: 100%;
  max-width: 100%;
  height: auto;
  margin: 0.75rem 0;
  border-radius: 8px;
`;

const Timestamp = styled.p`
  font-size: 0.9rem;
  color: #6b7280;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const DownloadButton = styled(Button)`
  background-color: #3b82f6;
  color: #fff;
`;

const DeleteButton = styled(Button)`
  background-color: #ef4444;
  color: #fff;
`;

const MyVideos = () => {
  const [videos, setVideos] = useState([]);
  const userId = localStorage.getItem("userId");

  const fetchMyVideos = async () => {
    try {
      const res = await API.get(`/videos/journalist/${userId}`);
      setVideos(res.data);
    } catch (err) {
      console.error("Failed to load videos", err);
    }
  };

  const handleDelete = async (videoId) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    try {
      await API.delete(`/videos/${videoId}`);
      fetchMyVideos();
    } catch (err) {
      alert("Delete failed");
      console.error(err);
    }
  };

  const handleDownload = (id) => {
    window.open(`${import.meta.env.VITE_BASEURL}/api/videos/download/${id}`, "_blank");
  };

  useEffect(() => {
    fetchMyVideos();
  }, []);

  return (
    <Container>
      <Heading>My Uploaded Videos</Heading>
      {videos.length === 0 ? (
        <Message>No videos uploaded yet.</Message>
      ) : (
        <VideoList>
          {videos.map((video) => (
            <VideoItem key={video._id}>
              <VideoTitle>{video.title}</VideoTitle>
              <VideoPlayer controls>
                <source src={`${import.meta.env.VITE_BASEURL + video.fileUrl}`} type="video/mp4" />
                Your browser does not support the video tag.
              </VideoPlayer>
              <Timestamp>Uploaded: {new Date(video.createdAt).toLocaleString()}</Timestamp>
              <ButtonGroup>
                <DownloadButton onClick={() => handleDownload(video._id)}>⬇ Download</DownloadButton>
                <DeleteButton onClick={() => handleDelete(video._id)}>❌ Delete</DeleteButton>
              </ButtonGroup>
            </VideoItem>
          ))}
        </VideoList>
      )}
    </Container>
  );
};

export default MyVideos;
