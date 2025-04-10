import React, { useState, useEffect, useRef } from "react"; 
import Pharmacy_Navbar from "./pharmacy_navbar"; 
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Typography } from "@mui/material";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    borderRadius:30,
    height:'47vh',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    //padding: theme.spacing(2),
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#EEF2FE',
    boxShadow: 24,
    borderRadius: 3,
    p: 4,
};

function Pharmacy_Landing() {
    return (
        <div style={{ display: "flex" }}>
            <Pharmacy_Navbar />
            <div style={{ marginLeft: "3px", flexGrow: 1, padding: "20px" }}>
                <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "#EEF2FE", height: "90vh", marginTop: "5vh", paddingTop: "0px", paddingLeft: 0, paddingRight:0, borderTopLeftRadius: 30, borderTopRightRadius: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, width: "85vw", margin: 'auto'}}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FFF', fontFamily: "Montserrat", width: "100%", backgroundColor:"#5889BD", borderTopLeftRadius: 30, borderTopRightRadius: 30, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, paddingBottom: '1vh', paddingTop: '1vh'}}>
                    Stock Inventory
                </Typography>
                </Box>
            </div>
        </div>
    )
}
export default Pharmacy_Landing;
