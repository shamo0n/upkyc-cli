// src/Helpers/API.ts
import axios from "axios";
import XMLParser from "react-xml-parser";

// ===================== Constants =====================
export const Constants = {
  API: "https://amlhlep.com/OnBoarding_AML/LiveExMobileApp_WSDL.asmx",
};

// ================= SOAP Envelope =================
const soapXMLMain = (body: string) =>
  `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
               xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
               xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>${body}</soap:Body>
</soap:Envelope>`;

// ================= Types =================
export type AxiosReturn = {
  success: boolean;
  responseBody?: any;
  errorMessage?: string;
};

// ================= Axios SOAP Call =================
const axiosCall = async (
  xmlFunction: string,
  apiName: string,
  myCallback: (data: AxiosReturn) => void
) => {
  const xmls = soapXMLMain(xmlFunction);
  console.log(`[${apiName}] Request XML:\n`, xmls);

  const returnData: AxiosReturn = { success: false };

  try {
    const res = await axios.post(Constants.API, xmls, {
      headers: { "Content-Type": "text/xml; charset=utf-8" },
    });

    console.log(`[${apiName}] Raw Response:\n`, res.data);

    // Parse SOAP XML
    const parser = new XMLParser().parseFromString(res.data);

    const soapBodyNode = parser.children.find((child: any) =>
      child.name.toLowerCase().endsWith("body")
    );

    if (!soapBodyNode || soapBodyNode.children.length === 0) {
      returnData.success = false;
      returnData.errorMessage = "SOAP Body missing or invalid XML structure";
      myCallback(returnData);
      return;
    }

    const responseNode = soapBodyNode.children[0];
    returnData.success = true;
    returnData.responseBody = responseNode;
  } catch (err: any) {
    returnData.success = false;
    returnData.errorMessage = err.message || "An error occurred";
  }

  myCallback(returnData);
};

// ===================== Auth APIs =====================
export const CustomerSignupAPI = async (body: any, myCallback: (data: AxiosReturn) => void) => {
  const xmlFunction = `
    <CustomerSignup xmlns="http://tempuri.org/">
      <objCustomerSignup>
        <Email>${body.Email}</Email>
        <Password>${body.Password}</Password>
        <DeviceId>${body.DeviceId}</DeviceId>
        <DeviceType>${body.DeviceType}</DeviceType>
        <OTP>${body.OTP}</OTP>
      </objCustomerSignup>
    </CustomerSignup>`;
  await axiosCall(xmlFunction, "CustomerSignupAPI", myCallback);
};

export const CustomerLoginAPI = async (body: any, myCallback: (data: AxiosReturn) => void) => {
  const xmlFunction = `
    <CustomerLogin xmlns="http://tempuri.org/">
      <objCustomerLogin>
        <Email>${body.Email}</Email>
        <Password>${body.Password}</Password>
        <DeviceId>${body.DeviceId}</DeviceId>
        <DeviceType>${body.DeviceType}</DeviceType>
      </objCustomerLogin>
    </CustomerLogin>`;
  await axiosCall(xmlFunction, "CustomerLoginAPI", myCallback);
};

export const OTPVerifyOnSignupAPI = async (body: any, myCallback: (data: AxiosReturn) => void) => {
  const xmlFunction = `
    <OTPVerifyOnSignup xmlns="http://tempuri.org/">
      <objOTPVerification>
        <CUSTID_DIGITAL_GID>${body.CUSTID_DIGITAL_GID}</CUSTID_DIGITAL_GID>
        <Email>${body.Email}</Email>
        <OTP>${body.OTP}</OTP>
      </objOTPVerification>
    </OTPVerifyOnSignup>`;
  await axiosCall(xmlFunction, "OTPVerifyOnSignupAPI", myCallback);
};

export const OTPVerifyAPI = async (body: any, myCallback: (data: AxiosReturn) => void) => {
  const xmlFunction = `
    <OTPVerify xmlns="http://tempuri.org/">
      <objOTPVerification>
        <CUSTID_DIGITAL_GID>${body.CUSTID_DIGITAL_GID}</CUSTID_DIGITAL_GID>
        <Email>${body.Email}</Email>
        <OTP>${body.OTP}</OTP>
      </objOTPVerification>
    </OTPVerify>`;
  await axiosCall(xmlFunction, "OTPVerifyAPI", myCallback);
};

