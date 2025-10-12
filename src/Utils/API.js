import axios from 'axios';
import {URL} from '../Helpers/UserHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function Login_API(login_name, password, reg_phone, tokenInfo) {
  // let lg_ = 'test_Abc2';
  // let pass = 'Abc12345';
  // let phone = '009712345678';
  const token = tokenInfo ? tokenInfo.token : '';
  const os = (tokenInfo && tokenInfo.os) || '';
  let xmls = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <CustomerLoginCheck xmlns="http://tempuri.org/">
          <objCSLogin>
            <CustomerLoginName>${login_name}</CustomerLoginName>
            <Password>${password}</Password>
            <CustomerRegisteredPhone>${reg_phone}</CustomerRegisteredPhone>
            <Agent_GUID></Agent_GUID>
            <Device_Token>${token}</Device_Token>
            <OS_Type>${os}</OS_Type>
          </objCSLogin>
        </CustomerLoginCheck>
      </soap:Body>
    </soap:Envelope>`;
  console.log(xmls);
  return checkLogin(xmls).then(function (data) {
    return data;
  });
}

export async function getCustomerBalance(dtcd, sbcd, Login_Guid) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
    xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
     xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <getCustomerBalance xmlns="http://tempuri.org/">\
          <dtcd>' +
    dtcd +
    '</dtcd>\
          <sbcd>' +
    sbcd +
    '</sbcd>\
          <Login_Guid>' +
    Login_Guid +
    '</Login_Guid>\
        </getCustomerBalance>\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function EmirateIDCheck(EmirateID) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <EmirateIDCheck xmlns="http://tempuri.org/">\
          <EmirateID>' +
    EmirateID +
    '</EmirateID>\
        </EmirateIDCheck>\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function CustomerPayAmount(
  Amount,
  Agent_GUID,
  Login_GUID,
  Login_Detail_GUID,
  CardNo,
  Sid,
  DtCD,
  SBCD,
  Marchent_GUID,
) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <CustomerPayAmount xmlns="http://tempuri.org/">\
          <Login_GUID>' +
    Login_GUID +
    '</Login_GUID>\
          <Agent_GUID>' +
    Agent_GUID +
    '</Agent_GUID>\
          <Login_Detail_GUID>' +
    Login_Detail_GUID +
    '</Login_Detail_GUID>\
          <Amount>' +
    Amount +
    '</Amount>\
    <CardNo>' +
    CardNo +
    '</CardNo>\
    <Sid>' +
    Sid +
    '</Sid>\
    <DtCD>' +
    DtCD +
    '</DtCD>\
    <SBCD>' +
    SBCD +
    '</SBCD>\
    <Marchent_GUID>' +
    Marchent_GUID +
    '</Marchent_GUID>\
        </CustomerPayAmount>\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function mSAVE_PinCode(login_GUID, PinCode) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <mSAVE_PinCode xmlns="http://tempuri.org/">\
          <login_GUID>' +
    login_GUID +
    '</login_GUID>\
          <PinCode>' +
    PinCode +
    '</PinCode>\
        </mSAVE_PinCode>\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}
export async function GetOtherRate(baseCurrency, otherCurrency) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <GetOtherRate xmlns="http://tempuri.org/">\
          <baseCurrency>' +
    baseCurrency +
    '</baseCurrency>\
          <otherCurrency>' +
    otherCurrency +
    '</otherCurrency>\
        </GetOtherRate>\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}
export async function GetResendCustomer(Phone) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <GetResendCustomer xmlns="http://tempuri.org/">\
          <Phone>' +
    Phone +
    '</Phone>\
        </GetResendCustomer>\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function GetFcy_limit(Agent_GUID) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <GetFcy_limit xmlns="http://tempuri.org/">\
          <Agent_GUID>' +
    Agent_GUID +
    '</Agent_GUID>\
        </GetFcy_limit>\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}
export async function BanksListing() {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <BanksListing xmlns="http://tempuri.org/" />\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function DocumentListing(
  AgentID_GID,
  LoginID_GID,
  LoginID_Det_GID,
) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <DocumentListing xmlns="http://tempuri.org/">\
          <AgentID_GID>' +
    AgentID_GID +
    '</AgentID_GID>\
          <LoginID_GID>' +
    LoginID_GID +
    '</LoginID_GID>\
          <LoginID_Det_GID>' +
    LoginID_Det_GID +
    '</LoginID_Det_GID>\
        </DocumentListing>\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function CMB_Document_Type() {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <CMB_Document_Type xmlns="http://tempuri.org/" />\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function SaveSupport(
  agent_GUID,
  login_GUID,
  Cust_Login_Details_GUID,
  CustName,
  Phone,
  Description,
  RefrenceNo,
  Title,
) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <SaveSupport xmlns="http://tempuri.org/">\
          <agent_GUID>' +
    agent_GUID +
    '</agent_GUID>\
          <login_GUID>' +
    login_GUID +
    '</login_GUID>\
          <Cust_Login_Details_GUID>' +
    Cust_Login_Details_GUID +
    '</Cust_Login_Details_GUID>\
          <CustName>' +
    CustName +
    '</CustName>\
          <Phone>' +
    Phone +
    '</Phone>\
          <Description>' +
    Description +
    '</Description>\
    <RefrenceNo>' +
    RefrenceNo +
    '</RefrenceNo>\
    <Title>' +
    Title +
    '</Title>\
        </SaveSupport>\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function CustomerRegistrations(
  login_GUID,
  Login_Details,
  Ecnomic_Code,
  first_name,
  middle_name,
  last_name,
  dd_customer,
  dd_CustomerCategory,
  dd_nationality,
  dd_Profession,
  dd_IDentityType,
  Id_Number,
  issuedate,
  expirydate,
  dd_Issue,
  DOB,
  Place_of_Birth,
  Mob_No,
  dd_Emirates,
  dd_Residency,
  FrontBase64,
  ImageBack64,
  ImageSelfiebase64,
  confidence,
  isIdentical,
  agent_GUID,
  dd_Activity,
  longitude,
  latitude,
  street,
  City,
  States,
  Country,
  Address,
  Address2,
  City1,
  States1,
  Country1,
  GenderID,
) {
  let CUSTID_Details_GUID = '';
  let agent_Detail_GUID = '';
  let CUSTID_GUID = '';
  let LoginStatus_LOV = 1;
  let CustomerLogin = '';
  let Name_ARB = '';
  let Fax = 0;
  let Zipcode = 0;
  let Email = '';
  let GECL = 0;
  let CUST_CITY_ID = 0;
  let TRN = 0;
  let Bus_Act = 0;
  let Airport = '';
  let payment_method = 1;
  let front = 6;
  let back = 7;
  let selfie = 8;

  let tokenInfo = await AsyncStorage.getItem('@tokenInfo');
  tokenInfo = tokenInfo ? JSON.parse(tokenInfo) : null;
  const xmls = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <CustomerRegistrationsNoImage xmlns="http://tempuri.org/">
      <objCSLogin>
        <CUSTID_Details_GUID>${CUSTID_Details_GUID}</CUSTID_Details_GUID>
        <custImage>fd</custImage>
        <login_GUID>${login_GUID}</login_GUID>
        <Cust_Login_Details_GUID>${Login_Details}</Cust_Login_Details_GUID>
        <agent_GUID>${agent_GUID}</agent_GUID>
        <Password>${agent_Detail_GUID}</Password>
        <agent_Detail_GUID>${agent_Detail_GUID}</agent_Detail_GUID>
        <CUSTID_GUID>${CUSTID_GUID}</CUSTID_GUID>
        <Phone>${Mob_No}</Phone>
        <PinCode>45</PinCode>
        <LoginStatus_LOV>${LoginStatus_LOV}</LoginStatus_LOV>
        <CustomerLogin>${CustomerLogin}</CustomerLogin>
        <fcmToken>${tokenInfo?.token}</fcmToken>
        <CustomerName>${first_name}</CustomerName>
      </objCSLogin>
      <EC_Code>${Ecnomic_Code}</EC_Code>
      <Middle_Name>${middle_name}</Middle_Name>
      <Last_Name>${last_name}</Last_Name>
      <Name_ARB>${Name_ARB}</Name_ARB>
      <ID_No>${Id_Number}</ID_No>
      <Issue_Date>${issuedate}</Issue_Date>
      <Expiry_Date>${expirydate}</Expiry_Date>
      <DOB>${DOB}</DOB>
      <Phone>${Mob_No}</Phone>
      <Fax>${Mob_No}</Fax>
      <Zip>${Zipcode}</Zip>
      <GECL>${GECL}</GECL>
      <Temp_Address>${Address}</Temp_Address>
      <Per_Address>${Address2}</Per_Address>
      <Email>${Email}</Email>
      <TRN>${TRN}</TRN>
      <CUST_CITY_ID>${CUST_CITY_ID}</CUST_CITY_ID>
      <Cust_Type>${dd_customer}</Cust_Type>
      <Cust_Category>${dd_CustomerCategory}</Cust_Category>
      <Bus_Act>${dd_Activity}</Bus_Act>
      <Nationality>${dd_nationality}</Nationality>
      <Profession>${dd_Profession}</Profession>
      <ID_Type>${dd_IDentityType}</ID_Type>
      <Issue_Place>${dd_Issue}</Issue_Place>
      <Emirate>${dd_Emirates}</Emirate>
      <Residency>${dd_Residency}</Residency>
      <Airport>${Airport}</Airport>
      <payment_method>${payment_method}</payment_method>
      <Birth_Place>${Place_of_Birth}</Birth_Place>
      <confidence>${confidence}</confidence>
      <isIdentical>${isIdentical}</isIdentical>
      <longitude>${longitude}</longitude>
      <latitude>${latitude}</latitude>
      <street>${street}</street>
      <City>${City}</City>
      <States>${States}</States>
      <Country>${Country}</Country>
      <Address2>${Address2}</Address2>
      <City1>${City1}</City1>
      <States1>${States1}</States1>
      <Country1>${Country1}</Country1>
      <GenderID>${GenderID}</GenderID>
      <Device_Token>${tokenInfo?.token}</Device_Token>
      <OS_Type>${tokenInfo?.os}</OS_Type>
    </CustomerRegistrationsNoImage>
  </soap:Body>
</soap:Envelope>`;
  console.log('CustomerRegistrations');
  console.log(xmls);
  return callFunction(xmls).then(function (data) {
    console.log(data);
    return data;
  });
}

