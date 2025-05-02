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
    const [doctorInfo, setDoctorInfo] = useState(null);

    const [editableDoctorInfo, setEditableDoctorInfo] = useState({
      first_name: '',
      last_name: '',
      dob: '',
      gender: '',
      license_num: '',
      license_exp_date: '',
      med_school: '',
      specialty: '',
      years_of_practice: '',
      payment_fee: '',
      description: '',
      email: '',
      phone_number: '',
      address: '',
      zipcode: '',
      city: '',
      state: '',
      doctor_id: null
    });
    
    

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
        setEditableDoctorInfo((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
      try {
        const response = await fetch(`http://localhost:5000/doctor/${editableDoctorInfo.doctor_id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editableDoctorInfo)
        });
    
        if (!response.ok) throw new Error('Failed to update');
    
        const updated = await response.json();
        setDoctorInfo(updated);  // Update the main display state
        setIsEditing(false);
        alert('Doctor info updated!');
      } catch (error) {
        console.error('Update failed:', error);
        alert('Could not update doctor info.');
      }
    };
    

    const handleEditToggle = () => {
      if (!isEditing && doctorInfo) {
        setEditableDoctorInfo({
          first_name: doctorInfo.first_name || '',
          last_name: doctorInfo.last_name || '',
          dob: doctorInfo.dob || '',
          gender: doctorInfo.gender || '',
          license_num: doctorInfo.license_num || '',
          license_exp_date: doctorInfo.license_exp_date || '',
          med_school: doctorInfo.med_school || '',
          specialty: doctorInfo.specialty || '',
          years_of_practice: doctorInfo.years_of_practice || '',
          payment_fee: doctorInfo.payment_fee || '',
          description: doctorInfo.description || '',
          email: doctorInfo.email || '',
          phone_number: doctorInfo.phone_number || '',
          address: doctorInfo.address || '',
          zipcode: doctorInfo.zipcode || '',
          city: doctorInfo.city || '',
          state: doctorInfo.state || '',
          doctor_id: doctorInfo.doctor_id || null
        });
      }
      setIsEditing(!isEditing);
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
               
                            <Typography><strong>Doctor Name:</strong>{" "}
                              {isEditing ? (
                                <>
                                  <input
                                    name="first_name"
                                    value={editableDoctorInfo.first_name}
                                    onChange={handleChange}
                                    style={{ marginRight: '8px' }}
                                  />
                                  <input
                                    name="last_name"
                                    value={editableDoctorInfo.last_name}
                                    onChange={handleChange}
                                  />
                                </>
                              ) : (
                                `${doctorInfo.first_name} ${doctorInfo.last_name}`
                              )}
                            </Typography>
                            <Typography><strong>DOB:</strong> {new Date(doctorInfo.dob).toLocaleDateString()}</Typography>
                            <Typography><strong>Gender: </strong>
                              {isEditing ? (
                                <input
                                  name="gender"
                                  value={editableDoctorInfo.gender}
                                  onChange={handleChange}
                                />
                              ) : (
                                doctorInfo.gender
                              )}
                            </Typography>

                            <Typography><strong>Medical License Number:</strong>
                              {isEditing ? (
                                <input
                                  name="license_num"
                                  value={editableDoctorInfo.license_num}
                                  onChange={handleChange}
                                />
                              ) : (
                                doctorInfo.license_num
                              )}
                            </Typography>

                            <Typography><strong>Phone:</strong>
                              {isEditing ? (
                                <input
                                  name="phone_number"
                                  value={editableDoctorInfo.phone_number}
                                  onChange={handleChange}
                                />
                              ) : (
                                doctorInfo.phone_number
                              )}
                            </Typography>

                            <Typography><strong>Address:</strong>
                              {isEditing ? (
                                <input
                                  name="address"
                                  value={editableDoctorInfo.address}
                                  onChange={handleChange}
                                />
                              ) : (
                                doctorInfo.address
                              )}
                            </Typography>

                            <Typography><strong>Zip code:</strong>
                              {isEditing ? (
                                <input
                                  name="zipcode"
                                  value={editableDoctorInfo.zipcode}
                                  onChange={handleChange}
                                />
                              ) : (
                                doctorInfo.zipcode
                              )}
                            </Typography>

                            <Typography><strong>City:</strong>
                              {isEditing ? (
                                <input
                                  name="city"
                                  value={editableDoctorInfo.city}
                                  onChange={handleChange}
                                />
                              ) : (
                                doctorInfo.city
                              )}
                            </Typography>

                            <Typography><strong>Email:</strong>
                              {isEditing ? (
                                <input
                                  name="email"
                                  value={editableDoctorInfo.email}
                                  onChange={handleChange}
                                />
                              ) : (
                                doctorInfo.email
                              )}
                            </Typography>

                            <Button variant="outlined" sx={{ mt: 2 }} onClick={handleEditToggle}>
                              {isEditing ? "Cancel" : "Edit"}
                            </Button>
                            {isEditing && (
                              <Button variant="contained" sx={{ mt: 2, ml: 2 }} onClick={handleSave}>
                                Save
                              </Button>
                            )}

                            </Grid>

                            {/* RIGHT COLUMN */}
                            <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography>
                                                        <strong>Phone:</strong>{" "}
                                                        {isEditing ? (
                                                            <input
                                                            value={editableDoctorInfo.phone_number}
                                                            onChange={(e) => setEditableDoctorInfo({ ...setEditableDoctorInfo, phone_number: e.target.value })}
                                                            />
                                                        ) : (
                                                            doctorInfo.phone_number

                                                        )}
                                                        </Typography>
                                                        </Box>
                            
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                                        <Typography>
                                                        <strong>Address:</strong>{" "}
                                                        {isEditing ? (
                                                            <input
                                                            value={editableDoctorInfo.address}
                                                            onChange={(e) => setEditableDoctorInfo({ ...setEditableDoctorInfo, address: e.target.value })}
                                                            />
                                                        ) : (
                                                            doctorInfo.address
                                                        )}
                                                        </Typography>
                                                        </Box>
                            
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                                        <Typography>
                                                        <strong>Zip code:</strong>{" "}
                                                        {isEditing ? (
                                                            <input
                                                            value={editableDoctorInfo.zipcode}
                                                            onChange={(e) => setEditableDoctorInfo({ ...setEditableDoctorInfo, zipcode: e.target.value })}
                                                            />
                                                        ) : (
                                                            doctorInfo.zipcode
                                                        )}
                                                        </Typography>
                                                        </Box>
                            
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                                        <Typography>
                                                        <strong>City:</strong>{" "}
                                                        {isEditing ? (
                                                            <input
                                                            value={editableDoctorInfo.city}
                                                            onChange={(e) => setEditableDoctorInfo({ ...setEditableDoctorInfo, city: e.target.value })}
                                                            />
                                                        ) : (
                                                            doctorInfo.city
                                                        )}
                                                        </Typography>
                                                        </Box>
                            
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                                        <Typography>
                                                        <strong>Email:</strong>{" "}
                                                        {isEditing ? (
                                                            <input
                                                            value={editableDoctorInfo.email}
                                                            onChange={(e) => setEditableDoctorInfo({ ...setEditableDoctorInfo, email: e.target.value })}
                                                            />
                                                        ) : (
                                                            doctorInfo.email
                                                        )}
                                                        </Typography>
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
          <Typography variant="body2" sx={{ mb: 2 }}>
            <strong>Specialization:</strong>{" "}
            {isEditing ? (
              <input
                name="specialty"
                value={editableDoctorInfo.specialty}
                onChange={handleChange}
              />
            ) : (
              doctorInfo.specialty
            )}
          </Typography>

          <Typography variant="body2" sx={{ mb: 2 }}>
            <strong>Years of Experience:</strong>{" "}
            {isEditing ? (
              <input
                name="years_of_practice"
                value={editableDoctorInfo.years_of_practice}
                onChange={handleChange}
              />
            ) : (
              doctorInfo.years_of_practice
            )}
          </Typography>

          <Typography variant="body2" sx={{ mb: 2 }}>
            <strong>Appointment Fee:</strong>{" "}
            {isEditing ? (
              <input
                name="payment_fee"
                value={editableDoctorInfo.payment_fee}
                onChange={handleChange}
              />
            ) : (
              `$${doctorInfo.payment_fee}`
            )}
          </Typography>



            </Grid>
          </Grid>

          {/* Divider */}
          <Divider sx={{ my: 3 }} />

          {/* About Section */}
          <Typography variant="body2" sx={{ mb: 2 }}>
            <strong>About:</strong><br />
            {isEditing ? (
              <textarea
                name="description"
                value={editableDoctorInfo.description}
                onChange={handleChange}
                rows={4}
                style={{ width: '100%', resize: 'vertical' }}
              />
            ) : (
              doctorInfo.description
            )}
          </Typography>

          <Button variant="outlined" onClick={handleEditToggle} sx={{ mt: 2 }}>
            {isEditing ? "Cancel" : "Edit"}
          </Button>
          {isEditing && (
            <Button variant="contained" sx={{ mt: 2, ml: 2 }} onClick={handleSave}>
              Save
            </Button>
          )}

      </Grid>

    </Grid>


  </Box>
)}




                </Box>
                </Paper>
            </Box>
        </div>
    );

}

export default Doctor_Chart;