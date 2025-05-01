import React, { useState, useEffect } from "react";
import Doctor_Navbar from "./doctor_navbar";
import { Box, Typography, Button, Avatar, Modal, Paper, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import doc1 from "./doctorim/doctor1.png"; // You can use a generic user avatar instead

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

function Doctor_Patientlist() {
  const doctorId = localStorage.getItem("doctorId");
  const [patients, setPatients] = useState([]);
  const [openLearnMore, setOpenLearnMore] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/doc_patients/${doctorId}`)
      .then(response => response.json())
      .then(data => setPatients(data))
      .catch(error => console.error("Error fetching patients:", error));
  }, [doctorId]);

  return (
    <div style={{ display: "flex" }}>
      <Doctor_Navbar />
      <Box sx={{ flexGrow: 1, padding: 4, height: "92vh" }}>
        <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: "medium", fontFamily: 'Montserrat', marginLeft: '1vw', fontSize: '2em' }}>
          Your Patients
        </Typography>

        <Box sx={{ backgroundColor: "#EEF2FE", padding: '2vw', borderRadius: 10, width: "80vw", height: "80vh", margin: "auto" }}>
          <Box className="custom-scroll" sx={{ height: "72vh", overflowY: "auto" }}>
            {patients.map((pat, index) => (
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
                  marginRight: '.5vw'
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
                    <Typography variant="h5" sx={{ fontFamily: 'Montserrat', fontSize: '1.5em' }}>
                      {pat.first_name} {pat.last_name}
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'Merriweather', fontSize: '1.1em' }}>
                      <strong>Email:</strong> {pat.email}
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'Merriweather', fontSize: '1.1em' }}>
                      <strong>Gender:</strong> {pat.gender || "N/A"}
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'Merriweather', fontSize: '1.1em' }}>
                      <strong>Phone:</strong> {pat.phone || "N/A"}
                    </Typography>
                  </Box>
                </Box>

                <Button
                  onClick={() => { setSelectedPatient(pat); setOpenLearnMore(true); }}
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

            {selectedPatient && (
              <Modal open={openLearnMore} onClose={() => setOpenLearnMore(false)}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                  <Paper sx={{ position: 'relative', width: 600, p: 4, borderRadius: 3, boxShadow: 5, bgcolor: '#EEF2FE', display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <IconButton onClick={() => setOpenLearnMore(false)} sx={{ position: 'absolute', top: 12, right: 12 }}>
                      <CloseIcon />
                    </IconButton>

                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Box
                        component="img"
                        src={doc1}
                        alt="Patient"
                        sx={{ maxHeight: '20vh', width: '10vw', borderRadius: "30px", objectFit: "cover", mr: 2 }}
                      />
                      <Box>
                        <Typography variant="h6" fontWeight="500" sx={{ fontFamily: 'Montserrat', fontSize: '1.5em', paddingBottom: '1vh' }}>
                          {selectedPatient.first_name} {selectedPatient.last_name}
                        </Typography>
                        <Typography variant="body2" sx={{ fontFamily: 'Merriweather', color: "#000000", fontSize: '1.1em' }}>
                          <strong>Email:</strong> {selectedPatient.email}
                        </Typography>
                        <Typography variant="body2" sx={{ fontFamily: 'Merriweather', color: "#000000", fontSize: '1.1em' }}>
                          <strong>Phone:</strong> {selectedPatient.phone || "N/A"}
                        </Typography>
                        <Typography variant="body2" sx={{ fontFamily: 'Merriweather', color: "#000000", fontSize: '1.1em' }}>
                          <strong>Gender:</strong> {selectedPatient.gender || "N/A"}
                        </Typography>
                        <Typography variant="body2" sx={{ fontFamily: 'Merriweather', color: "#000000", fontSize: '1.1em' }}>
                          <strong>Weight:</strong> {selectedPatient.weight || "N/A"} lbs
                        </Typography>
                        <Typography variant="body2" sx={{ fontFamily: 'Merriweather', color: "#000000", fontSize: '1.1em' }}>
                          <strong>Height:</strong> {selectedPatient.height || "N/A"} in
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Box>
              </Modal>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Doctor_Patientlist;
