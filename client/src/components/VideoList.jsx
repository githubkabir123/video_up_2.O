import React, { useState, useEffect } from "react";
import API from "../api/axios";
import styled from "styled-components";

const baseUrl = import.meta.env.VITE_BASEURL;

// Styled Components
const Container = styled.div`
  padding: 2rem;
  background-color: #f9fafb;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
  max-width: 800px;
  margin: 2rem auto;
`;

const Heading = styled.h3`
  font-size: 1.5rem;
  color: #1f2937;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.6rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
`;

const VideoWrapper = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
`;

const VideoCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  background-color: #ffffff;
`;

const VideoTitle = styled.h5`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Message = styled.p`
  color: #6b7280;
  text-align: center;
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

const VideoFilter = () => {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [videos, setVideos] = useState([]);

  const [divisionId, setDivisionId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [upazilaId, setUpazilaId] = useState("");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

const fetchMyVideos = async (districtId, upazilaId) => {
  try {
    const res = await API.get(`/videos/filter`, {
      params: {
        districtId,
        upazilaId
      }
    });
    setVideos(res.data);
  } catch (err) {
    console.error("Failed to load filtered videos", err);
  }
};

    const handleDelete = async (videoId) => {
      if (!window.confirm("Are you sure you want to delete this video?")) return;
      try {
        await API.delete(`/videos/${videoId}` ,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res)=>{
      alert(res.data.message);
    });
        fetchMyVideos(districtId,upazilaId);
        if(divisionId){ setDivisionId(divisionId)}
      } catch (err) {
        alert("Delete failed");
        console.error(err);
      }
    };
 
    const handleDownload = (id) => {
      window.open(`${import.meta.env.VITE_BASEURL}/api/videos/download/${id}`, "_blank");
    };

  // Load divisions
  useEffect(() => {
    API.get("/allroutes/divisions").then((res) => setDivisions(res.data));
  }, []);


  // Load districts when division is selected
  useEffect(() => {
    if (divisionId) {
      API.get(`/allroutes/districts/by-division/${divisionId}`).then((res) => {
        setDistricts(res.data);
        setDistrictId("");
        setUpazilaId("");
        // setDistricts([])
        setUpazilas([]);
        
      });
    }
  }, [divisionId]);

  // Load upazilas when district is selected
  useEffect(() => {
    if (districtId) {
      API.get(`/allroutes/upazilas/by-district/${districtId}`).then((res) => {
        // API.get(`/videos/district/${districtId}`)
      // .then((res) => setVideos(res.data))
      setVideos([]);
      fetchMyVideos(districtId,upazilaId);
        setUpazilas(res.data);
        setUpazilaId("");
      }).catch((err)=>{
        setVideos([]);
        setUpazilas([]);
        setUpazilaId("");
      });
    }
  }, [districtId]);

  // Load videos based on selection
  useEffect(() => {
    if(!upazilaId)  { setVideos([]);   return};
    // API.get(`/videos/upazila/${upazilaId}`)
    //   .then((res) => setVideos(res.data))
    // setVideos([]);
    fetchMyVideos(districtId,upazilaId);
   
  }, [upazilaId]);

  return (
    <Container>
      <Heading>Filter Videos</Heading>

      <Select onChange={(e) => setDivisionId(e.target.value)} value={divisionId}>
        <option value="">Select Division</option>
        {divisions.map((d) => (
          <option key={d._id} value={d._id}>{d.name}</option>
        ))}
      </Select>

      <Select onChange={(e) => setDistrictId(e.target.value)} value={districtId}>
        <option value="">Select District</option>
        {districts.map((d) => (
          <option key={d._id} value={d._id}>{d.name}</option>
        ))}
      </Select>

      <Select onChange={(e) => setUpazilaId(e.target.value)} value={upazilaId}>
        <option value="">Select Upazila</option>
        {upazilas.map((u) => (
          <option key={u._id} value={u._id}>{u.name}</option>
        ))}
      </Select>

      <VideoWrapper>
        {videos.length === 0 ? (
          <Message>No videos found.</Message>
        ) : (
          videos.map((video) => (
            <>
            <VideoCard key={video._id}>
              <VideoTitle>{video.title}</VideoTitle>
              <video controls width="100%" src={baseUrl + video.fileUrl} />
            </VideoCard>
             <Timestamp>Uploaded: {new Date(video.createdAt).toLocaleString()}</Timestamp>
              <ButtonGroup>
                <DownloadButton onClick={() => handleDownload(video._id)}>⬇ Download</DownloadButton>
                <DeleteButton onClick={() => handleDelete(video._id)}>❌ Delete</DeleteButton>
              </ButtonGroup>
            </>
          ))
        )}
      </VideoWrapper>
    </Container>
  );
};

export default VideoFilter;
