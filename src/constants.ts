export const weatherService = {
  api: {
    baseUrl: "https://api.openweathermap.org",
    key: "8996459083bce0d21b87a747bd6eee99"
  },
  imageBaseUrl: "https://openweathermap.org/img/wn/"
}

export const routes = {
  root: '/',
  login: '/login',
  signup: '/signup',
  details: '/details/:name'
}

export const tokenName = 'token'

export const errorMessages = {
  unhandled: 'Something went wrong',
  invalidCredentials: 'Invalid login credentials',
  unauthenticated: 'Unauthenticated',
  userAlreadyExists: 'User already exists',
  townAlreadyExists: 'Town already exists',
}
