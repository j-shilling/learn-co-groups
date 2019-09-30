import React, { useState, useEffect } from 'react';
import { Search, Label } from 'semantic-ui-react';

const Batches = ({ user }) => {
  const [isLoading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState('');
  const [batches, setBatches] = useState([]);

  const handleResultSelect = (e, { result }) => setValue(result.iteration);
  const handleSearchChange = (e, { value }) => {
    setLoading(true);

    setValue(value);
    setResults(batches.filter(batch => batch.iteration.includes(value)));

    setLoading(false);
  };
  const resultRenderer = ({ iteration }) => <Label content={iteration} />;

  const getBatchesPage = page => {
    fetch('/batches').then(res => res.json()).then(console.log);
  };

  useEffect(() => getBatchesPage(1));

  return (
    <Search
      loading={isLoading}
      onResultSelect={handleResultSelect}
      onSearchChange={handleSearchChange}
      results={results}
      value={value}
      resultRenderer={resultRenderer}
    />
  );
};

export default Batches;
