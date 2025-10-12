import {
  GetCountries,
  GetCustTypes,
  GetBankNames,
  GetBeneficiaries,
  GetRate_FwdSalePurFCYResult,
  GetCustomerCrdtCardDetails,
  ROApplication_Listing_ByID,
  GetCurrencies,
  CMB_SourceOfFund,
  GetTransactionTypes,
  GetAgents,
  GetRates,
  GetCustomerBankAcccounts,
  GetPurposes,
  GetCommission,
  GetRateList,
  FwdSalePurFCY_Listing,
  Appointment_Slots,
  CMB_Currency,
  ROApplication_Listing,
  TransactionLog_Listing,
  CMB_CountryCodes,
  CMB_CustomerCategory,
  CMB_CustomerType,
  CMB_Emirates,
  CMB_IDentityType,
  CMB_Residency,
  CMB_Profession,
  CMB_Gender,
  GetNationalities,
  CMB_Economy_Code,
  CMB_Agent,
  CMB_BusActivity,
  getCustomerProfile,
  CMB_AgentBranches,
  CMB_AppointmentTypes,
  GetOtherRate,
  Cancel_Appointment,
  getCustomerDocuments,
  NotificationListing,
  AppointmentListing,
  CMB_Document_Type,
  GetFcy_limit,
  DocumentListing,
  BanksListing,
  GetResendCustomer,
  getCustomerBalance,
  getLastSixTransection,
  GetBankNamesCMB,
  GetBranchNamesCMB,
  getAccountTypeListApi,
} from '../Utils/API';
import {convertXMLToJson} from './UserHelper';

export async function getFcy_limit(agent_GUID) {
  const Data = {
    success: false,
    responseBody: null,
  };
  const List = [];
  try {
    await GetFcy_limit(agent_GUID).then(data => {
      Data.success = data.success;
      Data.responseBody = data.responseBody;
      return data;
    });

    Data.responseBody = convertXMLToJson(Data.responseBody);
    Data.responseBody =
      Data.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].GetFcy_limitResponse[0].GetFcy_limitResult[0];
    List[List.length] = Data.responseBody;

    return List;
  } catch (error) {
    //
  }
}
export async function getResendCustomer(Phone) {
  const Data = {
    success: false,
    responseBody: null,
  };

  const List = [];
  try {
    await GetResendCustomer(Phone).then(data => {
      Data.success = data.success;
      Data.responseBody = data.responseBody;
      return data;
    });

    Data.responseBody = convertXMLToJson(Data.responseBody);
    Data.responseBody =
      Data.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].GetResendCustomerResponse[0].GetResendCustomerResult[0];
    List[List.length] = Data.responseBody;

    return List;
  } catch (error) {
    //
  }
}
export async function GetCustomerBalance(dtcd, sbcd, Login_Guid) {
  const Data = {
    success: false,
    responseBody: null,
  };

  const List = [];
  try {
    await getCustomerBalance(dtcd, sbcd, Login_Guid).then(data => {
      Data.success = data.success;
      Data.responseBody = data.responseBody;
      return data;
    });

    Data.responseBody = convertXMLToJson(Data.responseBody);
    Data.responseBody =
      Data.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].getCustomerBalanceResponse[0].getCustomerBalanceResult[0];
    List[List.length] = Data.responseBody;

    return List;
  } catch (error) {
    //
  }
}
export async function GetCustomerProfile(
  agent_GUID,
  login_GUID,
  Cust_Login_Details_GUID,
  CUSTID_GUID,
  CUSTID_Details_GUID,
) {
  const Data = {
    success: false,
    responseBody: null,
  };

  const List = [];
  try {
    await getCustomerProfile(
      agent_GUID,
      login_GUID,
      Cust_Login_Details_GUID,
      CUSTID_GUID,
      CUSTID_Details_GUID,
    ).then(data => {
      Data.success = data.success;
      Data.responseBody = data.responseBody;
      return data;
    });

    Data.responseBody = convertXMLToJson(Data.responseBody);
    Data.responseBody =
      Data.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].getCustomerProfileResponse[0].getCustomerProfileResult[0];
    List[List.length] = Data.responseBody;

    return List;
  } catch (error) {
    //
  }
}

export async function banksListing() {
  const Data = {
    success: false,
    responseBody: null,
  };

  const List = [];
  try {
    await BanksListing().then(data => {
      Data.success = data.success;
      Data.responseBody = data.responseBody;
      return data;
    });

    Data.responseBody = convertXMLToJson(Data.responseBody);

    Data.responseBody =
      Data.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].BanksListingResponse[0].BanksListingResult[0][
        'diffgr:diffgram'
      ][0].ReturnDataSet[0].ReturnDataTable1;
    for (let index = 0; index < Data.responseBody.length; index++) {
      List.push({
        BankName: Data.responseBody[index].BankName[0].toString(),
        Link: Data.responseBody[index].Link[0].toString(),
      });
    }
    return List;
  } catch (error) {}
}

export async function documentListing(
  AgentID_GID,
  LoginID_GID,
  LoginID_Det_GID,
) {
  const Data = {
    success: false,
    responseBody: null,
  };

  const List = [];
  try {
    await DocumentListing(AgentID_GID, LoginID_GID, LoginID_Det_GID).then(
      data => {
        Data.success = data.success;
        Data.responseBody = data.responseBody;
        return data;
      },
    );

    Data.responseBody = convertXMLToJson(Data.responseBody);

    Data.responseBody =
      Data.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].DocumentListingResponse[0].DocumentListingResult[0][
        'diffgr:diffgram'
      ][0].ReturnDataSet[0].ReturnDataTable1;
    console.log({data: Data.responseBody[0]});
    for (let index = 0; index < Data.responseBody.length; index++) {
      List.push({
        Title: Data.responseBody[index].Title[0].toString(),
        TypeID: Data.responseBody[index].Doc_TypeID[0].toString(),
        Document: Data.responseBody[index].Document[0].toString(),
      });
    }
    return List;
  } catch (error) {}
}

