import { useEffect, useState, JSX } from 'react'
import { useAppDispatch, useAppSelector } from '../types/hooks'
import { Container, Stack, TextField, Typography, Button, } from '@mui/material'
import { getCityData, getTowns } from '../api/towns/actions'
import { addTown } from '../api/towns/actions'
import Town from '../components/Town'
import { toast } from 'react-toastify'


const HomePage = () => {
  const [city, setCity] = useState("Kek")
  const [townsLoading, setTownsLoading] = useState(true)
  const dispatch = useAppDispatch()

  // const {
  //   weather: { towns },
  //   user: { user },
  // } = useAppSelector((state) => state)

  const user = useAppSelector((state) => state.user.user)
  const towns = useAppSelector((state) => state.weather.towns)

  const fetchData = async () => {
    return dispatch(
      getCityData({
        city,
        unit: 'metric',
      })
    ).unwrap()
  }

  const handleCitySearch = async () => { // TODO remove if possible || specify native event type
    const { data: town } = await fetchData()

    try {
      await dispatch(addTown(town)).unwrap()
    } catch (error: any) {
      toast.warning(error?.message || "Something went wrong")
    }

    setCity('') // TODO - НЕРОБЕ ПОШУК
  }

  useEffect(() => {

  }, [user])

  useEffect(() => {
    dispatch(
      getTowns()
    ).finally(() => {
      setTownsLoading(false)
    })
  }, [user])

  let townsSection: JSX.Element | JSX.Element[] = <></>
  if (!townsLoading) {
    townsSection = towns.length
      ? towns.map((town, index) => (
        <Town town={town} key={index} />
      ))
      : <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center', marginTop: 1 }}>
        Let's add a town?
      </Typography>
  }

  return (
    <Container>
      <Typography color='secondary.light' variant="h2" component="div" sx={{ flexGrow: 1, textAlign: 'center', mt: 15 }}>
        Where we are going today?
      </Typography>
      <Stack
        spacing={1}
        direction="row"
        sx={{ marginTop: 5, justifyContent: 'center' }}
      >
        <TextField
          value={city}
          onChange={e => setCity(e.target.value)}
          label="Any town?"
          color="primary"
          size="medium"
          sx={{ width: '45ch' }}
        />
        <Button
          variant="contained"
          size="large"
          onClick={handleCitySearch}
        >
          Add
        </Button>
      </Stack>
      <Stack
        spacing={2}
        direction="row"
        rowGap={2}
        flexWrap='wrap'
        sx={{ marginTop: 5, justifyContent: 'center' }}
      >
        {townsSection}
      </Stack>
    </Container>
  )
}

export default HomePage;

