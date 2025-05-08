import React, { lazy, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./doctorsignup.css";
import Checkbox from '@mui/material/Checkbox';
import { Table, TableRow } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Modal from '@mui/material/Modal'; 
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const apiUrl = process.env.REACT_APP_API_URL;

function Doctorsignup() {
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

  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    dob: '',
    gender: '',
    license_num: '',
    license_exp_date: '',
    med_school: '',
    years_of_practice: '',
    payment_fee: '',
    specialty: ''
  });

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [gender, setGender] = React.useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackType, setSnackType] = useState("error");

  const showSnack = (msg, type = "error") => {
    setSnackMsg(msg);
    setSnackType(type);
    setSnackOpen(true);
  };

  const handleChange2 = (event: SelectChangeEvent) => {
    setGender(event.target.value);
    setValues({...values, gender: event.target.value});
  };

  // Validation functions
  const validateZipCode = (zip) => {
    const usZipRegex = /^\d{5}(-\d{4})?$/;
    return usZipRegex.test(zip);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(?:\d{3}-\d{3}-\d{4}|\d{10})$/;
    return phoneRegex.test(phone);
  };

  const validateLicenseNumber = (license) => {
    // Only allow numbers of any length
    const licenseRegex = /^[0-9]*$/;
    return licenseRegex.test(license) && license.length > 0; // Ensure it's not empty
  };

  const validateYearsOfPractice = (years) => {
    const yearsRegex = /^[0-9]+$/;
    return yearsRegex.test(years) && parseInt(years) >= 0;
  };

  const validatePaymentFee = (fee) => {
    const feeRegex = /^\d+(\.\d{1,2})?$/;
    return feeRegex.test(fee);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) && 
           email.split('@')[0].length > 0 && 
           !email.includes('..') && 
           !email.startsWith('.') && 
           !email.split('@')[0].endsWith('.');
  };
  
  // Add these new validation functions
  const validateMedicalSchool = (school) => {
    // Basic check to ensure it's not just numbers
    const hasLetters = /[a-zA-Z]/.test(school);
    return hasLetters && school.trim().length > 0;
  };



  const savedoctor = (e) => {
    e.preventDefault();
  
    if (!termsAccepted) {
      showSnack("Please accept the terms and conditions.");
      return;
    }

    // Validate ZIP code
    if (!validateZipCode(values.zip)) {
      showSnack("Please enter a valid 5-digit ZIP code");
      return;
    }

    // Validate phone number
    if (!validatePhoneNumber(values.phone)) {
      showSnack("Please enter a valid phone number (e.g., 123-456-7890 or 1234567890)");
      return;
    }

    // Validate years of practice
    if (!validateYearsOfPractice(values.years_of_practice)) {
      showSnack("Years of practice must be a positive number");
      return;
    }

    // Validate payment fee
    if (!validatePaymentFee(values.payment_fee)) {
      showSnack("Payment fee must be a valid dollar amount (e.g., 100 or 150.50)");
      return;
    }

    // Validate email
    if (!validateEmail(values.email)) {
      showSnack("Please enter a valid email address (e.g., user@example.com)");
      return;
    }

    if (!termsAccepted) {
      showSnack("Please accept the terms and conditions.");
      return;
    }
  
    // Validate medical school
    if (!validateMedicalSchool(values.med_school)) {
      showSnack("Please enter a valid medical school name");
      return;
    }
  
    // Validate license number (numbers only)
    if (!validateLicenseNumber(values.license_num)) {
      showSnack("License number must contain only numbers");
      return;
    }

    const today = new Date();
    const dob = new Date(values.dob);
    const licenseExp = new Date(values.license_exp_date);
  
    if (dob > today) {
      showSnack("Date of birth cannot be in the future.");
      return;
    }
  
    if (licenseExp < today) {
      showSnack("License expiration date must be in the future.");
      return;
    }

    setLoading(true);
  
    const fullData = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
      description: "",
      license_num: values.license_num,
      license_exp_date: values.license_exp_date,
      dob: values.dob,
      med_school: values.med_school,
      years_of_practice: values.years_of_practice,
      specialty: values.specialty,
      payment_fee: values.payment_fee,
      gender: values.gender,
      phone_number: values.phone,
      address: values.address,
      zipcode: values.zip,
      city: values.city,
      state: values.state
    };
    
    fetch(`${apiUrl}/register-doctor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(fullData)
    })
      .then(res => res.json())
      .then(response => {
        if (response.message) {
          showSnack("Account created successfully!", "success");
          navigate('/landing');
        } else {
          throw new Error(response.error || "Something went wrong");
        }
      })
      .catch(async (error) => {
        const errMsg = error?.message || "Couldn't create user, please double check the fields and try again.";
        showSnack(errMsg);
        console.error("Error:", errMsg);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div className="SignUp">
        <div className="signupnav">
          <h2>DPP</h2>
          <h2 className="title">Doctor Signup</h2>
        </div>

        <form className="form-container" onSubmit={savedoctor}>
          <div className="signuptop">
            <div className="info-container">
              {/* Left Section: Basic Info */}
              <div className="basic-info">
                <h1>Basic Information</h1>
                <div className='labels'>
                  <label className='def-label' htmlFor="first_name">First Name: </label>
                  <input 
                    type='text'
                    name='first_name'
                    className="form-control" 
                    placeholder='Enter First Name'
                    value={values.first_name}
                    onChange={e => setValues({...values, first_name: e.target.value})}
                    required
                  />
                </div>
                <div className='labels'>
                  <label className='def-label' htmlFor="last_name">Last Name: </label>
                  <input 
                    type='text'
                    name='last_name'
                    className="form-control" 
                    placeholder='Enter Last Name'
                    value={values.last_name}
                    onChange={e => setValues({...values, last_name: e.target.value})}
                    required
                  />
                </div>

                {/*Make the fields horizontal */}
                <div className='horizontal-bar'>
                  <div className='labels'>
                    <label htmlFor="dob" className='short-label'>DOB: </label>
                    <input 
                      type='date'
                      name='dob'
                      className="form-control-dob" 
                      placeholder='Enter DOB'
                      value={values.dob}
                      onChange={e => setValues({...values, dob: e.target.value})}
                      required
                    />
                  </div>
                  <div className='labels'>
                    <label htmlFor="gender" className='gender-label'>Gender: </label>
                    <Select
                      className="form-control-select"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={gender}
                      onChange={handleChange2}
                      displayEmpty
                      renderValue={(selected) => selected ? selected : "Select Gender"}
                      required
                    >
                      <MenuItem value='Male'>Male</MenuItem>
                      <MenuItem value='Female'>Female</MenuItem>
                      <MenuItem value='Other'>Other</MenuItem>
                    </Select>
                  </div>
                </div>

                {/*Normal Now */}
                <div className='labels'>
                  <label className='def-label' htmlFor="phone">Phone: </label>
                  <input 
                    type='tel'
                    name='phone'
                    className="form-control" 
                    placeholder='Enter phone number'
                    pattern="^(?:\d{3}-\d{3}-\d{4}|\d{10})$"
                    title="Please enter a valid phone number (e.g., 123-456-7890 or 1234567890)"
                    value={values.phone}
                    onChange={e => {
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
                      
                      setValues({...values, phone: formatted});
                    }}
                    maxLength="12" // 123-456-7890 is 12 chars
                    onBlur={(e) => {
                      if (!validatePhoneNumber(e.target.value)) {
                        showSnack("Please enter a valid phone number (e.g., 123-456-7890 or 1234567890)");
                      }
                    }}
                    required
                  />
                </div>
                <div className='labels'>
                  <label className='def-label' htmlFor="address">Address: </label>
                  <input 
                    type='text'
                    name='address'
                    className="form-control" 
                    placeholder='Enter your address'
                    value={values.address}
                    onChange={e => setValues({...values, address: e.target.value})}
                    required
                  />
                </div>

                {/*Make fields horizontal again */}              
                <div className='horizontal-bar'>
                  <div className='labels'>
                    <label htmlFor="zip" className='def-label'>Zip code: </label>
                    <input 
                      type='text'
                      name='zip'
                      className="form-control-dob" 
                      placeholder='Enter ZIP'
                      pattern="^\d{5}(-\d{4})?$"
                      title="Please enter a valid 5-digit ZIP code (optionally with 4-digit extension)"
                      value={values.zip}
                      onChange={e => setValues({...values, zip: e.target.value})}
                      onBlur={(e) => {
                        if (!validateZipCode(e.target.value)) {
                          showSnack("Please enter a valid 5-digit ZIP code");
                        }
                      }}
                      required
                    />
                  </div>
                  <div className='labels'>
                    <label htmlFor="city" className='short-label'>City: </label>
                    <input 
                      type='text'
                      name='city'
                      className="form-control-gender" 
                      placeholder='Enter City'
                      value={values.city}
                      onChange={e => setValues({...values, city: e.target.value})}
                      required
                    />
                  </div>
                  <div className='labels'>
                    <label htmlFor="state" className='gender-label'>State: </label>
                    <input 
                      type='text'
                      name='state'
                      className="form-control-gender" 
                      placeholder='Enter state'
                      value={values.state}
                      onChange={e => setValues({...values, state: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>

              {/*Doctor side */}
              <div className="doctor-info">
                <h1>Doctor Information</h1>
                <div className='labels'>
                  <label htmlFor="license_num" className='medical-num'>Medical License Number: </label>
                  <input 
                    type='text'
                    name='license_num'
                    className="form-control" 
                    placeholder='Enter license number'
                    value={values.license_num}
                    onChange={e => {
                      // Only allow numeric input
                      const numericValue = e.target.value.replace(/[^0-9]/g, '');
                      setValues({...values, license_num: numericValue});
                    }}
                    onBlur={(e) => {
                      if (!validateLicenseNumber(e.target.value)) {
                        showSnack("License number must contain only numbers");
                      }
                    }}
                    required
                  />
                </div>
                <div className='labels'>
                  <label htmlFor="license_exp_date" className='exp'>Medical License Exp: </label>
                  <input 
                    type='date'
                    name='license_exp_date'
                    className="form-control-exp" 
                    placeholder='Enter expiration date'
                    value={values.license_exp_date}
                    onChange={e => setValues({...values, license_exp_date: e.target.value})}
                    required
                  />
                </div>
                <div className='labels'>
                  <label htmlFor="med_school" className='school'>Medical School: </label>
                  <input 
                    type='text'
                    name='med_school'
                    className="form-control" 
                    placeholder='Enter Medical School'
                    value={values.med_school}
                    onChange={e => setValues({...values, med_school: e.target.value})}
                    onBlur={(e) => {
                      if (!validateMedicalSchool(e.target.value)) {
                        showSnack("Please enter a valid medical school name");
                      }
                    }}
                    required
                  />
                </div>
                <div className='labels'>
                  <label htmlFor="years_of_practice" className='years'>Years in Practice: </label>
                  <input 
                    type='text'
                    name='years_of_practice'
                    className="form-control" 
                    placeholder='Enter number of years'
                    value={values.years_of_practice}
                    onChange={e => setValues({...values, years_of_practice: e.target.value})}
                    onBlur={(e) => {
                      if (!validateYearsOfPractice(e.target.value)) {
                        showSnack("Years of practice must be a positive number");
                      }
                    }}
                    required
                  />
                </div>
                <div className='labels'>
                  <label htmlFor="payment_fee" className='med-label'>Payment Fee: </label>
                  <input 
                    type='text'
                    name='payment_fee'
                    className="form-control" 
                    placeholder='Enter amount'
                    value={values.payment_fee}
                    onChange={e => setValues({...values, payment_fee: e.target.value})}
                    onBlur={(e) => {
                      if (!validatePaymentFee(e.target.value)) {
                        showSnack("Payment fee must be a valid dollar amount (e.g., 100 or 150.50)");
                      }
                    }}
                    required
                  />
                </div>
                <div className='labels'>
                  <label htmlFor="specialty" className='med-label'>Specialty: </label>
                  <input 
                    type='text'
                    name='specialty'
                    className="form-control" 
                    placeholder='Enter specialty'
                    value={values.specialty}
                    onChange={e => setValues({...values, specialty: e.target.value})}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="doctortest">
            <div className="info-container">
              <div className="basic-info">
                <h1>Other Information</h1>
                <div className='labels2'>
                  <label className='def-label' htmlFor="email">Email: </label>
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={e => setValues({...values, email: e.target.value})}
                    required
                    pattern="^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$"
                    title="Please enter a valid email address (e.g., user@example.com)"
                    placeholder="Enter your email"
                    onBlur={(e) => {
                      if (!validateEmail(e.target.value)) {
                        showSnack("Please enter a valid email address (e.g., user@example.com)");
                      }
                    }}
                  />
                </div>
                <div className='labels2'>
                  <label className='def-label'htmlFor="password">Password: </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="psw"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    name='password'
                    className="form-control"
                    placeholder='Enter your password'
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    required
                    value={values.password}
                    onChange={e => setValues({...values, password: e.target.value})}
                  />
                  <Button
                    onClick={() => setShowPassword(!showPassword)}
                    size="small"
                    variant="text"
                    style={{ marginTop: '5px' }}
                  >
                    {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                  </Button>
                </div>        
                <div className='labels'> 
                  <label className='terms' onClick={handleOpen}>Do you Accept the terms and conditions? 
                    <Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} required />
                  </label>
                  <Modal
                    onClose={handleClose}
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style} >
                      <Typography id="modal-modal-title" variant="h5" component="h2" color="black">
                        Terms and Conditions
                      </Typography>
                      <Box className='custom-scroll' style={{height: '50vh', overflowY: 'auto'}}>
                        <Typography >
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                          Proin tristique vehicula elit ut commodo. Aenean et lorem dignissim, fringilla leo in,
                          fermentum ex. Pellentesque mattis neque quis egestas ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          In vehicula accumsan consectetur. Quisque dapibus venenatis tincidunt. Curabitur commodo, ex a consequat auctor, diam nibh 
                          dictum risus, nec scelerisque quam est eget sem. Etiam et posuere metus. Fusce maximus eleifend placerat.
                          Curabitur quis faucibus magna. Proin vitae imperdiet lacus. Nulla efficitur ante eu nulla rutrum,
                          a vehicula neque dapibus.
                          </p>
                          <br/>
                          Donec pretium in orci et ultricies. Donec est libero, 
                          facilisis vitae leo id, rhoncus ultricies nisl. Duis luctus, velit id finibus posuere, 
                          ligula diam egestas ex, et tincidunt est sapien id dolor. Proin et odio ac mauris sodales ultricies. 
                          Nam quis interdum leo. Nullam id porttitor dui, eget ornare sapien. Etiam ut turpis volutpat urna efficitur condimentum. 
                          Proin ligula metus, imperdiet sed neque et, vehicula cursus erat. Maecenas in nibh a quam dictum tempus efficitur non erat. 
                          Nulla sodales turpis augue, sed tempus ligula gravida et. Interdum et malesuada fames ac ante ipsum primis in faucibus. 
                          In hac habitasse platea dictumst. Pellentesque eu diam quis purus iaculis ultrices. Cras vulputate rutrum odio non convallis.
                        </Typography>
                      </Box>
                    </Box>
                  </Modal>
                </div>            
              </div>
            </div>

            <div className="signuptext">
              <div className="signupbuttons">
                <Button type='submit' className="herobutton" disabled={loading}>
                  {loading ? "Processing..." : "Sign Up"}
                </Button>
                <Button className="herobutton" onClick={() => navigate('/landing')}> Back </Button>
              </div>
            </div>
          </div>
        </form>
        <Snackbar
          open={snackOpen}
          autoHideDuration={4000}
          onClose={() => setSnackOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <MuiAlert onClose={() => setSnackOpen(false)} severity={snackType} variant="filled" sx={{ width: '100%' }}>
            {snackMsg}
          </MuiAlert>
        </Snackbar>
      </div>
    </>
  );
}

export default Doctorsignup;