export async function cmb_Document_Type() {
  const Data = {
    success: false,
    responseBody: null,
  };

  const List = [];
  try {
    await CMB_Document_Type().then(data => {
      Data.success = data.success;
      Data.responseBody = data.responseBody;
      return data;
    });

    Data.responseBody = convertXMLToJson(Data.responseBody);

    Data.responseBody =
      Data.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].CMB_Document_TypeResponse[0].CMB_Document_TypeResult[0][
        'diffgr:diffgram'
      ][0].ReturnDataSet[0].ReturnDataTable1;

    for (let index = 0; index < Data.responseBody.length; index++) {
      List.push({
        key: Data.responseBody[index].Value[0].toString(),
        name: Data.responseBody[index].Display[0].toString(),
      });
    }
    return List;
  } catch (error) {}
}
export async function appointmentListing(
  agent_GUID,
  login_GUID,
  Cust_Login_Details_GUID,
  DT_startDate,
  DT_endDate,
) {
  const rolisting = {
    success: false,
    responseBody: null,
  };
  const roList = [];
  try {
    await AppointmentListing(
      agent_GUID,
      login_GUID,
      Cust_Login_Details_GUID,
      DT_startDate,
      DT_endDate,
    ).then(data => {
      rolisting.success = data.success;
      rolisting.responseBody = data.responseBody;
      return data;
    });

    rolisting.responseBody = convertXMLToJson(rolisting.responseBody);

    rolisting.responseBody =
      rolisting.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].AppointmentListingResponse[0].AppointmentListingResult[0][
        'diffgr:diffgram'
      ][0].ReturnDataSet[0].ReturnDataTable1;
    for (let index = 0; index < rolisting.responseBody.length; index++) {
      roList.push([
        rolisting.responseBody[index].AppointmentDate[0].toString(),
        rolisting.responseBody[index].AssignTime[0].toString(),
        rolisting.responseBody[index].Reason[0].toString(),
        rolisting.responseBody[index].Address[0].toString(),
        rolisting.responseBody[index].Status[0].toString(),
      ]);
    }
    return roList;
  } catch (error) {
    //
  }
}
export async function getOtherRate(baseCurrency, otherCurrency) {
  const Data = {
    success: false,
    responseBody: null,
  };

  const List = [];
  try {
    await GetOtherRate(baseCurrency, otherCurrency).then(data => {
      Data.success = data.success;
      Data.responseBody = data.responseBody;
      return data;
    });

    Data.responseBody = convertXMLToJson(Data.responseBody);

    Data.responseBody =
      Data.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].GetOtherRateResponse[0].GetOtherRateResult[0];
    return Data.responseBody;
  } catch (error) {}
}
export async function cmb_AgentBranches(agent_GUID) {
  const Data = {
    success: false,
    responseBody: null,
  };

  const List = [];
  try {
    await CMB_AgentBranches(agent_GUID).then(data => {
      Data.success = data.success;
      Data.responseBody = data.responseBody;
      return data;
    });

    Data.responseBody = convertXMLToJson(Data.responseBody);

    Data.responseBody =
      Data.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].CMB_AgentBranchesResponse[0].CMB_AgentBranchesResult[0][
        'diffgr:diffgram'
      ][0].ReturnDataSet[0].ReturnDataTable1;

    for (let index = 0; index < Data.responseBody.length; index++) {
      List.push({
        key: Data.responseBody[index].Value[0].toString(),
        name: Data.responseBody[index].Display[0].toString(),
      });
    }
    return List;
  } catch (error) {}
}

export async function cmb_AppointmentTypes() {
  const Data = {
    success: false,
    responseBody: null,
  };

  const List = [];
  try {
    await CMB_AppointmentTypes().then(data => {
      Data.success = data.success;
      Data.responseBody = data.responseBody;
      return data;
    });

    Data.responseBody = convertXMLToJson(Data.responseBody);

    Data.responseBody =
      Data.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].CMB_AppointmentTypesResponse[0].CMB_AppointmentTypesResult[0][
        'diffgr:diffgram'
      ][0].ReturnDataSet[0].ReturnDataTable1;

    for (let index = 0; index < Data.responseBody.length; index++) {
      List.push({
        key: Data.responseBody[index].Value[0].toString(),
        name: Data.responseBody[index].Display[0].toString(),
      });
    }
    return List;
  } catch (error) {}
}

export async function getNationalities() {
  const countries = {
    success: false,
    responseBody: null,
  };
  const countriesList = [];
  await GetNationalities().then(data => {
    countries.success = data.success;
    countries.responseBody = data.responseBody;
    return data;
  });

  countries.responseBody = convertXMLToJson(countries.responseBody);

  countries.responseBody =
    countries.responseBody['soap:Envelope'][
      'soap:Body'
    ][0].GetCountriesResponse[0].GetCountriesResult[0][
      'diffgr:diffgram'
    ][0].ReturnDataSet[0].ReturnDataTable1;

  for (let index = 0; index < countries.responseBody.length; index++) {
    countriesList.push({
      key: countries.responseBody[index].CountryID[0].toString(),
      name: countries.responseBody[index].CountryName[0].toString(),
    });
  }
  return countriesList;
}
export async function cmb_Profession() {
  const Data = {
    success: false,
    responseBody: null,
  };

  const List = [];
  await CMB_Profession().then(data => {
    Data.success = data.success;
    Data.responseBody = data.responseBody;
    return data;
  });

  Data.responseBody = convertXMLToJson(Data.responseBody);
  Data.responseBody =
    Data.responseBody['soap:Envelope'][
      'soap:Body'
    ][0].CMB_ProfessionResponse[0].CMB_ProfessionResult[0][
      'diffgr:diffgram'
    ][0].ReturnDataSet[0].ReturnDataTable1;

  for (let index = 0; index < Data.responseBody.length; index++) {
    List.push({
      key: Data.responseBody[index].Value[0].toString(),
      name: Data.responseBody[index].Display[0].toString(),
    });
  }
  return List;
}
export async function cmb_Gender() {
  const Data = {
    success: false,
    responseBody: null,
  };

  const List = [];
  await CMB_Gender().then(data => {
    Data.success = data.success;
    Data.responseBody = data.responseBody;
    return data;
  });

  Data.responseBody = convertXMLToJson(Data.responseBody);
  Data.responseBody =
    Data.responseBody['soap:Envelope'][
      'soap:Body'
    ][0].CMB_GenderResponse[0].CMB_GenderResult[0][
      'diffgr:diffgram'
    ][0].ReturnDataSet[0].ReturnDataTable1;
  console.log({gender: Data.responseBody[0]});
  for (let index = 0; index < Data.responseBody.length; index++) {
    List.push({
      key: Data.responseBody[index].Value[0].toString(),
      name: Data.responseBody[index].Display[0].toString(),
    });
  }
  return List;
}
export async function cmb_Residency() {
  const Data = {
    success: false,
    responseBody: null,
  };

  const List = [];
  await CMB_Residency().then(data => {
    Data.success = data.success;
    Data.responseBody = data.responseBody;
    return data;
  });

  Data.responseBody = convertXMLToJson(Data.responseBody);

  Data.responseBody =
    Data.responseBody['soap:Envelope'][
      'soap:Body'
    ][0].CMB_ResidencyResponse[0].CMB_ResidencyResult[0][
      'diffgr:diffgram'
    ][0].ReturnDataSet[0].ReturnDataTable1;

  for (let index = 0; index < Data.responseBody.length; index++) {
    List.push({
      key: Data.responseBody[index].Value[0].toString(),
      name: Data.responseBody[index].Display[0].toString(),
    });
  }
  return List;
}
export async function cmb_Agent() {
  const Data = {
    success: false,
    responseBody: null,
  };

  const List = [];
  try {
    await CMB_Agent().then(data => {
      Data.success = data.success;
      Data.responseBody = data.responseBody;
      return data;
    });

    Data.responseBody = convertXMLToJson(Data.responseBody);

    Data.responseBody =
      Data.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].CMB_AgentResponse[0].CMB_AgentResult[0][
        'diffgr:diffgram'
      ][0].ReturnDataSet[0].ReturnDataTable1;

    for (let index = 0; index < Data.responseBody.length; index++) {
      List.push({
        key: Data.responseBody[index].Value[0].toString(),
        name: Data.responseBody[index].Display[0].toString(),
      });
    }
    return List;
  } catch (error) {
    console.log('error', error);
  }
}

