import React, { useState, useEffect, useRef } from "react"; 
import Patient_Navbar from "./patient_navbar"; 
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import FlowerBackgroundImg from "./patient_landing_assets/FlowerBackground.png"
import overviewSurveyImg from "./patient_landing_assets/overviewSurveyImg.png"
import noSurveysImg from "./patient_landing_assets/NoSurveys.png"
import { Select,MenuItem, InputLabel, Button, Typography, Modal, TextField, FormControl} from "@mui/material";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius:30,
  height:'47vh',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  //padding: theme.spacing(2),
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#EEF2FE',
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};


function Patient_Landing() {

//surveys modal
const [openSurvey, setOpenSurvey] = useState(false);

const openSurveysModal = () => {
  setOpenSurvey(true);
};
const closeSurveysModal = () => {
  setOpenSurvey(false);
};

//weekly survey modal
const [openWeeklySurvey, setOpenWeeklySurvey] = useState(false);

const openWeeklySurveysModal = () => {
  setOpenWeeklySurvey(true);
};
const closeWeeklySurveysModal = () => {
  setOpenWeeklySurvey(false);
};

//Daily survey modal
const [openDailySurvey, setOpenDailySurvey] = useState(false);

const openDailySurveysModal = () => {
  setOpenDailySurvey(true);
};
const closeDailySurveysModal = () => {
  setOpenDailySurvey(false);
};


// Daily survey form states
const [heartRate, setHeartRate] = useState("");
const [waterIntake, setWaterIntake] = useState("");
const [exerciseMinutes, setExerciseMinutes] = useState("");
const [mealPlanFollowed, setMealPlanFollowed] = useState("");
const [mood, setMood] = useState("");
const [calorieIntake, setCalorieIntake] = useState("");

const handleDailySubmit = (e) => {
  e.preventDefault();
  console.log({
    heartRate,
    waterIntake,
    exerciseMinutes,
    mealPlanFollowed,
    mood,
    calorieIntake
  });
};



//weekly survey form information
const [weightChange, setWeightChange] = React.useState("");
const [weightAmount, setWeightAmount] = React.useState("");
const [bloodPressure, setBloodPressure] = React.useState("");

const handleSubmit = (e) => {
  e.preventDefault();
  console.log({ weightChange, weightAmount, bloodPressure });
};

  return (

    <div style={{ display: "flex" }}>
      {/* Sidebar/Navbar */}
      <Patient_Navbar /> 

      <div style={{ marginLeft: "3px", flexGrow: 1, padding: "20px" }}>
        <Box sx={{ flexGrow: 1 }}>
          
          <Grid container spacing={2} >
            {/* item 1 */}
            <Grid item xs={7} >
            <Item sx={{ color:'white',background: 'linear-gradient(110deg, #5889BD 6.67%, #719EC7 34.84%, #99C6DB 93.33%)', borderRadius:5,p:2}}>
            <Typography sx={{ fontFamily:'Montserrat', fontSize:'3.5vh',      textAlign:"left",mb:'1.1vh'}} >Health Overview</Typography>
  <Paper
    //elevation={3}
    sx={{
      //borderRadius: 5,
      m: 0,
      color:'white',
      background:'transparent',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow:0,
    }}
  >
    {/* Left Section: Text, Image, Button */}
    <Box sx={{ height:'38vh',width: '35%', borderRadius: 3, background: 'rgba(238, 242, 254, 0.10)', p:2,}}>
     <Paper
     sx={{
      color:'white',
      background:'transparent',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow:0,
      textAlign:"left",
    }}
     >

      <Typography variant="h5" fontSize={'2.4vh'} fontFamily={'Montserrat'} paddingBottom={4} >
        Take your daily and weekly surveys
      </Typography>
      <Box
        component="img"
        src={overviewSurveyImg}
        alt="Survey"
        sx={{
          width: 90,
          height: 90,
          borderRadius: '50%',
          mb: 2,
          mr:2,
        }}
      />
      </Paper>
      <Typography variant="body1" sx={{ width:'24vh', mb:'1vh',textAlign:'left', fontFamily:'Merriweather', fontSize:'1.5vh'}}>
        By taking your daily and weekly surveys DPP is able to create progress updates so you can
        track your fitness journey. Take your surveys now by clicking below!
      </Typography>
      <Button 
        onClick={openSurveysModal}
        variant="contained"
        sx={{
          background: 'rgba(238, 242, 254, 0.10)',
          color: 'white',
          borderRadius: '25px',
          fontFamily: 'Montserrat',
          textTransform: 'none',
          boxShadow:0,
        }}
      >
        Survey <ArrowCircleRightOutlinedIcon sx={{ ml: 4 }}  />
      </Button>
      
          {/* Survey options*/}

      <Modal
      
        open={openSurvey}
        onClose={closeSurveysModal}
        //aria-labelledby="modal-modal-title"
        //aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
           {/* Close Icon */}
    <IconButton 
      onClick={closeSurveysModal}
      sx={{
        position: 'absolute',
        top: 8,
        right: 8,
        color: 'grey.600', // or any color you prefer
        zIndex: 1,
      }}
    >
      <CloseIcon />
    </IconButton>
          <Typography  sx={{color:"black", fontSize:'4vh'}}>
            Surveys
          </Typography>
          <Typography  sx={{color:"black", fontSize:'2vh'}}>
            Jane Doe
          </Typography>
          <Paper
     sx={{
      color:'white',
      background:'transparent',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow:0,
      p:7,
    }}
     >
          <Button 
        onClick={openDailySurveysModal}
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: '#719EC7',
          color: 'white',
          borderRadius: '25px',
          fontWeight: 'bold',
          textTransform: 'none',
          margin:2,
        }}
      >
        Daily Survey <ArrowCircleRightOutlinedIcon sx={{ ml: 4 }}  />
      </Button>
      <Button 
        onClick={openWeeklySurveysModal}
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: '#719EC7',
          color: 'white',
          borderRadius: '25px',
          fontWeight: 'bold',
          textTransform: 'none',
        }}
      >
       Weekly Survey <ArrowCircleRightOutlinedIcon sx={{ ml: 4}}/>
      </Button>
      </Paper>
        </Box>
      </Modal>
    </Box>


    {/* DailySurvey*/}

    <Modal
        open={openDailySurvey}
        onClose={closeDailySurveysModal}
        //aria-labelledby="modal-modal-title"
        //aria-describedby="modal-modal-description"
      >
        <Box  sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: '75%', md: '60%' },
    maxWidth: 600,
    bgcolor: '#EEF2FE',
    boxShadow: 24,
    borderRadius: 3,
    p: 3,
    maxHeight: '85vh',
    overflowY: 'auto',
  }}  >
        {/* Close Icon */}
        <IconButton 
      onClick={closeDailySurveysModal}
      sx={{
        position: 'absolute',
        top: 8,
        right: 8,
        color: 'grey.600', // or any color you prefer
        zIndex: 1,
      }}
    >
      <CloseIcon />
    </IconButton>
          <Typography  sx={{color:"black", fontSize:'4vh', paddingLeft:"1.5vh"}}>
            Daily Survey
          </Typography>
          <Typography sx={{color:"black", fontSize:'2vh',paddingLeft:"1.5vh"}}>
            FirstName LastName
          </Typography>

         
          <Paper
       sx={{
        background: "transparent",
        boxShadow: 0,
        p: 2,
      }}
    >
      <form onSubmit={handleDailySubmit} >
        <Typography fontSize= '1.5vh'  mb={1}>
          What is your heart rate?
        </Typography>
        <TextField
          fullWidth
          placeholder="Type here"
          value={heartRate}
          onChange={(e) => setHeartRate(e.target.value)}
          sx={{ mb: 2 }}
          size="small"

        />
    
        <Typography fontSize= '1.5vh'  mb={1}>
          How many glasses of water did you drink?
        </Typography>
        <TextField
          fullWidth
          placeholder="Type here"
          value={waterIntake}
          onChange={(e) => setWaterIntake(e.target.value)}
          sx={{ mb: 2 }}
          size="small"

        />
    
        <Typography fontSize= '1.5vh' mb={1}>
          How many minutes of exercise did you do today?
        </Typography>
        <TextField
           size="small"
          fullWidth
          placeholder="Type here"
          value={exerciseMinutes}
          onChange={(e) => setExerciseMinutes(e.target.value)}
          sx={{ mb: 2 }}
        />
    
        <Typography fontSize= '1.5vh' mb={1}>
          Did you follow your meal plan today?
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Select

            value={mealPlanFollowed}
            onChange={(e) => setMealPlanFollowed(e.target.value)}
            displayEmpty
            size="small"
            
          >
            <MenuItem value="" disabled ><em style={{ color: 'gray', opacity: 0.7 }}>Dropdown option</em></MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>
    
        <Typography fontSize= '1.5vh'  mb={1}>
          How do you feel today?
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            displayEmpty
            size="small"

          >
            <MenuItem value="" disabled><em style={{ color: 'gray', opacity: 0.7 }}>Dropdown option</em></MenuItem>
            <MenuItem value="Good">Good</MenuItem>
            <MenuItem value="Okay">Okay</MenuItem>
            <MenuItem value="Bad">Bad</MenuItem>
          </Select>
        </FormControl>
    
        <Typography fontSize= '1.5vh' mb={1}>
          What is your calorie intake for today?
        </Typography>
        <TextField
          fullWidth
          placeholder="Type here"
          value={calorieIntake}
          size="small"
          onChange={(e) => setCalorieIntake(e.target.value)}
          sx={{ mb: 2 }}
        />
    
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: '#719EC7',
            borderRadius: '25px',
            fontWeight: 'bold',
            textTransform: 'none',
          }}
        >
          Submit
        </Button>
      </form>
  

      </Paper>
        </Box>
      </Modal>


    {/* WeeklySurvey*/}
    <Modal
  open={openWeeklySurvey}
  onClose={closeWeeklySurveysModal}
