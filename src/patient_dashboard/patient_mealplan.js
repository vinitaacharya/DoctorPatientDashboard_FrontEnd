import React, { useState } from "react";
import Patient_Navbar from "./patient_navbar";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Typography, Button, Divider } from "@mui/material";
import food1 from "./meals/food1.png";

const RoundedPanel = styled(Paper)(({ theme }) => ({
  borderRadius: '30px',
  padding: '2vw',
  height: '85vh',
  backgroundColor: '#EEF2FE',
}));

const MealPlanCard = ({ title, author, tags }) => (
  <Box
    sx={{
        background: 'linear-gradient(109.86deg, #5889BD 6.67%, #719EC7 34.84%, #99C6DB 93.33%)',
        borderRadius: '30px',
        padding: 2,
        marginBottom: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }}
  >
    <Box>
      <Typography sx={{ fontWeight: '500px', color: 'white', fontFamily: 'Montserrat', fontSize:'1.4em' }}>{title}</Typography>
      <Typography sx={{ color: 'white', fontSize: '0.85em', fontFamily:'merriweather', fontSize:'1.2em', fontWeight: '400px' }}>Made by: {author}</Typography>
      <Typography sx={{ color: 'white', fontSize: '0.85em', fontFamily:'merriweather', fontSize:'1.2em', fontWeight: '400px' }}>Tags: {tags}</Typography>
    </Box>
    <Box display="flex" gap={1}>
      <Button variant="contained" sx={{ backgroundColor: '#5A4AA3', fontFamily: 'Montserrat', borderRadius: '30px', textTransform: 'none', fontWeight: '400px', fontSize: '1.3em'}}>View</Button>
      <Button variant="contained" sx={{ backgroundColor: '#5A4AA3', fontFamily: 'Montserrat', borderRadius: '30px', textTransform: 'none', fontWeight: '400px', fontSize: '1.3em' }}>Manage</Button>
    </Box>
  </Box>
);

const MealCard = ({ title, tags, description, image }) => (
  <Box
    sx={{
      backgroundColor: '#EEF2FE',
      borderRadius: '30px',
      padding: 2,
      paddingLeft: 3,
      marginBottom: 2,
      display: 'flex',
      alignItems: 'center',
      gap: 2,
    }}
  >
    <Box>
    <Typography sx={{ fontWeight: '600px', fontFamily: 'Montserrat', fontSize: '1.3em', color: '#1E1E1E'}}>{title}</Typography>
    <Box sx={{display: 'flex', flexDirection: 'row'}}>
    <Box component="img" src={food1} alt={title} sx={{height: '15vh', borderRadius: '30px', marginRight: '1vw'}} />
    <Box sx={{ flexGrow: 1 }}>
      <Typography sx={{ fontSize: '0.8em', fontFamily: 'Merriweather', fontSize: '1em' }}>Tags: {tags}</Typography>
      <Typography sx={{ fontSize: '0.8em', fontFamily: 'Merriweather', fontSize: '1em'}}>{description}</Typography>
      <Button variant="contained" sx={{ backgroundColor: '#5A8BBE73', marginTop: 1, borderRadius: '30px', textTransform: 'none', fontSize: '1em', fontWeight:'bold'}}>Select a meal plan to add</Button>
    </Box>
    </Box>
    </Box>
  </Box>
);

function Patient_Mealplan() {
  // Temporary mock data
  const mealPlans = [
    { title: "Meal plan #1", author: "Dr. Song", tags: "Keto" },
    { title: "Meal plan #2", author: "Natasha", tags: "Keto" },
  ];

  const savedMeals = [
    {
      title: "Cauliflower Fried Rice",
      tags: "Keto",
      description: "Fried rice is a classic and comforting recipe that everyone loves...",
      image: "https://via.placeholder.com/80", // Replace with actual image URLs later
    },
    {
      title: "Cheesy Broccoli Cheddar Spaghetti Squash",
      tags: "Keto",
      description: "Cheesy broccoli in any form is our ultimate comfort food...",
      image: "https://via.placeholder.com/80",
    },
    {
      title: "Cheesy Bacon Ranch Chicken",
      tags: "Keto",
      description: "Bacon and ranch is an absolute match made in heaven...",
      image: "https://via.placeholder.com/80",
    },
    {
        title: "Cheesy Bacon Ranch Chicken",
        tags: "Keto",
        description: "Bacon and ranch is an absolute match made in heaven...",
        image: "https://via.placeholder.com/80",
      },
  ];

  return (
    <div style={{ display: "flex" }}>
      <Patient_Navbar />
      <Box sx={{ flexGrow: 1, padding: 4, height: "92vh" }}>
        <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: "medium", fontFamily: 'Montserrat', fontSize: '2em' }}>
          Meal Planning
        </Typography>
        <Box display="flex" gap={4}>
          <RoundedPanel sx={{ width: '40%' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2.4}>
              <Typography variant="h6" sx={{fontSize: '2em'}}>Meal Plans</Typography>
              <Button variant="contained" sx={{ backgroundColor: '#5A8BBE', borderRadius:'30px', fontFamily:'Montserrat', textTransform: 'none', fontSize:'1.05em', marginRight: '.5vw'}}>Create Plan</Button>
            </Box>
            <Box className = 'custom-scroll' sx={{height: '70vh',overflowY: 'auto', paddingRight: '.5vw'}}>
            {mealPlans.map((plan, index) => (
              <MealPlanCard key={index} {...plan}/>
            ))}
            </Box>
          </RoundedPanel>

          <RoundedPanel sx={{ width: '60%', background: 'linear-gradient(109.86deg, #5889BD 6.67%, #719EC7 34.84%, #99C6DB 93.33%)' }}>
            <Typography variant="h6" sx={{ color: 'white', mb: 2, fontSize: '2em'}}>Saved Meals</Typography>
            <Box className = 'custom-scroll' sx={{height: '70vh', overflowY: 'auto', paddingRight: '.5vw'}}>
            {savedMeals.map((meal, index) => (
              <MealCard key={index} {...meal} />
            ))}
            </Box>
          </RoundedPanel>
        </Box>
      </Box>
    </div>
  );
}

export default Patient_Mealplan;