export async function cmb_Economy_Code() {
  const Data = {
    success: false,
    responseBody: null,
  };

  const List = [];
  await CMB_Economy_Code().then(data => {
    Data.success = data.success;
    Data.responseBody = data.responseBody;
    return data;
  });

  Data.responseBody = convertXMLToJson(Data.responseBody);

  Data.responseBody =
    Data.responseBody['soap:Envelope'][
      'soap:Body'
    ][0].CMB_Economy_CodeResponse[0].CMB_Economy_CodeResult[0][
      'diffgr:diffgram'
    ][0].ReturnDataSet[0].ReturnDataTable1;

  for (let index = 0; index < Data.responseBody.length; index++) {
    List.push({
      key: Data.responseBody[index].Value[0].toString(),
      name: Data.responseBody[index].Display[0].toString(),
    });
  }
  return List;
}
export async function cmb_IDentityType() {
  const Data = {
    success: false,
    responseBody: null,
  };

  const List = [];
  try {
    await CMB_IDentityType().then(data => {
      Data.success = data.success;
      Data.responseBody = data.responseBody;
      return data;
    });

    Data.responseBody = convertXMLToJson(Data.responseBody);

    Data.responseBody =
      Data.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].CMB_IDentityTypeResponse[0].CMB_IDentityTypeResult[0][
        'diffgr:diffgram'
      ][0].ReturnDataSet[0].ReturnDataTable1;

    for (let index = 0; index < Data.responseBody.length; index++) {
      List.push({
        key: Data.responseBody[index].Value[0].toString(),
        name: Data.responseBody[index].Display[0].toString(),
      });
    }
    return List;
  } catch (error) {}
}
export async function cmb_Emirates() {
  const Data = {
    success: false,
    responseBody: null,
  };

  const List = [];
  try {
    await CMB_Emirates().then(data => {
      Data.success = data.success;
      Data.responseBody = data.responseBody;
      return data;
    });

    Data.responseBody = convertXMLToJson(Data.responseBody);

    Data.responseBody =
      Data.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].CMB_EmiratesResponse[0].CMB_EmiratesResult[0][
        'diffgr:diffgram'
      ][0].ReturnDataSet[0].ReturnDataTable1;

    for (let index = 0; index < Data.responseBody.length; index++) {
      List.push({
        key: Data.responseBody[index].Value[0].toString(),
        name: Data.responseBody[index].Display[0].toString(),
      });
    }
    return List;
  } catch (error) {}
}
export async function cmb_CustomerType() {
  const Data = {
    success: false,
    responseBody: null,
  };

  const List = [];
  try {
    await CMB_CustomerType().then(data => {
      Data.success = data.success;
      Data.responseBody = data.responseBody;
      return data;
    });

    Data.responseBody = convertXMLToJson(Data.responseBody);

    Data.responseBody =
      Data.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].CMB_CustomerTypeResponse[0].CMB_CustomerTypeResult[0][
        'diffgr:diffgram'
      ][0].ReturnDataSet[0].ReturnDataTable1;

    for (let index = 0; index < Data.responseBody.length; index++) {
      List.push({
        key: Data.responseBody[index].Value[0].toString(),
        name: Data.responseBody[index].Display[0].toString(),
      });
    }
    return List;
  } catch (error) {}
}
export async function cmb_CustomerCategory(Custtype) {
  const Data = {
    success: false,
    responseBody: null,
  };

  const List = [];
  await CMB_CustomerCategory(Custtype).then(data => {
    Data.success = data.success;
    Data.responseBody = data.responseBody;
    return data;
  });

  Data.responseBody = convertXMLToJson(Data.responseBody);

  Data.responseBody =
    Data.responseBody['soap:Envelope'][
      'soap:Body'
    ][0].CMB_CustomerCategoryResponse[0].CMB_CustomerCategoryResult[0][
      'diffgr:diffgram'
    ][0].ReturnDataSet[0].ReturnDataTable1;

  for (let index = 0; index < Data.responseBody.length; index++) {
    List.push({
      key: Data.responseBody[index].Value[0].toString(),
      name: Data.responseBody[index].Display[0].toString(),
    });
  }
  return List;
}

export async function cmb_BusActivity(Custsub_type) {
  const Data = {
    success: false,
    responseBody: null,
  };

  const List = [];
  await CMB_BusActivity(Custsub_type).then(data => {
    Data.success = data.success;
    Data.responseBody = data.responseBody;
    return data;
  });

  Data.responseBody = convertXMLToJson(Data.responseBody);

  Data.responseBody =
    Data.responseBody['soap:Envelope'][
      'soap:Body'
    ][0].CMB_BusActivityResponse[0].CMB_BusActivityResult[0][
      'diffgr:diffgram'
    ][0].ReturnDataSet[0].ReturnDataTable1;

  for (let index = 0; index < Data.responseBody.length; index++) {
    List.push({
      key: Data.responseBody[index].Value[0].toString(),
      name: Data.responseBody[index].Display[0].toString(),
    });
  }
  return List;
}

export async function getCountries() {
  const countries = {
    success: false,
    responseBody: null,
  };
  const countriesList = [];
  await GetCountries().then(data => {
    countries.success = data.success;
    countries.responseBody = data.responseBody;
    return data;
  });

  countries.responseBody = convertXMLToJson(countries.responseBody);

  countries.responseBody =
    countries.responseBody['soap:Envelope'][
      'soap:Body'
    ][0].GetCountriesResponse[0].GetCountriesResult[0][
      'diffgr:diffgram'
    ][0].ReturnDataSet[0].ReturnDataTable1;

  for (let index = 0; index < countries.responseBody.length; index++) {
    countriesList.push({
      id: countries.responseBody[index].CountryID[0].toString(),
      name: countries.responseBody[index].CountryName[0].toString(),
    });
  }
  return countriesList;
}