export async function CustomerImageOnly(login_GUID, agent_GUID, key, value) {
  let xmls = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <CustomerImageOnly xmlns="http://tempuri.org/">
          <login_GUID>${login_GUID}</login_GUID>
          <agent_GUID>${agent_GUID}</agent_GUID>
          <imgBase64StringDataArray>
            <KeyPair>
              <key>${key}</key>
              <value>${value}</value>
            </KeyPair>
          </imgBase64StringDataArray>
        </CustomerImageOnly>
      </soap:Body>
    </soap:Envelope>`;
  console.log(xmls);
  return callFunction(xmls).then(function (data) {
    console.log(data);
    return data;
  });
}

export async function CMB_AgentBranches(AgentID_GUID) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <CMB_AgentBranches xmlns="http://tempuri.org/">\
          <AgentID_GUID>' +
    AgentID_GUID +
    '</AgentID_GUID>\
        </CMB_AgentBranches>\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function CMB_AppointmentTypes() {
  let xmls = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <CMB_AppointmentTypes xmlns="http://tempuri.org/" />
  </soap:Body>
</soap:Envelope>`;
  console.log(xmls);
  return callFunction(xmls).then(function (data) {
    console.log(data);
    return data;
  });
}
export async function getCustomerProfile(
  agent_GUID,
  login_GUID,
  Cust_Login_Details_GUID,
  CUSTID_GUID,
  CUSTID_Details_GUID,
) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <getCustomerProfile xmlns="http://tempuri.org/">\
          <objCSLogin>\
            <CUSTID_Details_GUID>' +
    CUSTID_Details_GUID +
    '</CUSTID_Details_GUID>\
            <login_GUID>' +
    login_GUID +
    '</login_GUID>\
            <Cust_Login_Details_GUID>' +
    Cust_Login_Details_GUID +
    '</Cust_Login_Details_GUID>\
            <agent_GUID>' +
    agent_GUID +
    '</agent_GUID>\
            <CUSTID_GUID>' +
    CUSTID_GUID +
    '</CUSTID_GUID>\
          </objCSLogin>\
        </getCustomerProfile>\
      </soap:Body>\
    </soap:Envelope>';
  console.log(xmls);

  return callFunction(xmls).then(function (data) {
    console.log(data);
    return data;
  });
}

