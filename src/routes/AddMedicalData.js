import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import React, { useState } from "react";
import style from "./AddData.module.css";

export default function AddMedicalData(props) {
  const {
    patientMedicalData,
    setPatientMedicalData,
    addUpdatePatientMedicalData,
    handleBack,
    hide,
  } = props;

  const handleChange = (e) => {
    if (
      // patientMedicalData.weight == '' ||
      // patientMedicalData.height == '' ||
      patientMedicalData.bloodGroup == "" ||
      patientMedicalData.diseaseName == "" ||
      patientMedicalData.diseaseDescription == "" ||
      patientMedicalData.diseaseStartedOn == ""
    ) {
      alert("all fields are required");
      return;
    }
    if (window.confirm("Are you sure that you want to save this data")) {
      addUpdatePatientMedicalData();
    }
    hide();
  };

  const as = (e) => {
    console.log(e._d.toDateString());
    if (e && e._d)
      setPatientMedicalData({
        ...patientMedicalData,
        diseaseStartedOn: e._d.toDateString(),
      });
  };

  const getBp = () => {
    fetch("http://169.254.183.71:5000/get-data")
      .then((response) => response.json())
      .then((data) => {
        setPatientMedicalData({
          ...patientMedicalData,
          bp: data["pulse_rate"],
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const getTemperature = () => {
    fetch("http://169.254.183.71:5000/get-data")
      .then((response) => response.json())
      .then((data) => {
        setPatientMedicalData({
          ...patientMedicalData,
          temperature: data["farenheit"],
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div className={style.cardContainer}>
      <Card className={style.card} elevation={0}>
        <h2 className={style.h2}>Patient Medical Data</h2>
        <form className={style.form} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Medical Report ID"
            variant="outlined"
            value={patientMedicalData.medReportId}
            onChange={(e) =>
              setPatientMedicalData({
                ...patientMedicalData,
                medReportId: e.target.value,
              })
            }
          />
          <TextField
            id="outlined-basic"
            label="Disease Name"
            variant="outlined"
            value={patientMedicalData.diseaseName}
            onChange={(e) =>
              setPatientMedicalData({
                ...patientMedicalData,
                diseaseName: e.target.value,
              })
            }
          />
          <div className={style.textFieldGroup}>
            <TextField
              id="outlined-basic"
              label="Blood Group"
              variant="outlined"
              value={patientMedicalData.bloodGroup}
              onChange={(e) =>
                setPatientMedicalData({
                  ...patientMedicalData,
                  bloodGroup: e.target.value,
                })
              }
            />
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Disease Started On"
              format="DD/MM/yyyy"
              className={style.date}
              value={patientMedicalData.diseaseStartedOn}
              // variant="inline"
              inputVariant="outlined"
              onChange={(e) => as(e)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </div>
          <div className={style.textFieldGroup}>
            <TextField
              id="outlined-basic"
              label="BP"
              variant="outlined"
              value={patientMedicalData.bp}
              onChange={(e) =>
                setPatientMedicalData({
                  ...patientMedicalData,
                  bp: e.target.value,
                })
              }
            />
            <Button className={[style.btn].join(" ")} onClick={getBp}>
              Get
            </Button>
          </div>
          <div className={style.textFieldGroup}>
            <TextField
              id="outlined-basic"
              label="Temp(ºC)"
              variant="outlined"
              value={patientMedicalData.temperature}
              onChange={(e) =>
                setPatientMedicalData({
                  ...patientMedicalData,
                  temperature: e.target.value,
                })
              }
            />
            <Button className={[style.btn].join(" ")} onClick={getTemperature}>
              Get
            </Button>
          </div>
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            value={patientMedicalData.diseaseDescription}
            multiline
            rows={2}
            onChange={(e) =>
              setPatientMedicalData({
                ...patientMedicalData,
                diseaseDescription: e.target.value,
              })
            }
          />
          <div className={style.btnGroup}>
            <Button
              className={[style.btn, style.btnRed].join(" ")}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button className={style.btn} onClick={(e) => handleChange()}>
              Save
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