export const SendOTPVerificationAPI = async (body: any, myCallback: (data: AxiosReturn) => void) => {
  const xmlFunction = `
    <SendOTPVerification xmlns="http://tempuri.org/">
      <objSendOTP>
        <CUSTID_DIGITAL_GID>${body.CUSTID_DIGITAL_GID}</CUSTID_DIGITAL_GID>
        <RecipientName>${body.RecipientName}</RecipientName>
        <RecipientEmail>${body.RecipientEmail}</RecipientEmail>
        <Subject>${body.Subject}</Subject>
        <Title>${body.Title}</Title>
        <HTMLBody>${body.HTMLBody}</HTMLBody>
        <OTP>${body.OTP}</OTP>
      </objSendOTP>
    </SendOTPVerification>`;
  await axiosCall(xmlFunction, "SendOTPVerificationAPI", myCallback);
};

// ===================== Password / Reset =====================
export const ResetPasswordAPI = async (body: any, myCallback: (data: AxiosReturn) => void) => {
  const xmlFunction = `
    <ResetPassword xmlns="http://tempuri.org/">
      <objResetPassword>
        <CUSTID_DIGITAL_GID>${body.CUSTID_DIGITAL_GID}</CUSTID_DIGITAL_GID>
        <Email>${body.Email}</Email>
        <Password>${body.Password}</Password>
      </objResetPassword>
    </ResetPassword>`;
  await axiosCall(xmlFunction, "ResetPasswordAPI", myCallback);
};
// ===================== Profile API =====================
export const GetCustomerProfileCompleteAPI = async (
  body: { CUSTID_DIGITAL_GID: string; Email: string },
  myCallback: (data: AxiosReturn) => void
) => {
  const xmlFunction = `
    <GetCustomerProfileComplete xmlns="http://tempuri.org/">
      <objCustomerProfile>
        <CUSTID_DIGITAL_GID>${body.CUSTID_DIGITAL_GID}</CUSTID_DIGITAL_GID>
        <Email>${body.Email}</Email>
      </objCustomerProfile>
    </GetCustomerProfileComplete>`;

  await axiosCall(xmlFunction, "GetCustomerProfileCompleteAPI", myCallback);
};
export const OpenReportAPI = async (
  body: { Email: string; CUSTOMER_GID: string },
  myCallback: (data: AxiosReturn) => void
) => {
  const xmlFunction = `
    <OpenReport xmlns="http://tempuri.org/">
      <objEmailSend>
        <Email>${body.Email}</Email>
        <CUSTOMER_GID>${body.CUSTOMER_GID}</CUSTOMER_GID>
      </objEmailSend>
    </OpenReport>`;

  console.log(xmlFunction);

  await axiosCall(xmlFunction, "OpenReportAPI", myCallback);
};
// ===================== KYC APIs =====================
export const GET_KYCAPI = async (body: any, myCallback: (data: AxiosReturn) => void) => {
  const xmlFunction = `<GET_KYC xmlns="http://tempuri.org/">
      <CUSTOMER_GID>${body.CUSTOMER_GID}</CUSTOMER_GID>
    </GET_KYC>`;
  await axiosCall(xmlFunction, "GET_KYCAPI", myCallback);
};

export const SAVE_KYCAPI = async (body: any, myCallback: (data: AxiosReturn) => void) => {
  const questionsXml = body.questionList
    .map(q => `<QuestionsDetails>
        <question_GID>${q.question_GID}</question_GID>
        <set_Value>${q.set_Value}</set_Value>
      </QuestionsDetails>`)
    .join("");

  const xmlFunction = `<SAVE_KYC xmlns="http://tempuri.org/">
      <QuestionsInput>
        <QuectionList>${questionsXml}</QuectionList>
      </QuestionsInput>
      <CUSTOMER_GID>${body.CUSTOMER_GID}</CUSTOMER_GID>
    </SAVE_KYC>`;
  await axiosCall(xmlFunction, "SAVE_KYCAPI", myCallback);
};

