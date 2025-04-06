import React from "react";
import Patient_Navbar from "./patient_navbar"; 
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import FlowerBackgroundImg from "./patient_landing_assets/FlowerBackground.png"
import overviewSurveyImg from "./patient_landing_assets/overviewSurveyImg.png"
import {  Button, Typography} from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius:30,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  //padding: theme.spacing(2),
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

function Patient_Landing() {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar/Navbar */}
      <Patient_Navbar /> 

      <div style={{ marginLeft: "3px", flexGrow: 1, padding: "20px" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} >
            <Grid item xs={7} sx={{color:'white',background: 'linear-gradient(110deg, #5889BD 6.67%, #719EC7 34.84%, #99C6DB 93.33%)', borderRadius:5,p:2}}>
            <h1 >Health Overview</h1>
  <Paper
    //elevation={3}
    sx={{
      //borderRadius: 5,
      p: 2,
      color:'white',
      background:'transparent',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow:0,
    }}
  >
    
    {/* Left Section: Text, Image, Button */}
    <Box sx={{ width: '45%', borderRadius: 3, background: 'rgba(238, 242, 254, 0.10)', p:2}}>
     <Paper
     sx={{
      color:'white',
      background:'transparent',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow:0,
    }}
     >

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Take your daily and weekly surveys
      </Typography>
      <Box
        component="img"
        src={overviewSurveyImg}
        alt="Survey"
        sx={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          mb: 2,
        }}
      />
      </Paper>
      <Typography variant="body1" sx={{ mb: 2 }}>
        By taking your daily and weekly surveys DPP is able to create progress updates so you can
        track your fitness journey. Take your surveys now by clicking below!
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#B7C9F2',
          color: '#333',
          borderRadius: '25px',
          fontWeight: 'bold',
          textTransform: 'none',
        }}
      >
        Survey →
      </Button>
    </Box>

    {/* Right Section: Chart + Arrows */}
    <Box
      sx={{
        width: '50%',
        backgroundColor: 'white',
        borderRadius: 3,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h6" color="black" sx={{ mb: 1 }}>
        Weight
      </Typography>
      <Box
        component="img"
        src="/chart-placeholder.png" // replace with actual chart
        alt="Weight Chart"
        sx={{ width: '100%', borderRadius: 2, mb: 2 }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button size="small">←</Button>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <span>●</span>
          <span>●</span>
          <span>●</span>
        </Box>
        <Button size="small">→</Button>
      </Box>
    </Box>
  </Paper>


         
            </Grid>
            <Grid item xs={5}>
              <Item sx={{backgroundColor:"#EEF2FE"}}>xs=5</Item>
            </Grid>
            <Grid item xs={4}>
              <Item sx={{background: "linear-gradient(110deg, #5889BD 6.67%, #719EC7 34.84%, #99C6DB 93.33%)", p:10}}>xs=4</Item>
            </Grid>
            <Grid item xs={4}>
              <Item  sx={{ 
    p:10,
    position: "relative",
    overflow:"hidden",
    backgroundImage: `url(${FlowerBackgroundImg})`, 
    backgroundColor: "lightgray", 
    backgroundSize: "cover",
    backgroundPosition: "center", 
    backgroundRepeat: "no-repeat",
    "&::before": { 
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(255, 255, 255, 0.1)", 
      backdropFilter: "blur(10px)", 
      zIndex: 1,
    }
  }}><Box sx={{ position: "relative", zIndex: 2 }}>xs=4</Box></Item>
            </Grid>
            <Grid item xs={4}>
              <Item sx={{background: "linear-gradient(110deg, #5889BD 6.67%, #719EC7 34.84%, #99C6DB 93.33%)", backgroundSize: "cover",}}>xs=4</Item>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default Patient_Landing;
