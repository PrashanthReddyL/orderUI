import React, { useState } from 'react';
import { Box, Tabs, Tab, Paper } from '@mui/material';
import InvoiceForm from './InvoiceForm';
import OrderList from './OrderList'; // Make sure to create and import OrderList as previously defined

function App() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1',}}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          centered
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Create Order" />
          <Tab label="Order List" />
        </Tabs>

        <Box sx={{ paddingTop: 2 }}>
          {tabIndex === 0 && <InvoiceForm />}
          {tabIndex === 1 && <OrderList />}
        </Box>
    </Box>
  );
}

export default App;
