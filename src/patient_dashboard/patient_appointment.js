import React, { useState, useEffect, useRef } from "react"; 
import Patient_Navbar from "./patient_navbar"; 
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { TextField, Typography, IconButton, Avatar} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";


const Panel = styled(Paper)(({ theme }) => ({
    backgroundColor: '#F2F6FF',
    padding: '20px',
    borderRadius: '20px',
    height: '90vh',
    overflowY: 'auto'
}));

const ChatBubble = ({ text, time, isUser }) => (
    <Box display="flex" justifyContent={isUser ? "flex-end" : "flex-start"} mb={2}>
      <Box
        bgcolor={isUser ? "#EEF2FE" : "#fff"}
        borderRadius="15px"
        p={1.5}
        maxWidth="75%"
        boxShadow={1}
      >
        <Typography variant="body2">{text}</Typography>
        <Typography variant="caption" color="textSecondary" display="block" textAlign="right">{time}</Typography>
      </Box>
    </Box>
  );

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

function Patient_Appointment() {
    const [appointmentData, setAppointmentData] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchAppointment = async () => {
      const data = {
        doctor: "Dr. Geller",
        patientName: "Natasha Pena",
        age: 25,
        gender: "Female",
        height: "5’3’’",
        weight: "140lbs",
        allergies: "N/A",
        conditions: "Pre diabetic",
        reason: "I have been having a hard time losing weight. I’m not sure if it’s my diet or something else.",
        notes: "Not available until after appointment",
        prescription: "Not available until after appointment",
        mealPlan: "Not available until after appointment"
      };
      setAppointmentData(data);
    };

    const fetchChat = async () => {
      const messages = [
        { text: "Hello, are you ready to start your appointment?", time: "12:45pm", sender: "doctor" },
        { text: "Hi doctor! Yes I am ready to start. I just had a few concerns about my health", time: "12:46pm", sender: "patient" }
      ];
      setChatMessages(messages);
    };

    fetchAppointment();
    fetchChat();
  }, []);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const newMsg = {
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: "patient"
    };
    setChatMessages(prev => [...prev, newMsg]);
    setNewMessage("");
    
    // TODO: send to backend
  };
    return (
        <div style={{ display: "flex" }}>
          <Patient_Navbar />
          <Grid container spacing={3} sx={{ padding: 3 }}>
        
        {/* Appointment Info */}
        <Grid item xs={12} md={4}>
          <Panel elevation={3}>
            <Typography variant="h5" gutterBottom>Appointment Notes</Typography>
            {appointmentData ? (
              <>
                <Typography><strong>Doctor:</strong> {appointmentData.doctor}</Typography>
                <Typography><strong>Patient Name:</strong> {appointmentData.patientName}</Typography>
                <Typography><strong>Age:</strong> {appointmentData.age}</Typography>
                <Typography><strong>Gender:</strong> {appointmentData.gender}</Typography>
                <Typography><strong>Height:</strong> {appointmentData.height}</Typography>
                <Typography><strong>Weight:</strong> {appointmentData.weight}</Typography>
                <Typography><strong>Allergies:</strong> {appointmentData.allergies}</Typography>
                <Typography><strong>Pre-existing conditions:</strong> {appointmentData.conditions}</Typography>
                <Typography><strong>Reason for visit:</strong> {appointmentData.reason}</Typography>
                <Typography sx={{ mt: 2 }}><strong>Notes:</strong> {appointmentData.notes}</Typography>
                <Typography><strong>Prescription:</strong> {appointmentData.prescription}</Typography>
                <Typography><strong>Meal Plan:</strong> {appointmentData.mealPlan}</Typography>
              </>
            ) : (
              <Typography>Loading...</Typography>
            )}
          </Panel>
        </Grid>

        {/* Chat */}
        <Grid item xs={12} md={8}>
          <Panel elevation={3} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Typography variant="h5" gutterBottom>Chat Log</Typography>

            {/* Chat History */}
            <Box flexGrow={1} my={2} sx={{ overflowY: 'auto' }}>
              {chatMessages.map((msg, idx) => (
                <ChatBubble
                  key={idx}
                  text={msg.text}
                  time={msg.time}
                  isUser={msg.sender === "patient"}
                />
              ))}
            </Box>

            {/* Input */}
            <Box display="flex" alignItems="center" mt={2}>
              <Avatar src="/doctor.png" sx={{ width: 32, height: 32, mr: 1 }} />
              <TextField
                fullWidth
                placeholder="Type message here..."
                size="small"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                sx={{ backgroundColor: "#fff", borderRadius: 2 }}
              />
              <IconButton color="primary" onClick={handleSend}>
                <SendIcon />
              </IconButton>
            </Box>
          </Panel>
        </Grid>
      </Grid>
        </div>
    )
}
export default Patient_Appointment;
