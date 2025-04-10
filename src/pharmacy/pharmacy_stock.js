import React, { useState, useEffect, useRef } from "react"; 
import Pharmacy_S_Navbar from "./pharmacy_stock_navbar"; 
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import {TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";


const Item = styled(Paper)(({ theme }) => ({
  borderRadius:30,
  backgroundColor: 'none',
  padding: theme.spacing(1),
  textAlign: 'center',
}));
const stockData = [
  { name: "Phentermine (Adipex-P, Lomaira)", quantity: 120 },
  { name: "Semaglutide (Wegovy, Ozempic)", quantity: 60 },
  { name: "Orlistat (Alli, Xenical)", quantity: 40 },
  { name: "Megestrol Acetate (Megace)", quantity: 30 },
  { name: "Oxandrolone (Anavar)", quantity: 30 },
];

const PharmacyStock = () => {
  const [quantities, setQuantities] = useState({});
  const [inventory, setInventory] = useState(stockData);
  const [message, setMessage] = useState("");

  const handleChange = (e, name) => {
    setQuantities({ ...quantities, [name]: e.target.value });
  };

  const updateInventory = () => {
    const updatedInventory = inventory.map(item => {
      const addedQty = parseInt(quantities[item.name]) || 0;
      return {
        ...item,
        quantity: item.quantity + addedQty
      };
    });
    setInventory(updatedInventory);
    setMessage("Inventory Successfully Updated");
    setQuantities({});
  };

  return (
    <div style={{ display: "flex" }}>
      <Pharmacy_S_Navbar />
      <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "#EEF2FE", height: "90vh", marginTop: "5vh", paddingTop: "0px", paddingLeft: 0, paddingRight:0, borderTopLeftRadius: 30, borderTopRightRadius: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, width: "70vw",}}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FFF', fontFamily: "Montserrat", width: "100%", backgroundColor:"#5889BD", borderTopLeftRadius: 30, borderTopRightRadius: 30, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, paddingBottom: '1vh', paddingTop: '1vh'}}>
          Stock Inventory
        </Typography>

        <Box className="custom-scroll" sx={{overflowY: 'auto', height: "80vh"}}>

        <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginTop: "1.5vh"}}>
          <TextField
            variant="outlined"
            size="small"
            sx={{ mr: 2, backgroundColor: "white"}}
          />
          <Button variant="contained" sx={{ borderRadius: 2, backgroundColor: "#5A5A5A", fontFamily: "Montserrat"}}>Search</Button>
        </Box>

        <Box display="flex" justifyContent="space-evenly" sx={{ p: 3, paddingBottom: '0px' }}>
          <Box className="custom-scroll" sx={{ width: 'fit-content', backgroundColor: 'none', height: "65vh", overflowY: "auto"} }>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontFamily: 'Montserrat'}}><strong>Medication Name</strong></TableCell>
                    <TableCell sx={{ fontFamily: 'Montserrat'}}><strong>Add</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {inventory.map(item => (
                    <TableRow key={item.name}>
                      <TableCell sx={{ fontFamily: 'Merriweather'}}>{item.name}</TableCell>
                      <TableCell sx={{ fontFamily: 'Merriweather'}}>
                        <TextField
                          size="small"
                          value={quantities[item.name] || ''}
                          onChange={(e) => handleChange(e, item.name)}
                          type="number"
                          sx={{ width: 60}}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box sx={{ width: 'fit-content' }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontFamily: 'Montserrat'}}><strong>Medication Name</strong></TableCell>
                    <TableCell sx={{ fontFamily: 'Montserrat'}}><strong>Quantity</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {inventory.map(item => (
                    <TableRow key={item.name}>
                      <TableCell sx={{ fontFamily: 'Merriweather'}}>{item.name}</TableCell>
                      <TableCell sx={{ fontFamily: 'Merriweather'}}>{item.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>

        <Box textAlign="center">
          {message && <Typography color="green" sx={{ mb: 1 }}>{message}</Typography>}
          <Button variant="contained" onClick={updateInventory} sx={{ borderRadius: 10, backgroundColor: '#427AA1', fontFamily:'Montserrat', padding: 1.5}}>
            Add To Inventory
          </Button>
        </Box>
        </Box>
      </Box>
    </div>
  );
};

export default PharmacyStock;