export async function Get_User_Details(login_name) {
  let lg_ = 'test_Abc2';
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
  xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
    <soap:Body>\
      <getCustomer xmlns="http://tempuri.org/">\
        <strLoginID>' +
    login_name +
    '</strLoginID>\
      </getCustomer>\
    </soap:Body>\
  </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}
export async function CMB_Agent() {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <CMB_Agent xmlns="http://tempuri.org/" />\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function CMB_Economy_Code() {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <CMB_Economy_Code xmlns="http://tempuri.org/" />\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function GetNationalities() {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
   xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
    <soap:Body>\
      <GetCountries xmlns="http://tempuri.org/" />\
    </soap:Body>\
  </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}
export async function CMB_BusActivity(Custsub_type) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <CMB_BusActivity xmlns="http://tempuri.org/">\
          <Cust_Sub_type>' +
    Custsub_type +
    '</Cust_Sub_type>\
        </CMB_BusActivity>\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}
export async function CMB_CustomerCategory(Custtype) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <CMB_CustomerCategory xmlns="http://tempuri.org/">\
          <Custtype>' +
    Custtype +
    '</Custtype>\
        </CMB_CustomerCategory>\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function CMB_CustomerType() {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <CMB_CustomerType xmlns="http://tempuri.org/" />\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function CMB_Emirates() {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <CMB_Emirates xmlns="http://tempuri.org/" />\
      </soap:Body>\
    </soap:Envelope>';
    console.log('CMB_Emirates');
    console.log(xmls);
  return callFunction(xmls).then(function (data) {
    console.log(data);
    return data;
  });
}

export async function CMB_IDentityType() {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
   xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
    <soap:Body>\
      <CMB_IDentityType xmlns="http://tempuri.org/" />\
    </soap:Body>\
  </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function CMB_Profession() {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <CMB_Profession xmlns="http://tempuri.org/" />\
      </soap:Body>\
    </soap:Envelope>';
  console.log(xmls);
  return callFunction(xmls).then(function (data) {
    console.log(data);
    return data;
  });
}
export async function CMB_Gender() {
  let xmls = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <CMB_Gender xmlns="http://tempuri.org/" />
      </soap:Body>
    </soap:Envelope>`;
  console.log(xmls);
  return callFunction(xmls).then(function (data) {
    console.log(data);
    return data;
  });
}

export async function CMB_Residency() {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <CMB_Residency xmlns="http://tempuri.org/" />\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function GetCountries() {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
   xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
    <soap:Body>\
      <GetCountries xmlns="http://tempuri.org/" />\
    </soap:Body>\
  </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function GetCustTypes() {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
   xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
    <soap:Body>\
      <GetCustTypes xmlns="http://tempuri.org/" />\
    </soap:Body>\
  </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function GetBankNames(Country) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
   xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
    <soap:Body>\
    <GetBankNames xmlns="http://tempuri.org/">\
    <Country>' +
    Country +
    '</Country>\
  </GetBankNames>\
    </soap:Body>\
  </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}
export async function GetBankNamesCMB(Country) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
   xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
    <soap:Body>\
    <CMB_BANKS xmlns="http://tempuri.org/">\
    <COUNTRY_ID>' +
    Country +
    '</COUNTRY_ID>\
  </CMB_BANKS>\
    </soap:Body>\
  </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function GetBranchNamesCMB(bankId) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
   xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
    <soap:Body>\
    <CMB_BANK_BRANCHES xmlns="http://tempuri.org/">\
    <BANK_ID>' +
    bankId +
    '</BANK_ID>\
  </CMB_BANK_BRANCHES>\
    </soap:Body>\
  </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function GetBeneficiaries(
  agent_GUID,
  login_GUID,
  Cust_Login_Details_GUID,
) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <GetBeneficiaries xmlns="http://tempuri.org/">\
          <agent_GUID>' +
    agent_GUID +
    '</agent_GUID>\
          <login_GUID>' +
    login_GUID +
    '</login_GUID>\
          <Cust_Login_Details_GUID>' +
    Cust_Login_Details_GUID +
    '</Cust_Login_Details_GUID>\
        </GetBeneficiaries>\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function GetAgents(currencyId, agent_GUID) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
   xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
    <soap:Body>\
      <CMB_BankAssociate xmlns="http://tempuri.org/">\
        <currencyId>' +
    currencyId +
    '</currencyId>\
        <agent_GUID>' +
    agent_GUID +
    '</agent_GUID>\
      </CMB_BankAssociate>\
    </soap:Body>\
  </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function GetCustomerBankAcccounts(
  strCustID_GID,
  B_SortbyLastUsed,
) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <GetCustomerBankAcccounts xmlns="http://tempuri.org/">\
          <strCustID_GID>' +
    strCustID_GID +
    '</strCustID_GID>\
          <B_SortbyLastUsed>' +
    B_SortbyLastUsed +
    '</B_SortbyLastUsed>\
        </GetCustomerBankAcccounts>\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function GetCustomerCrdtCardDetails(
  strCustID_GID,
  B_SortbyLastUsed,
) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <GetCustomerCrdtCardDetails xmlns="http://tempuri.org/">\
          <strCustID_GID>' +
    strCustID_GID +
    '</strCustID_GID>\
          <B_SortbyLastUsed>' +
    B_SortbyLastUsed +
    '</B_SortbyLastUsed>\
        </GetCustomerCrdtCardDetails>\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function GetRates(currencyId, dd_tr_type) {
  const xmls = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <GetRateNew xmlns="http://tempuri.org/">
          <ccyid>${currencyId}</ccyid>
          <PayMode_LOV>${dd_tr_type}</PayMode_LOV>
        </GetRateNew>
      </soap:Body>
    </soap:Envelope>`;
  console.log(xmls);
  return callFunction(xmls).then(function (data) {
    return data;
  });
}
export async function GetTransactionTypes() {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
   xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
    <soap:Body>\
      <CMB_TransactionTypes xmlns="http://tempuri.org/" />\
    </soap:Body>\
  </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function SendOTP(
  CustomerLoginName,
  Password,
  CustomerRegisteredPhone,
) {
  let xmls = `<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <SendOTP xmlns="http://tempuri.org/">\
          <objCSLogin>\
            <CustomerLoginName>${CustomerLoginName}</CustomerLoginName>\
            <Password>${Password}</Password>\
            <CustomerRegisteredPhone>${CustomerRegisteredPhone}</CustomerRegisteredPhone>\
          </objCSLogin>\
        </SendOTP>\
      </soap:Body>\
    </soap:Envelope>`;
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function OtpVerification(
  CustomerRegisteredPhone,
  strOTP,
  LovType,
) {
  let CustomerLoginName = '';
  let Password = '';
  let xmls = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <OtpVerification xmlns="http://tempuri.org/">
          <objCSLogin>
            <CustomerLoginName>${CustomerLoginName}</CustomerLoginName>
            <Password>${Password}</Password>
            <CustomerRegisteredPhone>${CustomerRegisteredPhone}</CustomerRegisteredPhone>
          </objCSLogin>
          <strOTP>${strOTP}</strOTP>
          <LovType>${LovType}</LovType>
        </OtpVerification>
      </soap:Body>
    </soap:Envelope>`;
  console.log({xmls});
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function VerifyOTP(
  CustomerLoginName,
  Password,
  CustomerRegisteredPhone,
  strOTP,
) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <VerifyOTP xmlns="http://tempuri.org/">\
          <objCSLogin>\
            <CustomerLoginName>' +
    CustomerLoginName +
    '</CustomerLoginName>\
            <Password>' +
    Password +
    '</Password>\
            <CustomerRegisteredPhone>' +
    CustomerRegisteredPhone +
    '</CustomerRegisteredPhone>\
          </objCSLogin>\
          <strOTP>' +
    strOTP +
    '</strOTP>\
        </VerifyOTP>\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function ChangePassword(
  CustomerLoginName,
  Password,
  CustomerRegisteredPhone,
) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <ChangePassword xmlns="http://tempuri.org/">\
          <objCSLogin>\
            <CustomerLoginName>' +
    CustomerLoginName +
    '</CustomerLoginName>\
            <Password>' +
    Password +
    '</Password>\
            <CustomerRegisteredPhone>' +
    CustomerRegisteredPhone +
    '</CustomerRegisteredPhone>\
          </objCSLogin>\
        </ChangePassword>\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}
export async function GetCurrencies() {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
   xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
    <soap:Body>\
      <GetCurrencies xmlns="http://tempuri.org/" />\
    </soap:Body>\
  </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}
export async function UpdatefcmToken(Cust_Login_Details_GUID, FcmToken) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <UpdatefcmToken xmlns="http://tempuri.org/">\
          <Cust_Login_Details_GUID>' +
    Cust_Login_Details_GUID +
    '</Cust_Login_Details_GUID>\
          <FcmToken>' +
    FcmToken +
    '</FcmToken>\
        </UpdatefcmToken>\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}
export async function RegisterCustomerNew(
  tokenInfo,
  CustomerLoginName,
  Password,
  CustomerRegisteredPhone,
  agent_GUID,
  S_CustName,
  imagedata1,
  imagedata,
) {
  const token = tokenInfo ? tokenInfo.token : '';
  const os = tokenInfo ? tokenInfo.os : '';
  const xmls = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
      <RegisterCustomerNew xmlns="http://tempuri.org/">
        <objCSLogin>
          <CustomerLoginName>${CustomerLoginName}</CustomerLoginName>
          <Password>${Password}</Password>
          <CustomerRegisteredPhone>${CustomerRegisteredPhone}</CustomerRegisteredPhone>
          <Agent_GUID>${agent_GUID}</Agent_GUID>
          <Device_Token>${token}</Device_Token>
          <OS_Type>${os}</OS_Type>
        </objCSLogin>
        <S_CustName>${S_CustName}</S_CustName>
      </RegisterCustomerNew>
      </soap:Body>
    </soap:Envelope>`;
  console.log(xmls);
  return callFunction(xmls).then(function (data) {
    console.log(data);
    return data;
  });
}
export async function Send_OTP(
  login_GUID,
  Cust_Login_Details_GUID,
  agent_GUID,
  Phone,
  LovType,
) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <Send_OTP xmlns="http://tempuri.org/">\
          <objOtp>\
            <login_GUID>' +
    login_GUID +
    '</login_GUID>\
            <Cust_Login_Details_GUID>' +
    Cust_Login_Details_GUID +
    '</Cust_Login_Details_GUID>\
            <agent_GUID>' +
    agent_GUID +
    '</agent_GUID>\
            <Phone>' +
    Phone +
    '</Phone>\
            <LovType>' +
    LovType +
    '</LovType>\
          </objOtp>\
        </Send_OTP>\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function SaveCustomerImage_withVerificationInfo(image1, image2) {
  console.log('image1, image2');
  console.log(image1, image2);
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <SaveCustomerImage_withVerificationInfo xmlns="http://tempuri.org/">\
          <imgBase64StringDataArray>\
            <string>' +
    image1 +
    '</string>\
            <string>' +
    image2 +
    '</string>\
          </imgBase64StringDataArray>\
          <B_isMatch>' +
    true +
    '</B_isMatch>\
          <D_MatchScore>' +
    100 +
    '</D_MatchScore>\
        </SaveCustomerImage_withVerificationInfo>\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function FwdSalePurFCY_Listing(
  agent_GUID,
  login_GUID,
  Cust_Login_Details_GUID,
  DT_startDate,
  DT_endDate,
) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <FCYListing xmlns="http://tempuri.org/">\
          <AgentID_GID>' +
    agent_GUID +
    '</AgentID_GID>\
          <LoginID_GID>' +
    login_GUID +
    '</LoginID_GID>\
          <LoginID_Det_GID>' +
    Cust_Login_Details_GUID +
    '</LoginID_Det_GID>\
          <DT_startDate>' +
    DT_startDate +
    '</DT_startDate>\
          <DT_endDate>' +
    DT_endDate +
    '</DT_endDate>\
        </FCYListing>\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function Delete_Appoitment(Appointment_GID) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <Delete_Appoitment xmlns="http://tempuri.org/">\
          <Appointment_GID>' +
    Appointment_GID +
    '</Appointment_GID>\
        </Delete_Appoitment>\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}
export async function Cancel_Appointment(Branch_GID, strCustID_GID) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <Cancel_Appointment xmlns="http://tempuri.org/">\
          <Branch_GID>' +
    Branch_GID +
    '</Branch_GID>\
          <strCustID_GID>' +
    strCustID_GID +
    '</strCustID_GID>\
        </Cancel_Appointment>\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    console.log(data);
    return data;
  });
}

export async function Appointment_Slots(Branch_GID, strCustID_GID, date) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <Appointment_Slots xmlns="http://tempuri.org/">\
          <Branch_GID>' +
    Branch_GID +
    '</Branch_GID>\
    <strCustID_GID>' +
    strCustID_GID +
    '</strCustID_GID>\
    <ADate>' +
    date +
    '</ADate>\
        </Appointment_Slots>\
      </soap:Body>\
    </soap:Envelope>';
  console.log(xmls);
  return callFunction(xmls).then(function (data) {
    return data;
  });
}
export async function AppointmentListing(
  agent_GUID,
  login_GUID,
  Cust_Login_Details_GUID,
  DT_startDate,
  DT_endDate,
) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <AppointmentListing xmlns="http://tempuri.org/">\
          <AgentID_GID>' +
    agent_GUID +
    '</AgentID_GID>\
          <LoginID_GID>' +
    login_GUID +
    '</LoginID_GID>\
          <LoginID_Det_GID>' +
    Cust_Login_Details_GUID +
    '</LoginID_Det_GID>\
          <DT_startDate>' +
    DT_startDate +
    '</DT_startDate>\
          <DT_endDate>' +
    DT_endDate +
    '</DT_endDate>\
        </AppointmentListing>\
      </soap:Body>\
    </soap:Envelope>';
  console.log(xmls);
  return callFunction(xmls).then(function (data) {
    console.log(data);
    return data;
  });
}

