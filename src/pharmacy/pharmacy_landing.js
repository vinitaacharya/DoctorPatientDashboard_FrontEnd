import React, { useState, useEffect, useRef } from "react";
import Pharmacy_Navbar from "./pharmacy_navbar";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Typography } from "@mui/material";
import backImg from "./assets/purpback.png"
import {TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";

const sectionStyle = {
    padding: "20px",
    borderRadius: "30px",
    backgroundColor: "#EEF2FE",
    height: "100%",

};

const gradientCardStyle = {
    ...sectionStyle,
    backgroundImage: `url(${backImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    color: "#fff",
    backdropFilter: 'blur(100px)',
};

function Pharmacy_Landing() {
    const [pharmacyInfo, setPharmacyInfo] = useState(null);
    const [pharmacyStock, setPharmacyStock] = useState([]);

    useEffect(() => {
        const fetchPharmacyInfo = async () => {
            const id = localStorage.getItem("pharmacyId");
            if (!id) {
                console.warn("No pharmacy ID in localStorage");
                return;
            }

            try {
                const res = await fetch(`http://localhost:5000/pharmacy/${id}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch patient info");
                }

                const data = await res.json();
                setPharmacyInfo(data);
                console.log("Pharmacy info:", data);
                    
                fetch(`/stock/${id}`)
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
            } catch (error) {
                console.error("Error fetching pharmacy info:", error);
            }
        };

        fetchPharmacyInfo();
    }, []);


    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Pharmacy_Navbar />

            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                    padding: 3,
                    gap: 3,
                }}
            >
                <Box sx={{ flex: "0 0 45%" }}>
                    <Grid container spacing={3} sx={{ height: "100%" }}>
                        <Grid item xs={12} md={4}>
                            <Paper style={sectionStyle}>
                                <Typography variant="h6" sx={{ marginBottom: 2, fontFamily: 'Montserrat', textAlign: 'center', margin: 'auto', fontSize: '1.8em' }}>
                                    Pharmacy Inventory
                                </Typography>
                                <Box className="custom-scroll" sx={{ width: 'fit-content', textAlign: 'center', margin: 'auto', height: '35vh', overflowY: 'auto' }}>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{ fontFamily: 'Montserrat', borderBottom: '3px' }}><strong>Medication Name</strong></TableCell>
                                                    <TableCell sx={{ fontFamily: 'Montserrat', borderBottom: '3px' }}><strong>Quantity</strong></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {pharmacyStock.map(item => (
                                                    <TableRow key={item.medicine_id}>
                                                        <TableCell sx={{ fontFamily: 'Merriweather', borderBottom: '3px' }}>{item.medicine_name}</TableCell>
                                                        <TableCell sx={{ fontFamily: 'Merriweather', borderBottom: '3px' }}>{item.stock_count}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Paper style={gradientCardStyle}>
                                <Typography variant="h6" sx={{ marginBottom: 2, fontFamily: 'Montserrat', textAlign: 'center', margin: 'auto', fontSize: '1.8em' }}>
                                    Medication Requests
                                </Typography>
                                <Typography variant="body1">[Medication Requests]</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ flex: "0 0 50%" }}>
                    <Paper style={{ ...sectionStyle, height: "100%", background: 'linear-gradient(109.86deg, #5889BD 6.67%, #719EC7 34.84%, #99C6DB 93.33%)', color: 'white' }}>
                        <Typography variant="h6" sx={{ marginBottom: 2, fontFamily: 'Montserrat', fontSize: '1.8em' }}>
                            Description
                        </Typography>
                        <Typography variant="body1">[Description Table]</Typography>
                    </Paper>
                </Box>

                <Box sx={{ flex: "1 1 auto" }} />
            </Box>
        </div>
    );
}

export default Pharmacy_Landing;