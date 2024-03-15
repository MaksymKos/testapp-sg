import React from 'react'
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAppSelector } from '../types/hooks'
import { useDispatch } from 'react-redux'
import { logout } from '../api/user/slice'
import { resetWeatherSlice } from '../api/towns/slice'
import { routes } from '../constants'

export default function Header() {
  const user = useAppSelector((state) => state.user.user)
  const dispatch = useDispatch()

  const logoutHandle = () => {
    dispatch(logout())
    dispatch(resetWeatherSlice())
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
          >
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5" component="div" sx={{ color: 'white', textDecoration: 'none' }}>
              Weather in your town
            </Typography>
          </Box>
          {user ? (
            <Typography variant="h6" component="div" sx={{ color: 'white', textDecoration: 'none' }}>
              {user.name} {user.surname}
              <Button
                variant="contained"
                color="primary"
                sx={{ marginLeft: 2 }}
                onClick={logoutHandle}
              >
                Log out<LogoutIcon />
              </Button>
            </Typography>
          ) : (
            <Link to={routes.signup}>
              <Button variant="contained" color="primary">Sign Up</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
};
