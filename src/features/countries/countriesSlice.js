import { createSlice } from "@reduxjs/toolkit";
import countryService from "../../services/countries";

export const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    countries: [],
    isLoading: true,
  },
  reducers: {
    getCountries(state, action) {
      state.countries = action.payload;
    },
    isLoading(state) {
      state.isLoading = !state.countries.length;
      /* Normal way: state.isLoading = action.payload; */
    },
  },
});

export const initializeCountries = () => {
  return async (dispatch) => {
    const countries = await countryService.getAll();
    dispatch(getCountries(countries));
    dispatch(isLoading());
  };
};

export const { getCountries, isLoading } = countriesSlice.actions;

export default countriesSlice.reducer;
