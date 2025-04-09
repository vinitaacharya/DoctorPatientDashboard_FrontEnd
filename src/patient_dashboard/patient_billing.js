import React from "react";
import Patient_Navbar from "./patient_navbar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import TablePagination from '@mui/material/TablePagination';
import { styled } from "@mui/material/styles";

const columns = [
    { id: 'no', label: 'No.', minWidth: 50, align: 'left' },
    { id: 'article', label: 'Article', minWidth: 100, align: 'left' },
    { id: 'subtitle', label: 'Subtitle', minWidth: 100, align: 'left' },
    { id: 'date', label: 'Date', minWidth: 100, align: 'left' },
    { id: 'unitPrice', label: 'Unit Price', minWidth: 100, align: 'right' },
    { id: 'charge', label: 'Charge', minWidth: 100, align: 'right' },
    { id: 'credit', label: 'Credit', minWidth: 100, align: 'right' },
    { id: 'currentBill', label: 'Current Bill', minWidth: 120, align: 'right' }
  ];

const CustomTableCell = styled(TableCell)({
  fontWeight: 600,
  fontFamily: 'Montserrat',
  backgroundColor: "#f7f8fe",
  color: "#4a4a4a",
});

const rows = [
  { no: 1, article: "Fakemed1", subtitle: "Pharmacy", date: "1/02/25", unitPrice: "$50", charge: "$50", credit: "$0", currentBill: "$50" },
  { no: 2, article: "Appointment", subtitle: "Doctor", date: "1/02/25", unitPrice: "$150", charge: "$50", credit: "$0", currentBill: "$200" }
];

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
  return (
    <div style={{ display: "flex" }}>
      <Patient_Navbar />
      <Box
        sx={{
          flexGrow: 1,
          padding: 4,
          height: "100vh"
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
            paddingLeft: '2vw'
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
            paddingTop: "5%"
          }}
        >
        <TableContainer sx={{ maxHeight: '75vh'}}>
        <Table stickyHeader aria-label="sticky table" sx ={{border: 'none'}}>
          <TableHead sx ={{border: 'none'}}>
            <TableRow sx ={{border: 'none'}}>
              {columns.map((column) => (
                <CustomTableCell sx ={{border: 'none', backgroundColor: '#FAFAFA', fontFamily: 'Montserrat', fontWeight: 'medium'}}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </CustomTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx ={{border: 'none'}}>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.no}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell sx ={{border: 'none'}} key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, mr: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mr: 4 }}>
              Current Balance: <span style={{ color: "#4a4a4a" }}>$200</span>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
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
        </Box>
        </Paper>
      </Box>
    </div>
  );
}

export default Patient_Billing;
