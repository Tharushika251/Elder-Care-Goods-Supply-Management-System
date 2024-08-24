// OrderHistoryForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';

const OrderHistoryForm = ({ addOrder, submitted, data }) => {
  const [formData, setFormData] = useState({
    id: '',
    sname: '',
    sorder: '',
    orderDate: '',
    orderStatus: '',
  });

  useEffect(() => {
    if (data && Object.keys(data).length !== 0) {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrder(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Order Details</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            name="id"
            label="ID"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            name="sname"
            label="Supplier Name"
            value={formData.sname}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            name="sorder"
            label="Order"
            value={formData.sorder}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            type="date"
            name="orderDate"
            label="Order Date"
            value={formData.orderDate}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="orderStatus"
            label="Order Status"
            value={formData.orderStatus}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {submitted ? 'Submitting...' : 'Submit'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default OrderHistoryForm;
