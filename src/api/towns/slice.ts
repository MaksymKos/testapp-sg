import { createSlice } from "@reduxjs/toolkit"
import { get5DaysForecast, getCityData, getTowns, addTown, deleteTown, updateTown } from './actions'
import { WeatherTown } from '../../types/weatherTown'
import { ForecastData } from '../../types/forecastData'

type InitialState = {
  citySearchData: WeatherTown | null
  forecastData: ForecastData | null
  towns: WeatherTown[]
}

const initialState: InitialState = {
  citySearchData: null,
  forecastData: null,
  towns: [],
}

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    resetWeatherSlice: (state) => {
      state.citySearchData = null
      state.forecastData = null
      state.towns = []
    }
  },
  extraReducers: (builder) => {
    builder
      // city search
      .addCase(getCityData.pending, (state) => {
        state.citySearchData = null
      })
      .addCase(getCityData.fulfilled, (state, action) => {
        state.citySearchData = action.payload
      })
      // forecast
      .addCase(get5DaysForecast.pending, (state) => {
        state.forecastData = null
      })
      .addCase(get5DaysForecast.fulfilled, (state, action) => {
        state.forecastData = action.payload
      })
      .addCase(get5DaysForecast.rejected, (state, action) => {
        state.forecastData = null
      })
      .addCase(getTowns.fulfilled, (state, action) => {
        state.towns = action.payload
      })
      .addCase(addTown.fulfilled, (state, action) => {
        state.towns.push(action.payload)
      })
      .addCase(deleteTown.fulfilled, (state, action) => {
        state.towns = state.towns.filter((item) => item.id !== action.payload.id)
      })
      .addCase(updateTown.fulfilled, (state, action) => {
        const index = state.towns.findIndex(
          (item) => item.id === action.payload.id
        )
        state.towns[index] = action.payload
      })
  },
})

export const { resetWeatherSlice } = weatherSlice.actions

export default weatherSlice.reducer
