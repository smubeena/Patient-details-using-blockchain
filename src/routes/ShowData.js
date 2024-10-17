import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import style from "./AddData.module.css";
import style2 from "./ShowData.module.css";
import { Card } from "@material-ui/core";
import { Button } from "@material-ui/core";

export default function ShowData(props) {
  const { patientBioMedList, showEdit, uploadCsv } = props;

  const formatDate = (dateString) => {
    if (dateString == "" || dateString == undefined) return undefined;

    const dateObj = new Date(dateString);

    const date = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();
    let age = currentYear - year;
    age = currentDate >= date && currentMonth >= month ? age : age - 1;

    return `${date}/${month + 1}/${year} ${age}yrs`;
  };
  return (
    <div className={style2.showDataContainer}>
      <Card className={style2.card}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <h2 className={style.h2}>Patient's Medical Data</h2>
          <Button
            onClick={() => showEdit()}
            style={{
              height: "30px",
              position: "absolute",
              right: "10px",
              zIndex: 1,
            }}
            color="success"
            variant="contained"
          >
            Add Data
          </Button>

          <Button
            onClick={() => uploadCsv()}
            style={{
              height: "30px",
              position: "absolute",
              right: "130px",
              zIndex: 1,
            }}
            color="success"
            variant="contained"
          >
            Upload CSV
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table className={style.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Sno.</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Birth Date</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>blood Group</TableCell>
                <TableCell>Disease Name</TableCell>
                <TableCell style={{ minWidth: "200px" }}>
                  Disease Description
                </TableCell>
                <TableCell>Disease StartedOn</TableCell>
                {/* <TableCell>Allergy</TableCell> */}
                <TableCell>BP</TableCell>
                <TableCell>Temp(F)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patientBioMedList.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{formatDate(row.birthDate)}</TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell>{row._address}</TableCell>
                  <TableCell>{row.bloodGroup}</TableCell>
                  <TableCell>{row.diseaseName}</TableCell>
                  <TableCell>{row.diseaseDescription}</TableCell>
                  <TableCell>{formatDate(row.diseaseStartedOn)}</TableCell>
                  <TableCell>{row.bp}</TableCell>
                  <TableCell>{row.temperature}</TableCell>
                  {/* <TableCell>{row.allergy}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
}