export const kycTypeAPI = async (myCallback: (data: AxiosReturn) => void) => {
  const xmlFunction = `<CMB_KYC_DD_TYPES xmlns="http://tempuri.org/" />`;
  await axiosCall(xmlFunction, "kycTypeAPI", myCallback);
};

// ===================== Profile / Personal Info APIs =====================
export const UpdatePersonalInfoAPI = async (body: any, myCallback: (data: AxiosReturn) => void) => {
  const xmlFunction = `<UpdatePersonalInfo xmlns="http://tempuri.org/">
      <objPersonalInfo>
        <CUSTID_DIGITAL_GID>${body.CUSTID_DIGITAL_GID}</CUSTID_DIGITAL_GID>
        <Email>${body.Email}</Email>
        <FirstName>${body.FirstName}</FirstName>
        <MiddleName>${body.MiddleName}</MiddleName>
        <LastName>${body.LastName}</LastName>
        <Gender>${body.Gender}</Gender>
        <DOB>${body.DOB}</DOB>
        <CitizenshipCountryId>${body.CitizenshipCountryId}</CitizenshipCountryId>
      </objPersonalInfo>
    </UpdatePersonalInfo>`;
  await axiosCall(xmlFunction, "UpdatePersonalInfoAPI", myCallback);
};

export const UpdateAddressInfoAPI = async (body: any, myCallback: (data: AxiosReturn) => void) => {
  const xmlFunction = `<UpdateAddressInfo xmlns="http://tempuri.org/">
      <objAddressInfo>
        <CUSTID_DIGITAL_GID>${body.CUSTID_DIGITAL_GID}</CUSTID_DIGITAL_GID>
        <Email>${body.Email}</Email>
        <StreetAddress>${body.StreetAddress}</StreetAddress>
        <City>${body.City}</City>
        <Province>${body.Province}</Province>
        <PostalCode>${body.PostalCode}</PostalCode>
        <CountryId>${body.CountryId}</CountryId>
        <POBox>${body.POBox}</POBox>
      </objAddressInfo>
    </UpdateAddressInfo>`;
  await axiosCall(xmlFunction, "UpdateAddressInfoAPI", myCallback);
};

export const UpdateContactInfoAPI = async (body: any, myCallback: (data: AxiosReturn) => void) => {
  const xmlFunction = `<UpdateContactInfo xmlns="http://tempuri.org/">
      <objContactInfo>
        <CUSTID_DIGITAL_GID>${body.CUSTID_DIGITAL_GID}</CUSTID_DIGITAL_GID>
        <Email>${body.Email}</Email>
        <Phone>${body.Phone}</Phone>
      </objContactInfo>
    </UpdateContactInfo>`;
  await axiosCall(xmlFunction, "UpdateContactInfoAPI", myCallback);
};

export const UpdateIdentificationInfoAPI = async (body: any, myCallback: (data: AxiosReturn) => void) => {
  const xmlFunction = `<UpdateIdentificationInfo xmlns="http://tempuri.org/">
      <objIdentificationInfo>
        <CUSTID_DIGITAL_GID>${body.CUSTID_DIGITAL_GID}</CUSTID_DIGITAL_GID>
        <Email>${body.Email}</Email>
        <IdentificationTypeID>${body.IdentificationTypeID}</IdentificationTypeID>
        <IdentificationTypeName>${body.IdentificationTypeName}</IdentificationTypeName>
      </objIdentificationInfo>
    </UpdateIdentificationInfo>`;
  await axiosCall(xmlFunction, "UpdateIdentificationInfoAPI", myCallback);
};

