import React, { useEffect, useRef, useState } from 'react';
import SupplierForm from "./SupplierForm";
import SuppliersTable from './SuppliersTable';
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material"; 
import Axios from 'axios';
import { useReactToPrint } from "react-to-print";
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';

const Supplierdetails = () => {
  const [supplierdetails, setSuppliers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    Axios.get('http://localhost:3001/api/users')
      .then(response => {
        setSuppliers(response.data.response);
      })
      .catch(error => {
        console.error("Axios Error : ", error);
      });
  }

  const addUser = (data) => {
    setSubmitted(true);

    const payload = {
      id: data.id,
      name: data.name,
      item: data.item,
      email: data.email,
      cnumber: data.cnumber,
      address: data.address,
    }
    Axios.post('http://localhost:3001/api/createuser', payload)
      .then(() => {
        getUsers();
        setSubmitted(false);
        setIsEdit(false);
      })
      .catch(error => {
        console.error("Axios Error : ", error);
      });
  }

  const updateUser = (data) => {
    setSubmitted(true);

    const payload = {
      id: data.id,
      name: data.name,
      item: data.item,
      email: data.email,
      cnumber: data.cnumber,
      address: data.address,
    }
    Axios.post('http://localhost:3001/api/updateuser', payload)
      .then(() => {
        getUsers();
        setSubmitted(false);
        setIsEdit(false);
      })
      .catch(error => {
        console.error("Axios Error : ", error);
      });
  }

  const deleteUser = (data) => {
    Axios.post('http://localhost:3001/api/deleteuser', data)
      .then(() => {
        getUsers();
      })
      .catch(error => {
        console.error("Axios Error : ", error);
      });
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const ComponentsRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "Suppliers' Report",
    onAfterPrint: () => alert("Suppliers' Report Successfully Printed !"),
  });

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      padding: 20,
      border: '4px solid #000000', // Added border style
    },
    header: {
      fontSize: 25,
      marginBottom: 20,
      textAlign: 'center', // Center text
      fontWeight: 'bold', // Bold text
    },
    supplier: {
      marginBottom: 10,
    },
    blueStrip: {
      backgroundColor: '#2832C2',
      padding: 10,
      marginBottom: 10,
      width: '100%',
      textAlign: 'center',
      flexDirection: 'row', // Align logo and text horizontally
      alignItems: 'center', // Align logo and text vertically
    },
    blueStripText: {
      color: 'black',
      fontSize: 26,
      marginLeft: 5, // Add some space between logo and text
    },
    logo: {
      width: 50, // Adjust width of the logo as needed
      height: 50, // Adjust height of the logo as needed
    },
    signature: {
      position: 'absolute',
      bottom: 30, // Adjust the position of the signature from bottom
      right: 30, // Adjust the position of the signature from right
      width: 150, // Adjust width of the signature space
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    signatureText: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    dateText: {
      position: 'absolute',
      bottom: 30, // Adjust the position of the date text from bottom
      left: 30, // Adjust the position of the date text from left
      fontSize: 14,
    },
  });

  const MyDocument = (
    <Document>
      <Page style={styles.page}>
        <View style={styles.blueStrip}>
          <Image src="./logo.jpg" style={styles.logo} /> {/* Update the path to your logo */}
          <Text style={styles.blueStripText}>Forever Caring Corner</Text>
        </View>
        <Text style={styles.header}>Suppliers' Report</Text>
        {supplierdetails.map(supplier => (
          <View key={supplier.id} style={styles.supplier}>
            <Text>Name: {supplier.name}</Text>
            <Text>Item: {supplier.item}</Text>
            <Text>Email: {supplier.email}</Text>
            <Text>Contact Number: {supplier.cnumber}</Text>
            <Text>Address: {supplier.address}</Text>
          </View>
        ))}
        <View style={styles.signature}>
          <Text style={styles.signatureText}>Signature: __________</Text>
        </View>
        <Text style={styles.dateText}>Date: __________</Text>
      </Page>
    </Document>
  );

  const PDFViewerComponent = () => (
    <PDFViewer style={{ width: '100%', height: '500px' }}>
      {MyDocument}
    </PDFViewer>
  );

  return (
    <Box
      sx={{
        width: 'calc(100% - 30px)',
        margin: 'auto',
        marginTop: '15px',
      }}
    >
      <TextField
        label="Search by Name"
        variant="outlined"
        size="small"
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <SupplierForm
        addUser={addUser}
        updateUser={updateUser}
        submitted={submitted}
        data={selectedUser}
        isEdit={isEdit}
      />
      <SuppliersTable
          ref={ComponentsRef}
          rows={supplierdetails.filter(supplier =>
            supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
          )}
          selectedUser={data => {
            setSelectedUser(data);
            setIsEdit(true);
          }}
          deleteUser={data => window.confirm('Are you sure?') && deleteUser(data)}
      />
      <Button variant="contained" onClick={() => handlePrint(MyDocument)}>Print Report</Button>
      <PDFViewerComponent />
    </Box>
  );
};

export default Supplierdetails;
