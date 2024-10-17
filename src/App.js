import { Box, Card, CardContent, Container, Paper } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import Web3 from "web3";
import style from "./App.module.css";
import {
  PATIENT_DATA_LIST_ADDRESS,
  PATIENT_DATA_LIST_ABI,
} from "./contracts/PatientData";
import {
  SAVE_DATA_LIST_ADDRESS,
  SAVE_DATA_LIST_ABI,
} from "./contracts/SaveData";
import Add from "./routes/Add";
import AddData from "./routes/AddData";
import AddMedicalData from "./routes/AddMedicalData";
import ShowData from "./routes/ShowData";
import CryptoJS from "crypto-js";
import sendToServerForSecondEncryption from "./server/sendToServerForSecondEncryption";
import Papa from "papaparse";

function App() {
  const [web3, setweb3] = useState();
  const [account, setAccount] = useState("");
  const [patientDataList, setPatientDataList] = useState([]);
  const [patientDataContract, setPatientDataContract] = useState([]);
  const [saveDataContract, setSaveDataContract] = useState([]);
  const [patientBioMedList, setPatientBioMedList] = useState([]);
  const [patientMedicalDataList, setPatientMedicalDataList] = useState([]);
  const fileInputRef = useRef();
  const [patientBio, setPatientBio] = useState({
    id: "",
    name: "",
    birthDate: "08 Aug 2003",
    phoneNumber: "",
    _address: "",
  });
  const [patientMedicalData, setPatientMedicalData] = useState({
    medReportId: "MEDREP" + Math.ceil(Math.random() * 1000000000),
    bloodGroup: "",
    diseaseName: "",
    diseaseDescription: "",
    diseaseStartedOn: "08 Aug 2003",
  });
  const [showAdd, setAdd] = useState(false);
  useEffect(async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const network = await web3.eth.net.getNetworkType();
    const accounts = await web3.eth.requestAccounts();
    setAccount(accounts[0]);
    console.log(accounts[0]);
    const patientDataContractCopy = new web3.eth.Contract(
      PATIENT_DATA_LIST_ABI,
      PATIENT_DATA_LIST_ADDRESS
    );
    const saveDataContractCopy = new web3.eth.Contract(
      SAVE_DATA_LIST_ABI,
      SAVE_DATA_LIST_ADDRESS
    );
    // console.log('volla', network, accounts, await patientDataContractCopy.methods.patients(0).call())
    setPatientDataContract(patientDataContractCopy);
    setSaveDataContract(saveDataContractCopy);
    // updateList(patientDataContractCopy, accounts[0])
    decryptEncryptedList(saveDataContractCopy);
    console.log(patientDataContractCopy);
    return () => {};
  }, []);

  const updateList = async (patientDataContract, acc) => {
    const senders = await patientDataContract.methods.senders(acc).call();
    // const medicalReports = await patientDataContract.methods.medicalReports(0).call()
    // let countMedicalReports = await patientDataContract.methods
    //   .countMedicalReports()
    //   .call()
    let countMedicalReports = senders.patientCount;

    console.log(countMedicalReports);

    let patientBioMedList = [];

    for (let i = 0; i < countMedicalReports; ++i) {
      console.log(await patientDataContract.methods.getPatientsList(i).call());
      let patientBio = await patientDataContract.methods
        .getPatientsList(i)
        .call();
      let patientMedicalReport = await patientDataContract.methods
        .medicalReports(parseInt(parseInt(patientBio[4])))
        .call();

      console.log(patientBioMedList);

      let patientBioMedObj = {
        name: patientBio[0],
        birthDate: patientBio[1],
        phoneNumber: patientBio[2],
        _address: patientBio[3],
        medicalReportNo: patientBio[4],
        senderId: patientMedicalReport.senderId,
        medReportId: patientMedicalReport.medReportId,
        bloodGroup: patientMedicalReport.bloodGroup,
        diseaseName: patientMedicalReport.diseaseName,
        diseaseDescription: patientMedicalReport.diseaseDescription,
        diseaseStartedOn: patientMedicalReport.diseaseStartedOn,
        bp: 0,
        temperature: 0,
      };
      patientBioMedList.push(patientBioMedObj);
    }
    setPatientBioMedList(patientBioMedList);
    console.log(senders, patientBioMedList);
  };

  const decryptEncryptedList = async (saveDataContract) => {
    let patientBioMedList = [];

    const totalMedicalReports = await saveDataContract.methods
      .totalMedicalReports()
      .call();
    for (let i = 0; i < totalMedicalReports; ++i) {
      const {
        hashOfOriginalDataString,
        secondTimeEncryptedString,
        sender,
        medReportId,
      } = await saveDataContract.methods.data(i).call();
      let firstCiphertext =
        sendToServerForSecondEncryption.decryptSecondCipherText(
          secondTimeEncryptedString,
          sender,
          medReportId
        );
      let originalDataObject = JSON.parse(
        CryptoJS.AES.decrypt(
          firstCiphertext,
          hashOfOriginalDataString
        ).toString(CryptoJS.enc.Utf8)
      );
      console.log(originalDataObject);
      let rowData = {
        ...originalDataObject.patientBio,
        ...originalDataObject.patientMedicalData,
      };
      patientBioMedList.push(rowData);
    }
    console.log(patientBioMedList);
    setPatientBioMedList(patientBioMedList);
  };

  // const addUpdatePatientBio = () => {
  //   patientDataContract.methods
  //     .addUpdatePatientBio(
  //       patientBio.name,
  //       patientBio.birthDate,
  //       patientBio.phoneNumber,
  //       patientBio._address,
  //     )
  //     .send({ from: account })
  //     .once('receipt', (receipt) => {
  //       console.log('saved')
  //       updateList(patientDataContract, account)
  //     })
  // }

  const addUpdatePatientMedicalData = (patientBio, patientMedicalData) => {
    console.log("patiend bio", patientBio);
    console.log("patient details", patientMedicalData);
    // patientDataContract.methods
    //   .addMedicalReport(
    //     patientBio.id,
    //     patientBio.name,
    //     patientBio.birthDate,
    //     patientBio.phoneNumber,
    //     patientBio._address,
    //     patientMedicalData.medReportId,
    //     parseInt(patientMedicalData.weight),
    //     parseInt(patientMedicalData.height),
    //     patientMedicalData.bloodGroup,
    //     patientMedicalData.diseaseName,
    //     patientMedicalData.diseaseDescription,
    //     patientMedicalData.diseaseStartedOn,
    //   )
    //   .send({ from: account })
    //   .once('receipt', (receipt) => {
    //     console.log('saved', receipt)
    //     updateList(patientDataContract, account)
    //   })
    let JSONStringData = JSON.stringify({ patientBio, patientMedicalData });
    console.log("jsonstrng dat ", JSONStringData);
    let hash = CryptoJS.SHA256(JSONStringData).toString(CryptoJS.enc.Hex);
    console.log(hash);
    let firstCiphertext = CryptoJS.AES.encrypt(JSONStringData, hash).toString();
    console.log(firstCiphertext);
    let secondCiphertext =
      sendToServerForSecondEncryption.encryptFirstCipherText(
        firstCiphertext,
        account,
        patientMedicalData.medReportId
      );
    console.log(secondCiphertext);
    saveDataContract.methods
      .saveData(secondCiphertext, hash, patientMedicalData.medReportId)
      .send({ from: account })
      .once("receipt", (receipt) => {
        console.log("saved", receipt);
        // updateList(patientDataContract, account)
        console.log("got saved data", patientMedicalData);
        setPatientMedicalData({
          ...patientMedicalData,
          medReportId: "MEDREP" + Math.ceil(Math.random() * 1000000000),
        });
        decryptEncryptedList(saveDataContract);
      });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          console.log(result.data);
          uploadDataToWeb3(result.data); // Pass parsed data to Web3
        },
      });
    }
  };

  const uploadDataToWeb3 = async (data) => {
    for (let row of data) {
      const patientBioCsv = {
        id: row["PatientId"],
        name: row["Name"],
        birthDate: row["DOB"],
        phoneNumber: row["Phone number"],
        _address: row["Address"],
      };

      const patientMedicalDataCsv = {
        medReportId: "MEDREP" + Math.ceil(Math.random() * 1000000000),
        bloodGroup: row["Blood Type"],
        diseaseName: row["Medical Condition"],
        diseaseDescription:
          row["Bill"] +
          row["Room no"] +
          row["case"] +
          row["date of admission"] +
          row["Medicine"] +
          row["Condition"],
        diseaseStartedOn: row["Date of diease started"],
        bp: row["PULSE"],
        temperature: row["TEMPF"],
      };
      console.log("from csv", patientBioCsv);
      console.log("from csv", patientMedicalDataCsv);
      setPatientBio(patientBioCsv);
      setPatientMedicalData(patientMedicalDataCsv);
      addUpdatePatientMedicalData(patientBioCsv, patientMedicalDataCsv);
    }
  };

  const handleShowFilePicker = () => {
    fileInputRef.current.click();
  };

  return (
    <Container maxWidth="xl" className={style.container}>
      {showAdd && (
        <Add
          patientBio={patientBio}
          setPatientBio={(obj) => setPatientBio(obj)}
          // addUpdatePatientBio={addUpdatePatientBio}
          patientMedicalData={patientMedicalData}
          setPatientMedicalData={(obj) => setPatientMedicalData(obj)}
          addUpdatePatientMedicalData={() =>
            addUpdatePatientMedicalData(patientBio, patientMedicalData)
          }
          hide={() => setAdd(false)}
        />
      )}
      <ShowData
        patientBioMedList={patientBioMedList}
        showEdit={() => setAdd(!showAdd)}
        uploadCsv={() => handleShowFilePicker()}
      />

      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        ref={fileInputRef}
        hidden={true}
      />
    </Container>
  );
}

export default App;
