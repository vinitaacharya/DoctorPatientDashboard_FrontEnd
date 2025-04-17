import React from "react";
import Navbar from "./patient_navbar";
import { Box, Typography, IconButton, Avatar, Grid } from "@mui/material";
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
    description: "Fried rice is a classic and comforting recipe that everyone loves...except maybe those who are trying to eat less rice...",
    image: food1,
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
            <Typography variant="h6" sx={{ color:'white', mt: 1, fontFamily: 'Montserrat', fontSize: '1.5em' }}>
              JaneDoe123
            </Typography>
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
        </Grid>
      </Box>
    </Box>
    </Box>
  );
};

export default Profile;