export async function TransactionLog_Listing(
  agent_GUID,
  login_GUID,
  Cust_Login_Details_GUID,
  DT_startDate,
  DT_endDate,
) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <FCYLTransLog xmlns="http://tempuri.org/">\
          <AgentID_GID>' +
    agent_GUID +
    '</AgentID_GID>\
          <LoginID_GID>' +
    login_GUID +
    '</LoginID_GID>\
          <LoginID_Det_GID>' +
    Cust_Login_Details_GUID +
    '</LoginID_Det_GID>\
          <DT_startDate>' +
    DT_startDate +
    '</DT_startDate>\
          <DT_endDate>' +
    DT_endDate +
    '</DT_endDate>\
        </FCYLTransLog>\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}
export async function NotificationListing(
  agent_GUID,
  login_GUID,
  Cust_Login_Details_GUID,
) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <NotificationListing xmlns="http://tempuri.org/">\
          <AgentID_GID>' +
    agent_GUID +
    '</AgentID_GID>\
          <LoginID_GID>' +
    login_GUID +
    '</LoginID_GID>\
          <LoginID_Det_GID>' +
    Cust_Login_Details_GUID +
    '</LoginID_Det_GID>\
        </NotificationListing>\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function ROApplication_Listing(
  agent_GUID,
  login_GUID,
  Cust_Login_Details_GUID,
  DT_startDate,
  DT_endDate,
) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <TransactionListing xmlns="http://tempuri.org/">\
          <AgentID_GID>' +
    agent_GUID +
    '</AgentID_GID>\
          <LoginID_GID>' +
    login_GUID +
    '</LoginID_GID>\
          <LoginID_Det_GID>' +
    Cust_Login_Details_GUID +
    '</LoginID_Det_GID>\
          <DT_startDate>' +
    DT_startDate +
    '</DT_startDate>\
          <DT_endDate>' +
    DT_endDate +
    '</DT_endDate>\
        </TransactionListing>\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function CMB_CountryCodes() {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <CMB_CountryCallingCodes xmlns="http://tempuri.org/" />\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}
