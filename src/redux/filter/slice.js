import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: { name: "" },
  reducers: {
    filter: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { filter } = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
