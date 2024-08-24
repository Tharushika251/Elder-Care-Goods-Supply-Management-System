import React, { useState, useEffect } from 'react';
import OrderHistoryForm from './OrderHistoryForm';
import { Box, Table, TableHead, TableBody, TableRow, TableCell, Typography } from '@mui/material';
import Axios from 'axios';

const Orderhistory = () => {
  const [orderhistorydetails, setOrders] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    Axios.get('http://localhost:3001/api/orders')
      .then((response) => {
        setOrders(response.data.response);
      })
      .catch((error) => {
        console.error('Axios Error : ', error);
      });
  };

  const addOrder = (data) => {
    setSubmitted(true);

    const payload = {
      id: data.id,
      sname: data.sname,
      sorder: data.sorder,
      orderDate: data.orderDate,
      orderStatus: data.orderStatus,
    };

    Axios.post('http://localhost:3001/api/createorder', payload)
      .then(() => {
        getOrders();
        setSubmitted(false);
        setIsEdit(false);
        // Clear the form after successful submission
        setSelectedOrder({});
      })
      .catch((error) => {
        console.error('Axios Error : ', error);
        setSubmitted(false);
      });
  };

  return (
    <Box
      sx={{
        width: 'calc(100% - 30px)',
        margin: 'auto',
        marginTop: '15px',
      }}
    >
      <OrderHistoryForm addOrder={addOrder} submitted={submitted} data={selectedOrder} />
      <Box mt={4}>
        <Typography variant="h5">Order History</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Supplier's Name</TableCell>
              <TableCell>Order</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Order Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderhistorydetails.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.sname}</TableCell>
                <TableCell>{order.sorder}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>{order.orderStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default Orderhistory;
