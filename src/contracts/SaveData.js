export const SAVE_DATA_LIST_ADDRESS =
  "0xA416a0380ba459a10512ae3ACE95bd1895D72121";
export const SAVE_DATA_LIST_ABI = [
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "data",
    outputs: [
      {
        internalType: "string",
        name: "hashOfOriginalDataString",
        type: "string",
      },
      {
        internalType: "string",
        name: "secondTimeEncryptedString",
        type: "string",
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "string",
        name: "medReportId",
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
        internalType: "uint256",
        name: "totalMedicalReports",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalMedicalReports",
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
    constant: false,
    inputs: [
      {
        internalType: "string",
        name: "secondTimeEncryptedString",
        type: "string",
      },
      {
        internalType: "string",
        name: "hashOfOriginalDataString",
        type: "string",
      },
      {
        internalType: "string",
        name: "medReportId",
        type: "string",
      },
    ],
    name: "saveData",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];
