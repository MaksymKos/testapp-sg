import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAppDispatch } from './types/hooks'
import { getCurrentUser } from './api/user/actions'
import { CircularProgress } from '@mui/material'

function App() {
  const token = localStorage.getItem('token')
  const dispatch = useAppDispatch()
  const [userLoading, setUserLoading] = useState(true)

  useEffect(() => {
    dispatch(
      getCurrentUser(token)
    ).finally(() => {
      setUserLoading(false)
    })
  }, [token])

  // if (userLoading) return <CircularProgress size="lg" value={30} />
  if (userLoading) return <></>

  return (
    <>
      <Header />
      <Outlet />
      <ToastContainer />
    </>
  )
};

export default App
