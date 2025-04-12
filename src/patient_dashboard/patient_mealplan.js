import React, { useState, useEffect, useRef } from "react"; 
import Patient_Navbar from "./patient_navbar"; 
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
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

function Patient_Mealplan() {
    return (
        <div style={{ display: "flex" }}>
          <Patient_Navbar />
          <Box
            sx={{
            flexGrow: 1,
            padding: 4,
            height: "92vh",
            }}
            >
                <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: "medium", fontFamily: 'Montserrat' , marginLeft:'1vw', fontSize: '2em'}}>
                Meal Planning
                </Typography>
                <Box>

                </Box>
                <Box></Box>
            </Box>
        </div>
    )
}
export default Patient_Mealplan;