export async function CMB_SourceOfFund() {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
 xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
  <soap:Body>\
    <CMB_SourceOfFund xmlns="http://tempuri.org/" />\
  </soap:Body>\
</soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function mSaveTicket(body) {
  let imagesArray = '';
  body.imgBase64Array.forEach(element => {
    imagesArray = imagesArray + `<string>${element}</string>`;
  });

  const xmls = `<?xml version="1.0" encoding="utf-8"?>
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <mSaveTicket xmlns="http://tempuri.org/">
        <CCID>1</CCID>
        <TicketType>${body.TicketType}</TicketType>
          <Subject>${body.Subject}</Subject>
          <Detail>${body.Detail}</Detail>
          <CustID_GID>${body.CustID_GID}</CustID_GID>
          <imgBase64Array>${imagesArray}</imgBase64Array>
      </mSaveTicket>
    </soap:Body>
  </soap:Envelope>`;

  return callFunction(xmls).then(function (data) {
    return data;
  });
}
export async function mSaveMessage(data) {
  let xmls = `<?xml version="1.0" encoding="utf-8"?>
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <mSaveMessage xmlns="http://tempuri.org/">
        <CCID>1</CCID>
        <Detail>${data.Detail}</Detail>
        <CustID_GID>${data.CustID_GID}</CustID_GID>
        <Ticket_ID>${data.Ticket_ID}</Ticket_ID>
        <Ticket_No>${data.Ticket_No}</Ticket_No>
      </mSaveMessage>
    </soap:Body>
  </soap:Envelope>`;
  return callFunction(xmls).then(function (data) {
    return data;
  });
}
export async function GetTicket(CustID_GID) {
  let xmls = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
      <GetTicket xmlns="http://tempuri.org/">
          <CCID>1</CCID>
          <CustID_GID>${CustID_GID}</CustID_GID>
        </GetTicket>
      </soap:Body>
    </soap:Envelope>`;
  return callFunction(xmls).then(function (data) {
    return data;
  });
}
export async function GetTicket_History(element) {
  let xmls = `<?xml version="1.0" encoding="utf-8"?>
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <GetTicket_History xmlns="http://tempuri.org/">
        <CCID>1</CCID>
        <Ticket_No>${element.Ticket_No}</Ticket_No>
      </GetTicket_History>
    </soap:Body>
  </soap:Envelope>`;
  console.log('Tickethistory');
  console.log(xmls);
  return callFunction(xmls).then(function (data) {
    console.log(data);
    return data;
  });
}
export async function Get_Tickets_ALL() {
  let xmls = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <Get_Tickets_ALL xmlns="http://tempuri.org/" />
      </soap:Body>
    </soap:Envelope>`;
  return callFunction(xmls).then(function (data) {
    return data;
  });
}
export async function LoadTicketType() {
  let xmls = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <LoadTicketType xmlns="http://tempuri.org/" />
      </soap:Body>
    </soap:Envelope>`;
  return callFunction(xmls).then(function (data) {
    return data;
  });
}
export async function CMB_Currency() {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <CMB_Currency xmlns="http://tempuri.org/" />\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}
export async function ROApplication_Listing_ByID(
  agent_GUID,
  login_GUID,
  Cust_Login_Details_GUID,
  strWbTTId,
) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <ROApplication_Listing_ByID xmlns="http://tempuri.org/">\
          <AgentID_GID>' +
    agent_GUID +
    '</AgentID_GID>\
          <LoginID_GID>' +
    login_GUID +
    '</LoginID_GID>\
          <LoginID_Det_GID>' +
    Cust_Login_Details_GUID +
    '</LoginID_Det_GID>\
          <TransId>' +
    strWbTTId +
    '</TransId>\
        </ROApplication_Listing_ByID>\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function GetRate_FwdSalePurFCY(B_IsSale, CCYID, agent_GUID) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <GetRate_FwdSalePurFCY xmlns="http://tempuri.org/">\
          <B_IsSale>' +
    B_IsSale +
    '</B_IsSale>\
          <CCYID>' +
    CCYID +
    '</CCYID>\
          <agent_GUID>' +
    agent_GUID +
    '</agent_GUID>\
        </GetRate_FwdSalePurFCY>\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}
export async function GetCommission(dd_currency, dd_tr_type, amt_fc, rate_1) {
  const xmls = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <GetCommmissionFromAmount xmlns="http://tempuri.org/">
          <ccyid>${dd_currency}</ccyid>
          <PayMode_LOV>${dd_tr_type}</PayMode_LOV>
          <Amount>${amt_fc}</Amount>
          <Rate>${rate_1}</Rate>
          <isFC>${true}</isFC>
        </GetCommmissionFromAmount>
      </soap:Body>
    </soap:Envelope>`;

  console.log(xmls);
  return callFunction(xmls).then(function (data) {
    return data;
  });
}
export async function GetPurposes() {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
   xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
    <soap:Body>\
      <GetPurposes xmlns="http://tempuri.org/" />\
    </soap:Body>\
  </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}
export async function SAVE_CustomerAppointment(
  login_GUID,
  Cust_Login_Details_GUID,
  agent_GUID,
  dd_Agentbranches,
  SlotID,
  AppointmentDate,
  AssignTime,
  Reason,
) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <SAVE_CustomerAppointment xmlns="http://tempuri.org/">\
          <login_GUID>' +
    login_GUID +
    '</login_GUID>\
          <Cust_Login_Details_GUID>' +
    Cust_Login_Details_GUID +
    '</Cust_Login_Details_GUID>\
          <agent_GUID>' +
    agent_GUID +
    '</agent_GUID>\
          <dd_Agentbranches>' +
    dd_Agentbranches +
    '</dd_Agentbranches>\
          <SlotID>' +
    SlotID +
    '</SlotID>\
          <AppointmentDate>' +
    AppointmentDate +
    '</AppointmentDate>\
          <AssignTime>' +
    AssignTime +
    '</AssignTime>\
          <AppointmentReason>' +
    Reason +
    '</AppointmentReason>\
        </SAVE_CustomerAppointment>\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function SaveFwdSalePurFCY(
  B_IsSale,
  I_CurrecyID,
  D_Rate,
  D_FCAmount,
  agent_GUID,
  login_GUID,
  Cust_Login_Details_GUID,
  DT_Maturitydate,
  RefrenceNo,
) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <SaveFCYTransaction xmlns="http://tempuri.org/">\
          <B_IsSale>' +
    B_IsSale +
    '</B_IsSale>\
          <I_CurrecyID>' +
    I_CurrecyID +
    '</I_CurrecyID>\
          <D_Rate>' +
    D_Rate +
    '</D_Rate>\
          <D_FCAmount>' +
    D_FCAmount +
    '</D_FCAmount>\
          <agent_GUID>' +
    agent_GUID +
    '</agent_GUID>\
          <login_GUID>' +
    login_GUID +
    '</login_GUID>\
          <Cust_Login_Details_GUID>' +
    Cust_Login_Details_GUID +
    '</Cust_Login_Details_GUID>\
          <DT_Maturitydate>' +
    DT_Maturitydate +
    '</DT_Maturitydate>\
    <RefrenceNo>' +
    RefrenceNo +
    '</RefrenceNo>\
        </SaveFCYTransaction>\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}
