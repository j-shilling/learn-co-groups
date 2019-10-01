import React, { useState, useEffect } from 'react';
import { Search, Label, List } from 'semantic-ui-react';

const Batches = () => {
  const [isLoading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState('');
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);

  const handleResultSelect = (e, { result }) => {
    setSelectedBatch(result);
    setValue(result.iteration);
  };
  const handleSearchChange = (e, { value }) => {
    setLoading(true);

    // Update value of textbox
    setValue(value);
    // Filter for potential matches and limit to 5 results
    setResults(batches.filter(batch => batch.iteration.includes(value)).slice(0, 5));

    setLoading(false);
  };
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      goToBatch(selectedBatch);
    }
  };
  const resultRenderer = ({ iteration }) => <Label content={iteration} />;
  const goToBatch = batch => {
    if (batch) {
      console.log(`Go to batch '${batch.iteration}'`);
    }
  };

  const selectedBatchRenderer = () => {
    if (selectedBatch) {
      return (
        <List selection verticalAlign='middle'>
          <List.Item>
            <List.Content verticalAlign='middle'>
              <List.Header onClick={() => goToBatch(selectedBatch)}>
                {selectedBatch.iteration}
              </List.Header>
            </List.Content>
          </List.Item>
        </List>
      );
    } else {
      return null;
    }
  };

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
    <div>
      <Search
        loading={isLoading}
        onResultSelect={handleResultSelect}
        onSearchChange={handleSearchChange}
        onKeyPress={handleKeyPress}
        results={results}
        value={value}
        resultRenderer={resultRenderer}
      />
      {selectedBatchRenderer()}
    </div>
  );
};

export default Batches;
