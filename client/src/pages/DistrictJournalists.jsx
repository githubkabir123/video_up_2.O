import React from 'react';
import { useParams } from 'react-router-dom';
import JournalistList from '../components/JournalistList';

const DistrictJournalists = () => {
  const { districtId } = useParams(); // from URL /district/:districtId

  return (
    <div>
      <h1>District Journalist List</h1>
      <JournalistList districtId={districtId} />
    </div>
  );
};

export default DistrictJournalists;
