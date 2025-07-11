// pages/ExportVideos.js
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import API from "../api/axios";

const ExportVideos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await API.get("/videos");
        setVideos(res.data);
      } catch (err) {
        console.error("Failed to fetch videos", err);
      }
    };
    fetchVideos();
  }, []);

  const headers = [
    { label: "Original Name", key: "originalName" },
    { label: "Uploader", key: "user.name" },
    { label: "Uploader Email", key: "user.email" },
    { label: "Uploaded At", key: "createdAt" },
  ];

  const preparedData = videos.map((v) => ({
    ...v,
    user: v.user || { name: "Unknown", email: "N/A" },
  }));

  return (
    <div>
      <h2>Export All Videos</h2>
      <CSVLink
        data={preparedData}
        headers={headers}
        filename={"videos.csv"}
        className="btn btn-primary"
      >
        Download CSV
      </CSVLink>
    </div>
  );
};

export default ExportVideos;
