import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../types/hooks'
import { deleteTown, getCityData, updateTown } from '../api/towns/actions'
import { WeatherTown } from '../types/weatherTown'

import { Button, Typography, Box, Paper } from '@mui/material'
import CachedTwoToneIcon from '@mui/icons-material/CachedTwoTone'
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone'
import DeviceThermostatTwoToneIcon from '@mui/icons-material/DeviceThermostatTwoTone'
import AirTwoToneIcon from '@mui/icons-material/AirTwoTone'
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined'
import CompressIcon from '@mui/icons-material/Compress'
import { styled } from '@mui/material/styles'
import { routes } from '../constants'

const TownPaper = styled(Paper)(({ theme }) => ({
  width: 320,
  height: 220,
  padding: theme.spacing(2),
}))

const Town = ({ town }: { town: WeatherTown }) => {
  const dispatch = useAppDispatch()

  const handleUpdateClick = async () => {
    const updatedTown = await dispatch(
      getCityData({
        city: town.name,
        unit: 'metric',
      })
    ).unwrap()

    dispatch(updateTown({
      town: updatedTown,
      ref: town.ref
    }))
  }

  const handleDeleteClick = () => {
    dispatch(deleteTown(town))
  }

  return (
    <TownPaper elevation={10} >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h5" component="div" color='primary.dark'>
          {town.name}, {town.sys.country}
        </Typography>
        <Box>
          <Button
            onClick={handleUpdateClick}
          >
            <CachedTwoToneIcon />
          </Button>
          <Button
            onClick={handleDeleteClick}
          >
            <ClearTwoToneIcon />
          </Button>
        </Box>
      </Box>
      <Box>
        <Typography component="div" color='primary.light'>
          {town.weather[0].main}, {town.weather[0].description}
        </Typography>
        <Typography>
          {new Date(town.date).toLocaleString()}
        </Typography>
      </Box>
      <Box
        display="flex"
        marginTop={2}
        gap={3}
      >
        <Box
          display="flex"
          flexDirection='column'
          gap={1}
        >
          <Box
            display="flex"
            alignItems="center"
          >
            <DeviceThermostatTwoToneIcon color='error' /> Max {town.main.temp_max}°C
          </Box>
          <Box
            display="flex"
            alignItems="center"
          >
            <DeviceThermostatTwoToneIcon color='primary' /> Min {town.main.temp_min}°C
          </Box>
          <Box
            display="flex"
            alignItems="center"
          >
            <DeviceThermostatTwoToneIcon /> Feels {town.main.feels_like}°C
          </Box>
          <Box
            display="flex"
            alignItems='center'
          >
            <AirTwoToneIcon /> Wind {town.wind.speed} km/h
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection='column'
          gap={1}
        >
          <Box
            display="flex"
            alignItems='center'
          >
            <WaterDropOutlinedIcon /> Humidity {town.main.humidity}%
          </Box>
          <Box
            display="flex"
            alignItems='center'
          >
            <CompressIcon /> Pressure {town.main.pressure}
          </Box>
          <Box
            marginTop='20%'
            marginLeft='70%'
          >
            <Link to={routes.details.replace(':name', town.name)}>
              <Button variant='contained'>
                Details
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </TownPaper>
  )
}

export default Town
