import React, { useState, useEffect } from 'react';
import { Search } from 'semantic-ui-react';

import API from '../api';

/**
 * Allows the user to search from a list of all existing batches. When
 * a particular batch is chosen it passes the batch to
 * onBatchSelected.
 */
const BatchesSearchBar = ({ onBatchSelected }) => {
  // Indicates whether we are filtering through the results
  const [isLoading, setLoading] = useState(false);
  // Array of possible choices for the user
  const [results, setResults] = useState([]);
  // Current value of the textbox
  const [value, setValue] = useState('');
  // Array of all batches
  const [batches, setBatches] = useState([]);

  // If the user selects from the autocomplete options, set this
  // components value.
  const handleResultSelect = (e, { result }) => {
    onBatchSelected(result);
    setValue(result.iteration);
  };
  // When the user types a new character, update the value and results
  // list.
  const handleSearchChange = (e, { value }) => {
    setLoading(true);

    // Update value of textbox
    setValue(value);
    // Filter for potential matches and limit to 5 results
    setResults(batches.filter(batch => batch.iteration.includes(value))
      .slice(0, 5)
      .map(batch => {
        // The <Search /> component expects a title to correctly render
        return { ...batch, title: batch.iteration };
      }));

    setLoading(false);
  };
  // If the user presses enter while the search box has focus, check
  // to see if they have typed the full name of a batch.
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      const selection = batches.find(batch => batch.iteration === value);
      if (selection) {
        onBatchSelected(selection);
      }
    }
  };

  // Get a list of all the batches page by page.
  useEffect(() => {
    return API.forEachBatchesPage(new_batches => {
      setBatches(batches => [...batches, ...new_batches]);
    });
  }, []);

  return (
    <Search
      loading={isLoading}
      onResultSelect={handleResultSelect}
      onSearchChange={handleSearchChange}
      onKeyPress={handleKeyPress}
      results={results}
      value={value}
    />
  );
};

export default BatchesSearchBar;
