import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function OrderList() {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('https://ordersvc-d2cbdhg5aecpf9cx.eastus-01.azurewebsites.net/api/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#fcfcda',
        padding: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 900,
          padding: 3,
          borderRadius: 2,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h6" gutterBottom>Order List</Typography>
        
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Order ID</strong></TableCell>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Phone</strong></TableCell>
                <TableCell><strong>Address</strong></TableCell>
                <TableCell><strong>Total</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.name}</TableCell>
                  <TableCell>{order.phone}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>{order.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default OrderList;
