import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';

// Styled Components
const OverFlowRapper = styled.div`
  width: 100%;
  overFlow:scroll;
`;

const baseUrl = import.meta.env.VITE_BASEURL ;
const API = `${baseUrl}/api`;

const AllRoute = () => {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const [newDivision, setNewDivision] = useState("");
  const [newDistrict, setNewDistrict] = useState({ name: "", division: "" });
  const [newUpazila, setNewUpazila] = useState({ name: "", division: "", district: "" });

  // 🔄 Load all data
  const loadData = async () => {
    const [divs, dists, upas] = await Promise.all([
      axios.get(`${API}/allroutes/divisions`),
      axios.get(`${API}/allroutes/districts`),
      axios.get(`${API}/allroutes/upazilas`),
    ]);
    setDivisions(divs.data);
    setDistricts(dists.data);
    setUpazilas(upas.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  // ➕ Add Division
  const addDivision = async () => {
    if (!newDivision) return;
    await axios.post(`${API}/allroutes/divisions`, { name: newDivision });
    setNewDivision("");
    loadData();
  };

  // ➕ Add District
  const addDistrict = async () => {
    if (!newDistrict.name || !newDistrict.division) return;
    await axios.post(`${API}/allroutes/districts`, newDistrict);
    setNewDistrict({ name: "", division: "" });
    loadData();
  };

  // ➕ Add Upazila
  const addUpazila = async () => {
    if (!newUpazila.name || !newUpazila.division || !newUpazila.district) return;
    await axios.post(`${API}/allroutes/upazilas`, newUpazila);
    setNewUpazila({ name: "", division: "", district: "" });
    loadData();
  };

  // ❌ Delete handlers
  const deleteDivision = async (id) => {
    await axios.delete(`${API}/allroutes/divisions/${id}`);
    loadData();
  };

  const deleteDistrict = async (id) => {
    await axios.delete(`${API}/allroutes/districts/${id}`);
    loadData();
  };

  const deleteUpazila = async (id) => {
    await axios.delete(`${API}/allroutes/upazilas/${id}`);
    loadData();
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Admin Panel</h2>

      {/* Division */}
      <div className="mb-5">
        <h4>Add Division</h4>
        <div className="input-group mb-3">
          <input
            className="form-control"
            value={newDivision}
            onChange={(e) => setNewDivision(e.target.value)}
            placeholder="Division name"
          />
          <button className="btn btn-primary" onClick={addDivision}>Add</button>
        </div>
        <OverFlowRapper>
          <table className="table table-bordered">
            <thead>
              <tr><th>Division</th><th>Action</th></tr>
            </thead>
            <tbody>
              {divisions.map((d) => (
                <tr key={d._id}>
                  <td>{d.name}</td>
                  <td><button className="btn btn-danger btn-sm" onClick={() => deleteDivision(d._id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </OverFlowRapper>
        
      </div>

      {/* District */}
      <div className="mb-5">
        <h4>Add District</h4>
        <div className="row g-2 mb-3">
          <div className="col-md-5">
            <input
              className="form-control"
              value={newDistrict.name}
              onChange={(e) => setNewDistrict({ ...newDistrict, name: e.target.value })}
              placeholder="District name"
            />
          </div>
          <div className="col-md-5">
            <select
              className="form-select"
              value={newDistrict.division}
              onChange={(e) => setNewDistrict({ ...newDistrict, division: e.target.value })}
            >
              <option value="">Select Division</option>
              {divisions.map((d) => (
                <option key={d._id} value={d._id}>{d.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100" onClick={addDistrict}>Add</button>
          </div>
        </div>
        
        <OverFlowRapper>
          <table className="table table-bordered">
            <thead>
              <tr><th>District</th><th>Division</th><th>Action</th></tr>
            </thead>
            <tbody>
              {districts.map((d) => (
                <tr key={d._id}>
                  <td>{d.name}</td>
                  <td>{d.division?.name}</td>
                  <td><button className="btn btn-danger btn-sm" onClick={() => deleteDistrict(d._id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </OverFlowRapper>
        
      </div>

      {/* Upazila */}
      <div className="mb-5">
        <h4>Add Upazila</h4>
        <div className="row g-2 mb-3">
          <div className="col-md-4">
            <input
              className="form-control"
              value={newUpazila.name}
              onChange={(e) => setNewUpazila({ ...newUpazila, name: e.target.value })}
              placeholder="Upazila name"
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={newUpazila.division}
              onChange={(e) => setNewUpazila({ ...newUpazila, division: e.target.value })}
            >
              <option value="">Select Division</option>
              {divisions.map((d) => (
                <option key={d._id} value={d._id}>{d.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={newUpazila.district}
              onChange={(e) => setNewUpazila({ ...newUpazila, district: e.target.value })}
            >
              <option value="">Select District</option>
              {districts
                .filter(dist => dist.division?._id === newUpazila.division)
                .map((dist) => (
                  <option key={dist._id} value={dist._id}>{dist.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100" onClick={addUpazila}>Add</button>
          </div>
        </div>
        
        <OverFlowRapper>
          <table className="table table-bordered">
            <thead>
              <tr><th>Upazila</th><th>District</th><th>Division</th><th>Action</th></tr>
            </thead>
            <tbody>
              {upazilas.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.district?.name}</td>
                  <td>{u.division?.name}</td>
                  <td><button className="btn btn-danger btn-sm" onClick={() => deleteUpazila(u._id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </OverFlowRapper>
        
      </div>
    </div>
  );
};

export default AllRoute;