export async function getCustTypes() {
  const custTypes = {
    success: false,
    responseBody: null,
  };
  const custTypesList = [];
  await GetCustTypes().then(data => {
    custTypes.success = data.success;
    custTypes.responseBody = data.responseBody;
    return data;
  });

  custTypes.responseBody = convertXMLToJson(custTypes.responseBody);

  custTypes.responseBody =
    custTypes.responseBody['soap:Envelope'][
      'soap:Body'
    ][0].GetCustTypesResponse[0].GetCustTypesResult[0][
      'diffgr:diffgram'
    ][0].ReturnDataSet[0].ReturnDataTable1;

  for (let index = 0; index < custTypes.responseBody.length; index++) {
    custTypesList.push({
      id: custTypes.responseBody[index].CustTypeID[0].toString(),
      name: custTypes.responseBody[index].CustTypeName[0].toString(),
    });
  }
  return custTypesList;
}

export async function GetCustomerDocuments(
  agent_GUID,
  Cust_Login_Details_GUID,
) {
  const document = {
    success: false,
    responseBody: null,
  };
  const documentList = [];
  try {
    await getCustomerDocuments(agent_GUID, Cust_Login_Details_GUID).then(
      data => {
        document.success = data.success;
        document.responseBody = data.responseBody;
        return data;
      },
    );

    document.responseBody = convertXMLToJson(document.responseBody);

    document.responseBody =
      document.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].getCustomerDocumentsResponse[0].getCustomerDocumentsResult[0][
        'diffgr:diffgram'
      ][0].ReturnDataSet[0].ReturnDataTable1;

    for (let index = 0; index < document.responseBody.length; index++) {
      documentList.push({
        ImageBase64: document.responseBody[index].ImageBase64[0].toString(),
        Image_Path: document.responseBody[index].Image_Path[0].toString(),
        ImageType: document.responseBody[index].ImageType[0].toString(),
      });
    }
    return documentList;
  } catch (error) {}
}

export async function getBankNames(Country) {
  const bankNames = {
    success: false,
    responseBody: null,
  };
  const bankNamesList = [];
  await GetBankNames(Country).then(data => {
    bankNames.success = data.success;
    bankNames.responseBody = data.responseBody;
    return data;
  });

  bankNames.responseBody = await convertXMLToJson(bankNames.responseBody);
  bankNames.responseBody =
    bankNames.responseBody['soap:Envelope'][
      'soap:Body'
    ][0].GetBankNamesResponse[0].GetBankNamesResult[0][
      'diffgr:diffgram'
    ][0].ReturnDataSet[0].ReturnDataTable1;

  for (let index = 0; index < bankNames.responseBody.length; index++) {
    bankNamesList.push({
      id: bankNames.responseBody[index].BIC[0].toString(),
      branch: bankNames.responseBody[index].Branch_Name[0].toString(),
      name: bankNames.responseBody[index].Bank_Name[0].toString(),
    });
  }
  return bankNamesList;
}

//cmb banks
export async function getBankNamesCMBAction(Country) {
  const bankNames = {
    success: false,
    responseBody: null,
  };
  const bankNamesList = [];
  await GetBankNamesCMB(Country).then(data => {
    bankNames.success = data.success;
    bankNames.responseBody = data.responseBody;
    return data;
  });

  bankNames.responseBody = await convertXMLToJson(bankNames.responseBody);
  bankNames.responseBody =
    bankNames.responseBody['soap:Envelope'][
      'soap:Body'
    ][0].CMB_BANKSResponse[0].CMB_BANKSResult[0][
      'diffgr:diffgram'
    ][0].ReturnDataSet[0].ReturnDataTable1;
  console.log({dev: bankNames.responseBody[0]});

  for (let index = 0; index < bankNames.responseBody.length; index++) {
    bankNamesList.push({
      id: bankNames.responseBody[index].Value[0].toString(),
      branch: bankNames.responseBody[index].Display[0].toString(),
      name: bankNames.responseBody[index].Display[0].toString(),
    });
  }
  return bankNamesList;
}
//cmb branch

export async function getBranchNamesCMBAction(bankId) {
  const bankNames = {
    success: false,
    responseBody: null,
  };
  const bankNamesList = [
    {
      id: 0,
      branch: 'Add Another Branch',
      name: 'Add Another Branch',
    },
  ];
  await GetBranchNamesCMB(bankId).then(data => {
    bankNames.success = data.success;
    bankNames.responseBody = data.responseBody;
    return data;
  });

  bankNames.responseBody = await convertXMLToJson(bankNames.responseBody);
  console.log({
    dev: bankNames.responseBody['soap:Envelope']['soap:Body'][0]
      .CMB_BANK_BRANCHESResponse[0].CMB_BANK_BRANCHESResult[0][
      'diffgr:diffgram'
    ][0],
  });

  try {
    bankNames.responseBody =
      bankNames.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].CMB_BANK_BRANCHESResponse[0].CMB_BANK_BRANCHESResult[0][
        'diffgr:diffgram'
      ][0]?.ReturnDataSet[0]?.ReturnDataTable1;
    console.log({dev1: bankNames?.responseBody[0]});

    for (let index = 0; index < bankNames.responseBody.length; index++) {
      bankNamesList.push({
        id: bankNames.responseBody[index].Value[0].toString(),
        branch: bankNames.responseBody[index].Display[0].toString(),
        name: bankNames.responseBody[index].Display[0].toString(),
      });
    }
    return bankNamesList;
  } catch (error) {
    return bankNamesList;
  }
}

//
export async function fwdSalePurFCY_Listing(
  agent_GUID,
  login_GUID,
  Cust_Login_Details_GUID,
  DT_startDate,
  DT_endDate,
) {
  const fwdlisting = {
    success: false,
    responseBody: null,
  };
  const fwdList = [];
  await FwdSalePurFCY_Listing(
    agent_GUID,
    login_GUID,
    Cust_Login_Details_GUID,
    DT_startDate,
    DT_endDate,
  ).then(data => {
    fwdlisting.success = data.success;
    fwdlisting.responseBody = data.responseBody;
    return data;
  });

  fwdlisting.responseBody = convertXMLToJson(fwdlisting.responseBody);

  fwdlisting.responseBody =
    fwdlisting.responseBody['soap:Envelope'][
      'soap:Body'
    ][0].FCYListingResponse[0].FCYListingResult[0][
      'diffgr:diffgram'
    ][0].ReturnDataSet[0].ReturnDataTable1;

  for (let index = 0; index < fwdlisting.responseBody.length; index++) {
    fwdList.push({
      id: fwdlisting.responseBody[index].TR_DISPLAY_ID[0].toString(),
      Date: fwdlisting.responseBody[index].mdate[0].toString(),
      VchType: fwdlisting.responseBody[index].VchType[0].toString(),
      FCAmount: fwdlisting.responseBody[index].AmountFC[0].toString(),
      Rate: fwdlisting.responseBody[index].Rate[0].toString(),
      LCAmount: fwdlisting.responseBody[index].AmountLC[0].toString(),
      status: fwdlisting.responseBody[index].status[0].toString(),
      Currency: fwdlisting.responseBody[index].CCY[0].toString(),
    });
  }
  return fwdList;
}

