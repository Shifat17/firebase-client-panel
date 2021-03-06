import {
  ALLOW_REGISTRATION,
  DISABLE_BALANCE_ON_ADD,
  DISABLE_BALANCE_ON_EDIT,
} from "./types";

export const setDisableBalanceOnAdd = () => {
  //Get settings from localStorage
  const settings = JSON.parse(localStorage.getItem("settings"));
  //Toggle Settings
  settings.disableBalanceOnAdd = !settings.disableBalanceOnAdd;
  //Set back to localStorage
  localStorage.setItem("settings", JSON.stringify(settings));
  return {
    type: DISABLE_BALANCE_ON_ADD,
    payload: settings.disableBalanceOnAdd,
  };
};

export const setDisableBalanceOnEdit = () => {
  //Get settings from localStorage
  const settings = JSON.parse(localStorage.getItem("settings"));
  //Toggle Settings
  settings.disableBalanceOnEdit = !settings.disableBalanceOnEdit;
  //Set back to localStorage
  localStorage.setItem("settings", JSON.stringify(settings));
  return {
    type: DISABLE_BALANCE_ON_EDIT,
    payload: settings.disableBalanceOnEdit,
  };
};

export const setAllowRegistration = () => {
  //Get settings from localStorage
  const settings = JSON.parse(localStorage.getItem("settings"));
  //Toggle Settings
  settings.allowRegistration = !settings.allowRegistration;
  //Set back to localStorage
  localStorage.setItem("settings", JSON.stringify(settings));

  return {
    type: ALLOW_REGISTRATION,
    payload: settings.allowRegistration,
  };
};
