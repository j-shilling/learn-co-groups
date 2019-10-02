import React from 'react';

import BatchesSearchBar from '../components/BatchesSearchBar';

const Batches = () => <BatchesSearchBar onBatchSelected={batch => console.log(batch)} />;

export default Batches;
