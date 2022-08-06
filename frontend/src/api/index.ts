import axios from 'axios'

export const initAxiosConfig = () => {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL
  axios.defaults.timeout = 3000
}
