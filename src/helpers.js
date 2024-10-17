import Papa from "papaparse";
import { useRef } from "react";

function uploadFile() {
  const fileInputRef = useRef();

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
      const patientBio = {
        id: row.id,
        name: row.name,
        birthDate: row.birthDate,
        phoneNumber: row.phoneNumber,
        _address: row._address,
      };

      const patientMedicalData = {
        medReportId: "MEDREP" + Math.ceil(Math.random() * 1000000000),
        bloodGroup: row.bloodGroup,
        diseaseName: row.diseaseName,
        diseaseDescription: row.diseaseDescription,
        diseaseStartedOn: row.diseaseStartedOn,
      };

      // Call Web3 contract method for each row of CSV
      await addUpdatePatientMedicalData(patientBio, patientMedicalData);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        ref={fileInputRef}
      />
    </div>
  );
}
