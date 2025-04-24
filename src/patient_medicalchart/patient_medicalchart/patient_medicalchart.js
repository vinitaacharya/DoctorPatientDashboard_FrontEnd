import React, { useState, useEffect, useRef } from "react"; 
import Patient_Navbar from "../../patient_dashboard/patient_navbar";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Tabs, Tab, Box, Paper, Typography, Button } from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import Plot from 'react-plotly.js';






function Patient_Chart() {

    const [activeTab, setActiveTab] = useState(0);
    const [chartTab, setChartTab] = useState(0);
    const [dailyInfo, setDailyInfo] = useState(null);
    const [weeklyInfo, setWeeklyInfo] = useState(null);
    const patientId = localStorage.getItem("patientId");
    const [patientInfo, setPatientInfo] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    
    
    useEffect(() => {
        const fetchDailyInfo = async () => {
          const id = localStorage.getItem("patientId");
          if (!id) {
            console.warn("No patient ID in localStorage");
            return;
          }
      
          try {
            const res = await fetch(`/daily-surveys/${patientId}`);
            if (!res.ok) {
              throw new Error("Failed to fetch patient info");
            }
      
            const data = await res.json();
            setDailyInfo(data);
            console.log("Patient info:", data);
          } catch (error) {
            console.error("Error fetching patient survey info:", error);
          }
        };
        fetchDailyInfo();
    }, []);

      useEffect(() => {
        const fetchWeeklyInfo = async () => {
          const id = localStorage.getItem("patientId");
          if (!id) {
            console.warn("No patient ID in localStorage");
            return;
          }
      
          try {
            const res = await fetch(`/weekly-surveys/${patientId}`);
            if (!res.ok) {
              throw new Error("Failed to fetch patient info");
            }
      
            const data = await res.json();
            setWeeklyInfo(data);
            console.log("Patient info:", data);
          } catch (error) {
            console.error("Error fetching patient servey info:", error);
          }
        };
        fetchWeeklyInfo();
    }, []);

    useEffect(() => {
        const fetchPatientInfo = async () => {
          try {
            const res = await fetch(`/init-patient-survey/${patientId}`);
            if (!res.ok) throw new Error("Failed to fetch patient info");
            const data = await res.json();
            setPatientInfo(data);
          } catch (error) {
            console.error("Error fetching patient info:", error);
          }
        };
        fetchPatientInfo();
      }, []);
      

    const weightChartData = {
        x: weeklyInfo?.map(entry => new Date(entry.week_start).toLocaleDateString()), // readable date
        y: weeklyInfo?.map(entry => entry.weight_change),
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'blue' },
        name: 'Weight Change'
      };

    const systolicData = {
        x: weeklyInfo?.map(entry => new Date(entry.week_start).toLocaleDateString()),
        y: weeklyInfo?.map(entry => parseInt(entry.blood_pressure.split('/')[0])),
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'red' },
        name: 'Systolic BP'
      };
      
    const diastolicData = {
        x: weeklyInfo?.map(entry => new Date(entry.week_start).toLocaleDateString()),
        y: weeklyInfo?.map(entry => parseInt(entry.blood_pressure.split('/')[1])),
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'green' },
        name: 'Diastolic BP'
        };

    // DAILY CHART DATA
    const dailyDates = dailyInfo?.map(entry => new Date(entry.date).toLocaleDateString());

    const waterIntakeData = {
        x: dailyDates,
        y: dailyInfo?.map(entry => entry.water_intake),
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Water Intake (cups)',
        marker: { color: 'blue' }
        };

    const caloriesData = {
        x: dailyDates,
        y: dailyInfo?.map(entry => entry.calories_consumed),
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Calories Consumed',
        marker: { color: 'orange' }
        };

    const heartRateData = {
        x: dailyDates,
        y: dailyInfo?.map(entry => entry.heart_rate),
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Heart Rate',
        marker: { color: 'red' }
        };


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
                            <Typography>
                                <strong>Patient Name:</strong>{" "}
                                {isEditing ? (
                                    <>
                                    <input
                                        style={{ marginRight: '8px' }}
                                        value={patientInfo?.first_name || ''}
                                        onChange={(e) =>
                                        setPatientInfo({ ...patientInfo, first_name: e.target.value })
                                        }
                                    />
                                    <input
                                        value={patientInfo?.last_name || ''}
                                        onChange={(e) =>
                                        setPatientInfo({ ...patientInfo, last_name: e.target.value })
                                        }
                                    />
                                    </>
                                ) : (
                                    `${patientInfo?.first_name || ''} ${patientInfo?.last_name || ''}`
                                )}
                            </Typography>

                            {/* <Typography>
                                <strong>DOB:</strong> 
                                {isEditing ? (
                                    <input
                                    value={patientInfo?.dob || ''}
                                    onChange={(e) =>
                                        setPatientInfo({ ...patientInfo, dob: e.target.value })
                                    }
                                    />
                                ) : (
                                    `${patientInfo?.dob}`
                                )}
                            </Typography> */}
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
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, borderBottom: '1px solid #ccc', height: 50}}>
                                    {/* Medical Chart tab (left) */}
                                    <Tab
                                        label="Daily Data"
                                        onClick={() => setChartTab(0)}
                                        sx={{
                                        background: chartTab === 0 ? '#EEF2FE' : 'transparent',
                                        borderBottom: chartTab === 0 ? '2px solid #9976d2' : 'none',
                                        borderRadius: '4px 4px 0 0',
                                        textTransform: 'none',
                                        fontWeight: chartTab === 0 ? 'bold' : 'normal'
                                        }}
                                    />

                                    {/* Graphs tab (right) */}
                                    <Tab
                                        label="Weekly Data"
                                        onClick={() => setChartTab(1)}
                                        sx={{
                                        background: chartTab === 1 ? '#EEF2FE' : 'transparent',
                                        borderBottom: chartTab === 1 ? '2px solid #9976d2' : 'none',
                                        borderRadius: '4px 4px 0 0',
                                        textTransform: 'none',
                                        fontWeight: chartTab === 1 ? 'bold' : 'normal'
                                        }}
                                    />
                                </Box>
                                {chartTab === 0 && (
                                    <Plot
                                    data={[waterIntakeData, caloriesData, heartRateData]}
                                    layout={{
                                        width: 700,
                                        height: 400,
                                        title: { text: 'Daily Health Data' },
                                        xaxis: { title: 'Date' },
                                        yaxis: { title: 'Values' }
                                    }}
                                    />
  
                                )} 
                                {chartTab === 1 && (
                                    <Plot
                                    data={[weightChartData, systolicData, diastolicData]}
                                    layout={{
                                      width: 700,
                                      height: 400,
                                      title: { text: 'Weekly Health Trends' },
                                      xaxis: { title: 'Week Start' },
                                      yaxis: { title: 'Values' }
                                    }}
                                  />
                                  
                                    // <Plot
                                    // data={[weightChartData]}
                                    // layout={{  width: 600, height: 400, title: {text: 'Weight Change'}, }}
                                    // />
                                    // <Plot
                                    // data={[systolicData]}
                                    // layout={{  width: 600, height: 400, title: {text: 'Systolic Change'}, }}
                                    // />
                                )}
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