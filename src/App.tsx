// import React, { useContext } from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import FamilyContainer from './FamilyContainer';
import { Form } from './features/person-input-form';
import './index.css';

// https://www.react-graph-gallery.com/network-chart
// https://airbnb.io/visx/network
// https://github.com/vasturiano/react-force-graph
// https://www.freecodecamp.org/news/8-essential-graph-algorithms-in-javascript/
// ^ to render a network grpah with data

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-row p-10">
        <Form />
        <div className="h-screen">
          <h1 className='mb-6'>My fam</h1>
          <FamilyContainer/>
        </div>
      </div>

    </QueryClientProvider>
  );
}

export default App
