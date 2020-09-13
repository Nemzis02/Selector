import React from 'react';
import { Selector } from './Selector';
import { testValues } from './Selector/testValues';

const App = () => {
  return (
    <Selector
      label='Select option:'
      options={testValues}
      initialValue={testValues[1]}
      placeholder='Select...'
    />
  );
};

export default App;
