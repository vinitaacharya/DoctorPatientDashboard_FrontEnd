import React, { useState, useEffect, useRef } from "react";
import Navbar from "./patient_navbar";
import { Checkbox, FormControlLabel,FormLabel, FormGroup, Box, Typography, IconButton, Avatar, Modal, TextField,Button,Grid } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import GridOnIcon from '@mui/icons-material/GridOn';
import AddIcon from '@mui/icons-material/Add';
import MealCard from "./MealPlanCard"; // Make sure MealCard is exported from mealPlanCard.js
import food1 from "./reciepe photo.png"; // Or replace with relevant image
import profileBackground from "./profile_assets/profile_background.png"
import ProfileImg from "./profile_assets/profilePageImg.png"

const posts = [
  {
    author:'Vinita Acharya',
    title: "Cauliflower Fried Rice",
    tags: ["#Keto"],
    description: "Fried rice is a classic and comforting recipe that everyone loves...except maybe those who are trying to eat less rice...Fried rice is a classic and comforting recipe that everyone loves...except maybe those who are trying to eat less riceFried rice is a classic and comforting recipe that everyone loves...except maybe those who are trying to eat less riceFried rice is a classic and comforting recipe that everyone loves...except maybe those who are trying to eat less riceFried rice is a classic and comforting recipe that everyone loves...except maybe those who are trying to eat less riceFried rice is a classic and comforting recipe that everyone loves...except maybe those who are trying to eat less riceFried rice is a classic and comforting recipe that everyone loves...except maybe those who are trying to eat less riceFried rice is a classic and comforting recipe that everyone loves...except maybe those who are trying to eat less riceFried rice is a classic and comforting recipe that everyone loves...except maybe those who are trying to eat less riceFried rice is a classic and comforting recipe that everyone loves...except maybe those who are trying to eat less rice",
    image: food1,
    comments:['hi', 'vinitaaa'],
  },
  {
    author:'Doctor Joe',
    title: "Marry Me Tofu",
    tags: ["#Keto"," #Vegan"],
    description: "Because tofu is so versatile, why not give this plant-based protein a romantic spin...",
    image: food1,
  },
];