export async function cancel_Appointment(Branch_GID, S_CustomerGID) {
  const Slotlisting = {
    success: false,
    responseBody: null,
  };
  const fwdList = [];
  try {
    await Cancel_Appointment(Branch_GID, S_CustomerGID).then(data => {
      Slotlisting.success = data.success;
      Slotlisting.responseBody = data.responseBody;
      console.log(data);
      return data;
    });

    Slotlisting.responseBody = convertXMLToJson(Slotlisting.responseBody);

    Slotlisting.responseBody =
      Slotlisting.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].Cancel_AppointmentResponse[0].Cancel_AppointmentResult[0][
        'diffgr:diffgram'
      ][0].ReturnDataSet[0].ReturnDataTable1;
    for (let index = 0; index < Slotlisting.responseBody.length; index++) {
      fwdList.push({
        TimeSlots: Slotlisting.responseBody[index].TimeSlots[0].toString(),
        SlotID: Slotlisting.responseBody[index].SlotID[0].toString(),
        Appointment_GUID:
          Slotlisting.responseBody[index].Appointment_GUID[0].toString(),
        BookingStatus:
          Slotlisting.responseBody[index].BookingStatus[0].toString(),
        Reason: Slotlisting.responseBody[index].Reason[0].toString(),
        AppointmentDate:
          Slotlisting.responseBody[index].AppointmentDate[0].toString(),
        Address: Slotlisting.responseBody[index].Address[0].toString(),
      });
    }
    return fwdList;
  } catch (error) {}
}

export async function apointment_Slots(Branch_GID, S_CustomerGID, date) {
  const Slotlisting = {
    success: false,
    responseBody: null,
  };
  const fwdList = [];
  try {
    await Appointment_Slots(Branch_GID, S_CustomerGID, date).then(data => {
      Slotlisting.success = data.success;
      Slotlisting.responseBody = data.responseBody;
      return data;
    });

    Slotlisting.responseBody = convertXMLToJson(Slotlisting.responseBody);

    Slotlisting.responseBody =
      Slotlisting.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].Appointment_SlotsResponse[0].Appointment_SlotsResult[0][
        'diffgr:diffgram'
      ][0].ReturnDataSet[0].ReturnDataTable1;
    for (let index = 0; index < Slotlisting.responseBody.length; index++) {
      fwdList.push({
        TimeSlots: Slotlisting.responseBody[index].TimeSlots[0].toString(),
        SlotID: Slotlisting.responseBody[index].SlotID[0].toString(),
        BookingStatus:
          Slotlisting.responseBody[index].BookingStatus[0].toString(),
      });
    }
    return fwdList;
  } catch (error) {}
}
export async function notificationListing(
  agent_GUID,
  login_GUID,
  Cust_Login_Details_GUID,
) {
  const Notificationlist = {
    success: false,
    responseBody: null,
  };
  const Notlist = [];
  try {
    await NotificationListing(
      agent_GUID,
      login_GUID,
      Cust_Login_Details_GUID,
    ).then(data => {
      Notificationlist.success = data.success;
      Notificationlist.responseBody = data.responseBody;
      return data;
    });

    Notificationlist.responseBody = convertXMLToJson(
      Notificationlist.responseBody,
    );

    Notificationlist.responseBody =
      Notificationlist.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].NotificationListingResponse[0].NotificationListingResult[0][
        'diffgr:diffgram'
      ][0].ReturnDataSet[0].ReturnDataTable1;
    console.log({Notificationlist: Notificationlist.responseBody[0]});
    for (let index = 0; index < Notificationlist.responseBody.length; index++) {
      Notlist.push([
        Notificationlist.responseBody[index].Title[0].toString(),
        Notificationlist.responseBody[index].Message[0].toString(),
        Notificationlist.responseBody[index].Date[0].toString(),
      ]);
    }
    return Notlist;
  } catch (error) {}
}

export async function rOApplication_Listing(
  agent_GUID,
  login_GUID,
  Cust_Login_Details_GUID,
  DT_startDate,
  DT_endDate,
) {
  const rolisting = {
    success: false,
    responseBody: null,
  };
  const roList = [];
  try {
    await ROApplication_Listing(
      agent_GUID,
      login_GUID,
      Cust_Login_Details_GUID,
      DT_startDate,
      DT_endDate,
    ).then(data => {
      rolisting.success = data.success;
      rolisting.responseBody = data.responseBody;
      return data;
    });

    rolisting.responseBody = convertXMLToJson(rolisting.responseBody);

    rolisting.responseBody =
      rolisting.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].TransactionListingResponse[0].TransactionListingResult[0][
        'diffgr:diffgram'
      ][0].ReturnDataSet[0].ReturnDataTable1;

    for (let index = 0; index < rolisting.responseBody.length; index++) {
      roList.push({
        id: rolisting.responseBody[index].TR_DISPLAYID[0].toString(),
        Date: rolisting.responseBody[index].mdate[0].toString(),
        FCAmount: rolisting.responseBody[index].AmountFC[0].toString(),
        Total_LC: rolisting.responseBody[index].AmountTotalLC[0].toString(),
        status: rolisting.responseBody[index].Status[0].toString(),
        CCY: rolisting.responseBody[index].CCY[0].toString(),
        BenName: rolisting.responseBody[index].BenName[0].toString(),
      });
    }
    return roList;
  } catch (error) {
    //
  }
}