>
<Box
      sx={{
        position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: '75%', md: '60%' },
    maxWidth: 400,
    bgcolor: '#EEF2FE',
    boxShadow: 24,
    borderRadius: 3,
    p: 3,
    maxHeight: '90vh',
    minHeight:'45vh',
    overflowY: 'auto',
  }} 
      
      component={Paper}
    >
       {/* Close Icon */}
    <IconButton 
      onClick={closeWeeklySurveysModal}
      sx={{
        position: 'absolute',
        top: 8,
        right: 8,
        color: 'grey.600', // or any color you prefer
        zIndex: 1,
      }}
    >
      <CloseIcon />
    </IconButton>
      <Typography sx={{color:"black", fontSize:'4vh'}}>
        Weekly Survey
      </Typography>

      <Typography sx={{color:"black", fontSize:'2vh'}}>
        Natasha Pena
      </Typography>

      <form onSubmit={handleSubmit}>
        <Typography fontSize= '1.5vh' mb={1} paddingTop={2}>
          Change in Weight
        </Typography>

        <Box display="flex" gap={1} mb={2} >
          <FormControl fullWidth>
            <Select
              value={weightChange}
              onChange={(e) => setWeightChange(e.target.value)}
              displayEmpty
              size="small"
            >
              <MenuItem value="" disabled><em style={{ color: 'gray', opacity: 0.7 }}>Select an Item</em></MenuItem>
              <MenuItem value="Gain">Gain</MenuItem>
              <MenuItem value="Loss">Loss</MenuItem>
              <MenuItem value="No Change">No Change</MenuItem>
            </Select>
          </FormControl>

          <TextField
            placeholder="Type here"
            value={weightAmount}
            onChange={(e) => setWeightAmount(e.target.value)}
            fullWidth
            size="small"
          />
        </Box>

        <Typography fontSize= '1.5vh' mb={1}>
          Blood Pressure
        </Typography>
        <TextField
          fullWidth
          placeholder="Type here"
          size="small"

          value={bloodPressure}
          onChange={(e) => setBloodPressure(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            backgroundColor: '#719EC7',
            borderRadius: '25px',
            fontWeight: 'bold',
            textTransform: 'none',
          }}
        >
          Submit
        </Button>
      </form>
    </Box>
