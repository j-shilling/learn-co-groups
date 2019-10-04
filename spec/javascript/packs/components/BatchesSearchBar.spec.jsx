import React from 'react';
import { mount } from 'enzyme';

import API from 'packs/api';
import BatchesSearchBar from 'packs/components/BatchesSearchBar';

jest.mock('packs/api');

const mockBatches = [
  {
    "id": 1352,
    "iteration": "nyc-web-091619-mod-1-repeat",
    "invite_url": "47430ca7f7fd8b94",
    "organization_id": 2,
    "created_at": "2019-09-16T17:21:05.313-04:00"
  },
  {
    "id": 1350,
    "iteration": "online-web-pt-090819",
    "invite_url": "c7096316938f64b6",
    "organization_id": 27,
    "created_at": "2019-09-05T11:23:15.838-04:00"
  },
  {
    "id": 1349,
    "iteration": "atl-fasttrack-090719",
    "invite_url": "6ae75cabe63a23d3",
    "organization_id": 2,
    "created_at": "2019-09-04T17:00:31.763-04:00"
  },
  {
    "id": 1348,
    "iteration": "notredame-se-ds-preview",
    "invite_url": "56e98f5daa40acab",
    "organization_id": 28,
    "created_at": "2019-08-29T09:50:00.712-04:00"
  },
  {
    "id": 1347,
    "iteration": "nyc-fasttrack-082419",
    "invite_url": "23737c91fdae8d0e",
    "organization_id": 2,
    "created_at": "2019-08-23T09:17:50.701-04:00"
  }
];

const setWrapperValue = (wrapper, value) => {
  wrapper.find('input').simulate('change', { target: { value: value } });
};

const getSearchResult = (wrapper, iteration) => {
  if (iteration) {
    return wrapper.findWhere(n => n.text() === iteration).first();
  } else {
    return wrapper.find('SearchResult').first();
  }
};

const clickSearchResult = (wrapper, iteration = undefined) => {
  const result = getSearchResult(wrapper, iteration);
  const batch = mockBatches.find(batch => batch.iteration === result.text());
  batch.title = batch.iteration;
  result.simulate('click', { nativeEvent: { stopImmediatePropagation: function() { } } });
  return batch;
};

const pressEnter = (wrapper) => {
  wrapper.simulate('keyPress', { key: 'Enter' });
};

describe('<BatchesSearchBar />', () => {
  API.forEachBatchesPage.mockImplementation((callback) => callback(mockBatches));

  const props = {
    onBatchSelected: jest.fn()
  };
  const wrapper = mount(<BatchesSearchBar {...props} />);

  afterEach(() => {
    props.onBatchSelected.mockClear();
  });

  it('renders a <Search /> bar', () => {
    expect(wrapper).toContainExactlyOneMatchingElement('Search');
  });

  it('asks for a list of all batches', () => {
    expect(API.forEachBatchesPage).toHaveBeenCalled();
  });

  it('suggests options as value changes', () => {
    const value = 'nyc';
    setWrapperValue(wrapper, value);
    const suggestions = wrapper.find('SearchResult').map(node => node.text());
    const expected = mockBatches.filter(batch => batch.iteration.includes(value));

    // Arrays should be equal ignore order
    expect(suggestions.length).toBe(expected.length);
    expected.forEach(batch => expect(suggestions).toContain(batch.iteration));
  });

  it('completes value when a suggestion is selected', () => {
    const batch = clickSearchResult(wrapper);
    expect(wrapper.find('input').prop('value')).toBe(batch.iteration);
  });

  it('calls onBatchSelected when a suggestion is selected', () => {
    const batch = clickSearchResult(wrapper);
    expect(props.onBatchSelected).toBeCalledWith(batch);
  });

  it('calls onBatchSelected when enter is pressed and value matches a batch name', () => {
    const batch = mockBatches[2];
    batch.title = batch.iteration;

    setWrapperValue(wrapper, batch.iteration);
    pressEnter(wrapper);

    expect(props.onBatchSelected).toBeCalledWith(batch);
  });

  it('does not call onBatchSelected when enter is pressed and value does not match a batch name', () => {
    setWrapperValue(wrapper, 'asdf');
    pressEnter(wrapper);
    expect(props.onBatchSelected).not.toHaveBeenCalled();
  });
});