export async function transactionLog_Listing(
  agent_GUID,
  login_GUID,
  Cust_Login_Details_GUID,
  DT_startDate,
  DT_endDate,
) {
  const rolisting = {
    success: false,
    responseBody: null,
  };
  const roList = [];
  try {
    await TransactionLog_Listing(
      agent_GUID,
      login_GUID,
      Cust_Login_Details_GUID,
      DT_startDate,
      DT_endDate,
    ).then(data => {
      rolisting.success = data.success;
      rolisting.responseBody = data.responseBody;
      return data;
    });

    rolisting.responseBody = convertXMLToJson(rolisting.responseBody);

    rolisting.responseBody =
      rolisting.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].FCYLTransLogResponse[0].FCYLTransLogResult[0][
        'diffgr:diffgram'
      ][0].ReturnDataSet[0].ReturnDataTable1;
    console.log({value: rolisting.responseBody[0]});
    for (let index = 0; index < rolisting.responseBody.length; index++) {
      roList.push({
        id: rolisting.responseBody[index].DISPLAYID[0].toString(),
        Date: rolisting.responseBody[index].mdate[0].toString(),
        VchType: rolisting.responseBody[index].Type[0].toString(),
        CCY: rolisting.responseBody[index].CCY[0].toString(),
        amount:
          rolisting.responseBody[index].amount &&
          rolisting.responseBody[index].amount[0].toString(),
      });
    }
    return roList;
  } catch (error) {
    //
  }
}

export async function rOApplication_Listing_ByID(
  agent_GUID,
  login_GUID,
  Cust_Login_Details_GUID,
  strWbTTId,
) {
  const rolisting = {
    success: false,
    responseBody: null,
  };
  const roList = [];
  try {
    await ROApplication_Listing_ByID(
      agent_GUID,
      login_GUID,
      Cust_Login_Details_GUID,
      strWbTTId,
    ).then(data => {
      rolisting.success = data.success;
      rolisting.responseBody = data.responseBody;
      return data;
    });

    rolisting.responseBody = convertXMLToJson(rolisting.responseBody);

    rolisting.responseBody =
      rolisting.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].ROApplication_Listing_ByIDResponse[0].ROApplication_Listing_ByIDResult[0][
        'diffgr:diffgram'
      ][0].ReturnDataSet[0].ReturnDataTable1;
    for (let index = 0; index < rolisting.responseBody.length; index++) {
      roList.push({
        id: rolisting.responseBody[index].TR_DISPLAYID[0].toString(),
        Date: rolisting.responseBody[index].mdate[0].toString(),
        FCAmount: rolisting.responseBody[index].AmountFC[0].toString(),
        Total_LC: rolisting.responseBody[index].AmountTotalLC[0].toString(),
        status: rolisting.responseBody[index].Status[0].toString(),
        CCY: rolisting.responseBody[index].CCY[0].toString(),
        BenName: rolisting.responseBody[index].BenName[0].toString(),
      });
    }
    return roList;
  } catch (error) {
    alert('No data found');
  }
}

export async function getBeneficiaries(
  agent_GUID,
  login_GUID,
  Cust_Login_Details_GUID,
) {
  const ben = {
    success: false,
    responseBody: null,
  };

  const benList = [];
  try {
    await GetBeneficiaries(
      agent_GUID,
      login_GUID,
      Cust_Login_Details_GUID,
    ).then(data => {
      ben.success = data.success;
      ben.responseBody = data.responseBody;
      return data;
    });

    ben.responseBody = convertXMLToJson(ben.responseBody);

    console.log(
      '1',
      ben.responseBody['soap:Envelope']['soap:Body'][0]
        .GetBeneficiariesResponse,
    );
    ben.responseBody =
      ben.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].GetBeneficiariesResponse[0].GetBeneficiariesResult[0][
        'diffgr:diffgram'
      ][0].ReturnDataSet[0].ReturnDataTable1;
    console.log('2');

    for (let index = 0; index < ben.responseBody.length; index++) {
      benList.push({
        key: ben.responseBody[index].BeneID_App[0].toString(),
        name: ben.responseBody[index].UserName[0].toString(),
        country: ben.responseBody[index].CountryName[0].toString(),
        // type: ben.responseBody[index].CustTypeName[0].toString(),
        acc_No: ben.responseBody[index].Acc_No[0].toString(),
        bank_name: ben.responseBody[index].BankName[0].toString(),
        identifier: ben.responseBody[index].BankIdentifier[0].toString(),
        branch: ben.responseBody[index].BankBranch[0].toString(),
      });
    }
    return benList;
  } catch (error) {}
}

export async function getCurrencies() {
  const currencyData = {
    success: false,
    responseBody: null,
  };

  const currencyList = [];
  try {
    await GetCurrencies().then(data => {
      currencyData.success = data.success;
      currencyData.responseBody = data.responseBody;
      return data;
    });

    currencyData.responseBody = convertXMLToJson(currencyData.responseBody);

    currencyData.responseBody =
      currencyData.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].GetCurrenciesResponse[0].GetCurrenciesResult[0][
        'diffgr:diffgram'
      ][0].ReturnDataSet[0].ReturnDataTable1;

    for (let index = 0; index < currencyData.responseBody.length; index++) {
      currencyList.push({
        key: currencyData.responseBody[index].CurrencyID[0].toString(),
        name: currencyData.responseBody[index].CurrencyName[0].toString(),
        short_name:
          currencyData.responseBody[index].CurrencyShortName[0].toString(),
      });
    }
    return currencyList;
  } catch (error) {}
}
export async function cmd_CountryCodes() {
  const currencies = {
    success: false,
    responseBody: null,
  };
  const currencyList = [];
  await CMB_CountryCodes().then(data => {
    currencies.success = data.success;
    currencies.responseBody = data.responseBody;
    return data;
  });

  currencies.responseBody = convertXMLToJson(currencies.responseBody);

  currencies.responseBody =
    currencies.responseBody['soap:Envelope'][
      'soap:Body'
    ][0].CMB_CountryCallingCodesResponse[0].CMB_CountryCallingCodesResult[0][
      'diffgr:diffgram'
    ][0].ReturnDataSet[0].ReturnDataTable1;

  for (let index = 0; index < currencies.responseBody.length; index++) {
    currencyList.push({
      id: currencies.responseBody[index].Value[0].toString(),
      name: currencies.responseBody[index].Display[0].toString(),
    });
  }
  return currencyList;
}
export async function cmb_Currency() {
  const currencies = {
    success: false,
    responseBody: null,
  };
  const currencyList = [];
  try {
    await CMB_Currency().then(data => {
      currencies.success = data.success;
      currencies.responseBody = data.responseBody;
      return data;
    });

    currencies.responseBody = convertXMLToJson(currencies.responseBody);

    currencies.responseBody =
      currencies.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].CMB_CurrencyResponse[0].CMB_CurrencyResult[0][
        'diffgr:diffgram'
      ][0].ReturnDataSet[0].ReturnDataTable1;

    for (let index = 0; index < currencies.responseBody.length; index++) {
      currencyList.push({
        id: currencies.responseBody[index].Value[0].toString(),
        name: currencies.responseBody[index].Display[0].toString(),
      });
    }
    return currencyList;
  } catch (error) {}
}

