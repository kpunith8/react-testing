import axios from 'axios'
import { LATEST_CURRENCY_URL } from '../utils/api/urls'

async function convertFetch() {
  try {
    const result = await fetch(LATEST_CURRENCY_URL);
    const data = await result.json()

    return data;
  } catch (e) {
    return null;
  }
}

async function convertAxios() {
  const result = await axios.get(LATEST_CURRENCY_URL);

  return result.data
}

export { convertAxios, convertFetch };
