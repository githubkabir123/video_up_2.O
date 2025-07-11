import React, { useState, useEffect } from "react";
import API from "../api/axios";
import styled from "styled-components";

// Styled components
const Form = styled.form`
  background-color: #f9fafb;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.03);
  margin-bottom: 2rem;
`;

const Heading = styled.h3`
  font-size: 1.25rem;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.6rem;
  margin-bottom: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.6rem;
  margin-bottom: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.7rem 1.2rem;
  background-color: #1f2937;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #374151;
  }
`;


const AddUserForm = ({ onUserAdded, user = null }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "journalist",
    divisionId: "",
    districtId: "",
    upazilaId: "",
  });

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  // Load divisions
  useEffect(() => {
    const fetchDivisions = async () => {
      const res = await API.get("/allroutes/divisions");
      setDivisions(res.data);
    };
    fetchDivisions();
  }, []);

  // Load districts based on division
  useEffect(() => {
    if (form.divisionId) {
      const fetchDistricts = async () => {
        const res = await API.get(`/allroutes/districts/by-division/${form.divisionId}`);
        setDistricts(res.data);
        if (!res.data.find(d => d._id === form.districtId)) {
          setForm((f) => ({ ...f, districtId: "", upazilaId: "" }));
        }
      };
      fetchDistricts();
    } else {
      setDistricts([]);
      setForm((f) => ({ ...f, districtId: "", upazilaId: "" }));
    }
  }, [form.divisionId]);

  // Load upazilas based on district
  useEffect(() => {
    if (form.districtId) {
      const fetchUpazilas = async () => {
        const res = await API.get(`/allroutes/upazilas/by-district/${form.districtId}`);
        setUpazilas(res.data);
        if (!res.data.find(u => u._id === form.upazilaId)) {
          setForm((f) => ({ ...f, upazilaId: "" }));
        }
      };
      fetchUpazilas();
    } else {
      setUpazilas([]);
      setForm((f) => ({ ...f, upazilaId: "" }));
    }
  }, [form.districtId]);

  // If editing a user, load their info
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        password: "",
        role: user.role || "journalist",
        divisionId: user.divisionId?._id || "",
        districtId: user.districtId?._id || "",
        upazilaId: user.upazilaId?._id || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Clone form and clean up empty fields
  const payload = { ...form };
  if (!payload.upazilaId) {
    delete payload.upazilaId;
  }

  try {
    if (user) {
      // Update existing user
      await API.put(`/users/${user._id}`, payload);
      alert("User updated");
    } else {
      // Create new user
      await API.post("/auth/register", payload);
      alert("User created");
    }

    setForm({
      name: "",
      email: "",
      password: "",
      role: "journalist",
      divisionId: "",
      districtId: "",
      upazilaId: "",
    });
    onUserAdded();
  } catch (err) {
    alert("Failed to submit form");
  }
};


  return (
    <Form onSubmit={handleSubmit}>
      <Heading>{user ? "Edit User" : "Create New User"}</Heading>
      <Input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <Input
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <Input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required={!user} // password not required when editing
      />

      <Select
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
        required
      >
        <option value="journalist">Journalist</option>
        <option value="editor">Editor</option>
        <option value="admin">Admin</option>
      </Select>

      <Select
        value={form.divisionId}
        onChange={(e) => setForm({ ...form, divisionId: e.target.value })}
        required
      >
        <option value="">Select Division</option>
        {divisions.map((d) => (
          <option key={d._id} value={d._id}>
            {d.name}
          </option>
        ))}
      </Select>

      <Select
        value={form.districtId}
        onChange={(e) => setForm({ ...form, districtId: e.target.value })}
        required
      >
        <option value="">Select District</option>
        {districts.map((d) => (
          <option key={d._id} value={d._id}>
            {d.name}
          </option>
        ))}
      </Select>

      <Select
        value={form.upazilaId}
        onChange={(e) => setForm({ ...form, upazilaId: e.target.value })}
        
      >
        <option value="">Select Upazila</option>
        {upazilas.map((u) => (
          <option key={u._id} value={u._id}>
            {u.name}
          </option>
        ))}
      </Select>

      <Button type="submit">{user ? "Update" : "➕ Add User"}</Button>
    </Form>
  );
};

export default AddUserForm;
