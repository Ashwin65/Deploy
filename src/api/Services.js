import Api from "./Helper";
import {
  BASE_URL,
  SIGNUP,
  SIGNIN,
  POST_EXPENSE,
  GET_EXPENSES,
  SIGNOUT,
  PUT_EXPENSE,
  DELETE_EXPENSE,
  POST_REPORT,
  GET_REPORTS,
  DELETE_REPORT,
  USER_DETAILS,
  GET_EXPENSES_FOR_REPORT,
 // COUNT
} from "./Config";

export const signUpUser = params => {
  return Api(
    SIGNUP, //Path
    params, //Params (Payload)
    "POST", // Method
    null //Token
  );
};

export const signInUser = params => {
  return Api(SIGNIN, params, "POST", null);
};
/*export const countExpRep = token => {
  return Api(COUNT, null, "GET", token);
};*/
export const getUserdetails = token => {
  return Api(USER_DETAILS, null, "GET", token);
};
export const createExpense = (params, token = null) => {
  return Api(POST_EXPENSE, params, "POST", token);
};

export const getExpenses = (token = null) => {
  return Api(GET_EXPENSES, null, "GET", token);
};

export const editExpense = (id, token, params) => {
  console.log(
    "\n id" + id + "token" + token + "\n params" + JSON.stringify(params)
  );
  return Api(PUT_EXPENSE + id, params, "PUT", token);
};

export const deleteExpense = (id, token) => {
  return Api(DELETE_EXPENSE + id, null, "DELETE", token);
};
export const createReport = (params, token = null) => {
  return Api(POST_REPORT, params, "POST", token);
};
export const deleteReport = (id, token) => {
  return Api(DELETE_REPORT + id, null, "DELETE", token);
};
export const getReports = (token = null) => {
  return Api(GET_REPORTS, null, "GET", token);
};

export const editReport = (params, token) => {
  return Api(POST_REPORT, params, "PUT", token);
};
export const getExpensesForReport = (token = null) => {
  return Api(GET_EXPENSES_FOR_REPORT, null, "GET", token);
};

export const removeExpenseFromReport = (id, token) => {
  return Api(DELETE_REPORT + id, null, "DELETE", token);
};

export const addExpenseToReport = (token = null) => {
  return Api(GET_EXPENSES_FOR_REPORT, null, "GET", token);
};

//-----------------------------------------------------------------------------------