import React, { useState } from 'react';
import { TextField, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function InvoiceForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    count: '',
    date: '',
    total: '',
    items: [{ itemName: '', quantity: '', price: '' }],
  });

  console.log("formData", formData);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...formData.items];
    items[index][name] = value;
    setFormData((prev) => ({ ...prev, items }));
  };

  const addItemRow = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { itemName: '', quantity: '', price: '' }],
    }));
  };

  const removeItemRow = (index) => {
    const items = formData.items.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, items }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Order saved:', data);
        alert('Order saved successfully!');
        setFormData({
          name: '',
          phone: '',
          address: '',
          count: '',
          date: '',
          total: '',
          items: [{ itemName: '', quantity: '', price: '' }],
        });
      } else {
        console.error('Failed to save order');
        alert('Failed to save order');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving order');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f4f9',
        padding: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 900,
          height: 600,
          padding: 3,
          borderRadius: 2,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >


        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              size="small"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Ph. No"
              name="phone"
              size="small"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Address/Location"
              name="address"
              size="small"
              value={formData.address}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Count"
              name="count"
              size="small"
              value={formData.count}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date/Time"
              name="date"
              size="small"
              value={formData.date}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Total"
              name="total"
              size="small"
              value={formData.total}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>

        <TableContainer component={Paper} sx={{ marginTop: 2, boxShadow: 'none' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '0.9rem', fontWeight: 'bold', width: '40%' }}>Item Name</TableCell>
                <TableCell sx={{ fontSize: '0.9rem', fontWeight: 'bold', width: '30%' }}>Quantity</TableCell>
                <TableCell sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Price</TableCell>
                <TableCell align="center" sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      fullWidth
                      name="itemName"
                      size="small"
                      value={item.itemName}
                      onChange={(e) => handleItemChange(index, e)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      name="quantity"
                      size="small"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, e)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      name="price"
                      size="small"
                      value={item.price}
                      onChange={(e) => handleItemChange(index, e)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => removeItemRow(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 1 }}>
          <Button variant="outlined" size="small" onClick={addItemRow}>
            + Add Item
          </Button>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default InvoiceForm;
