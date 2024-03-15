import React, { useState, ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, TextField, InputAdornment, Typography, Box, IconButton, Button } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { loginUser } from '../api/user/actions'
import { useAppDispatch } from '../types/hooks'
import { errorMessages, routes } from '../constants'
import { toast } from 'react-toastify'

type inputsType = {
  email: string,
  password: string,
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [inputs, setInputs] = useState<inputsType>({
    email: '',
    password: '',
  })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault()
  }

  const handleLoginButtonClick = async (user: inputsType) => {
    let loggedUser
    try {
      loggedUser = await dispatch(loginUser({
        email: user.email,
        password: user.password,
      })).unwrap()
    } catch (error: any) {
      return toast.warning(error?.message || errorMessages.unhandled)
    }

    setInputs({
      email: '',
      password: '',
    })

    navigate(routes.root)
  }

  return (
    <Container sx={{ marginTop: 10 }}>
      <Button variant='contained' onClick={() => navigate(routes.root)}>Go Back</Button>
      <Box
        component="form"
        sx={{
          flexGrow: 1,
          '& .MuiTextField-root': { m: 1, width: '35ch' },
        }}
        noValidate
        autoComplete="off"
        width='100%'
        display='flex'
        flexDirection='column'
        gap={1}
        alignItems='center'
      >
        <Typography variant="h3" component="div">
          Sign In
        </Typography>
        <TextField
          required
          name='email'
          label="Email"
          type='email'
          value={inputs.email}
          onChange={handleChange}
        />
        <TextField
          required
          name='password'
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={inputs.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button
          variant='contained'
          onClick={() => handleLoginButtonClick(inputs)}
          sx={{ width: '35ch' }}
        >
          Login
        </Button>
        <Typography sx={{ marginTop: 10 }}>
          Don't have an account?
          <Link to={routes.signup}>
            <Button>Sign Up</Button>
          </Link>
        </Typography>
      </Box>
      {/* <ToastContainer /> */}
    </Container>
  )
}

export default LoginPage
