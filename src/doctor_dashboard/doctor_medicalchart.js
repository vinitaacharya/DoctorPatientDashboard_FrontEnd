import React, { useState, useEffect, useRef } from "react"; 
import Doctor_Navbar from "./doctor_navbar";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Tabs, Tab, Box, Paper, Typography, Button,  TextField} from '@mui/material';
import doc1 from "./doctorim/doctor1.png";
import Divider from '@mui/material/Divider';






function Doctor_Chart() {
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [dailyInfo, setDailyInfo] = useState(null);
    const [weeklyInfo, setWeeklyInfo] = useState(null);
    const doctorId = localStorage.getItem("doctorId");
    const [patientInfo, setPatientInfo] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        specialization: '',
        experience: '',
        fee: '',
        rating: '',
        about: ''
    });
 const [doctorInfo, setDoctorInfo] = useState(null);

useEffect(() => {
 

  fetch(`http://localhost:5000/doctor/${doctorId}`)
    .then((res) => res.json())
    .then((data) => {
      setDoctorInfo(data);
    })
    .catch((error) => {
      console.error('Error fetching doctor info:', error);
    });
}, []);

 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        console.log('Saving form data:', formData);
        // Save logic here
    };


    return(
        <div>
            <Doctor_Navbar/>
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
                    label="Doctor Chart"
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
                    label="About Me"
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
                {activeTab === 0 && doctorInfo && (
                    <Box sx={{background: '#EEF2FE', flexGrow: 1, p: 3 }}>
                        <Typography variant="h6" gutterBottom>Doctor Chart</Typography>

                        <Grid container spacing={4}>
                            {/* LEFT COLUMN */}
                            <Grid item xs={12} md={6}>
               
                            <Typography><strong>Doctor Name:</strong> {doctorInfo.first_name} {doctorInfo.last_name}</Typography>
                            <Typography><strong>DOB:</strong> {new Date(doctorInfo.dob).toLocaleDateString()}</Typography>
                            <Typography><strong>Gender:</strong> {doctorInfo.gender}</Typography>
                            <Typography><strong>Height:</strong> 5'3"</Typography>
                            <Typography><strong>Medical License Number:</strong> {doctorInfo.license_num}</Typography>
        <Typography><strong>Medical License Exp:</strong> {new Date(doctorInfo.license_exp_date).toLocaleDateString()}</Typography>
        <Typography><strong>Medical School:</strong> {doctorInfo.med_school}</Typography>
        <Typography><strong>Years in Practice:</strong> {doctorInfo.years_of_practice}</Typography>
        <Typography><strong>Payment Fee:</strong> ${doctorInfo.payment_fee}</Typography>
        <Typography><strong>Specialty:</strong> {doctorInfo.specialty}</Typography>
                            <Button variant="outlined" sx={{ mt: 2 }}>Edit</Button>
                            </Grid>

                            {/* RIGHT COLUMN */}
                            <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography><strong>Phone:</strong> {doctorInfo.phone_number}</Typography>                                <Button variant="outlined" size="small">Edit</Button>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography><strong>Address:</strong> {doctorInfo.address}</Typography>
                            <Button variant="outlined" size="small">Edit</Button>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography><strong>Zip Code:</strong> {doctorInfo.zipcode}</Typography>
                            <Button variant="outlined" size="small">Edit</Button>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography><strong>City:</strong> {doctorInfo.city}</Typography>
                            <Button variant="outlined" size="small">Edit</Button>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography><strong>Email:</strong> {doctorInfo.email}</Typography>
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
  <Box sx={{ background: '#EEF2FE',minHeight:"68vh" ,py: 4 }}>
    <Grid container justifyContent="center">
      <Grid item xs={12} md={10} lg={8}>
          <Grid container spacing={3} alignItems="center">
            {/* Doctor Image */}
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                component="img"
                src={doc1}
                alt="Doctor"
                sx={{
                  height: '25vh',
                  width: '25vh',
                  borderRadius: '30%',
                  objectFit: 'cover',
                }}
              />
            </Grid>

            {/* Doctor Info */}
            <Grid item xs={12} md={8}>
              <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: 'Montserrat' }}>
                Dr. {doctorInfo.first_name} {doctorInfo.last_name}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>Specialization:</strong> {doctorInfo.specialty || "N/A"}
              </Typography>
              <Typography variant="body2">
                <strong>Years of Experience:</strong> {doctorInfo.years_of_practice} years
              </Typography>
              <Typography variant="body2">
                <strong>Appointment Fee:</strong> ${doctorInfo.payment_fee}
              </Typography>
            </Grid>
          </Grid>

          {/* Divider */}
          <Divider sx={{ my: 3 }} />

          {/* About Section */}
          <Typography variant="body2">
            <strong>About:</strong><br />
            {doctorInfo.description}
          </Typography>

      </Grid>

    </Grid>
    <Button sx={{mt:'10vh',ml:'60vh'}} variant="outlined" size="small">Edit</Button>

  </Box>
)}




                </Box>
                </Paper>
            </Box>
        </div>
    );

}

export default Doctor_Chart;