import { URL } from './URL'
import axios from 'axios'

export const getDataByPath = async (path) => {
	const data = await axios.get(`${URL}/${path}`)
	return data
}