export async function getRatesList() {
  const currencies = {
    success: false,
    responseBody: null,
  };
  const currenciesList = [];
  try {
    await GetRateList().then(data => {
      currencies.success = data.success;
      currencies.responseBody = data.responseBody;
      return data;
    });

    currencies.responseBody = convertXMLToJson(currencies.responseBody);
    currencies.responseBody =
      currencies.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].GetRateListResponse[0].GetRateListResult[0][
        'diffgr:diffgram'
      ][0].ReturnDataSet[0].ReturnDataTable1;
    for (let index = 0; index < currencies.responseBody.length; index++) {
      currenciesList.push({
        CurrencyID: currencies.responseBody[index].CurrencyID[0].toString(),
        CurrencyName: currencies.responseBody[index].CurrencyName[0].toString(),
        CurrencyShortName:
          currencies.responseBody[index].CurrencyShortName[0].toString(),
        CCY_2: currencies.responseBody[index].CCY_2[0].toString(),
        RND_FcSale_MaxRate:
          currencies.responseBody[index].RND_FcSale_MaxRate[0].toString(),
        RND_FCPur_MinRate:
          currencies.responseBody[index].RND_FCPur_MinRate[0].toString(),
      });
    }
    return currenciesList;
  } catch (error) {}
}
// export async function getRatesList() {
//   const currencies = {
//     success: false,
//     responseBody: null,
//   };
//   const currenciesList = [];
//   await GetRateList().then(data => {
//     currencies.success = data.success;
//     currencies.responseBody = data.responseBody;
//     return data;
//   });

//   currencies.responseBody = convertXMLToJson(currencies.responseBody);

//   currencies.responseBody =
//     currencies.responseBody['soap:Envelope'][
//       'soap:Body'
//     ][0].GetRateListResponse[0].GetRateListResult[0][
//       'diffgr:diffgram'
//     ][0].ReturnDataSet[0].ReturnDataTable1;

//   for (let index = 0; index < currencies.responseBody.length; index++) {
//     currenciesList.push({
//       CurrencyID: currencies.responseBody[index].CurrencyID[0].toString(),
//       CurrencyName: currencies.responseBody[index].CurrencyName[0].toString(),
//       CurrencyShortName: currencies.responseBody[
//         index
//       ].CurrencyShortName[0].toString(),
//       CCY_2: currencies.responseBody[index].CCY_2[0].toString(),
//       FcSale_maxRate: currencies.responseBody[
//         index
//       ].FcSale_maxRate[0].toString(),
//       FCPur_MinRate: currencies.responseBody[index].FCPur_MinRate[0].toString(),
//     });
//   }
//   return currenciesList;
// }
export async function getTransactionTypes() {
  const Data = {
    success: false,
    responseBody: null,
  };

  const List = [];
  try {
    await GetTransactionTypes().then(data => {
      Data.success = data.success;
      Data.responseBody = data.responseBody;
      return data;
    });

    Data.responseBody = convertXMLToJson(Data.responseBody);

    Data.responseBody =
      Data.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].CMB_TransactionTypesResponse[0].CMB_TransactionTypesResult[0][
        'diffgr:diffgram'
      ][0].ReturnDataSet[0].ReturnDataTable1;

    for (let index = 0; index < Data.responseBody.length; index++) {
      List.push({
        key: Data.responseBody[index].Value[0].toString(),
        name: Data.responseBody[index].Display[0].toString(),
      });
    }
    return List;
  } catch (error) {}
}

export async function getCustomerBankAcccounts(
  strCustID_GID,
  B_SortbyLastUsed,
) {
  const Data = {
    success: false,
    responseBody: null,
  };

  const List = [];
  try {
    await GetCustomerBankAcccounts(strCustID_GID, B_SortbyLastUsed).then(
      data => {
        Data.success = data.success;
        Data.responseBody = data.responseBody;
        return data;
      },
    );
    Data.responseBody = convertXMLToJson(Data.responseBody);

    Data.responseBody =
      Data.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].GetCustomerBankAcccountsResponse[0].GetCustomerBankAcccountsResult[0][
        'diffgr:diffgram'
      ][0].ReturnDataSet[0].ReturnDataTable1;

    for (let index = 0; index < Data.responseBody.length; index++) {
      List.push({
        BankInfoID: Data.responseBody[index].BankInfoID[0].toString(),
        BANK_NAME: Data.responseBody[index].BANK_NAME[0].toString(),
        ACC_NO: Data.responseBody[index].ACC_NO[0].toString(),
        BRANCH_NAME: Data.responseBody[index].BRANCH_NAME[0].toString(),
        BANK_CODE: Data.responseBody[index].BANK_CODE[0].toString(),
      });
    }
    return List;
  } catch (error) {}
}

export async function getCustomerCrdtCardDetails(
  strCustID_GID,
  B_SortbyLastUsed,
) {
  const Data = {
    success: false,
    responseBody: null,
  };

  const List = [];
  await GetCustomerCrdtCardDetails(strCustID_GID, B_SortbyLastUsed).then(
    data => {
      Data.success = data.success;
      Data.responseBody = data.responseBody;
      return data;
    },
  );
  Data.responseBody = convertXMLToJson(Data.responseBody);

  Data.responseBody =
    Data.responseBody['soap:Envelope'][
      'soap:Body'
    ][0].GetCustomerCrdtCardDetailsResponse[0].GetCustomerCrdtCardDetailsResult[0][
      'diffgr:diffgram'
    ][0].ReturnDataSet[0].ReturnDataTable1;

  for (let index = 0; index < Data.responseBody.length; index++) {
    List.push({
      CRDInfoID: Data.responseBody[index].CRDInfoID[0].toString(),
      CRD_NO: Data.responseBody[index].CRD_NO[0].toString(),
      CRD_Expiry: Data.responseBody[index].CRD_Expiry[0].toString(),
      CRD_SecretNo: Data.responseBody[index].CRD_SecretNo[0].toString(),
      CRD_TYPE: Data.responseBody[index].CRD_TYPE[0].toString(),
    });
  }
  return List;
}

export async function getAgents(currencyId, agent_GUID) {
  const Data = {
    success: false,
    responseBody: null,
  };

  const List = [];
  try {
    await GetAgents(currencyId, agent_GUID).then(data => {
      Data.success = data.success;
      Data.responseBody = data.responseBody;
      return data;
    });

    Data.responseBody = convertXMLToJson(Data.responseBody);

    Data.responseBody =
      Data.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].CMB_BankAssociateResponse[0].CMB_BankAssociateResult[0][
        'diffgr:diffgram'
      ][0].ReturnDataSet[0].ReturnDataTable1;

    for (let index = 0; index < Data.responseBody.length; index++) {
      List.push({
        key: Data.responseBody[index].Display[0].toString(),
        name: Data.responseBody[index].Display[0].toString(),
      });
    }
    return List;
  } catch (error) {}
}