// ===================== Documents APIs =====================
export const SaveSignupDocumentAPI = async (body: any, myCallback: (data: AxiosReturn) => void) => {
  const xmlFunction = `<SaveSignupDocument xmlns="http://tempuri.org/">
      <IDTypeID>${body.IDTypeID}</IDTypeID>
      <objDoc>
        <CUSTID_DIGITAL_GID>${body.CUSTID_DIGITAL_GID}</CUSTID_DIGITAL_GID>
        <Email>${body.Email}</Email>
        <Doccument_type>${body.Doccument_type}</Doccument_type>
        <Document_NO>${body.Document_NO}</Document_NO>
        <Document_issue_Date>${body.Document_issue_Date}</Document_issue_Date>
        <Document_expiry_Date>${body.Document_expiry_Date}</Document_expiry_Date>
        <doc_MASTER_DETAILS>${body.doc_MASTER_DETAILS}</doc_MASTER_DETAILS>
        <remarks>${body.remarks}</remarks>
        <doc_name>${body.doc_name}</doc_name>
        <doc_Base64>${body.doc_Base64}</doc_Base64>
        <livenessResult>${body.livenessResult}</livenessResult>
        <livenessScore>${body.livenessScore}</livenessScore>
      </objDoc>
      <MatchPercentage>${body.MatchPercentage}</MatchPercentage>
    </SaveSignupDocument>`;
  await axiosCall(xmlFunction, "SaveSignupDocumentAPI", myCallback);
};

export const SaveCustomerDocumentAPI = async (body: any, myCallback: (data: AxiosReturn) => void) => {
  const xmlFunction = `<SaveCustomerDocument xmlns="http://tempuri.org/">
      <objDoc>
        <CUSTID_DIGITAL_GID>${body.CUSTID_DIGITAL_GID}</CUSTID_DIGITAL_GID>
        <Email>${body.Email}</Email>
        <Doccument_type>${body.Doccument_type}</Doccument_type>
        <Document_NO>${body.Document_NO}</Document_NO>
        <Document_issue_Date>${body.Document_issue_Date}</Document_issue_Date>
        <Document_expiry_Date>${body.Document_expiry_Date}</Document_expiry_Date>
        <doc_MASTER_DETAILS>${body.doc_MASTER_DETAILS}</doc_MASTER_DETAILS>
        <remarks>${body.remarks}</remarks>
        <doc_name>${body.doc_name}</doc_name>
        <doc_Base64>${body.doc_Base64}</doc_Base64>
      </objDoc>
    </SaveCustomerDocument>`;
  await axiosCall(xmlFunction, "SaveCustomerDocumentAPI", myCallback);
};

export const GetDocumentListingAPI = async (body: any, myCallback: (data: AxiosReturn) => void) => {
  const xmlFunction = `<GetDocumentListing xmlns="http://tempuri.org/">
      <CUSTID_DIGITAL_GID>${body.CUSTID_DIGITAL_GID}</CUSTID_DIGITAL_GID>
    </GetDocumentListing>`;
  await axiosCall(xmlFunction, "GetDocumentListingAPI", myCallback);
};

export const GetDocumentByFilePathAPI = async (body: any, myCallback: (data: AxiosReturn) => void) => {
  const xmlFunction = `<GetDocumentByFilePath xmlns="http://tempuri.org/">
      <filepath>${body.filepath}</filepath>
    </GetDocumentByFilePath>`;
  await axiosCall(xmlFunction, "GetDocumentByFilePathAPI", myCallback);
};

// ===================== Utility APIs =====================
export const getCountriesListAPI = async (myCallback: (data: AxiosReturn) => void) => {
  const xmlFunction = `<getCountriesList xmlns="http://tempuri.org/" />`;
  await axiosCall(xmlFunction, "getCountriesListAPI", myCallback);
};
export const getProvince_or_StateListAPI = async (
  body: { nCountryID: string | number },
  myCallback: (data: AxiosReturn) => void
) => {
  const xmlFunction = `<getProvince_or_StateList xmlns="http://tempuri.org/">
      <nCountryID>${body.nCountryID}</nCountryID>
    </getProvince_or_StateList>`;
  await axiosCall(xmlFunction, "getProvince_or_StateListAPI", myCallback);
};

export const getBankListAPI = async (myCallback: (data: AxiosReturn) => void) => {
  const xmlFunction = `<getBankList xmlns="http://tempuri.org/" />`;
  await axiosCall(xmlFunction, "getBankListAPI", myCallback);
};

export const getBranchesListAPI = async (body: any, myCallback: (data: AxiosReturn) => void) => {
  const xmlFunction = `<getBranchesList xmlns="http://tempuri.org/">
      <BankID>${body.BankID}</BankID>
    </getBranchesList>`;
  await axiosCall(xmlFunction, "getBranchesListAPI", myCallback);
};
