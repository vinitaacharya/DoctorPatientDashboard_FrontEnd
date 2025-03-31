import React from "react";
import { Drawer, List, ListItemButton, ListItemIcon, Avatar, Box, Divider } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PersonIcon from "@mui/icons-material/Person";
import ClipBoardImg from "./nav_assets/Clipboard.png";
import DollarSignImg from "./nav_assets/Dollar sign.png";
import HeartImg from "./nav_assets/Heart.png";
import HomeImg from "./nav_assets/Home.png";
import UsersImg from "./nav_assets/Users.png";
import ProfileImg from "./nav_assets/Profile.png"

const sidebarItems = [
  { icon:<img src={HeartImg} className="heart" style={{ width:50}}/>, text: "Heart Chart"  },
  { icon:<img src={HomeImg} className="home_button" style={{width:37}}/>, text: "Medical Chart" },
  { icon:<img src={UsersImg} className="community_button" style={{width:37}} />, text: "Medical Chart" },
  { icon:<img src={ClipBoardImg} className="medical_chart_button" style={{width:37}}/>, text: "Medical Chart" },
  { icon:<img src={DollarSignImg} className="expenses_button" style={{width:37}}/>, text: "Medical Chart" },
  { icon:<Avatar alt="Remy Sharp" src={ProfileImg} style={{width:65, height:65}} />},];
  

export default function Patient_Navbar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 90,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 95,
          backgroundColor: "#E8F0FF", // Light blue background
          display: "flex",
          alignItems: "center",
          paddingTop: 2,
          borderRight: "none"
        }
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
        <List>
          {sidebarItems.map((item, index) => (
            <React.Fragment key={index}>
            <ListItemButton key={index} sx={{ display: "flex", justifyContent: "center", marginY: 1}}>
              <ListItemIcon sx={{ color: "#345995", minWidth: "unset" }}>{item.icon}</ListItemIcon>
            </ListItemButton>
            {index == 0 && (
             <div style={{height:120 }}></div>
            )}
            {index == 4 && (
             <div style={{height:150 }}></div>
            )}
            {index == 4 || index == 0 || index !=sidebarItems.length-1 && (
              <Divider sx={{width:"50%", marginY:2, marginLeft:3}}/>
            )}

            
          </React.Fragment>  
          ))}
        </List>
       
      </Box>
    </Drawer>
  );
}