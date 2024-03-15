import { createAsyncThunk } from "@reduxjs/toolkit"
import { getDocs, collection, query, where, updateDoc, addDoc, limit } from "firebase/firestore"
import { v4 as uuid } from 'uuid'
import db from '../../services/db'
import { User } from '../../types/user'

const collection_name = "users"
const userColection = collection(db, collection_name)

export const getCurrentUser = createAsyncThunk("user/getCurrentUser", async (token: string | null) => {
  if (!token) throw new Error('no token')

  const q = query(
    userColection,
    where('token', '==', token),
  )

  const { docs: [user] } = await getDocs(q)
  if (!user) throw new Error('no user')

  const resultUser = user.data() as User
  resultUser.ref = user.ref.path

  return resultUser
})

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }: { email: string, password: string }) => {
    const q = query(
      userColection,
      where('email', '==', email),
      where('password', '==', password),
    )

    const { docs: [user] } = await getDocs(q)
    if (!user) throw new Error('User doesn`t exist')

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
    const q = query(
      userColection,
      where("email", "==", newUser.email),
      limit(1)
    )

    const {
      docs: [existingUser],
    } = await getDocs(q)
    if (existingUser) throw new Error("User already exist")

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
