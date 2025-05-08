import React, { useState, useEffect, useRef } from "react"; 
import Doctor_Navbar from "./doctor_navbar";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Tabs, Tab, Box, Paper, Typography, Button,  TextField} from '@mui/material';
import doc1 from "./doctorim/doctor1.png";
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Select, MenuItem } from '@mui/material';
const apiUrl = process.env.REACT_APP_API_URL;




function DoctorInfo() {




  
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [dailyInfo, setDailyInfo] = useState(null);
    const [weeklyInfo, setWeeklyInfo] = useState(null);
    const doctorId = localStorage.getItem("doctorId");
    const [patientInfo, setPatientInfo] = useState(null);
    const [doctorInfo, setDoctorInfo] = useState(null);

    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMsg, setSnackMsg] = useState("");
    const [snackType, setSnackType] = useState("error");

    // Validation functions
    const validatePhoneNumber = (phone) => {
      const phoneRegex = /^(?:\d{3}-\d{3}-\d{4}|\d{10})$/;
      return phoneRegex.test(phone);
    };

    const validateEmail = (email) => {
      const emailRegex = /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email) && 
            email.split('@')[0].length > 0 && 
            !email.includes('..') && 
            !email.startsWith('.') && 
            !email.split('@')[0].endsWith('.');
    };

    const validateZipCode = (zip) => {
      const usZipRegex = /^\d{5}(-\d{4})?$/;
      return usZipRegex.test(zip);
    };

    const validateGender = (gender) => {
      return ['Male', 'Female', 'Other'].includes(gender);
    };

    const validateYearsOfPractice = (years) => {
      const yearsRegex = /^[0-9]+$/;
      return yearsRegex.test(years) && parseInt(years) >= 0;
    };

    const validatePaymentFee = (fee) => {
      const feeRegex = /^\d+(\.\d{1,2})?$/;
      return feeRegex.test(fee);
    };

    const validateSpecialization = (specialty) => {
      // Should contain letters and not be empty
      const specialtyRegex = /^[a-zA-Z\s]+$/;
      return specialtyRegex.test(specialty) && specialty.trim().length > 0;
    };
    
    const validateYearsOfExperience = (years) => {
      // Should be a positive number between 0 and 100
      const yearsRegex = /^[0-9]+$/;
      const numYears = parseInt(years);
      return yearsRegex.test(years) && numYears >= 0 && numYears <= 100;
    };
    
    const validateAppointmentFee = (fee) => {
      // Should be a positive number with optional 2 decimal places
      const feeRegex = /^\d+(\.\d{1,2})?$/;
      const numFee = parseFloat(fee);
      return feeRegex.test(fee) && numFee > 0;
    };

    const showSnack = (msg, type = "error") => {
      setSnackMsg(msg);
      setSnackType(type);
      setSnackOpen(true);
    };

    const validateLicenseExpDate = (date) => {
      if (!date) return false;
      const expDate = new Date(date);
      const today = new Date();
      return expDate >= today;
    };

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
      doctor_rating: '',
      accepting_patients: '',
      doctor_id: null
    });


    
    

