// ==================================
// LOG OUT USER NOT AUTHENTICATED
// ==================================
const logOutUser = () => {
  localStorage.clear();
  location.href = "/login";
};

// ==================================
// CHECK USER SESSION TIMEOUT
// ==================================
const checkAuthTimeout = (minutes) => {
  let timeout = Number(minutes) * 60000;
  let entry_time = Number(localStorage.timestamp ?? 0);
  let current_time = Number(+new Date());

  if (current_time - entry_time > timeout) {
    logOutUser();
    return true;
  } else {
    localStorage.timestamp = +new Date();
    return false;
  }
};

// ===============================
// GET LOCAL STORAGE DATA
// ===============================
const getStorage = (storage_name, storage_type = "string") => {
  return storage_type === "string"
    ? localStorage.getItem(storage_name)
    : JSON.parse(localStorage.getItem(storage_name));
};

// ===============================
// SET LOCAL STORAGE DATA
// ===============================
const setStorage = (storage_name, storage_value, storage_type = "string") => {
  return storage_type === "string"
    ? localStorage.setItem(storage_name, storage_value)
    : localStorage.setItem(storage_name, JSON.stringify(storage_value));
};

export { logOutUser, checkAuthTimeout, getStorage, setStorage };
