
export const getQueryString = (data: { [key: string]: string | number }) => Object.entries(data).reduce(
  (acc, [key, value]) => {
    acc += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`
    return acc
  },
  ''
)