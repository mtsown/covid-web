import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const axios = require('axios');

export const fetchCurrentCovid = async () => {
  const response = await axios.get('https://disease.sh/v3/covid-19/all');
  return response.data;
};

export const fetchHistoricalCovid = async () => {
  const response = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
  return response.data;
};

export const fetchCountries = async () => {
  const response = await axios.get('https://disease.sh/v3/covid-19/countries');
  return response.data;
};

export const fetchCurrentCovidData = createAsyncThunk(
  'covid/fetchCurrentCovidData',
  fetchCurrentCovid
);

export const fetchHistoricalCovidData = createAsyncThunk(
  'covid/fetchHistoricalCovidData',
  fetchHistoricalCovid
);

export const fetchCountriesData = createAsyncThunk(
  'covid/fetchCountriesData',
  fetchCountries
);

const covidSlice = createSlice({
  name: 'covid',
  initialState: {
    isLoading: false,
    isRejected: false,
    currentData: {
      total: 0,
      recovered: 0,
      deaths: 0,
      active: 0
    },
    historicalData: {},
    countries: []
  },
  reducers: {},
  extraReducers: {
    [fetchCurrentCovidData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchCurrentCovidData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.currentData.total = action.payload.cases;
      state.currentData.recovered = action.payload.recovered;
      state.currentData.deaths = action.payload.deaths;
      state.currentData.active = action.payload.active;
    },
    [fetchCurrentCovidData.rejected]: (state, action) => {
      state.isLoading = false;
      state.isRejected = true;
    },
    [fetchHistoricalCovidData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchHistoricalCovidData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.historicalData = action.payload;
    },
    [fetchHistoricalCovidData.rejected]: (state, action) => {
      state.isLoading = false;
      state.isRejected = true;
    },
    [fetchCountriesData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchCountriesData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.countries = action.payload;
    },
    [fetchCountriesData.rejected]: (state, action) => {
      state.isLoading = false;
      state.isRejected = true;
    }
  }
})

const { reducer: covidReducer } = covidSlice;
export default covidReducer;