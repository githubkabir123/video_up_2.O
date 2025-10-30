import React, { useState } from "react";
import API from "../api/axios";
import styled from "styled-components";

// ================= Styled Components =================
const FormWrapper = styled.div`
  max-width: 600px;
  margin: 3rem auto;
  padding: 2.5rem;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', sans-serif;

  @media (max-width: 640px) {
    margin: 1.5rem;
    padding: 1.5rem;
  }
`;

const Title = styled.h2`
  text-align: center;
  color: #1f2937;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 1.25rem;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 1rem;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
    outline: none;
  }

  &:disabled {
    background: #f3f4f6;
    cursor: not-allowed;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.85rem;
  background-color: #2563eb;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #1e40af;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const UploadContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 2rem auto 0;
  text-align: center;
`;

const ProgressBar = styled.div`
  background: #eee;
  border-radius: 8px;
  margin-top: 15px;
  height: 20px;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled.div`
  background: #4caf50;
  height: 100%;
  width: ${(props) => props.width || 0}%;
  transition: width 0.2s ease-in-out;
`;

const ProgressText = styled.p`
  margin-top: 10px;
  color: #1f2937;
  font-weight: 500;
`;

const Loader = styled.p`
  color: #1e40af;
  font-size: 1rem;
  text-align: center;
  margin-top: 1rem;
`;

// ================= Upload Form Component =================
const VideoUploadForm = () => {
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const token = localStorage.getItem("token");

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!video || !title) return alert("Please enter a title and select a video.");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("video", video);

    setIsUploading(true);
    setProgress(0);

    try {
      await API.post("/videos/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (event) => {
          const percent = Math.round((event.loaded * 100) / event.total);
          setProgress(percent);
        },
      });

      alert("✅ Video uploaded successfully.");
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      alert("❌ Failed to upload video.");
    } finally {
      setIsUploading(false);
      setProgress(0);
      setTitle("");
      setVideo(null);
      document.getElementById("videoInput").value = "";
    }
  };

  return (
    <FormWrapper>
      <Title>Upload Video</Title>
      <form onSubmit={handleUpload}>
        <Input
          type="text"
          placeholder="Video title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isUploading}
          required
        />

        <Input
          type="file"
          accept="video/*"
          id="videoInput"
          onChange={(e) => setVideo(e.target.files[0])}
          disabled={isUploading}
          required
        />

        <Button type="submit" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload"}
        </Button>
      </form>

      {isUploading && (
        <UploadContainer>
          <ProgressBar>
            <ProgressFill width={progress} />
          </ProgressBar>
          <ProgressText>{progress.toFixed(0)}%</ProgressText>
          <Loader>Uploading your video, please wait...</Loader>
        </UploadContainer>
      )}
    </FormWrapper>
  );
};

export default VideoUploadForm;
