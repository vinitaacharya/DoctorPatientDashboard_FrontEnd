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
            const res = await fetch(`http://localhost:5000/init-patient-survey/${patientId}`);
            if (!res.ok) throw new Error("Failed to fetch patient info");
            const data = await res.json();
            setPatientInfo(data);
            console.log("Chart:", data);
          } catch (error) {
            console.error("Error fetching patient info:", error);
          }
        };
        fetchPatientInfo();
      }, [patientId]);
      

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

        const [patientInfo, setPatientInfo] = useState({
            first_name: '',
            last_name: '',
            dob: '',
            gender: '',
            height: '',
            weight: '',
            blood_type: '',
            dietary_restrictions: '',
            medical_conditions: '',
            family_history: '',
            past_procedures: '',
            mobile_number: '',
            patient_address: '',
            patient_zipcode: '',
            patient_city: '',
            patient_state: '',
            patient_email: '',
            patient_id: null
          });

          const handleSave = async () => {
            try {
              const response = await fetch('http://localhost:5000/edit-patient', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(patientInfo)
              });
          
              const result = await response.json();
              if (!response.ok) throw new Error(result.error || 'Failed to update patient');
          
              alert('Patient information updated successfully!');
              setIsEditing(false);
            } catch (err) {
              console.error('Update error:', err);
              alert('Error updating patient info.');
            }
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
                            {/* <Typography>
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
                                    `${patientInfo.first_name || ''} ${patientInfo.last_name || ''}`
                                )}
                            </Typography> */}
                            <Typography><strong>DOB: </strong>
                            {isEditing ? (
                                <input
                                value={patientInfo.dob}
                                onChange={(e) =>
                                    setPatientInfo({ ...patientInfo, dob: e.target.value })
                                }
                                />
                            ) : (
                                patientInfo.dob
                            )}
                            </Typography>
                            <Typography><strong>Gender: </strong>
                            {isEditing ? (
                                <input
                                value={patientInfo.gender}
                                onChange={(e) =>
                                    setPatientInfo({ ...patientInfo, gender: e.target.value })
                                }
                                />
                            ) : (
                                patientInfo.gender
                            )}                            
                            </Typography>
                            <Typography>
                            <strong>Height:</strong>{" "}
                            {isEditing ? (
                                <input
                                value={patientInfo.height}
                                onChange={(e) =>
                                    setPatientInfo({ ...patientInfo, height: e.target.value })
                                }
                                />
                            ) : (
                                patientInfo.height
                            )}
                            </Typography>
                            <Typography>
                            <strong>Weight: </strong>
                            {isEditing ? (
                                <input
                                value={patientInfo.weight}
                                onChange={(e) => setPatientInfo({ ...patientInfo, weight: e.target.value })}
                                />
                            ) : (
                                patientInfo.weight
                            )}
                            </Typography>
                            <Typography>
                            <strong>Blood Type: </strong>
                            {isEditing ? (
                                <input
                                value={patientInfo.blood_type}
                                onChange={(e) => setPatientInfo({ ...patientInfo, blood_type: e.target.value })}
                                />
                            ) : (
                                patientInfo.blood_type
                            )}
                            </Typography>
                            <Typography>
                            <strong>Dietary Restrictions: </strong>
                            {isEditing ? (
                                <input
                                value={patientInfo.dietary_restrictions}
                                onChange={(e) => setPatientInfo({ ...patientInfo, dietary_restrictions: e.target.value })}
                                />
                            ) : (
                                patientInfo.dietary_restrictions
                            )}
                            </Typography>
                            {/* <Typography><strong>Fitness Level: </strong> </Typography> */}
                            <Typography>
                            <strong>Health Conditions: </strong>
                            {isEditing ? (
                                <input
                                value={patientInfo.medical_conditions}
                                onChange={(e) => setPatientInfo({ ...patientInfo, medical_conditions: e.target.value })}
                                />
                            ) : (
                                patientInfo.medical_conditions
                            )}
                            </Typography>
                            <Typography>
                            <strong>Family History: </strong>
                            {isEditing ? (
                                <input
                                value={patientInfo.family_history}
                                onChange={(e) => setPatientInfo({ ...patientInfo, family_history: e.target.value })}
                                />
                            ) : (
                                patientInfo.family_history
                            )}
                            </Typography>
                            <Typography>
                            <strong>Past Procedures: </strong>
                            {isEditing ? (
                                <input
                                value={patientInfo.past_procedures}
                                onChange={(e) => setPatientInfo({ ...patientInfo, past_procedures: e.target.value })}
                                />
                            ) : (
                                patientInfo.past_procedures
                            )}
                            </Typography>
                            <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setIsEditing(!isEditing)}>
                                    {isEditing ? "Cancel" : "Edit"}
                                    </Button>
                                    {isEditing && (
                                    <Button variant="contained" sx={{ mt: 2, ml: 2 }} onClick={handleSave}>
                                        Save
                                    </Button>
                                    )}                            </Grid>

                            {/* RIGHT COLUMN */}
                            <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography>
                            <strong>Phone:</strong>{" "}
                            {isEditing ? (
                                <input
                                value={patientInfo.mobile_number}
                                onChange={(e) => setPatientInfo({ ...patientInfo, mobile_number: e.target.value })}
                                />
                            ) : (
                                patientInfo.mobile_number
                            )}
                            </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography>
                            <strong>Address:</strong>{" "}
                            {isEditing ? (
                                <input
                                value={patientInfo.patient_address}
                                onChange={(e) => setPatientInfo({ ...patientInfo, patient_address: e.target.value })}
                                />
                            ) : (
                                patientInfo.patient_address
                            )}
                            </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography>
                            <strong>Zip code:</strong>{" "}
                            {isEditing ? (
                                <input
                                value={patientInfo.patient_zipcode}
                                onChange={(e) => setPatientInfo({ ...patientInfo, patient_zipcode: e.target.value })}
                                />
                            ) : (
                                patientInfo.patient_zipcode
                            )}
                            </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography>
                            <strong>City:</strong>{" "}
                            {isEditing ? (
                                <input
                                value={patientInfo.patient_city}
                                onChange={(e) => setPatientInfo({ ...patientInfo, patient_city: e.target.value })}
                                />
                            ) : (
                                patientInfo.patient_city
                            )}
                            </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            {/* <Typography>
                            <strong>Email:</strong>{" "}
                            {isEditing ? (
                                <input
                                value={patientInfo.patient_email}
                                onChange={(e) => setPatientInfo({ ...patientInfo, patient_email: e.target.value })}
                                />
                            ) : (
                                patientInfo.patient_email
                            )}
                            </Typography> */}
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