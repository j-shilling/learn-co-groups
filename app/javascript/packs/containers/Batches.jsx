import React from 'react';
import { useHistory } from 'react-router';

import BatchesSearchBar from '../components/BatchesSearchBar';

const Batches = () => {
  const history = useHistory();

  const goToBatchPage = batch => history.push(`/batch/${batch.id}`);

  return (
    <BatchesSearchBar onBatchSelected={goToBatchPage} />
  );
};

export default Batches;
