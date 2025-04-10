import React, { useState, useEffect, useRef } from "react"; 
import Patient_Navbar from "./patient_navbar"; 
import { Box, Card, CardContent, Typography, Button, Avatar } from "@mui/material";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import doc1 from "./doctorim/doctor1.png";
import doc2 from "./doctorim/doctor2.png";
import doc3 from "./doctorim/doctor3.png";


/**const doctors = [
    {
      name: "Dr. Hillary Geller",
      specialization: "Nutritionist",
      experience: "4 years",
      fee: "$150",
      rating: "4.3/5",
      image: doc1,
    },
    {
      name: "Dr. Connor Life",
      specialization: "General",
      experience: "4 years",
      fee: "$120",
      rating: "4.7/5",
      image: doc2,
    },
    {
        name: "Dr. Colleen Gordon",
        specialization: "Nutritionist",
        experience: "4 years",
        fee: "$90",
        rating: "3.9/5",
        image: doc3,
      },
      {
        name: "Dr. Spencer Reid",
        specialization: "Nutritionist",
        experience: "6 years",
        fee: "$160",
        rating: "4.9/5",
        image: doc1,
      },
  ];**/

function Patient_Doctorlist() {
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:5000/doctors')
      .then(response => response.json())
      .then(data => {
        setDoctors(data);
      })
      .catch(error => {
        console.error("Error fetching doctor data:", error);
      });
  }, [])
    return(
        <div style={{ display: "flex" }}>
            <Patient_Navbar />
            <Box
        sx={{
          flexGrow: 1,
          padding: 4,
          height: "92vh",
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: "medium", fontFamily: 'Montserrat' , marginLeft:'1vw', fontSize: '2em'}}>
          Doctors
        </Typography>

        <Box
          sx={{
            backgroundColor: "#EEF2FE",
            padding: '2vw',
            borderRadius: 10,
            width: "80vw",
            height: "80vh",
            margin: "auto",

          }}
        >
          <Box className="custom-scroll" sx={{ height: "72vh", overflowY: "auto"}}>
          {doctors.map((doc, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 2,
                borderRadius: 10,
                marginBottom: '3.5vh',
                background: "linear-gradient(106deg, #5889BD 0.82%, #99C6DB 101.41%)",
                color: "white",
                paddingTop: '2vh',
                paddingBottom: '2vh',
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  src={doc1}
                  sx={{
                    width: '18vh',
                    height: '18vh',
                    marginRight: 2,
                    borderRadius: "30px", 
                    marginLeft: ".5vw",
                  }}
                />
                <Box>
                  <Typography variant="h5" fontWeight="medium" sx={{fontFamily: 'Montserrat', fontSize:'1.5em'}}>
                    Dr. {doc.first_name} {doc.last_name}
                  </Typography>
                  <Typography variant="body2" sx={{fontFamily: 'Merriweather', fontSize:'1.1em'}}>
                    <strong>Specialization:</strong> {doc.specialty || "N/A"}
                  </Typography>
                  <Typography variant="body2" sx={{fontFamily: 'Merriweather', fontSize:'1.1em'}}>
                    <strong>Years of Experience:</strong> {doc.years_of_practice} years
                  </Typography>
                  <Typography variant="body2" sx={{fontFamily: 'Merriweather', fontSize:'1.1em'}}>
                    <strong>Appointment Fee:</strong> ${doc.payment_fee}
                  </Typography>
                  {/*<Typography variant="body2"sx={{fontFamily: 'Merriweather', fontSize:'1.1em'}}>
                    <strong>Rating:</strong> {doc.rating}
                  </Typography>*/}
                </Box>
              </Box>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#5A4AA3",
                  borderRadius: "20px",
                  textTransform: "none",
                  fontFamily: 'Montserrat',
                  paddingRight: '2em',
                  paddingLeft: '2em',
                  marginRight: '2vw',
                  fontSize: '1.3em'
                }}
              >
                Learn More
              </Button>
            </Paper>
          ))}
        </Box>
        </Box>
      </Box>
        </div>
    );
}
export default Patient_Doctorlist;