export async function SaveROApplication(
  agent_GUID,
  login_GUID,
  Cust_Login_Details_GUID,
  BENEID_GUID,
  I_CcyID,
  rate_1,
  rate_2,
  amt_fc,
  amt_lc,
  commission,
  vat,
  D_Total_LC,
  S_AssociateName,
  I_SOURCE_OF_FUND_ID,
  I_PURPOSE_ID,
  S_Transaction_Type,
  S_SenderPayMode,
  imagedata,
) {
  //   <O_PayModeInfo>\
  //   <ResponseMSG>\
  //     <MessageCode>string</MessageCode>\
  //     <IsErrorMessage>boolean</IsErrorMessage>\
  //     <Message>string</Message>\
  //     <MessageDetails>string</MessageDetails>\
  //   </ResponseMSG>\
  // </O_PayModeInfo>\
  let TR_GUID = '';
  let TR_DISPLAYID = '';
  let Status = 1;
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <SaveROApplication xmlns="http://tempuri.org/">\
          <objtrans>\
            <TR_GUID>' +
    TR_GUID +
    '</TR_GUID>\
            <TR_DISPLAYID>' +
    TR_DISPLAYID +
    '</TR_DISPLAYID>\
            <AssociateName>' +
    S_AssociateName +
    '</AssociateName>\
            <Agent_GUID>' +
    agent_GUID +
    '</Agent_GUID>\
            <login_GUID>' +
    login_GUID +
    '</login_GUID>\
            <Cust_Login_Details_GUID>' +
    Cust_Login_Details_GUID +
    '</Cust_Login_Details_GUID>\
            <BENEID_GUID>' +
    BENEID_GUID +
    '</BENEID_GUID>\
            <CCY>' +
    I_CcyID +
    '</CCY>\
            <Rate>' +
    rate_1 +
    '</Rate>\
            <Rate_2>' +
    rate_2 +
    '</Rate_2>\
            <AmountFC>' +
    amt_fc +
    '</AmountFC>\
            <AmountLC>' +
    amt_lc +
    '</AmountLC>\
            <Commission>' +
    commission +
    '</Commission>\
            <Vat_Amount>' +
    vat +
    '</Vat_Amount>\
            <AmountTotalLC>' +
    D_Total_LC +
    '</AmountTotalLC>\
            <SOURCE_OF_FUND_ID>' +
    I_SOURCE_OF_FUND_ID +
    '</SOURCE_OF_FUND_ID>\
            <PURPOSE_ID>' +
    I_PURPOSE_ID +
    '</PURPOSE_ID>\
            <TT_TYPE>' +
    S_Transaction_Type +
    '</TT_TYPE>\
            <Status>' +
    Status +
    '</Status>\
            <PaymentInfoId>' +
    S_SenderPayMode +
    '</PaymentInfoId>\
          </objtrans>\
          <imgBase64StringData_Invoice>' +
    imagedata +
    '</imgBase64StringData_Invoice>\
    <O_PayModeInfo>\
    <ResponseMSG>\
      <MessageCode>2</MessageCode>\
      <IsErrorMessage>1</IsErrorMessage>\
      <Message>string</Message>\
      <MessageDetails>string</MessageDetails>\
    </ResponseMSG>\
  </O_PayModeInfo>\
        </SaveROApplication>\
      </soap:Body>\
    </soap:Envelope>';

  return callFunction(xmls).then(function (data) {
    return data;
  });
}
export async function SaveDocument(
  agent_GUID,
  login_GUID,
  Cust_Login_Details_GUID,
  Doc_TypeID,
  Remarks,
  Images,
  name,
) {
  let xmls = `<?xml version="1.0" encoding="utf-8"?>
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <SaveDocument xmlns="http://tempuri.org/">
        <agent_GUID>${agent_GUID}</agent_GUID>
        <login_GUID>${login_GUID}</login_GUID>
        <Cust_Login_Details_GUID>${Cust_Login_Details_GUID}</Cust_Login_Details_GUID>
        <Doc_TypeID>${Doc_TypeID}</Doc_TypeID>
        <Remarks>${Remarks}</Remarks>
        <Doc_name>${name}</Doc_name>
        <ImgBase64>
          <string>${Images}</string>
        </ImgBase64>
      </SaveDocument>
    </soap:Body>
  </soap:Envelope>`;

  return callFunction(xmls).then(function (data) {
    console.log(xmls);
    return data;
  });
}

