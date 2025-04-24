import React from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  IconButton,
  Grid
} from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Divider from '@mui/material/Divider';
import NavBar from './patient_dashboard/patient_navbar'; // Assuming you already have this
import CommunityImg from './community_homepage_img.png'

export default function CommunityForum() {
  const posts = [
    {
      title: 'Cauliflower Fried Rice',
      tags: '#Keto #Low-Carbs',
      description: 'Fried rice is a classic and comforting recipe that everyone loves...except maybe those who are trying to eat less rice...',
      image: '/images/cauliflower.jpg'
    },
    {
      title: 'Marry Me Tofu',
      tags: '#Keto #Vegan',
      description: 'Because tofu is so versatile, why not give this plant-based protein a romantic spin, à la our marry me chicken ...',
      image: '/images/tofu.jpg'
    },
    {
      title: 'Balsamic Chicken and Asparagus',
      tags: '#Paleo',
      description: 'We’re always looking for new ways to switch up our weeknight chicken dinner, and when we’re craving something ...',
      image: '/images/chicken.jpg'
    }
  ];

  return (
    
    <Box sx={{  }}>
      <NavBar />

      <Box sx={{  p: 4 ,p: 3, display: 'flex', backgroundColor: '#e6eeff', borderRadius: '3vh', m: '3vh', minHeight: '100vh',ml:'15vh' }}>
        {/* Header */}
       
        <Box sx={{}}>
        <Box sx={{display:'flex', mb:'10vh'}}>
        <Box sx={{flexGrow:1}}>
          <Typography fontSize={52} textAlign= 'left' fontWeight="bold" color="#5889BD" >
            Community Forum
          </Typography>
          <Typography sx={{ maxWidth: '75%', mb:'3vh' }}>
            Connect with other users to blah blahblah Connect with other users to blah blahblah Connect with other users to blah blahblah
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
  <Box
    sx={{
      display: 'flex',
      gap: 0,
      mb: 4,
      borderRadius: '1vh',
      overflow: 'hidden',
      backgroundColor: 'white',
      boxShadow: 1,
      width: '500px' // adjust this as needed (try 400px–600px)
    }}
  >
    <TextField
      select
      size="small"
      defaultValue="All"
      sx={{
        minWidth: 120,
        backgroundColor: 'white',
        borderTopLeftRadius: '1vh',
        borderBottomLeftRadius: '1vh',
        '& fieldset': { border: 'none' }
      }}
    >
      <MenuItem value="All">Categories</MenuItem>
      <MenuItem value="Keto">Keto</MenuItem>
      <MenuItem value="Vegan">Vegan</MenuItem>
      <MenuItem value="Paleo">Paleo</MenuItem>
    </TextField>

    <TextField
      placeholder="Search ..."
      variant="outlined"
      size="small"
      sx={{
        flexGrow: 1,
        backgroundColor: 'white',
        '& fieldset': { border: 'none' }
      }}
    />

    <Button
      variant="contained"
      sx={{
        backgroundColor: '#444',
        borderRadius: 0,
        color: 'white',
        px: 3,
        textTransform: 'none',
        fontWeight: 600,
        borderTopRightRadius: '1vh',
        borderBottomRightRadius: '1vh',
        '&:hover': { backgroundColor: '#333' }
      }}
    >
      Search
    </Button>
  </Box>
</Box>


          </Box>
          <Box
            component="img"
            src={CommunityImg}
            alt="community illustration"
            sx={{
              width: '450',
              //float: 'right',
              mt: -5,
              mr: 2,
              display: { xs: 'none', md: 'block' }
            }}
          />

          </Box>
          <Divider sx={{ height:'.1vh', width: '100%', my: 4 , background: 'rgba(0, 0, 0, 0.37)'}} />

                {/* Featured */}
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Featured
        </Typography>

        <Grid container spacing={3}>
          {posts.map((post, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardMedia component="img" height="160" image={post.image} alt={post.title} />
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="primary" gutterBottom>
                    {post.tags}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.description}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Avatar sx={{ width: 24, height: 24 }} src="/images/avatar.jpg" />
                    <Typography variant="caption" sx={{ ml: 1 }}>
                      JaneDoe123
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton><ChatBubbleOutlineIcon fontSize="small" /></IconButton>
                    <IconButton><FavoriteBorderIcon fontSize="small" /></IconButton>
                    <IconButton><MoreHorizIcon fontSize="small" /></IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        </Box>

    


      </Box>
    </Box>
  );
}

