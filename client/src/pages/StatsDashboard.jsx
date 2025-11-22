// pages/StatsDashboard.js
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import API from "../api/axios";

const StatsDashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/stats/videos-per-district")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Failed to load stats", err));
  }, []);

  return (
    <div>
      <h2>Videos per District</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="districtName" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#007bff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsDashboard;
