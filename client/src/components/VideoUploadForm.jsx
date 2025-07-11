import React, { useState } from "react";
import API from "../api/axios";
import styled from "styled-components";


// Styled Components
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
  transition: border 0.2s ease, box-shadow 0.2s ease;

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

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 1.25rem;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 1rem;
  transition: border 0.2s ease, box-shadow 0.2s ease;

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
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: #1e40af;
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
    transform: none;
  }
`;

const Loader = styled.p`
  color: #1e40af;
  font-size: 1rem;
  text-align: center;
  margin-top: 1.5rem;
`;
const VideoUploadForm = () => {
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const token = localStorage.getItem("token");

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!video || !title) {
      return alert("Please enter a title and select a video.");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("video", video);

    setIsUploading(true);

    try {
      await API.post("/videos/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      alert("✅ Video uploaded successfully.");
      setTitle("");
      setVideo(null);
      document.getElementById("videoInput").value = "";
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      alert("❌ Failed to upload video.");
    } finally {
      setIsUploading(false);
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
          required
          disabled={isUploading}
        />

        <Input
          type="file"
          accept="video/*"
          id="videoInput"
          onChange={(e) => setVideo(e.target.files[0])}
          required
          disabled={isUploading}
        />

        <Button type="submit" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Upload"}
        </Button>
      </form>

      {isUploading && <Loader>Uploading your video, please wait...</Loader>}
    </FormWrapper>
  );
};

export default VideoUploadForm;
