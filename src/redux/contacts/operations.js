import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = "https://connections-api.herokuapp.com";
export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/contacts");
      return response.data;
    } catch (error) {
      toast.error("Oops, there was an error, please try reloading!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post("/contacts", contact);
      toast.success("New contact added");
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error("Oops, there was an error, please try reloading!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      toast.success("contact has been deleted");
      return response.data;
    } catch (error) {
      toast.error("Oops, there was an error, please try reloading!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
