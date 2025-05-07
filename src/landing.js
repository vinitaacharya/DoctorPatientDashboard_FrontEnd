import React, { useState, useEffect } from "react";
import "./landing.css";
import heroImage from "./assets/heroimage.png";
import patient1 from "./assets/patient1.png";
import patient2 from "./assets/patient2.png";
import patient3 from "./assets/patient3.png";

import doctor1 from "./assets/doctor1.png";
import doctor2 from "./assets/doctor2.png";
import doctor3 from "./assets/doctor3.png";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Collapse,
} from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Landing() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [openAbout, setOpenAbout] = useState(false);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/doctors')
      .then(response => response.json())
      .then(data => {
        const topDoctors = data.sort((a, b) => b.doctor_rating - a.doctor_rating).slice(0, 3);
        setDoctors(topDoctors);
      })
      .catch(error => console.error("Error fetching doctor data:", error));
  }, []);

  const handleOpenAbout = (doctor) => {
    setSelectedDoctor(doctor);
    setOpenAbout(true);
  };

  const handleCloseAbout = () => {
    setOpenAbout(false);
    setSelectedDoctor(null);
  };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openLogin, setOpenLogin] = React.useState(false);
    const handleOpenLogin = () => setOpenLogin(true);
    const handleCloseLogin = () => setOpenLogin(false);

    const [openPatientLogin, setOpenPatientLogin] = React.useState(false);
    const handleOpenPatientLogin = () => setOpenPatientLogin(true);
    const handleClosePatientLogin = () => setOpenPatientLogin(false);

    const [openDoctorLogin, setOpenDoctorLogin] = React.useState(false);
    const handleOpenDoctorLogin = () => setOpenDoctorLogin(true);
    const handleCloseDoctorLogin = () => setOpenDoctorLogin(false);

    const [openPharmacyLogin, setOpenPharmacyLogin] = React.useState(false);
    const handleOpenPharmacyLogin = () => setOpenPharmacyLogin(true);
    const handleClosePharmacyLogin = () => setOpenPharmacyLogin(false);

      const [values, setValues] = useState({
        email: '',
        password: ''
    })
    
    const navigate = useNavigate()
    const handleLogin = async (email, password) => {
      try {
        const response = await fetch('http://127.0.0.1:5000/login-patient', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          // Save patient ID (and optionally, email or token)
          console.log("Patient ID returned from backend:", data.patient_id); // ✅ debug line
          localStorage.setItem("patientId", data.patient_id);
          localStorage.removeItem("doctorId");

          // Redirect to dashboard
          navigate("/patient_dashboard/patient_landing");
        } else {
          alert(data.error || "Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred. Please try again.");
      }
    };

    const handleLogin2 = async (email, password) => {
      try {
        const response = await fetch('http://127.0.0.1:5000/login-doctor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          // Save patient ID (and optionally, email or token)
          console.log("Doctor ID returned from backend:", data.doctor_id); // ✅ debug line
          localStorage.setItem("doctorId", data.doctor_id);
          localStorage.removeItem("patientId");
          // Redirect to dashboard
          navigate("/doctor_dashboard/doctor_landing");
        } else {
          alert(data.error || "Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred. Please try again.");
      }
    };

    const handleLogin3 = async (email, password) => {
      try {
        const response = await fetch('http://127.0.0.1:5000/login-pharmacy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          // Save patient ID (and optionally, email or token)
          localStorage.setItem("pharmacyId", data.pharmacy_id);
          // Redirect to dashboard
          navigate("/pharmacy/pharmacy_landing");
        } else {
          alert(data.error || "Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred. Please try again.");
      }
    };


  // const [doctors, setDoctors] = useState([]);
  // useEffect(() => {
  //   fetch('http://127.0.0.1:5000/doctors')
  //     .then(response => response.json())
  //     .then(data => {
  //       // Sort by doctor_rating (descending) and take top 3
  //       const topDoctors = data
  //         .sort((a, b) => b.doctor_rating - a.doctor_rating)
  //         .slice(0, 3);
  //       setDoctors(topDoctors);
  //     })
  //     .catch(error => {
  //       console.error("Error fetching doctor data:", error);
  //     });
  // }, []);

  
    const [expandedIndex, setExpandedIndex] = useState(null); // track which card is expanded
  
    useEffect(() => {
      fetch('http://127.0.0.1:5000/doctors')
        .then(response => response.json())
        .then(data => {
          const topDoctors = data.sort((a, b) => b.doctor_rating - a.doctor_rating).slice(0, 3);
          setDoctors(topDoctors);
        })
        .catch(error => console.error("Error fetching doctor data:", error));
    }, []);
  
    const toggleExpand = (index) => {
      setExpandedIndex(expandedIndex === index ? null : index);
    };

  return (
    <div id="sizeScreen">
    <div className="Landing">
      <div className="landingnav">
        <h2>DPP</h2>
      </div>
      <div className="landinghero">
        <div className="herotext">
            <h3>Have Access To A Health Professional at Any Time</h3>
            <div className="herobuttons">
            {/*Login Buttons*/}
            <Button className="herobutton" onClick={handleOpenLogin}>Login</Button>
                <Modal
                  open={openLogin}
                  onClose={handleCloseLogin}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  {/*opens first popup asking if youre a doctor/patient*/}
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" color="black">
                      Are you a patient or a doctor? Or logging into a pharmacy?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>

                    {/*If you select patient*/}
                    <Button className="patientlgn btn-info" onClick={handleOpenPatientLogin}> Patient </Button>
                          <Modal
                            open={openPatientLogin}
                            onClose={handleClosePatientLogin}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <Typography id="modal-modal-title" variant="h6" component="h2" color="black">
                                Patient Login
                              </Typography>
                                    <div className='labels'>
                                        <label className = 'def-label' style={{background: "#54a0ff", color: "white"}} htmlFor="first_name">Email: </label>
                                        <input type='text'
                                        name='email'
                                        className="form-control" 
                                        placeholder='Enter Email'
                                        value={values.email}
                                        onChange={e => setValues({...values, email: e.target.value})}/>
                                    </div>
                                    <div className='labels'>
                                        <label className = 'def-label' style={{background: "#54a0ff", color: "white"}} htmlFor="first_name">Password: </label>
                                        <input type='password'
                                        name='password'
                                        className="form-control" 
                                        placeholder='Enter Password'
                                        value={values.password}
                                        onChange={e => setValues({...values, password: e.target.value})}/>
                                    </div>
                                    <button className="patientlogin btn-info" style={{background: 'teal'}} onClick={() => handleLogin(values.email, values.password)}>
                                            Login
                                    </button>
                            </Box>
                          </Modal>
                          
                  
                    {/*If you select doctor*/}
                    <Button className="doctorlgn btn-info" onClick={handleOpenDoctorLogin}> Doctor </Button>
                          <Modal
                            open={openDoctorLogin}
                            onClose={handleCloseDoctorLogin}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <Typography id="modal-modal-title" variant="h6" component="h2" color="black">
                                Doctor Login
                              </Typography>
                                    <div className='labels'>
                                        <label className = 'def-label' style={{background: "#54a0ff", color: "white"}} htmlFor="first_name">Email: </label>
                                        <input type='text'
                                        name='email'
                                        className="form-control" 
                                        placeholder='Enter Email'
                                        value={values.email}
                                        onChange={e => setValues({...values, email: e.target.value})}/>
                                    </div>
                                    <div className='labels'>
                                        <label className = 'def-label' style={{background: "#54a0ff", color: "white"}} htmlFor="first_name">Password: </label>
                                        <input type='password'
                                        name='password'
                                        className="form-control" 
                                        placeholder='Enter Password'
                                        value={values.password}
                                        onChange={e => setValues({...values, password: e.target.value})}/>
                                    </div>
                                    <button className="patientlogin btn-info" onClick={() => handleLogin2(values.email, values.password)}>
                                            Login
                                    </button>
                            </Box>
                          </Modal>
                          
                          {/*Selecting pharmacy*/} 
                          <Button className="patientlgn btn-info" onClick={handleOpenPharmacyLogin}> Pharmacy </Button>
                          <Modal
                            open={openPharmacyLogin}
                            onClose={handleClosePharmacyLogin}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <Typography id="modal-modal-title" variant="h6" component="h2" color="black">
                                Pharmacy Login
                              </Typography>
                                    <div className='labels'>
                                        <label className = 'def-label' style={{background: "#54a0ff", color: "white"}} htmlFor="first_name">Email: </label>
                                        <input type='text'
                                        name='email'
                                        className="form-control" 
                                        placeholder='Enter Email'
                                        value={values.email}
                                        onChange={e => setValues({...values, email: e.target.value})}/>
                                    </div>
                                    <div className='labels'>
                                        <label className = 'def-label' style={{background: "#54a0ff", color: "white"}} htmlFor="first_name">Password: </label>
                                        <input type='password'
                                        name='password'
                                        className="form-control" 
                                        placeholder='Enter Password'
                                        value={values.password}
                                        onChange={e => setValues({...values, password: e.target.value})}/>
                                    </div>
                                    <button className="patientlogin btn-info" style={{background: 'teal'}} onClick={() => handleLogin3(values.email, values.password)}>
                                            Login
                                    </button>
                            </Box>
                          </Modal>
                    </Typography>
                  </Box>
                </Modal>

                {/*Sign Up Buttons*/}
                <Button className="herobutton" onClick={handleOpen}>Sign Up</Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" color="black">
                      Are you a patient or a doctor?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <button className="patientbtn btn-info" onClick={() => navigate('/patientsignup')}>
                        Patient
                    </button>
                    <button className="doctorbtn btn-info" onClick={() => navigate('/doctorsignup')}>
                        Doctor
                    </button>
                    <button className="patientbtn btn-info" onClick={() => navigate('/pharmacysignup')}>
                        Pharmacy
                    </button>
                    </Typography>
                  </Box>
                </Modal>
            </div>
        </div>
        <div className="heroimage">
            <img src={heroImage} alt="doctor point" className="doctorherod"/>
        </div>
      </div>
      
      <div className="aboutdiv">
        <div className="content">
        <h4>About Us</h4>
        <hr></hr>
        <p className="abouttext">We are a specialized team of individuals trying to make sure you live a healthy life! No more struggling with weight issues, If you want the secret to a long lasting life you wont be regretting this!</p>
        </div>
      </div>

      <div className="patienttest">
        <h4 className="white">Patient Testimontials</h4>
        <div className="testcards">
          <div className="patientcard">
            <img src={patient1} alt="patient" className="patientimage"/>
            <p class="patienttext">"I used to be heavily overweight and it sucked. Now after a few appointments I was able to get my life together. I even donated $100M"</p>
          </div>
          <div className="patientcard">
            <img src={patient2} alt="patient" className="patientimage"/>
            <p class="patienttext">"I used to be heavily overweight and it sucked. Now after a few appointments I was able to get my life together. I even donated $100M"</p>
          </div>
          <div className="patientcard">
            <img src={patient3} alt="patient" className="patientimage"/>
            <p class="patienttext">"I used to be heavily overweight and it sucked. Now after a few appointments I was able to get my life together. I even donated $100M"</p>
          </div>
        </div>
      </div>


      
      <div className="doctortest">
      <h4>Meet Our Top Rated Doctors</h4>
      <div className="testcards">
        {doctors.map((doc, index) => (
          <div className="patientcard" key={index}>
            <img
              src={doctor1} // Or: `data:image/jpeg;base64,${doc.doctor_picture}`
              alt={`${doc.first_name} ${doc.last_name}`}
              className="patientimage"
            />
            <p className="patienttext" id="black">
              Dr. {doc.first_name} {doc.last_name}<br />
              {doc.specialty}<br />
              Rating: {doc.doctor_rating}/5
            </p>
            <Button sx={{marginTop:'1.5vh'}} variant="outlined" onClick={() => handleOpenAbout(doc)}>Learn More</Button>
          </div>
        ))}
      </div>

      {/* MUI Modal */}
<Modal open={openAbout} onClose={handleCloseAbout} aria-labelledby="doctor-modal-title">
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: { xs: 350, sm: 450 },
      bgcolor: '#FFFFFF',
      borderRadius: 3,
      boxShadow: 24,
      p: 4,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      borderTop: '6px solid  #5C8CC6', // A subtle purple accent line
    }}
  >
    {selectedDoctor && (
      <>
        {/* Optional: Doctor Image */}
        {/* <img src={`data:image/jpeg;base64,${selectedDoctor.doctor_picture}`} alt="Doctor" style={{ width: '100%', borderRadius: 8, marginBottom: 16 }} /> */}

        <Typography
          id="doctor-modal-title"
          variant="h5"
          fontWeight="bold"
          color="black"
        >
          Dr. {selectedDoctor.first_name} {selectedDoctor.last_name}
        </Typography>

        <Typography variant="subtitle1" color="#5C8CC6">
          {selectedDoctor.specialty}
        </Typography>

        <Typography variant="body1" color="text.primary">
          <strong>Description:</strong> {selectedDoctor.description}
        </Typography>

        <Typography variant="body1" color="text.primary">
          <strong>Years of Practice:</strong> {selectedDoctor.years_of_practice}
        </Typography>

        <Typography variant="body1" color="text.primary">
          <strong>Medical School:</strong> {selectedDoctor.med_school}
        </Typography>

        <Typography variant="body1" color="text.primary">
          <strong>Accepting New Patients:</strong> {selectedDoctor.accepting_patients ? "Yes" : "No"}
        </Typography>

        <Button
          variant="contained"
          onClick={handleCloseAbout}
          sx={{
            alignSelf: 'flex-end',
            mt: 2,
            backgroundColor:'#5C8CC6',
  
          }}
        >
          Close
        </Button>
      </>
    )}
  </Box>
</Modal>


    </div>
    </div>
    </div>
  );
}

export default Landing;
