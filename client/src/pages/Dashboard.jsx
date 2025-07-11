import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FiLogOut, FiUpload, FiVideo, FiMapPin } from "react-icons/fi";

// Styled Components
const Container = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.07);
  text-align: center;

  @media (max-width: 500px) {
    padding: 1.2rem;
  }
`;

const Heading = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #1f2937;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  background-color: #1f2937;
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #374151;
  }

  svg {
    font-size: 1.2rem;
  }
`;

const Dashboard = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Container>
      <Heading>Welcome, {role}</Heading>

      <ButtonGroup>
        <Button onClick={logout}>
          <FiLogOut /> Logout
        </Button>

        {role === "editor" && (
          <Button onClick={() => navigate("/videolist/")}>
            <FiMapPin /> Video List
          </Button>
        )}

        {role === "journalist" && (
          <>
            <Button onClick={() => navigate("/upload")}>
              <FiUpload /> Upload Video
            </Button>
            <Button onClick={() => navigate("/my-videos")}>
              <FiVideo /> My Videos
            </Button>
          </>
        )}
      </ButtonGroup>
    </Container>
  );
};

export default Dashboard;
