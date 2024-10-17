pragma solidity 0.5.16;

contract PatientData {
    uint256 public countMedicalReports = 0;

    mapping(address => Sender) public senders;
    mapping(uint => PatientMedicalReportStruct) public medicalReports;

    mapping(uint => string) hashes;
    uint hashCount = 0;

    struct PatientBioStruct {
        string name;
        string birthDate;
        string phoneNumber;
        string _address;
        uint medicalReportNo;
    }

    struct PatientMedicalReportStruct {
        address senderId;
        string medReportId;
        string bloodGroup;
        string diseaseName;
        string diseaseDescription;
        string diseaseStartedOn;
        string bp;
        string temp;
    }

    struct Sender {
        string name;
        string institutionName;
        string institutionCode;
        uint patientCount;
        mapping(uint => string) patientsArray;
        mapping(string => PatientBioStruct) patients;
    }

    constructor() public {}

    function addMedicalReport(
        string memory patientId,
        string memory patientName,
        string memory birthDate,
        string memory phoneNumber,
        string memory _address,
        string memory medReportId,
        string memory bloodGroup,
        string memory diseaseName,
        string memory diseaseDescription,
        string memory diseaseStartedOn,
        string memory bp,
        string memory temp
    ) public {
        // uint _hash = uint(keccak256(abi.encodePacked(msg.sender, patientId, medReportId)));
        bytes memory name = bytes(senders[msg.sender].patients[patientId].name);
        if (name.length == 0) {
            senders[msg.sender].patientsArray[
                senders[msg.sender].patientCount++
            ] = patientId;
            senders[msg.sender].patients[patientId] = PatientBioStruct(
                patientName,
                birthDate,
                phoneNumber,
                _address,
                countMedicalReports
            );

            medicalReports[countMedicalReports++] = PatientMedicalReportStruct(
                msg.sender,
                medReportId,
                bloodGroup,
                diseaseName,
                diseaseDescription,
                diseaseStartedOn,
                bp,
                temp
            );
        } else {
            PatientBioStruct memory patientBio = senders[msg.sender].patients[
                patientId
            ];
            senders[msg.sender].patients[patientId] = PatientBioStruct(
                patientName,
                birthDate,
                phoneNumber,
                _address,
                patientBio.medicalReportNo
            );
            medicalReports[
                patientBio.medicalReportNo
            ] = PatientMedicalReportStruct(
                msg.sender,
                medReportId,
                bloodGroup,
                diseaseName,
                diseaseDescription,
                diseaseStartedOn,
                bp,
                temp
            );
        }
    }

    function getPatientsList(
        uint index
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            uint
        )
    {
        PatientBioStruct memory patientBio = senders[msg.sender].patients[
            senders[msg.sender].patientsArray[index]
        ];
        return (
            patientBio.name,
            patientBio.birthDate,
            patientBio.phoneNumber,
            patientBio._address,
            patientBio.medicalReportNo
        );
    }
}