const Profile = () => {
  const [openCreatePost, setOpenCreatePost] = React.useState(false);

const handleOpenCreatePost = () => setOpenCreatePost(true);
const handleCloseCreatePost = () => setOpenCreatePost(false);


const [uploadedFileName, setUploadedFileName] = React.useState('');

const [patientInfo, setPatientInfo] = useState(null);

useEffect(() => {
  const fetchPatientInfo = async () => {
    const id = localStorage.getItem("patientId");
    if (!id) {
      console.warn("No patient ID in localStorage");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/patient/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch patient info");
      }

      const data = await res.json();
      setPatientInfo(data);
      console.log("Patient info:", data);
    } catch (error) {
      console.error("Error fetching patient info:", error);
    }
  };

  fetchPatientInfo();
}, []);
  return (
    <Box display="flex">
      <Navbar />

      <Box sx={{ flexGrow: 1, padding: 2 }}>
        {/* Profile Header */}
        <Box 
        sx={{
          borderTopLeftRadius:'3vh',
          borderTopRightRadius:'3vh',
          backgroundImage: `url(${profileBackground})`,
          backgroundSize: 'cover',          // Makes the image cover the whole area
          backgroundRepeat: 'no-repeat',    // Prevents tiling/repeating
          backgroundPosition: 'center',     // Centers the image
          textAlign: 'center',
          height: '25vh',                  // Make sure the Box has a height!
        }}>
          <Box sx={{padding:'4vh'}}>
            <Avatar
              src={ProfileImg}
              alt="Profile"
              sx={{ width:'15vh', height: '15vh', margin: '0 auto' }}
            />
           
          {patientInfo && (
            <Typography  variant="h6" sx={{ color:'white', mt: 1, fontFamily: 'Montserrat', fontSize: '1.5em' }}>
                {patientInfo.first_name} {patientInfo.last_name}
            </Typography>)}           
          </Box>
        </Box>
        <Box sx={{backgroundColor:'#EEF2FE'}}>
        {/* Tab Icons */}
        <Box display="flex" justifyContent="center" gap={4} mb={4} pt={4}>
          <IconButton sx={{ backgroundColor: '#fff', borderRadius: '12px' }}>
            <GridOnIcon />
          </IconButton>
          <IconButton>
            <FavoriteBorderIcon />
          </IconButton>
        </Box>

        {/* Posts Grid */}
        <Grid container spacing={3}>
          {posts.map((post, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <MealCard meal={post}/>
        
            </Grid>
          ))}
          {/* Add New Post Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Box
              onClick={handleOpenCreatePost}

              sx={{
                height: '55vh',
                maxWidth: '43vh',
                borderRadius: '20px',
                backgroundColor: '#A0B9DA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                cursor: 'pointer',
                color: 'white',
                textAlign: 'center',
                mx:4,
                 my:2
              }}
            >
              <Typography variant="h6" sx={{ fontFamily: 'Montserrat' }}>Add New Post</Typography>
              <AddIcon sx={{ fontSize: 40 }} />
            </Box>
          </Grid>
          <Modal open={openCreatePost} onClose={handleCloseCreatePost}>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: "65vh",
      bgcolor: '#F5F7FF',
      borderRadius: '15px',
      boxShadow: 24,
      overflow: 'hidden', // so the header is connected
    }}
  >
    {/* Header */}
    <Box sx={{ bgcolor: '#5E4B8B', p:'.5vh', display: 'flex', alignItems: 'center' }}>
      <Typography sx={{flexGrow:'1',textAlign:"center", color: 'white', fontWeight: 'bold', fontFamily: 'Montserrat' }}>
        Create Post
      </Typography>
      <IconButton onClick={handleCloseCreatePost} sx={{ color: 'white' }}>
        ✕
      </IconButton>
    </Box>

    {/* Body */}
    <Box sx={{ p: 3 }}>
{/* Upload Button and File Name */}
<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
  <Button
    variant="contained"
    component="label"
    sx={{ bgcolor: '#A0B9DA', width: '29%' ,textAlign:'center'}}
  >
    Upload Image File
    <input 
      hidden 
      accept="image/*" 
      type="file" 
      onChange={(e) => {
        if (e.target.files.length > 0) {
          setUploadedFileName(e.target.files[0].name);
        }
      }}
    />
  </Button>

  {/* File name shown to the right of button */}
  {uploadedFileName && (
    <Typography sx={{ fontSize: '0.9rem', color: '#5E4B8B', fontWeight: 'bold' }}>
      {uploadedFileName}
    </Typography>
  )}
</Box>


<Box display={"flex"}> 
<Typography sx={{ color: 'white',  fontFamily: 'Montserrat', bgcolor: '#A0B9DA', width: '44%' ,textAlign:'center', height:'6.7vh', borderRadius:'.5vh' }}>
        Create Post
</Typography>    
  <TextField fullWidth label="Title" variant="outlined" sx={{ml:2, mb: 2 }} />
</Box>


<Box sx={{ mb: 2 , display:'flex'}}>
  <FormLabel component="legend" sx={{mr:'2vh',color: 'white',  fontFamily: 'Montserrat', bgcolor: '#A0B9DA', width: '35%' ,textAlign:'center', height:'6.7vh', borderRadius:'.5vh' }}>Hashtags</FormLabel>
  <FormGroup row> {/* row makes them horizontal! */}
    <FormControlLabel control={<Checkbox />} label="Keto" />
    <FormControlLabel control={<Checkbox />} label="Vegan" />
    <FormControlLabel control={<Checkbox />} label="Paleo" />
    <FormControlLabel control={<Checkbox />} label="Low-Carbs" />
  </FormGroup>
</Box>
<Box display={'flex'}>
<Typography sx={{ color: 'white',  fontFamily: 'Montserrat', bgcolor: '#A0B9DA', width: '45%' ,textAlign:'center', height:'6.7vh', borderRadius:'.5vh' }}>
        Description
</Typography> 
      <TextField
        fullWidth
        label="Description"
        multiline
        rows={8}
        variant="outlined"
        sx={{ ml: '2vh' , mb:'2vh'}}
      />
</Box>
      <Button
        fullWidth
        variant="contained"
        sx={{
          bgcolor: '#A0B9DA',
          '&:hover': { bgcolor: '#8CAACF' },
          borderRadius: '10px',
          fontWeight: 'bold'
        }}
      >
        POST
      </Button>
    </Box>
  </Box>
</Modal>

        </Grid>
      </Box>
    </Box>
    </Box>
  );
};

export default Profile;