export async function getRates(currencyId, dd_tr_type) {
  const Data = {
    success: false,
    responseBody: null,
  };

  const List = [];
  try {
    await GetRates(currencyId, dd_tr_type).then(data => {
      Data.success = data.success;
      Data.responseBody = data.responseBody;
      return data;
    });

    Data.responseBody = convertXMLToJson(Data.responseBody);

    Data.responseBody =
      Data.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].GetRateNewResponse[0].GetRateNewResult[0].ReturnValue[0];

    List.push({
      rate_1: Data.responseBody.string[1],
      rate_2: Data.responseBody.string[3],
    });

    return List;
  } catch (error) {}
}

export async function getCommission(dd_currency, dd_tr_type, amt_fc, rate_1) {
  const Data = {
    success: false,
    responseBody: null,
  };

  const List = [];
  try {
    await GetCommission(dd_currency, dd_tr_type, amt_fc, rate_1).then(data => {
      Data.success = data.success;
      Data.responseBody = data.responseBody;
      return data;
    });

    Data.responseBody = convertXMLToJson(Data.responseBody);

    Data.responseBody =
      Data.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].GetCommmissionFromAmountResponse[0].GetCommmissionFromAmountResult[0].ReturnValue[0];

    List.push({
      commission: Data.responseBody.string[1],
      vat: Data.responseBody.string[3],
      // VatPercent: Data.responseBody[index].VatPercent[0].toString(),
    });
    return List;
  } catch (error) {}
}

// export async function getCommission(CCYID, Party) {
//   const Data = {
//     success: false,
//     responseBody: null,
//   };

//   const List = [];

//   await GetCommission(CCYID, Party).then(data => {
//     Data.success = data.success;
//     Data.responseBody = data.responseBody;
//     return data;
//   });

//   Data.responseBody = convertXMLToJson(Data.responseBody);

//   Data.responseBody =
//     Data.responseBody['soap:Envelope'][
//       'soap:Body'
//     ][0].GetCommissionResponse[0].GetCommissionResult[0];

//   List.push({
//     commission: Data.responseBody.string[0],
//     vat: Data.responseBody.string[1],
//   });

//   return List;
// }
export async function cmb_SourceOfFund() {
  const Data = {
    success: false,
    responseBody: null,
  };

  const List = [];
  await CMB_SourceOfFund().then(data => {
    Data.success = data.success;
    Data.responseBody = data.responseBody;
    return data;
  });

  Data.responseBody = convertXMLToJson(Data.responseBody);

  Data.responseBody =
    Data.responseBody['soap:Envelope'][
      'soap:Body'
    ][0].CMB_SourceOfFundResponse[0].CMB_SourceOfFundResult[0][
      'diffgr:diffgram'
    ][0].ReturnDataSet[0].ReturnDataTable1;

  for (let index = 0; index < Data.responseBody.length; index++) {
    List.push({
      key: Data.responseBody[index].Value[0].toString(),
      name: Data.responseBody[index].Display[0].toString(),
    });
  }
  return List;
}
export async function getPurposes() {
  const purposeData = {
    success: false,
    responseBody: null,
  };

  const purposeList = [];
  await GetPurposes().then(data => {
    purposeData.success = data.success;
    purposeData.responseBody = data.responseBody;
    return data;
  });

  purposeData.responseBody = convertXMLToJson(purposeData.responseBody);

  purposeData.responseBody =
    purposeData.responseBody['soap:Envelope'][
      'soap:Body'
    ][0].GetPurposesResponse[0].GetPurposesResult[0][
      'diffgr:diffgram'
    ][0].ReturnDataSet[0].ReturnDataTable1;

  for (let index = 0; index < purposeData.responseBody.length; index++) {
    purposeList.push({
      key: purposeData.responseBody[index].PurposeID[0].toString(),
      name: purposeData.responseBody[index].Purpose[0].toString(),
    });
  }
  return purposeList;
}
export async function cardlists() {
  let cardlist = [
    {id: 'Master Card', name: 'Master Card'},
    {id: 'Visa Card', name: 'Visa Card'},
    {id: 'American Express', name: 'American Express'},
    {id: 'Discover', name: 'Discover'},
  ];
  return cardlist;
}

export async function getlastSixTran(
  agent_GUID,
  login_GUID,
  Cust_Login_Details_GUID,
) {
  const ben = {
    success: false,
    responseBody: null,
  };
  const benList = [];
  try {
    await getLastSixTransection(
      agent_GUID,
      login_GUID,
      Cust_Login_Details_GUID,
    ).then(data => {
      console.log('success');
      ben.success = data.success;
      ben.responseBody = data.responseBody;
      return data;
    });

    ben.responseBody = convertXMLToJson(ben.responseBody);

    ben.responseBody =
      ben.responseBody['soap:Envelope'][
        'soap:Body'
      ][0].Transaction6hoursResponse[0].Transaction6hoursResult[0][
        'diffgr:diffgram'
      ][0].ReturnDataSet[0].ReturnDataTable1;
    console.log({log: ben.responseBody[0]});
    for (let index = 0; index < ben.responseBody.length; index++) {
      benList.push([
        // ben.responseBody[index].mdate[0].toString(),
        ben.responseBody[index].TR_DISPLAYID[0].toString(),
        ben.responseBody[index].CCY[0].toString(),
        ben.responseBody[index].AmountTotalLC[0].toString(),
        ben.responseBody[index].Status[0].toString(),

        // 'Date', 'Display ID', 'CCY', 'Amount','Type'
        // FCAmount: ben.responseBody[index].AmountFC[0].toString(),
        // Total_LC: ,
        // status: ben.responseBody[index].Status[0].toString(),
      ]);
    }

    return benList;
  } catch (error) {}
}

export async function getAccountTypeList() {
  const purposeData = {
    success: false,
    responseBody: null,
  };

  const purposeList = [];
  await getAccountTypeListApi().then(data => {
    purposeData.success = data.success;
    purposeData.responseBody = data.responseBody;
    return data;
  });

  purposeData.responseBody = convertXMLToJson(purposeData.responseBody);

  purposeData.responseBody =
    purposeData.responseBody['soap:Envelope'][
      'soap:Body'
    ][0].CMB_PaymentModeResponse[0].CMB_PaymentModeResult[0][
      'diffgr:diffgram'
    ][0].ReturnDataSet[0].ReturnDataTable1;
  // console.log({ohooo:purposeData.responseBody[0]});
  for (let index = 0; index < purposeData.responseBody.length; index++) {
    purposeList.push({
      name: purposeData.responseBody[index].Display[0].toString(),
      Value: purposeData.responseBody[index].Value[0].toString(),
    });
  }
  return purposeList;
}
