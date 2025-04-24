import React, { useState, useEffect, useRef } from "react"; 
import Patient_Navbar from "./patient_navbar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Select,MenuItem, InputLabel,  Modal, TextField, FormControl} from "@mui/material";

import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import { styled } from "@mui/material/styles";

const columns = [
  { id: "no", label: "No.", minWidth: 50, align: "left" },
  { id: "article", label: "Article", minWidth: 100, align: "left" },
  { id: "date", label: "Date", minWidth: 100, align: "left" },
  { id: "unitPrice", label: "Unit Price", minWidth: 100, align: "right" },
  { id: "charge", label: "Charge", minWidth: 100, align: "right" },
  { id: "credit", label: "Credit", minWidth: 100, align: "right" },
  { id: "currentBill", label: "Current Bill", minWidth: 120, align: "right" },
];

const CustomTableCell = styled(TableCell)({
  fontWeight: 600,
  fontFamily: "Montserrat",
  backgroundColor: "#f7f8fe",
  color: "#4a4a4a",
});



function Patient_Billing() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //Make a Payment Modal
  const [openMakePayment, setOpenMakePayment] = useState(false);
  
  const openMakePaymentModal = () => {
    setOpenMakePayment(true);
    setAmount(calculateTotalBalance().toString());
  };
  const closeMakePaymentModal = () => {
    setOpenMakePayment(false);
  };
  
  
  // Daily survey form states
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setcardNumber] = useState("");
  const [cardExpir, setCardExpir] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [cardName, setCardName] = useState("");
  const [countryRegion, setCountryRegion] = useState("");
  
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
  
    const totalBalance = calculateTotalBalance();
    const numericAmount = parseFloat(amount.replace("$", ""));
  
    console.log("Mock payment submitted:", {
      amount,
      email,
      cardNumber,
      cardExpir,
      cardCVC,
      cardName,
      countryRegion,
    });
  
    if (numericAmount === totalBalance) {
      setRows([]); // Clear the table
      console.log("Payment matched total. Cleared rows.");
    } else {
      console.log("Payment submitted, but total doesn't match.");
    }
  
    closeMakePaymentModal();
  };
  

  const [rows, setRows] = useState([
    {
      no: 1,
      article: "Fakemed1",
      subtitle: "Pharmacy",
      date: "1/02/25",
      unitPrice: "$50",
      charge: "$50",
      credit: "$0",
      currentBill: "$50",
    },
    {
      no: 2,
      article: "Appointment",
      subtitle: "Doctor",
      date: "1/02/25",
      unitPrice: "$150",
      charge: "$50",
      credit: "$0",
      currentBill: "$200",
    },
  ]);

  const calculateTotalBalance = () => {
    return rows.reduce((total, row) => {
      const numeric = parseFloat(row.currentBill.replace("$", ""));
      return total + numeric;
    }, 0);
  };
  
  return (
    <div style={{ display: "flex" }}>
      <Patient_Navbar />
      <Box
        sx={{
          flexGrow: 1,
          padding: 4,
          height: "100vh",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            marginBottom: 3,
            fontWeight: 600,
            fontFamily: "Montserrat",
            fontSize: "2em",
            color: "#1a1a1a",
            paddingLeft: "2vw",
          }}
        >
          Billing
        </Typography>

        <Paper
          elevation={0}
          sx={{
            borderRadius: "20px",
            paddingLeft: "10%",
            paddingRight: "10%",
            backgroundColor: "#eef2fe",
            maxWidth: "85%",
            height: "85vh",
            margin: "auto",
            paddingTop: "5%",
          }}
        >
          <TableContainer sx={{ maxHeight: "75vh" }}>
            <Table stickyHeader aria-label="sticky table" sx={{ border: "none" }}>
              <TableHead sx={{ border: "none" }}>
                <TableRow sx={{ border: "none" }}>
                  {columns.map((column) => (
                    <CustomTableCell
                      sx={{
                        border: "none",
                        backgroundColor: "#FAFAFA",
                        fontFamily: "Montserrat",
                        fontWeight: "medium",
                      }}
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </CustomTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody sx={{ border: "none" }}>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.no}>
                      {columns.map((column) => (
                        <TableCell sx={{ border: "none", fontFamily: "Montserrat", fontWeight: 600}} key={column.id} align={column.align}>
                          {column.id === "article" ? (
                            <>
                              <Typography
                                sx={{ fontWeight: 600, fontFamily: "Montserrat" }}
                              >
                                {row.article}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: "gray", fontFamily: "Montserrat" }}
                              >
                                {row.subtitle}
                              </Typography>
                            </>
                          ) : column.format && typeof row[column.id] === "number" ? (
                            column.format(row[column.id])
                          ) : (
                            row[column.id]
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination sx={{ fontWeight: 600, fontFamily: "Montserrat" }}
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, mr: 2 }}>
            <Typography variant="subtitle1" sx={{fontFamily: "Montserrat", fontWeight: 600}}>
              Current Balance <span style={{ color: "#4a4a4a", fontFamily: "Montserrat", marginLeft: '3vw'}}>${calculateTotalBalance()}</span>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              onClick={openMakePaymentModal}

              variant="contained"
              sx={{
                backgroundColor: "#6B5DD3",
                fontFamily: "Montserrat",
                borderRadius: "20px",
                paddingX: 4,
                paddingY: 1.5,
                textTransform: "none",
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: "#574ab3",
                },
              }}
            >
              Make a Payment
            </Button>
            <Modal
                    open={openMakePayment}
                    onClose={closeMakePaymentModal}

                    //aria-labelledby="modal-modal-title"
                    //aria-describedby="modal-modal-description"
            >
              <Box
  component="form"
  onSubmit={handlePaymentSubmit}
  sx={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#f4f6fc",
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  }}
>
  <Typography variant="h6" sx={{ fontFamily: "Montserrat", fontWeight: 600 }}>
    Payment
  </Typography>

  <TextField
    label="Amount"
    fullWidth
    placeholder="$"
    variant="outlined"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
    required
  />
  <TextField
    label="Email"
    fullWidth
    placeholder="you@example.com"
    variant="outlined"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />
  <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: "Montserrat" }}>
    Card information
  </Typography>
  <TextField
    placeholder="0000 0000 0000 0000"
    fullWidth
    variant="outlined"
    value={cardNumber}
    onChange={(e) => setcardNumber(e.target.value)}
    required
  />
  <Box sx={{ display: "flex", gap: 1 }}>
    <TextField
      placeholder="MM/YY"
      variant="outlined"
      fullWidth
      value={cardExpir}
      onChange={(e) => setCardExpir(e.target.value)}
      required
    />
    <TextField
      placeholder="CVC"
      variant="outlined"
      fullWidth
      value={cardCVC}
      onChange={(e) => setCardCVC(e.target.value)}
      required
    />
  </Box>
  <TextField
    label="Name on card"
    fullWidth
    placeholder="Name"
    variant="outlined"
    value={cardName}
    onChange={(e) => setCardName(e.target.value)}
    required
  />
  <FormControl fullWidth>
    <InputLabel>Country or region</InputLabel>
    <Select
      required
      value={countryRegion}
      label="Country or region"
      onChange={(e) => setCountryRegion(e.target.value)}
    >
      <MenuItem value="US">United States</MenuItem>
      <MenuItem value="CA">Canada</MenuItem>
      <MenuItem value="UK">United Kingdom</MenuItem>
    </Select>
  </FormControl>
  <Button
   // onClick={closeMakePaymentModal}
    type="submit"
    fullWidth
    sx={{
      mt: 2,
      backgroundColor: "#1c1c1e",
      color: "#fff",
      fontFamily: "Montserrat",
      borderRadius: "8px",
      paddingY: 1.2,
      textTransform: "none",
      fontSize: "1rem",
      "&:hover": {
        backgroundColor: "#000",
      },
    }}
  >
    Pay
  </Button>
</Box>

            </Modal>
          </Box>
        </Paper>
      </Box>
    </div>
  );
}

export default Patient_Billing;
//do we want to allow them to do part of the payment or has to be whole charge at a time. Can it go into negative? Is it storing credit card information to check if it valid or not? 