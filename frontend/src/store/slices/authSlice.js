// in this slice we wont deal with any endpoints and api stuff, we will just deal with that in userSlice
// this is simply to set the user credentials to the local storage and remove them
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null, //same concept as of cartSlice
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      //set the user credentials to the local storage
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload)); //store in local storage and stringify it
    },
    logout: (state) => {
      //remove the user credentials from the local storage
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
