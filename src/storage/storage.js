import AsyncStorage from "react";

export const onSignIn = async token => {
  console.log("onSignedIn--started" + token);
  try {
    await localStorage.setItem("@MyApp_key", token);
    console.log("Token Stored");
  } catch (e) {
    console.error("storeData error" + e);
  }
};

export const getToken = async () => {
  console.log("gettoken--started");
  try {
    const token = await localStorage.getItem("@MyApp_key");
    if (token !== null) {
      console.log("Token is present");
      console.log(token);
      return token;
    } else {
      console.log(" getToken---Token doesnot exist");
      return null;
    }
  } catch (e) {
    console.error("getData error" + e);
  }
};

export const isSignedIn = async () => {
  try {
    const token = await localStorage.getItem("@MyApp_key");
    if (token !== null) {
      console.log("Token is present");
      console.log(token);
      return true;
    } else {
      console.log("Token doesnot exist");
      return false;
    }
  } catch (e) {
    console.error("getData error" + e);
  }
};

export const onSignOut = async () => {
  try {
    await localStorage.removeItem("@MyApp_key");
    console.log("remove success");
  } catch (e) {
    console.error("remove Value error" + e);
  }

  console.log("Done.");
};
