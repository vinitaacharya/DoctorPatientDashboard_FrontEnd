import React, { useState, useEffect, useRef } from "react"; 
import Patient_Navbar from "../../patient_dashboard/patient_navbar";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Tabs, Tab, Box, Paper, Typography, Button } from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import Plot from 'react-plotly.js';


function Patient_Chart() {

    const [activeTab, setActiveTab] = useState(0);
    return(
        <div>
            <Patient_Navbar/>
            <Box sx={{ 
                mt: 5,  // Adds margin-top
                px: 20,  // Horizontal padding
                width: '100%',
                height: '100%',
                maxWidth: 1500,  // Increased from 600
                mx: 'auto'
            }}>
                <Paper sx={{ p: 3, maxWidth: 1500, height: 700, mx: 'auto', display: 'flex', flexDirection: 'column' }}>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, borderBottom: '1px solid #ccc', height: 50}}>
                {/* Medical Chart tab (left) */}
                <Tab
                    label="Medical Chart"
                    onClick={() => setActiveTab(0)}
                    sx={{
                    background: activeTab === 0 ? '#EEF2FE' : 'transparent',
                    borderBottom: activeTab === 0 ? '2px solid #1976d2' : 'none',
                    borderRadius: '4px 4px 0 0',
                    textTransform: 'none',
                    fontWeight: activeTab === 0 ? 'bold' : 'normal'
                    }}
                />

                {/* Graphs tab (right) */}
                <Tab
                    label="Graphs"
                    onClick={() => setActiveTab(1)}
                    sx={{
                    background: activeTab === 1 ? '#9FBDDC' : 'transparent',
                    borderBottom: activeTab === 1 ? '2px solid #1976d2' : 'none',
                    borderRadius: '4px 4px 0 0',
                    textTransform: 'none',
                    fontWeight: activeTab === 1 ? 'bold' : 'normal'
                    }}
                />
                </Box>

                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', pt: 3 }}>
                {activeTab === 0 && (
                    <Box sx={{background: '#EEF2FE', flexGrow: 1, p: 3 }}>
                        <Typography variant="h6" gutterBottom>Medical Chart</Typography>

                        <Grid container spacing={4}>
                            {/* LEFT COLUMN */}
                            <Grid item xs={12} md={6}>
                            <Typography><strong>Patient Name:</strong> Jane Doe</Typography>
                            <Typography><strong>DOB:</strong> 1/1/99</Typography>
                            <Typography><strong>Gender:</strong> Female</Typography>
                            <Typography><strong>Height:</strong> 5'3"</Typography>
                            <Typography><strong>Weight:</strong> 140lbs</Typography>
                            <Typography><strong>Blood Type:</strong> O+</Typography>
                            <Typography><strong>Allergies:</strong> N/A</Typography>
                            <Typography><strong>Fitness Level:</strong> N/A</Typography>
                            <Typography><strong>Health Conditions:</strong> N/A</Typography>
                            <Typography><strong>Family History:</strong> N/A</Typography>
                            <Typography><strong>Past Procedures:</strong> N/A</Typography>
                            <Button variant="outlined" sx={{ mt: 2 }}>Edit</Button>
                            </Grid>

                            {/* RIGHT COLUMN */}
                            <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography><strong>Phone:</strong> (000) 000-0000</Typography>
                                <Button variant="outlined" size="small">Edit</Button>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography><strong>Address:</strong> 123 Road</Typography>
                                <Button variant="outlined" size="small">Edit</Button>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography><strong>Zip code:</strong> 00000 </Typography>
                                <Button variant="outlined" size="small">Edit</Button>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography><strong>City:</strong> City </Typography>
                                <Button variant="outlined" size="small">Edit</Button>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography><strong>Email:</strong> email@example.com</Typography>
                                <Button variant="outlined" size="small">Edit</Button>
                            </Box>

                            {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography><strong>Insurance:</strong> Aetna</Typography>
                                <Button variant="outlined" size="small">Edit</Button>
                            </Box> */}
                            </Grid>
                        </Grid>
                        </Box>
                    )}

                    {activeTab === 1 && (
                    <Box sx={{background: '#9FBDDC', flexGrow: 1, p: 3 }}>
                            <Box sx={{ ml: 4 }}>  {/* Adjust "4" to how much space you want */}
                            <Typography variant="h6" gutterBottom>Health Graphs</Typography>
                            <Plot
                                data={[
                                {
                                    x: ['Jan', 'Feb', 'Mar'],
                                    y: [140, 138, 137],
                                    type: 'scatter',
                                    mode: 'lines+markers',
                                    marker: { color: 'blue' },
                                }
                                ]}
                                layout={{  width: 600, height: 400, title: {text: 'Weight Over Time'}, }}
                            />
                            </Box>
                        {/* Your Plotly charts would go here */}
                        </Box>
                    )}
                </Box>
                </Paper>
            </Box>
        </div>
    );

}

export default Patient_Chart;