import axios from './axios.js'

export const loginRequest = (user) => axios.post(`/usuarios/login`, user)

export const registerRequest = (user) => axios.post(`/usuarios/register`, user)

export const verifyTokenRequest = () => axios.get('/usuarios/verifyToken')

export const logoutRequest = () => axios.post('/usuarios/logout')