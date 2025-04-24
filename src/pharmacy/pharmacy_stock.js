import React, { useState, useEffect, useRef } from "react"; 
import Pharmacy_S_Navbar from "./pharmacy_stock_navbar"; 
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import {TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";


const PharmacyStock = () => {
  const [quantities, setQuantities] = useState({});
  //const [inventory, setInventory] = useState(stockData);
  const [message, setMessage] = useState("");

  const handleChange = (e, name) => {
    setQuantities({ ...quantities, [name]: e.target.value });
  };

  const updateInventory = () => {
    const updates = Object.entries(quantities).map(([medicineName, qtyStr]) => {
      const quantity = parseInt(qtyStr);
      if (!quantity || quantity === 0) return null;
  
      const stockItem = pharmacyStock.find(item => item.medicine_name === medicineName);
      if (!stockItem) return null;
  
      return {
        pharmacy_id: selectedPharmacy,
        medicine_id: stockItem.medicine_id,
        quantity_to_add: quantity,
      };
    }).filter(Boolean);
  
    Promise.all(updates.map(update =>
      fetch('/stock/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(update)
      })
    ))
    .then(() => {
      setMessage("Inventory Successfully Updated");
      setQuantities({});
      // Refetch updated stock
      fetch(`/stock/${selectedPharmacy}`)
        .then(res => res.json())
        .then(data => setPharmacyStock(data))
        .catch(err => console.error("Error refreshing stock:", err));
    })
    .catch(err => {
      console.error("Error updating inventory:", err);
      setMessage("Failed to update inventory.");
    });
  };
  

  const [pharmacies, setPharmacies] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState("");

  useEffect(() => {
    fetch("/pharmacies")
      .then((res) => res.json())
      .then((data) => setPharmacies(data))
      .catch((err) => console.error("Error fetching pharmacies:", err));
  }, []);

  const [pharmacyStock, setPharmacyStock] = useState([]);
  useEffect(() => {
    if (selectedPharmacy) {
      fetch(`/stock/${selectedPharmacy}`)
        .then(res => res.json())
        .then(data => {
          if (!data.error) {
            setPharmacyStock(data);
          } else {
            setPharmacyStock([]);
          }
        })
        .catch(err => {
          console.error("Error fetching pharmacy stock:", err);
          setPharmacyStock([]);
        });
    }
  }, [selectedPharmacy]);

  return (
    <div style={{ display: "flex" }}>
      <Pharmacy_S_Navbar />
      <div style={{ marginLeft: "3px", flexGrow: 1, padding: "20px" }}>
      <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "#EEF2FE", height: "90vh", marginTop: "5vh", paddingTop: "0px", paddingLeft: 0, paddingRight:0, borderTopLeftRadius: 30, borderTopRightRadius: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, width: "80vw", margin: 'auto'}}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FFF', fontFamily: "Montserrat", width: "100%", backgroundColor:"#5889BD", borderTopLeftRadius: 30, borderTopRightRadius: 30, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, paddingBottom: '1vh', paddingTop: '1vh'}}>
          Stock Inventory
        </Typography>

        <Box className="custom-scroll" sx={{overflowY: 'auto', height: "80vh"}}>

        <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginTop: "1.5vh"}}>
          <FormControl size="small" sx={{ minWidth: 250, mr: 2, backgroundColor: "white" }}>
            <InputLabel id="pharmacy-select-label">Select Pharmacy</InputLabel>
            <Select
              labelId="pharmacy-select-label"
              value={selectedPharmacy}
              label="Select Pharmacy"
              onChange={(e) => setSelectedPharmacy(e.target.value)}
            >
              {pharmacies.map((pharmacy) => (
                <MenuItem key={pharmacy.id} value={pharmacy.id}>
                  {pharmacy.name} ({pharmacy.city})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {selectedPharmacy &&(
        <Box>

        <Box display="flex" justifyContent="space-evenly" sx={{ p: 3, paddingBottom: '0px' }}>
          <Box className="custom-scroll" sx={{ width: 'fit-content', backgroundColor: 'none', height: "65vh", overflowY: "auto"} }>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontFamily: 'Montserrat', borderBottom: '3px'}}><strong>Medication Name</strong></TableCell>
                    <TableCell sx={{ fontFamily: 'Montserrat', borderBottom: '3px'}}><strong>Add</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {pharmacyStock.map(item => (
                  <TableRow key={item.medicine_id}>
                    <TableCell sx={{ fontFamily: 'Merriweather', borderBottom: '3px'}}>{item.medicine_name}</TableCell>
                    <TableCell sx={{ fontFamily: 'Merriweather', borderBottom: '3px'}}>
                      <TextField
                        size="small"
                        value={quantities[item.medicine_name] || ''}
                        onChange={(e) => handleChange(e, item.medicine_name)}
                        type="number"
                        sx={{ width: 60 }}
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
                    <TableCell sx={{ fontFamily: 'Montserrat', borderBottom: '3px'}}><strong>Medication Name</strong></TableCell>
                    <TableCell sx={{ fontFamily: 'Montserrat', borderBottom: '3px'}}><strong>Quantity</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pharmacyStock.map(item => (
                    <TableRow key={item.medicine_id}>
                      <TableCell sx={{ fontFamily: 'Merriweather', borderBottom: '3px'}}>{item.medicine_name}</TableCell>
                      <TableCell sx={{ fontFamily: 'Merriweather', borderBottom: '3px'}}>{item.stock_count}</TableCell>
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
        )}

        </Box>
      </Box>
      </div>
    </div>
  );
};

export default PharmacyStock;