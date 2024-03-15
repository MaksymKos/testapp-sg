import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { getDocs, collection, addDoc, query, where, doc, updateDoc, deleteDoc } from "firebase/firestore"
import db from '../db'
import { WeatherTown } from '../../types/weatherTown'
import { RootState } from '../store'
import { errorMessages, weatherService } from '../../constants'
import { getQueryString } from '../../utils'
import { ForecastData } from '../../types/forecastData'

const collection_name = "towns"
const townCollection = collection(db, collection_name)

// fetching data about city
export const getCityData = createAsyncThunk("weather/getCityData", async (input: { city: string, unit: string }) => {
  const qs = getQueryString({
    q: input.city,
    units: input.unit,
    appid: weatherService.api.key,
  })

  const { data } = await axios.get(`${weatherService.api.baseUrl}/data/2.5/weather?${qs}`)

  return data
})

// get 5 days forecast of the provided city
export const get5DaysForecast = createAsyncThunk(
  "weather/get5DaysForecast",
  async (input: { lat: number; lon: number; unit: string }) => {
    const qs = getQueryString({
      lat: input.lat,
      lon: input.lon,
      units: input.unit,
      appid: weatherService.api.key,
    })

    const { data } = await axios.get(`${weatherService.api.baseUrl}/data/2.5/forecast?${qs}`)

    return data as ForecastData
  }
)

export const getTowns = createAsyncThunk("weather/getTowns", async (input, { getState }) => {
  const { user: { user } } = getState() as RootState
  if (!user) throw Error(errorMessages.unauthenticated)

  const { docs } = await getDocs(query(
    townCollection,
    where('userRef', '==', user.ref),
  ))

  return docs.map(item => {
    const sanitizedItem = item.data()
    delete sanitizedItem.userRef

    return ({
      ...sanitizedItem,
      ref: item.ref.path,
    }) as WeatherTown
  })
})

export const addTown = createAsyncThunk("weather/addTown", async (town: WeatherTown, { getState }) => {
  const data = {
    ...town,
    date: new Date().toISOString(),
    userRef: ''
  }

  const { user: { user } } = getState() as RootState
  if (!user) return data

  data.userRef = user.ref

  const { docs: [existingTown] } = await getDocs(query(
    townCollection,
    where('userRef', '==', user.ref),
    where('name', '==', town.name),
  ))
  if (existingTown) throw new Error(errorMessages.townAlreadyExists)

  const newTown = await addDoc(townCollection, data)

  data.ref = newTown.path

  return data
})

export const deleteTown = createAsyncThunk("weather/deleteTown", async (town: WeatherTown, { getState }) => {
  const { user: { user } } = getState() as RootState
  if (!user) return town

  await deleteDoc(doc(db, town.ref))

  return town
})

export const updateTown = createAsyncThunk("weather/updateTown", async ({ ref, town }: { ref: string, town: WeatherTown }, { getState }) => {
  const updatedTownData = {
    ...town,
    ref,
    date: new Date().toISOString(),
  }

  const { user: { user } } = getState() as RootState
  if (!user) return updatedTownData

  await updateDoc(
    doc(db, ref),
    updatedTownData
  )

  return updatedTownData
})