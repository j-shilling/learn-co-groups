import React from 'react';
import { useParams } from 'react-router';

const Batch = () => {
  const { id } = useParams();

  return (
    <h1>BATCH: {id}</h1>
  );
};

export default Batch;
