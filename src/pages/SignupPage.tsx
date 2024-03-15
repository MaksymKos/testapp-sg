import { useState, ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, TextField, InputAdornment, Typography, Box, IconButton, Button } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { createUser } from '../api/user/actions'
import { useAppDispatch } from '../types/hooks'
import { routes } from '../constants'

type inputsType = {
  name: string,
  surname: string,
  email: string,
  password: string,
}

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [inputs, setInputs] = useState<inputsType>({
    name: '',
    surname: '',
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

  const handleButtonClick = async (user: inputsType) => {
    await dispatch(createUser(user))
    setInputs({
      name: '',
      surname: '',
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
          Sign Up
        </Typography>
        <TextField
          required
          name='name'
          label="Name"
          type='text'
          value={inputs.name}
          onChange={handleChange}
        />
        <TextField
          required
          name='surname'
          label="Surname"
          type='text'
          value={inputs.surname}
          onChange={handleChange}
        />
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
          onClick={() => handleButtonClick(inputs)}
          sx={{ width: '35ch' }}
        >
          Create account
        </Button>
        <Typography sx={{ marginTop: 10 }}>
          Already have an account?
          <Link to={routes.login}>
            <Button>Login</Button>
          </Link>
        </Typography>
      </Box>
    </Container>
  )
}

export default SignupPage
