import axios from 'axios'

const API = 'http://localhost:4000/api'


export const loginRequest = user => axios.post($,{API}/usuarios/login, user)

export const registerRequest = user => axios.post(`${API}/usuarios/register`, user)


