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




function Doctorsignup(){

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
    password: '',           // was missing
    address: '',
    city: '',
    state: '',
    zip: '',
    phone_number: '',
    dob: '',
    gender: '',
    license_num: '',
    license_exp_date: '',
    med_school: '',
    years_of_practice: '',
    payment_fee: '',
    specialty: ''
  });
  

  const navigate = useNavigate()
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
   
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [age, setAge] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
      
    const handleChange2 = (event: SelectChangeEvent) => {
      setGender(event.target.value);
      setValues({...values, gender: event.target.value});
    };

  const savedoctor = (e) => {
    e.preventDefault();
  
    if (!termsAccepted) {
      alert("Please accept the terms and conditions");
      return;
    }
  
    setLoading(true);
  
    const fullData = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
      description: "", // add if applicable
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
    
  
    fetch("http://127.0.0.1:5000/register-doctor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(fullData)
    })
      .then(res => res.json())
      .then(response => {
        if (response.message) {
          alert("Account and survey submitted successfully!");
          navigate('/landing');
        } else {
          throw new Error(response.error || "Something went wrong");
        }
      })
      .catch(async (error) => {
        const errMsg = await error?.response?.json?.()?.error || "Couldnt create user, please double check the fields and try again. :)";
        console.error("Error:", errMsg);
        alert(errMsg);
        console.log(fullData)
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
                        <input type='text'
                        name='first_name'
                        className="form-control" 
                        placeholder='Enter First Name'
                        value={values.first_name}
                        onChange={e => setValues({...values, first_name: e.target.value})}/>
                    </div>
                    <div className='labels'>
                        <label className='def-label' htmlFor="last_name">Last Name: </label>
                        <input type='text'
                        name='last_name'
                        className="form-control" 
                        placeholder='Enter last Name'
                        value={values.last_name}
                        onChange={e => setValues({...values, last_name: e.target.value})}/>
                    </div>

                    {/*Make the fields horizontal */}
                    <div className='horizontal-bar'>
                      <div className='labels'>
                          <label htmlFor="dob" className='short-label'>DOB: </label>
                          <input type='date'
                          name='dob'
                          className="form-control-dob" 
                          placeholder='Enter DOB'
                          value={values.dob}
                          onChange={e => setValues({...values, dob: e.target.value})}/>
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
                        <input type='text'
                        name='phone'
                        className="form-control" 
                        placeholder='Enter your phone number'
                        value={values.phone}
                        onChange={e => setValues({...values, phone: e.target.value})}/>
                    </div>
                    <div className='labels'>
                        <label className='def-label' htmlFor="address">Address: </label>
                        <input type='text'
                        name='address'
                        className="form-control" 
                        placeholder='Enter your address'
                        value={values.address}
                        onChange={e => setValues({...values, address: e.target.value})}/>
                    </div>

                    {/*Make fields horizontal again */}
                              
                    <div className='horizontal-bar'>
                      <div className='labels'>
                          <label htmlFor="zip" className='def-label'>Zip code: </label>
                          <input type='text'
                          name='zip'
                          className="form-control-dob" 
                          placeholder='Enter ZIP'
                          value={values.zip}
                          onChange={e => setValues({...values, zip: e.target.value})}/>
                      </div>
                      <div className='labels'>
                          <label htmlFor="city" className='short-label'>City: </label>
                          <input type='text'
                          name='city'
                          className="form-control-gender" 
                          placeholder='Enter City'
                          value={values.city}
                          onChange={e => setValues({...values, city: e.target.value})}/>
                      </div>
                      <div className='labels'>
                          <label htmlFor="state" className='gender-label'>State: </label>
                          <input type='text'
                          name='state'
                          className="form-control-gender" 
                          placeholder='Enter state'
                          value={values.state}
                          onChange={e => setValues({...values, state: e.target.value})}/>
                      </div>
                  </div>
            </div>

                    {/*Doctor side */}

            <div className="doctor-info">
                  <h1>Doctor Information</h1>
                    <div className='labels'>
                        <label htmlFor="license_num" className='medical-num'>Medical License Number: </label>
                        <input type='text'
                        name='license_num'
                        className="form-control" 
                        placeholder='Enter medical num'
                        value={values.license_num}
                        onChange={e => setValues({...values, license_num: e.target.value})}/>
                    </div>
                    <div className='labels'>
                        <label htmlFor="license_exp_date" className='exp'>Medical License Exp: </label>
                        <input type='date'
                        name='license_exp_date'
                        className="form-control-exp" 
                        placeholder='Enter exp'
                        value={values.license_exp_date}
                        onChange={e => setValues({...values, license_exp_date: e.target.value})}/>
                    </div>
                    <div className='labels'>
                        <label htmlFor="med_school" className='school'>Medical School: </label>
                        <input type='text'
                        name='med_school'
                        className="form-control" 
                        placeholder='Enter Medical School'
                        value={values.med_school}
                        onChange={e => setValues({...values, med_school: e.target.value})}/>
                    </div>
                    <div className='labels'>
                        <label htmlFor="years_of_practice" className='years'>Years in Practice: </label>
                        <input type='text'
                        name='years_of_practice'
                        className="form-control" 
                        placeholder='Enter num of years'
                        value={values.years_of_practice}
                        onChange={e => setValues({...values, years_of_practice: e.target.value})}/>
                    </div>
                    <div className='labels'>
                        <label htmlFor="payment_fee" className='med-label'>Payment Fee: </label>
                        <input type='text'
                        name='payment_fee'
                        className="form-control" 
                        placeholder='Enter payment fee'
                        value={values.payment_fee}
                        onChange={e => setValues({...values, payment_fee: e.target.value})}/>
                    </div>
                    <div className='labels'>
                        <label htmlFor="specialty" className='med-label'>Specialty: </label>
                        <input type='text'
                        name='specialty'
                        className="form-control" 
                        placeholder='Enter specialty'
                        value={values.specialty}
                        onChange={e => setValues({...values, specialty: e.target.value})}/>
                    </div>
                    

                    {/*Normal Now */}
                   
                  </div>
            </div>

        {/* <div>
              <label htmlFor="phone">Phone:</label>
              <input type='text' name='phone' className="form-control" placeholder='Enter Phone'
              value={values.phone} onChange={e => setValues({...values, phone: e.target.value})}/>
        </div> */}


      
       

        <div className="doctortest">

          <div className="info-container">
          {/* Left Section: Basic Info */}
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
                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                    title="Please enter a valid email address (e.g., user@example.com)"
                    placeholder="Enter your email"
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
                          <Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)}  />
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
                                                  {/* <Box className="custom-scroll" sx={{ height: '30vh', width: '90%', margin: 'auto', overflowY: "auto" }}></Box> */}
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
                <Button type='submit' className="herobutton">Sign Up</Button>
                <Button className="herobutton" onClick={() => navigate('/landing')}> Back </Button>
              </div>
        </div>
        </div>
      </div>
      </form>

    </div>
    </>
  );
}

export default Doctorsignup;