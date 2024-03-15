import { createAsyncThunk } from "@reduxjs/toolkit"
import { getDocs, collection, query, where, updateDoc, addDoc, limit } from "firebase/firestore"
import { v4 as uuid } from 'uuid'
import db from '../db'
import { User } from '../../types/user'
import { errorMessages, tokenName } from '../../constants'

const collection_name = "users"
const userColection = collection(db, collection_name)

export const getCurrentUser = createAsyncThunk("user/getCurrentUser", async (token: string | null) => {
  if (!token) throw new Error(errorMessages.unauthenticated)

  const { docs: [user] } = await getDocs(query(
    userColection,
    where(tokenName, '==', token),
  ))
  if (!user) throw new Error(errorMessages.unauthenticated)

  const resultUser = user.data() as User
  resultUser.ref = user.ref.path

  return resultUser
})

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }: { email: string, password: string }) => {
    const { docs: [user] } = await getDocs(query(
      userColection,
      where('email', '==', email),
      where('password', '==', password),
    ))
    if (!user) throw new Error(errorMessages.invalidCredentials)

    const token = uuid()
    await updateDoc(user.ref, { token })
    const resultUser = user.data() as User
    resultUser.token = token
    resultUser.ref = user.ref.path

    return resultUser
  }
)

export const createUser = createAsyncThunk(
  "user/createUser",
  async (newUser: Omit<User, "token" | "ref">) => {
    const { docs: [existingUser] } = await getDocs(query(
      userColection,
      where("email", "==", newUser.email),
      limit(1)
    ))
    if (existingUser) throw new Error(errorMessages.userAlreadyExists)

    const user = {
      ...newUser,
      token: uuid(),
      ref: ''
    }

    const { path } = await addDoc(userColection, user)

    user.ref = path

    return user
  }
)
