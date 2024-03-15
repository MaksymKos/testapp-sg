import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { appId, hostName } from "../../config/config"
import { getCurrentUser } from '../user/actions'
import { getDocs, collection, addDoc, query, where, doc, updateDoc, deleteDoc } from "firebase/firestore"
import db from '../../services/db'
import { WeatherTown } from '../../types/weatherTown'
import { User } from '../../types/user'
import { RootState } from '../store'

const collection_name = "towns"
const townCollection = collection(db, collection_name)


// fetching data about city
export const getCityData = createAsyncThunk("weather/getCityData", async (obj: { city: string, unit: string }) => {
  try {
    const request = await axios.get(
      `${hostName}/data/2.5/weather?q=${obj.city}&units=${obj.unit}&appid=${appId}`
    )
    return {
      data: request.data,
      error: null,
    }
  } catch (error) {
    return {
      data: null
    }
  }
})

// get 5 days forecast of the provided city
export const get5DaysForecast = createAsyncThunk(
  "weather/get5DaysForecast",
  async (obj: { lat: number; lon: number; unit: string }) => {
    const request = await axios.get(
      `${hostName}/data/2.5/forecast?lat=${obj.lat}&lon=${obj.lon}&units=${obj.unit}&appid=${appId}`
    )
    const response = await request.data
    return response
  }
)

export const getTowns = createAsyncThunk("weather/getTowns", async (_, { getState }) => {
  const { user: { user } } = getState() as RootState
  if (!user) throw Error('Anonymous user')

  const q = query(
    townCollection,
    where('userRef', '==', user.ref),
  )

  const { docs } = await getDocs(q)

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
  const token = localStorage.getItem('token')
  const data = {
    ...town,
    date: new Date().toISOString(),
    userRef: ''
  }

  if (!token) return data

  const { user: { user } } = getState() as RootState
  if (user?.ref) {
    data.userRef = user.ref
  }

  if (!user) return data

  const isTownAdded = query(
    townCollection,
    where('userRef', '==', user.ref),
    where('name', '==', town.name),
  )

  const { docs: [existingTown] } = await getDocs(isTownAdded)
  if (existingTown) throw new Error('Town already added')

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