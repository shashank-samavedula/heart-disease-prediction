// SPDX-License-Identifier: MIT

// pragma solidity ^0.8.0;
// pragma experimental ABIEncoderV2;

// contract patient {
//     struct Pat {
//         string name;
//         uint age;
//         address[] listDocs;
//         mapping(address => bool) docs;
//         Record[] record;
//     }

//     struct Record {
//         string diseaseType;
//         string treatment;
//         string medicine;
//     }

//     address owner;
//     Pat pat;
//     string hash;

//     constructor() public {
//         owner = msg.sender;
//     }

//     modifier ifAuth() {
//         require(owner == msg.sender, "FALED TO AUTHORIZE");
//         _;
//     }

//     modifier isDoc() {
//         bool flag = false;
//         // for(uint i = 0; i < pat.docs.length; i++) {
//         //         if(pat.docs[i] == msg.sender) {
//         //             flag = true;
//         //             break;
//         //         }
//         // }
//         if (pat.docs[msg.sender] == true) flag = true;
//         if (msg.sender == owner) flag = true;
//         require(flag == true, "Not allowed to see");
//         _;
//     }

//     function getName() public view isDoc returns (string memory) {
//         return pat.name;
//     }

//     function getAge() public view isDoc returns (uint) {
//         return pat.age;
//     }

//     function getDocList() public view isDoc returns (address[] memory) {
//         return pat.listDocs;
//     }

//     function setName(string memory n) public ifAuth {
//         pat.name = n;
//     }

//     function setAge(uint n) public ifAuth {
//         pat.age = n;
//     }

//     function addDocToList(address n) public ifAuth {
//         pat.docs[n] = true;
//         pat.listDocs.push(n);
//     }

//     function addTreatment(
//         string memory disease,
//         string memory treat,
//         string memory med
//     ) public isDoc {
//         string memory temp1 = disease;
//         string memory temp2 = treat;
//         string memory temp3 = med;

//         pat.record.push(Record(temp1, temp2, temp3));
//     }

//     function viewHistory() public view isDoc returns (Record[] memory) {
//         return pat.record;
//     }

//     function getHash() public view isDoc returns (string memory) {
//         return hash;
//     }

//     function setHash(string memory h) public isDoc {
//         hash = h;
//     }
// }

pragma solidity ^0.8.0;

struct HealthIndicators {
    bool highBP;
    bool highChol;
    bool cholCheck;
    uint8 bmi;
    bool smoker;
    bool stroke;
    bool diabetes;
    bool physActivity;
    bool fruits;
    bool veggies;
    bool hvyAlcoholConsump;
    bool anyHealthcare;
    bool noDocbcCost;
    uint8 genHlth;
    uint8 mentHlth;
    uint8 physHlth;
    bool diffWalk;
    bool sex;
    uint8 age;
    uint8 education;
    uint256 income;
    bool prediction;
    string uploadedFile;
}

contract HeartDiseaseStorage {
    HealthIndicators[] public records;

    function addHeartDiseaseRecord(HealthIndicators memory indicators) public {
        records.push(indicators);
    }

    function getNumRecords() public view returns (uint256) {
        return records.length;
    }
}
