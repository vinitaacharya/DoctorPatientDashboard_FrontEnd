import React , {useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./landing";
import Patient_Landing from "./patient_dashboard/patient_landing";
import Patientsignup from './patient_signup/patientsignup';
import Doctorsignup from './doctor_signup/doctorsignup';
import Patient_Doctorlist from './patient_dashboard/patient_doctorlist';
import Patient_Billing from './patient_dashboard/patient_billing';
import Patient_Mealplan from './patient_dashboard/patient_mealplan';
import Pharmacy_Stock from './pharmacy/pharmacy_stock'
import Pharmacy_Landing from './pharmacy/pharmacy_landing'
import Patient_Chart from './patient_medicalchart/patient_medicalchart/patient_medicalchart';
import MealPlanCard from './patient_dashboard/MealPlanCard';
import Profile from './patient_dashboard/profile';
import Patient_Appointment from './patient_dashboard/patient_appointment';


function App() {
  const[data, setData] = useState([{}])

  useEffect(()=>{
    fetch("/members").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])
  return (
    <div>
      <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={(typeof data.members === 'undefined')?(
        <p>Loading...</p>
      ): (
        data.members.map((member, i) =>(
          <p key={i}>{member}</p>
        ))
      )} />
          <Route index element={<Landing />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/patient_dashboard/patient_landing" element={<Patient_Landing />} />
          <Route path="/patient_dashboard/patient_doctorlist" element={<Patient_Doctorlist />} />
          <Route path="/patient_dashboard/patient_billing" element={<Patient_Billing />} />
          <Route path="/pharmacy/pharmacy_stock" element={<Pharmacy_Stock />} />
          <Route path="/pharmacy/pharmacy_landing" element={<Pharmacy_Landing />} />
          <Route path="/patientsignup" element={<Patientsignup />} />
          <Route path="/doctorsignup" element={<Doctorsignup/>} />
          <Route path="/patient_medicalchart/patient_medicalchart" element={<Patient_Chart/>} />
          <Route path="/patient_dashboard/patient_mealplan" element={<Patient_Mealplan/>} />

        </Routes>
      </div>
      </Router>
    </div>
  )
}

export default App