</Modal>
    {/* Right Section: Chart + Arrows */}
    <Box sx={{
        width: '43%',
        //backgroundColor: 'white',
        marginRight:' 9vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>

    <Typography sx={{fontFamily:'Montserrat', textAlign:'left',fontSize:'2.4vh' }}>Looks like you don’t have any data. Come back after filling out the surveys</Typography>
    <Box
        component="img"
        src={noSurveysImg}
        alt="Survey"
        sx={{
         
        }}
      />
    </Box>
    
    {/* <Box
      sx={{
        width: '5vh',
        backgroundColor: 'white',
        borderRadius: 3,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h6" color="black" sx={{ mb: 1 }}>
        Weight
      </Typography>
      <Box
        component="img"
        src="/chart-placeholder.png" // replace with actual chart
        alt="Weight Chart"
        sx={{ width: '100%', borderRadius: 2, mb: 2 }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button size="small">←</Button>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <span>●</span>
          <span>●</span>
          <span>●</span>
        </Box>
        <Button size="small">→</Button>
      </Box>
    </Box> */}
  </Paper>

  </Item>
         
            </Grid>
            {/* item 2 */}
            <Grid item xs={5}>
              <Item sx={{backgroundColor:"#EEF2FE"}}>xs=5</Item>
            </Grid>
            {/* item 3 */}
            <Grid item xs={4}>
              <Item sx={{background: "linear-gradient(110deg, #5889BD 6.67%, #719EC7 34.84%, #99C6DB 93.33%)"}}>xs=4</Item>
            </Grid>
            {/* item 4 */}
            <Grid item xs={4}>
              <Item  sx={{ 
    position: "relative",
    overflow:"hidden",
    backgroundImage: `url(${FlowerBackgroundImg})`, 
    backgroundColor: "lightgray", 
    backgroundSize: "cover",
    backgroundPosition: "center", 
    backgroundRepeat: "no-repeat",
    "&::before": { 
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(255, 255, 255, 0.1)", 
      backdropFilter: "blur(10px)", 
      zIndex: 1,
    }
  }}><Box sx={{ position: "relative", zIndex: 2 }}>xs=4</Box></Item>
            </Grid>
            {/* item 5 */}
            <Grid item xs={4}>
              <Item sx={{background: "linear-gradient(110deg, #5889BD 6.67%, #719EC7 34.84%, #99C6DB 93.33%)", backgroundSize: "cover",}}>xs=4</Item>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Patient_Landing;
