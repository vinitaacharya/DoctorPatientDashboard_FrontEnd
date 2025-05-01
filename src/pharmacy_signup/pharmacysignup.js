import React, { lazy, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
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




function Pharmacysignup(){

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
    pharmacy_name: '',
    address: '',
    store_hours: '',
    zipcode: '',
    city: '',
    state: '',
    email: '',
    password: ''
  });
  

  const navigate = useNavigate()
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
   
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  


  const savepharmacy = (e) => {
    e.preventDefault();
  
    if (!termsAccepted) {
      alert("Please accept the terms and conditions");
      return;
    }
  
    setLoading(true);
  
    const fullData = {
      pharmacy_name: values.pharmacy_name,
      address: values.address,
      store_hours: values.store_hours,
      zipcode: values.zip,
      city: values.city,
      state: values.state,
      email: values.email,
      password: values.password
    };
    
  
    fetch("http://127.0.0.1:5000/register-pharmacy", {
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
            <h2 className="title">Pharmacy Signup</h2>
        </div>


        <form className="form-container" onSubmit={savepharmacy}>
        
        <div className="signuptop">

          <div className="info-container">
          {/* Left Section: Basic Info */}
            <div className="basic-info">
                  <h1>Pharmacy Information</h1>
                    <div className='labels'>
                        <label className='long-label' htmlFor="pharmacy_name">Pharmacy Name: </label>
                        <input type='text'
                        name='pharmacy_name'
                        className="form-control" 
                        placeholder='Enter Pharmacy Name'
                        value={values.pharmacy_name}
                        onChange={e => setValues({...values, pharmacy_name: e.target.value})}/>
                    </div>

                    <div className='labels'>
                        <label className='long-label' htmlFor="address">Pharmacy Address: </label>
                        <input type='text'
                        name='address'
                        className="form-control" 
                        placeholder='Enter your address'
                        value={values.address}
                        onChange={e => setValues({...values, address: e.target.value})}/>
                    </div>

                    <div className='labels'>
                        <label className='long-label' htmlFor="address">Pharmacy Hours: </label>
                        <input type='text'
                        name='address'
                        className="form-control" 
                        placeholder='Enter your hours'
                        value={values.store_hours}
                        onChange={e => setValues({...values, store_hours: e.target.value})}/>
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

export default Pharmacysignup;