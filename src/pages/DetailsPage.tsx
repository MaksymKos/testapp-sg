import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../types/hooks'
import { getCityData, get5DaysForecast } from '../api/towns/actions'

import { Container, Switch, Button, Typography, Box, Paper } from '@mui/material'
import DeviceThermostatTwoToneIcon from '@mui/icons-material/DeviceThermostatTwoTone'
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined'
import CompressIcon from '@mui/icons-material/Compress'
import { styled } from '@mui/material/styles'

const DayPaper = styled(Paper)(({ theme }) => ({
  width: 150,
  height: 'max-content',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}))

const DetailsPage = () => {
  const [checked, setChecked] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const coords = location.pathname.split('/').slice(-1)
  const currentDay = new Date().toLocaleDateString()


  const {
    citySearchData,
    forecastData,
  } = useAppSelector((state) => state.weather)

  const fetchData = async () => {
    const { data } = await dispatch(
      getCityData({
        city: coords[0],
        unit: checked ? 'imperial' : 'metric',
      })
    ).unwrap()

    dispatch(
      get5DaysForecast({
        lat: data.coord.lat,
        lon: data.coord.lon,
        unit: checked ? 'imperial' : 'metric',
      })
    )
  }

  useEffect(() => {
    fetchData()
  }, [checked])

  if (!forecastData || !citySearchData) return null

  return (
    <Box
      marginTop={10}
    >
      <Button variant='contained' onClick={() => navigate('/')}>Go Back</Button>
      <Container sx={{ marginTop: 5 }}>
        <Box
          display='flex'
          justifyContent='space-between'
        >
          <Typography variant='h6'
            sx={{
              color: 'GrayText'
            }}
          >
            Current Weather
          </Typography>
          <Box>
            C
            <Switch
              color="primary"
              checked={checked}
              onChange={(event) => setChecked(event.target.checked)}
            />
            F
          </Box>
        </Box>

        <Box
          display='flex'
          justifyContent='space-between'
          marginTop={5}
        >
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
          // alignItems='center'
          >

            <Box
              display='flex'
              flexDirection='column'
            >
              <Typography color='Highlight' variant="h3" component="div">
                {forecastData.city.name}, {forecastData.city.country}
              </Typography>
              <Typography color='secondary.light' variant="h6" component="div">
                {currentDay}
              </Typography>
            </Box>

            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              gap={10}
            >
              <div>
                <img
                  src={`https://openweathermap.org/img/wn/${citySearchData.weather[0].icon}@2x.png`}
                />
                <Typography color='primary.main' variant="h6" component="div">
                  {citySearchData.weather[0].description}
                </Typography>
              </div>

              <div>
                <Typography color='secondary.dark' fontWeight={600} variant="h2" component="div">
                  {citySearchData.main.temp}°
                </Typography>
                <Box
                  display='flex'
                  justifyContent='space-around'
                >
                  <Typography variant="h5" component="div">
                    {citySearchData.main.temp_max}°
                  </Typography>
                  <Typography variant="h5" component="div">
                    {citySearchData.main.temp_min}°
                  </Typography>
                </Box>
              </div>
            </Box>

          </Box>

          <Box border='1px solid' />

          <Box
            display='flex'
            flexDirection='column'
            gap={2}
          >
            <Box
              display="flex"
              alignItems='center'
              gap={5}
            >
              <WaterDropOutlinedIcon />
              <Typography>
                Humidity {citySearchData.main.humidity}%
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems='center'
              gap={5}
            >
              <CompressIcon />
              <Typography>
                Pressure {citySearchData.main.pressure}pHa
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              gap={5}
            >
              <DeviceThermostatTwoToneIcon color='error' />
              <Typography>
                Max temperature {citySearchData.main.temp_max}°
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              gap={5}
            >
              <DeviceThermostatTwoToneIcon color='primary' />
              <Typography>
                Min temperature {citySearchData.main.temp_min}°
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              gap={5}
            >
              <DeviceThermostatTwoToneIcon />
              <Typography>
                Feels like {citySearchData.main.feels_like}°
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          display='flex'
          flexWrap='wrap'
          justifyContent='center'
          marginTop={4}
          gap={1}
        >
          {forecastData && forecastData.list.slice(0, 12).map((item, index) => {
            const date = new Date(item.dt_txt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            return (
              <DayPaper key={index}>
                <Box
                  textAlign='center'>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      color: 'primary.light'
                    }}
                  >
                    {date}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      color: 'secondary.light'
                    }}
                  >
                    {item.weather[0].description}
                  </Typography>
                </Box>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                />
                <Typography>
                  {item.main.temp}° / {item.main.feels_like}°
                </Typography>
              </DayPaper>
            )
          })}

        </Box>
      </Container>
    </Box>
  )
}

export default DetailsPage