import React, { useState, useEffect } from 'react';
import { Search, Label } from 'semantic-ui-react';

const Batches = () => {
  const [isLoading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState('');
  const [batches, setBatches] = useState([]);

  const handleResultSelect = (e, { result }) => setValue(result.iteration);
  const handleSearchChange = (e, { value }) => {
    setLoading(true);

    setValue(value);
    setResults(batches.filter(batch => batch.iteration.includes(value)).slice(0, 5));

    setLoading(false);
  };
  const resultRenderer = ({ iteration }) => <Label content={iteration} />;

  useEffect(() => {
    const getBatchesPage = page => {
      fetch(`/api/batches?page=${page}`)
        .then(resp => resp.json())
        .then(data => {
          setBatches(batches => [...batches, ...data.batches]);
          if (data.meta.current_page < data.meta.total_pages) {
            getBatchesPage(page + 1);
          }
        });
    };

    getBatchesPage(1);
  }, []);

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
