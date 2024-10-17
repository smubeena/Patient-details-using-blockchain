export const PATIENT_DATA_LIST_ADDRESS =
  "0x66595B9eb2c9421F3794e4a38CAF1a223BC1f407";
export const PATIENT_DATA_LIST_ABI = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    constant: true,
    inputs: [],
    name: "countMedicalReports",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "medicalReports",
    outputs: [
      {
        internalType: "address",
        name: "senderId",
        type: "address",
      },
      {
        internalType: "string",
        name: "medReportId",
        type: "string",
      },
      {
        internalType: "string",
        name: "bloodGroup",
        type: "string",
      },
      {
        internalType: "string",
        name: "diseaseName",
        type: "string",
      },
      {
        internalType: "string",
        name: "diseaseDescription",
        type: "string",
      },
      {
        internalType: "string",
        name: "diseaseStartedOn",
        type: "string",
      },
      {
        internalType: "string",
        name: "allergy",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "senders",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "institutionName",
        type: "string",
      },
      {
        internalType: "string",
        name: "institutionCode",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "patientCount",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "string",
        name: "patientId",
        type: "string",
      },
      {
        internalType: "string",
        name: "patientName",
        type: "string",
      },
      {
        internalType: "string",
        name: "birthDate",
        type: "string",
      },
      {
        internalType: "string",
        name: "phoneNumber",
        type: "string",
      },
      {
        internalType: "string",
        name: "_address",
        type: "string",
      },
      {
        internalType: "string",
        name: "medReportId",
        type: "string",
      },
      {
        internalType: "string",
        name: "bloodGroup",
        type: "string",
      },
      {
        internalType: "string",
        name: "diseaseName",
        type: "string",
      },
      {
        internalType: "string",
        name: "diseaseDescription",
        type: "string",
      },
      {
        internalType: "string",
        name: "diseaseStartedOn",
        type: "string",
      },
      {
        internalType: "string",
        name: "allergy",
        type: "string",
      },
    ],
    name: "addMedicalReport",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getPatientsList",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