useEffect(() => {
 

  fetch(`${apiUrl}/doctor/${doctorId}`)
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
      // Validate phone number
      if (!validatePhoneNumber(editableDoctorInfo.phone_number)) {
        showSnack("Please enter a valid phone number (e.g., 123-456-7890 or 1234567890)");
        return;
      }
    
      // Validate email
      if (!validateEmail(editableDoctorInfo.email)) {
        showSnack("Please enter a valid email address (e.g., user@example.com)");
        return;
      }
    
      // Validate ZIP code
      if (!validateZipCode(editableDoctorInfo.zipcode)) {
        showSnack("Please enter a valid 5-digit ZIP code");
        return;
      }
    
      // Validate gender
      if (!validateGender(editableDoctorInfo.gender)) {
        showSnack("Gender must be Male, Female, or Other");
        return;
      }
    
      // Validate years of practice
      if (!validateYearsOfPractice(editableDoctorInfo.years_of_practice)) {
        showSnack("Years of practice must be a positive number");
        return;
      }
    
      // Validate payment fee
      if (!validatePaymentFee(editableDoctorInfo.payment_fee)) {
        showSnack("Payment fee must be a valid dollar amount (e.g., 100 or 150.50)");
        return;
      }
    
      // Validate license number

        // Validate specialization
      if (!validateSpecialization(editableDoctorInfo.specialty)) {
        showSnack("Please enter a valid specialization (letters only)");
        return;
      }

      // Validate years of experience
      if (!validateYearsOfExperience(editableDoctorInfo.years_of_practice)) {
        showSnack("Years of experience must be a number between 0 and 100");
        return;
      }

      // Validate appointment fee
      if (!validateAppointmentFee(editableDoctorInfo.payment_fee)) {
        showSnack("Appointment fee must be a positive number (e.g., 100 or 150.50)");
        return;
      }

        // Validate license expiration date
      if (!validateLicenseExpDate(editableDoctorInfo.license_exp_date)) {
        showSnack("License expiration date must be in the future");
        return;
      }
      

      // const dataToSend = {
      //   ...editableDoctorInfo,
      //   doctor_id: parseInt(doctorId),
      //   accepting_patients: parseInt(editableDoctorInfo.accepting_patients),
      //   years_of_practice: parseInt(editableDoctorInfo.years_of_practice),
      //   payment_fee: parseFloat(editableDoctorInfo.payment_fee),
      //   // Format license_exp_date properly
      //   license_exp_date: editableDoctorInfo.license_exp_date 
      //     ? new Date(editableDoctorInfo.license_exp_date).toISOString().split('T')[0]
      //     : null
      // };

      //   // Remove fields that shouldn't be updated
      // delete dataToSend.doctor_rating;
      // delete dataToSend.dob;
      // delete dataToSend.license_num;
    
      try {
        const response = await fetch(`${apiUrl}/edit-doctor`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editableDoctorInfo)
        });
    
        if (!response.ok) throw new Error('Failed to update');
    
        // Now re-fetch the updated doctor info
        const updated = await fetch(`${apiUrl}/doctor/${editableDoctorInfo.doctor_id}`);
        const data = await updated.json();
        setDoctorInfo(data);
        setIsEditing(false);
        showSnack("Doctor information updated successfully!", "success");
      } catch (error) {
        console.error('Update failed:', error);
        showSnack(error.message || "Could not update doctor info.");
      }
    };
    
    

    const handleEditToggle = () => {
      if (!isEditing && doctorInfo) {
        setEditableDoctorInfo({
          first_name: doctorInfo.first_name || '',
          last_name: doctorInfo.last_name || '',
          gender: doctorInfo.gender || '',
          med_school: doctorInfo.med_school || '',
          license_exp_date: doctorInfo.license_exp_date || '',
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
          accepting_patients: doctorInfo.accepting_patients || '',
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
                                <select
                                  name="gender"
                                  value={editableDoctorInfo.gender}
                                  onChange={handleChange}
                                >
                                  <option value="">Select Gender</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                  <option value="Other">Other</option>
                                </select>
                              ) : (
                                doctorInfo.gender
                              )}
                            </Typography>

                            <Typography><strong>Medical License Number:</strong> {doctorInfo.license_num} </Typography>


                            {/* <Typography><strong>Medical License Exp:</strong>{" "}
                              {isEditing ? (
                                <input
                                  type="date"
                                  name="license_exp_date"
                                  value={editableDoctorInfo.license_exp_date ? editableDoctorInfo.license_exp_date.split('T')[0] : ''}
                                  onChange={(e) => {
                                    const date = e.target.value ? new Date(e.target.value).toISOString() : null;
                                    setEditableDoctorInfo(prev => ({
                                      ...prev,
                                      license_exp_date: date
                                    }));
                                  }}
                                  min={new Date().toISOString().split('T')[0]}
                                />
                              ) : (
                                doctorInfo.license_exp_date ? new Date(doctorInfo.license_exp_date).toLocaleDateString() : 'Not set'
                              )}
                            </Typography> */}

                            <Typography><strong>Medical School: </strong>
                              {isEditing ? (
                                <input
                                  name="medical_school"
                                  value={editableDoctorInfo.med_school}
                                  onChange={handleChange}
                                />
                              ) : (
                                doctorInfo.med_school
                              )}
                            </Typography>

                            <Typography><strong>Doctor Rating: </strong> {doctorInfo.doctor_rating} </Typography>

                            {/* Change this line in your Doctor Chart section */}
                            <Typography><strong>Accepting Patients:</strong>{" "} 
                              {doctorInfo.accepting_patients === 1 ? "Yes" : "No"}
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

                            <Typography><strong>Phone:</strong>{" "}
                              {isEditing ? (
                                <input
                                  name="phone_number"
                                  value={editableDoctorInfo.phone_number}
                                  onChange={(e) => {
                                    // Auto-format as user types
                                    const input = e.target.value.replace(/\D/g, ''); // Remove all non-digits
                                    let formatted = input;
                                    
                                    // Format as 123-456-7890 if length > 3 and <= 6
                                    if (input.length > 3 && input.length <= 6) {
                                      formatted = `${input.slice(0, 3)}-${input.slice(3)}`;
                                    } 
                                    // Format as 123-456-7890 if length > 6
                                    else if (input.length > 6) {
                                      formatted = `${input.slice(0, 3)}-${input.slice(3, 6)}-${input.slice(6, 10)}`;
                                    }
                                    
                                    setEditableDoctorInfo({...editableDoctorInfo, phone_number: formatted});
                                  }}
                                  maxLength="12" // 123-456-7890 is 12 chars
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
                                <Typography><strong>Zip code: </strong>
                                {isEditing ? (
                                  <input
                                    name="zipcode"
                                    value={editableDoctorInfo.zipcode}
                                    onChange={handleChange}
                                    onBlur={(e) => {
                                      if (!validateZipCode(e.target.value)) {
                                        showSnack("Please enter a valid 5-digit ZIP code");
                                      }
                                    }}
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
                                <Typography><strong>Email:</strong>
                              {isEditing ? (
                                <input
                                  name="email"
                                  value={editableDoctorInfo.email}
                                  onChange={handleChange}
                                  onBlur={(e) => {
                                    if (!validateEmail(e.target.value)) {
                                      showSnack("Please enter a valid email address (e.g., user@example.com)");
                                    }
                                  }}
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
                                onBlur={(e) => {
                                  if (!validateSpecialization(e.target.value)) {
                                    showSnack("Specialization should contain only letters");
                                  }
                                }}
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
                              type="number"
                              min="0"
                              max="100"
                              value={editableDoctorInfo.years_of_practice}
                              onChange={handleChange}
                              onBlur={(e) => {
                                if (!validateYearsOfExperience(e.target.value)) {
                                  showSnack("Years must be a number between 0 and 100");
                                }
                              }}
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
                              type="number"
                              min="0"
                              step="0.01"
                              value={editableDoctorInfo.payment_fee}
                              onChange={handleChange}
                              onBlur={(e) => {
                                if (!validateAppointmentFee(e.target.value)) {
                                  showSnack("Fee must be a positive number (e.g., 100 or 150.50)");
                                }
                              }}
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
            <Snackbar
              open={snackOpen}
              autoHideDuration={4000}
              onClose={() => setSnackOpen(false)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert onClose={() => setSnackOpen(false)} severity={snackType} sx={{ width: '100%' }}>
                {snackMsg}
              </Alert>
            </Snackbar>
        </div>
    );

}

export default DoctorInfo;