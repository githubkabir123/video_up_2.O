import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  background: #f9fafb;
  padding: 1.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.05);
`;

const Heading = styled.h2`
  text-align: center;
  color: #1f2937;
  margin-bottom: 1.5rem;
`;

const List = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const ListItem = styled.li`
  background: white;
  margin-bottom: 0.7rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const JournalistList = ({ districtId }) => {
  const [journalists, setJournalists] = useState([]);

  useEffect(() => {
    const fetchJournalists = async () => {
      try {
        const res = await API.get(`/users/district/${districtId}`);
        setJournalists(res.data);
        // console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (districtId) fetchJournalists();
  }, [districtId]);

  return (
    <Container>
      <Heading>Journalists in District</Heading>
      {journalists.length === 0 ? (
        <p>No journalists found in this district.</p>
      ) : (
        <List>
          {journalists.map(j => (
            <ListItem key={j._id}>
              <StyledLink to={`/journalist/${j._id}/videos`}>{j.name}</StyledLink>
              <span>{j.email}</span>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default JournalistList;
