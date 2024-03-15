import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAppDispatch } from './types/hooks'
import { getCurrentUser } from './api/user/actions'
import { tokenName } from './constants'

function App() {
  const token = localStorage.getItem(tokenName)
  const dispatch = useAppDispatch()
  const [userLoading, setUserLoading] = useState(true)

  useEffect(() => {
    dispatch(
      getCurrentUser(token)
    ).finally(() => {
      setUserLoading(false)
    })
  }, [token])

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