export async function SaveROApplication_Bank(
  strCustID_GID,
  strCustID_Det_GID,
  S_BeneID_App,
  I_CcyID,
  D_Rate,
  D_Rate_2,
  D_FCAmount,
  D_LCAmount,
  D_Commission,
  D_Vat_Percent,
  D_vat_Amount,
  D_Total_LC,
  S_AssociateName,
  I_SOURCE_OF_FUND_ID,
  I_PURPOSE_ID,
  S_Transaction_Type,
  S_SenderPayMode,
  imgBase64StringData_Invoice,
  BANK_CODE,
  BRANCH_NAME,
  BANK_NAME,
  ACC_NO,
  BankInfoID,
) {
  let BANK_CONTACTS = 'sharjah';

  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <SaveROApplication_BNK xmlns="http://tempuri.org/">\
          <strCustID_GID>' +
    strCustID_GID +
    '</strCustID_GID>\
          <strCustID_Det_GID>' +
    strCustID_Det_GID +
    '</strCustID_Det_GID>\
          <S_BeneID_App>' +
    S_BeneID_App +
    '</S_BeneID_App>\
          <I_CcyID>' +
    I_CcyID +
    '</I_CcyID>\
          <D_Rate>' +
    D_Rate +
    '</D_Rate>\
          <D_Rate_2>' +
    D_Rate_2 +
    '</D_Rate_2>\
          <D_FCAmount>' +
    D_FCAmount +
    '</D_FCAmount>\
          <D_LCAmount>' +
    D_LCAmount +
    '</D_LCAmount>\
          <D_Commission>' +
    D_Commission +
    '</D_Commission>\
          <D_Vat_Percent>' +
    D_Vat_Percent +
    '</D_Vat_Percent>\
          <D_vat_Amount>' +
    D_vat_Amount +
    '</D_vat_Amount>\
          <D_Total_LC>' +
    D_Total_LC +
    '</D_Total_LC>\
          <S_AssociateName>' +
    S_AssociateName +
    '</S_AssociateName>\
          <S_SOURCE_OF_FUND_ID>' +
    I_SOURCE_OF_FUND_ID +
    '</S_SOURCE_OF_FUND_ID>\
          <S_PURPOSE_ID>' +
    I_PURPOSE_ID +
    '</S_PURPOSE_ID>\
          <S_Transaction_Type>' +
    S_Transaction_Type +
    '</S_Transaction_Type>\
          <S_SenderPayMode>' +
    S_SenderPayMode +
    '</S_SenderPayMode>\
          <imgBase64StringData_Invoice>' +
    imgBase64StringData_Invoice +
    '</imgBase64StringData_Invoice>\
    <O_PayModeInfo>\
    <BankInfoID>' +
    BankInfoID +
    '</BankInfoID>\
    <BANK_NAME>' +
    BANK_NAME +
    '</BANK_NAME>\
    <ACC_NO>' +
    ACC_NO +
    '</ACC_NO>\
    <IBAN_NO>' +
    ACC_NO +
    '</IBAN_NO>\
    <BRANCH_NAME>' +
    BRANCH_NAME +
    '</BRANCH_NAME>\
    <BANK_CODE>' +
    BANK_CODE +
    '</BANK_CODE>\
    <BANK_CONTACTS>' +
    BANK_CONTACTS +
    '</BANK_CONTACTS>\
    <BANK_DETAILS>' +
    BRANCH_NAME +
    '</BANK_DETAILS>\
  </O_PayModeInfo>\
        </SaveROApplication_BNK>\
      </soap:Body>\
    </soap:Envelope>';

  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function SaveROApplication_CC(
  strCustID_GID,
  strCustID_Det_GID,
  S_BeneID_App,
  I_CcyID,
  D_Rate,
  D_Rate_2,
  D_FCAmount,
  D_LCAmount,
  D_Commission,
  D_Vat_Percent,
  D_vat_Amount,
  D_Total_LC,
  S_AssociateName,
  I_SOURCE_OF_FUND_ID,
  I_PURPOSE_ID,
  S_Transaction_Type,
  S_SenderPayMode,
  imgBase64StringData_Invoice,
  CRD_Expiry,
  CRD_TYPE,
  CRD_NO,
  CRD_SecretNo,
  CRDInfoID,
) {
  let CRD_HolderName = 'Ishaq';

  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <SaveROApplication_CC xmlns="http://tempuri.org/">\
          <strCustID_GID>' +
    strCustID_GID +
    '</strCustID_GID>\
          <strCustID_Det_GID>' +
    strCustID_Det_GID +
    '</strCustID_Det_GID>\
          <S_BeneID_App>' +
    S_BeneID_App +
    '</S_BeneID_App>\
          <I_CcyID>' +
    I_CcyID +
    '</I_CcyID>\
          <D_Rate>' +
    D_Rate +
    '</D_Rate>\
          <D_Rate_2>' +
    D_Rate_2 +
    '</D_Rate_2>\
          <D_FCAmount>' +
    D_FCAmount +
    '</D_FCAmount>\
          <D_LCAmount>' +
    D_LCAmount +
    '</D_LCAmount>\
          <D_Commission>' +
    D_Commission +
    '</D_Commission>\
          <D_Vat_Percent>' +
    D_Vat_Percent +
    '</D_Vat_Percent>\
          <D_vat_Amount>' +
    D_vat_Amount +
    '</D_vat_Amount>\
          <D_Total_LC>' +
    D_Total_LC +
    '</D_Total_LC>\
          <S_AssociateName>' +
    S_AssociateName +
    '</S_AssociateName>\
          <S_SOURCE_OF_FUND_ID>' +
    I_SOURCE_OF_FUND_ID +
    '</S_SOURCE_OF_FUND_ID>\
          <S_PURPOSE_ID>' +
    I_PURPOSE_ID +
    '</S_PURPOSE_ID>\
          <S_Transaction_Type>' +
    S_Transaction_Type +
    '</S_Transaction_Type>\
          <S_SenderPayMode>' +
    S_SenderPayMode +
    '</S_SenderPayMode>\
          <imgBase64StringData_Invoice>' +
    imgBase64StringData_Invoice +
    '</imgBase64StringData_Invoice>\
          <O_PayModeInfo>\
            <CRDInfoID>' +
    CRDInfoID +
    '</CRDInfoID>\
            <CRD_TYPE>' +
    CRD_TYPE +
    '</CRD_TYPE>\
            <CRD_NO>' +
    CRD_NO +
    '</CRD_NO>\
            <CRD_Expiry>' +
    CRD_Expiry +
    '</CRD_Expiry>\
            <CRD_HolderName>' +
    CRD_HolderName +
    '</CRD_HolderName>\
            <CRD_SecretNo>' +
    CRD_SecretNo +
    '</CRD_SecretNo>\
          </O_PayModeInfo>\
        </SaveROApplication_CC>\
      </soap:Body>\
    </soap:Envelope>';

  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function getCustomerDocuments(
  agent_GUID,
  Cust_Login_Details_GUID,
) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
    xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
     xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <getCustomerDocuments xmlns="http://tempuri.org/">\
          <agent_GUID>' +
    agent_GUID +
    '</agent_GUID>\
          <Cust_Login_Details_GUID>' +
    Cust_Login_Details_GUID +
    '</Cust_Login_Details_GUID>\
        </getCustomerDocuments>\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}
export async function GetRateList() {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
   xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
    <soap:Body>\
      <GetRateList xmlns="http://tempuri.org/" />\
    </soap:Body>\
  </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}
export async function SaveBeneficiary(
  agent_GUID,
  login_GUID,
  Cust_Login_Details_GUID,
  BEN_Name_First,
  BEN_Name_Last,
  BEN_Country,
  BEN_IBAN,
  BEN_Bank,
  BEN_BankIdentifier,
  BEN_BankBranch,
  BEN_Nationality,
  BEN_PhoneNo,
  BEN_Address,
  BEN_AccType,
) {
  let BEN_SysID = '';
  let CS_DisplayID = 0;
  let BEN_Type = 1;

  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
    xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
     xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <SaveBeneficiary xmlns="http://tempuri.org/">\
          <agent_GUID>' +
    agent_GUID +
    '</agent_GUID>\
          <login_GUID>' +
    login_GUID +
    '</login_GUID>\
          <Cust_Login_Details_GUID>' +
    Cust_Login_Details_GUID +
    '</Cust_Login_Details_GUID>\
          <objBen>\
            <CS_DisplayID>' +
    CS_DisplayID +
    '</CS_DisplayID>\
            <BEN_SysID>' +
    BEN_SysID +
    '</BEN_SysID>\
            <BEN_Name_First>' +
    BEN_Name_First +
    '</BEN_Name_First>\
            <BEN_Name_Last>' +
    BEN_Name_Last +
    '</BEN_Name_Last>\
            <BEN_Country>' +
    BEN_Country +
    '</BEN_Country>\
    <BEN_Type>' +
    BEN_Type +
    '</BEN_Type>\
            <BEN_IBAN>' +
    BEN_IBAN +
    '</BEN_IBAN>\
            <BEN_Bank>' +
    BEN_Bank +
    '</BEN_Bank>\
            <BEN_BankIdentifier>' +
    BEN_BankIdentifier +
    '</BEN_BankIdentifier>\
            <BEN_Nationality>' +
    BEN_Nationality +
    '</BEN_Nationality>\
            <BEN_Address>' +
    BEN_Address +
    '</BEN_Address>\
            <BEN_BankBranch>' +
    BEN_BankBranch +
    '</BEN_BankBranch>\
            <BEN_PhoneNo>' +
    BEN_PhoneNo +
    '</BEN_PhoneNo>\
    <BEN_AccType>' +
    BEN_AccType +
    '</BEN_AccType>\
          </objBen>\
        </SaveBeneficiary>\
      </soap:Body>\
    </soap:Envelope>';
  console.log(xmls);
  return callFunction(xmls).then(function (data) {
    console.log(data);
    return data;
  });
}

async function checkLogin(xmls) {
  const returnData = {
    success: false,
    responseBody: null,
  };

  let result = await callFunction(xmls).then(function (data) {
    return data;
  });

  if (result.success) {
    var XMLParser = require('react-xml-parser');
    var xml = new XMLParser().parseFromString(result.responseBody);
    if (xml.getElementsByTagName('MessageCode')[0].value == 2) {
      returnData.success = true;
      returnData.responseBody = 'Login Successful';
    } else {
      returnData.success = false;
      returnData.responseBody = 'Invalid Login / Password';
    }
    return returnData;
  } else {
    returnData.success = false;
    returnData.responseBody = result.responseBody;
    return returnData;
  }
}

async function callFunction(xmls) {
  const returnData = {
    success: false,
    responseBody: null,
  };
  return await axios
    .post(URL.API, xmls, {headers: {'Content-Type': 'text/xml; charset=utf-8'}})
    .then(res => {
      returnData.success = true;
      returnData.responseBody = res.data;
      return returnData;
    })
    .catch(err => {
      returnData.success = false;
      returnData.responseBody = err;
      return returnData;
    });
}

export async function getLastSixTransection(
  agent_GUID,
  login_GUID,
  Cust_Login_Details_GUID,
) {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
        <Transaction6hours xmlns="http://tempuri.org/">\
          <AgentID_GID>' +
    agent_GUID +
    '</AgentID_GID>\
          <LoginID_GID>' +
    login_GUID +
    '</LoginID_GID>\
          <LoginID_Det_GID>' +
    Cust_Login_Details_GUID +
    '</LoginID_Det_GID>\
        </Transaction6hours>\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}

export async function getAccountTypeListApi() {
  let xmls =
    '<?xml version="1.0" encoding="utf-8"?>\
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
     xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
      xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\
      <soap:Body>\
      <CMB_PaymentMode xmlns="http://tempuri.org/" />"\
      </soap:Body>\
    </soap:Envelope>';
  return callFunction(xmls).then(function (data) {
    return data;
  });
}
