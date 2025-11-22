import React, { useEffect, useState } from "react";
import API from "../api/axios";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  background: #f9fafb;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.05);
`;

const Heading = styled.h2`
  text-align: center;
  color: #1f2937;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 0.6rem 0.8rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 3px #2563eb;
  }
`;

const Button = styled.button`
  padding: 0 1.2rem;
  background-color: #1f2937;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover {
    background-color: #374151;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background-color: #6b7280;

  &:hover {
    background-color: #4b5563;
  }
`;

const ErrorText = styled.p`
  color: #dc2626;
  margin-bottom: 1rem;
  font-weight: 600;
  text-align: center;
`;

const DistrictList = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const DistrictItem = styled.li`
  background-color: white;
  border-radius: 8px;
  padding: 0.8rem 1rem;
  margin-bottom: 0.7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.1);
`;

const DistrictName = styled.span`
  font-weight: 600;
  color: #111827;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.1rem;

    &:hover {
      opacity: 0.7;
    }
  }
`;

const DistrictManager = () => {
  const [districts, setDistricts] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

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

  // Add or update district
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/districts/${editId}`, { name });
      } else {
        await API.post("/districts", { name });
      }
      setName("");
      setEditId(null);
      setError("");
      fetchDistricts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save district");
    }
  };

  // Delete district
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this district?")) return;
    try {
      await API.delete(`/districts/${id}`);
      fetchDistricts();
    } catch (err) {
      alert("Delete failed");
    }
  };

  // Load district to form for editing
  const handleEdit = (district) => {
    setName(district.name);
    setEditId(district._id);
    setError("");
  };

  return (
    <Container>
      <Heading>🗺️ Manage Districts</Heading>

      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={name}
          placeholder="Enter district name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Button type="submit">{editId ? "Update" : "Add"}</Button>
        {editId && (
          <CancelButton type="button" onClick={() => { setEditId(null); setName(""); }}>
            Cancel
          </CancelButton>
        )}
      </Form>

      {error && <ErrorText>{error}</ErrorText>}

      <DistrictList>
        {districts.map((d) => (
          <DistrictItem key={d._id}>
            <DistrictName>{d.name}</DistrictName>
            <ActionButtons>
              <button title="Edit" onClick={() => handleEdit(d)}>✏️</button>
              <button title="Delete" onClick={() => handleDelete(d._id)}>🗑️</button>
            </ActionButtons>
          </DistrictItem>
        ))}
      </DistrictList>
    </Container>
  );
};

export default DistrictManager;
