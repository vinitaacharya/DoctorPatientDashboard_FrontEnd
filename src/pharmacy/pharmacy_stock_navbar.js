import React from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Drawer, List, ListItemButton, ListItemIcon, Avatar, Box, Divider } from "@mui/material";
import ClipBoardImg from "../patient_dashboard/nav_assets/Clipboard.png";
import HeartImg from "../patient_dashboard/nav_assets/Heart.png";
import ProfileImg from "../patient_dashboard/nav_assets/Profile.png"
import LogoutImg from "../patient_dashboard/nav_assets/logout.png"


const sidebarItems = [
  { icon:<img src={HeartImg} className="heart" style={{ width:'7vh'}}/>, text: "Heart Chart"  },
  { icon:<img src={LogoutImg} className="heart" style={{ width:'7vh'}}/>, text: "Log Out"  },
  { icon:<img src={ClipBoardImg} className="medical_chart_button" style={{width:'5.5vh'}}/>, text: "Medical Chart" },
  { icon:<Avatar alt="Remy Sharp" src={ProfileImg} style={{width:'7.5vh', height:'7.5vh', }} />},];

export default function Patient_Navbar() {
  const navigate = useNavigate();
  //direct to designated page
  const handleClick = (index) => {
    console.log('clicked with parameter:', index);
    
    if (index === 1) {
      navigate("/landing");
    }
    if (index === 2) {
      navigate("/patient_dashboard/patient_landing");

    }
    if (index === 3) {
      //enter path here - medical charts
    }
  };
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 90,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 'fit-content',
          //backgroundColor: "#E8F0FF", // Light blue background
          display: "flex",
          alignItems: "center",
          paddingTop: '1vh',
          borderRight: "none",
          height: '98vh'
        }
      }}
    >
      <List>
        <ListItemButton onClick={() => handleClick(0)} sx={{ justifyContent: "center", marginY: '1vh' }}>
          <ListItemIcon sx={{ minWidth: "unset" }}>
            <img src={HeartImg} style={{ width: '7vh' }} />
          </ListItemIcon>
        </ListItemButton>
      </List>


      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
        <ListItemButton onClick={() => handleClick(2)} sx={{ justifyContent: "center", marginY: '1vh' }}>
          <ListItemIcon sx={{ minWidth: "unset" }}>
            <img src={ClipBoardImg} style={{ width: '5.5vh' }} />
          </ListItemIcon>
        </ListItemButton>
      </Box>

      {/* Bottom Item */}
      <List>
        <ListItemButton onClick={() => handleClick(3)} sx={{ justifyContent: "center", marginY: '1vh' }}>
          <ListItemIcon sx={{ minWidth: "unset" }}>
            <Avatar alt="Remy Sharp" src={ProfileImg} style={{ width: '7.5vh', height: '7.5vh' }} />
          </ListItemIcon>
        </ListItemButton>
      </List>
    </Drawer>
  );
}