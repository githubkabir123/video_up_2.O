import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import API from '../api/axios';

// Styled Components
const Container = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #111827;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
`;

const Th = styled.th`
  padding: 0.75rem;
  text-align: left;
  background-color: #f3f4f6;
  color: #374151;
  border: 1px solid #e5e7eb;
`;

const Td = styled.td`
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  color: #4b5563;
  font-size: 0.95rem;
`;

const Message = styled.p`
  text-align: center;
  color: #6b7280;
`;

const VideoDeletionLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await API.get('/videos/deletion-logs');
        setLogs(res.data);
      } catch (err) {
        console.error('Error fetching deletion logs:', err);
      }
    };

    fetchLogs();
  }, []);

  return (
    <Container>
      <Heading>🗑️ Video Deletion Logs</Heading>
      {logs.length === 0 ? (
        <Message>No deletion logs available.</Message>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>Deleted By</Th>
              <Th>Deleted At</Th>
              <Th>Video Title</Th>
              <Th>Uploaded By</Th>
              <Th>Division</Th>
              <Th>District</Th>
              <Th>Upazila</Th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id}>
                <Td>{log.deletedBy?.name || "N/A"}</Td>
                <Td>{new Date(log.deletedAt).toLocaleString()}</Td>
                <Td>{log.title || "N/A"}</Td>
                <Td>{log.uploadedBy?.name || "N/A"}</Td> 
                <Td>{log.divisionId?.name || "N/A"}</Td>
                <Td>{log.districtId?.name || "N/A"}</Td>
                <Td>{log.upazilaId?.name || "N/A"}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default VideoDeletionLogs;
