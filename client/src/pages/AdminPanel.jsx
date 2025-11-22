import React, { useEffect, useState } from "react";
import API from "../api/axios";
import AddUserForm from "../components/AddUserForm";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
`;

const Heading = styled.h2`
  text-align: center;
  color: #1f2937;
  margin-bottom: 2rem;
`;

const FilterSelect = styled.select`
  padding: 0.6rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  margin-bottom: 1.5rem;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const Th = styled.th`
  background-color: #1f2937;
  color: white;
  padding: 0.75rem;
  text-align: left;
  font-weight: 500;
`;

const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
`;

const RoleSelect = styled.select`
  padding: 0.4rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
`;

const DeleteButton = styled.button`
  padding: 0.4rem 0.7rem;
  background-color: #dc2626;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #b91c1c;
  }
`;

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const [filterDivision, setFilterDivision] = useState("");
  const [filterDistrict, setFilterDistrict] = useState("");
  const [filterUpazila, setFilterUpazila] = useState("");

  useEffect(() => {
    fetchData();
  }, [filterDivision, filterDistrict, filterUpazila]);

  const fetchData = async () => {
    try {
      const [userRes, divRes, distRes, upzRes] = await Promise.all([
        API.get("/users"),
        API.get("/allroutes/divisions"),
        API.get("/allroutes/districts"),
        API.get("/allroutes/upazilas")
      ]);

      let allUsers = userRes.data;

      if (filterDivision) {
        allUsers = allUsers.filter(u => u.divisionId?._id === filterDivision);
      }
      if (filterDistrict) {
        allUsers = allUsers.filter(u => u.districtId?._id === filterDistrict);
      }
      if (filterUpazila) {
        allUsers = allUsers.filter(u => u.upazilaId?._id === filterUpazila);
      }

      setUsers(allUsers);
      setDivisions(divRes.data);
      setDistricts(distRes.data);
      setUpazilas(upzRes.data);
      console.log(divisions);
    } catch (err) {
      console.error("Admin panel load error:", err);
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      await API.put(`/users/${id}`, { role });
      fetchData();
    } catch (err) {
      alert("Failed to update role");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await API.delete(`/users/${id}`);
      fetchData();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <Container>
      <Heading>🛠️ Admin Panel</Heading>
      <AddUserForm onUserAdded={fetchData} />

      {/* Filter Dropdowns */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
        <FilterSelect value={filterDivision} onChange={(e) => setFilterDivision(e.target.value)}>
          <option value="">All Divisions</option>
          {divisions.map((div) => (
            <option key={div._id} value={div._id}>
              {div.name}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect value={filterDistrict} onChange={(e) => setFilterDistrict(e.target.value)}>
          <option value="">All Districts</option>
          {districts.map((dist) => (
            <option key={dist._id} value={dist._id}>
              {dist.name}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect value={filterUpazila} onChange={(e) => setFilterUpazila(e.target.value)}>
          <option value="">All Upazilas</option>
          {upazilas.map((upa) => (
            <option key={upa._id} value={upa._id}>
              {upa.name}
            </option>
          ))}
        </FilterSelect>
      </div>

      {/* Users Table */}
      <StyledTable>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Division</Th>
            <Th>District</Th>
            <Th>Upazila</Th>
            <Th>Role</Th>
            <Th>Change Role</Th>
            <Th>Delete</Th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <Td>
                <Link to={`/journalist/${u._id}/videos`}>{u.name}</Link>
              </Td>
              <Td>{u.email}</Td>
              <Td>{u.divisionId?.name || "—"}</Td>
              <Td>{u.districtId?.name || "—"}</Td>
              <Td>{u.upazilaId?.name || "—"}</Td>
              <Td>{u.role}</Td>
              <Td>
                <RoleSelect
                  value={u.role}
                  onChange={(e) => handleRoleChange(u._id, e.target.value)}
                >
                  <option value="journalist">Journalist</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </RoleSelect>
              </Td>
              <Td>
                <DeleteButton onClick={() => handleDelete(u._id)}>❌</DeleteButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </Container>
  );
};

export default AdminPanel;
