// pages/DistrictManager.js
import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  max-width: 700px;
  margin: 3rem auto;
  padding: 2rem;
  background: #f9fafb;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
  font-family: 'Segoe UI', sans-serif;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: #1f2937;
  text-align: center;
  margin-bottom: 2rem;
`;

const DistrictListWrapper = styled.ul`
  list-style: none;
  padding: 0;
`;

const DistrictItem = styled.li`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  padding: 1rem 1.25rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #fef3c7;
  }

  a {
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    color: #1f2937;

    &:hover {
      color: #d97706;
    }
  }
`;

const DistrictList = () => {
  const [districts, setDistricts] = useState([]);

  // Fetch all districts
  const fetchDistricts = async () => {
    try {
      const res = await API.get("/districts");
      setDistricts(res.data);
    } catch (err) {
      console.error("Failed to fetch districts", err);
    }
  };

  useEffect(() => {
    fetchDistricts();
  }, []);

  return (
    <Container>
      <Title>🗺️ Districts List</Title>
      <DistrictListWrapper>
        {districts.map((d) => (
          <DistrictItem key={d._id}>
            <Link to={`/district/${d._id}`}>{d.name}</Link>
          </DistrictItem>
        ))}
      </DistrictListWrapper>
    </Container>
  );
};

export default DistrictList;
