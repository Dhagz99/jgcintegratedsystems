import api from '@/lib/api'
import { LoginData, RegisterData } from '@/lib/schemas'
import { PublicUserDTO } from '@/types/auth.type'

export const loginUser = async (data: LoginData) => {
  const res = await api.post('/login', data)
  return res.data
}

export const registerUser = async (data: RegisterData) => {
  const res = await api.post('/register', data)
  return res.data
}

export const fetchMe = async (): Promise<PublicUserDTO> => {
  const res = await api.get<PublicUserDTO>('/me')
  return res.data
}

export const logoutUser = async () => {
  const res = await api.post('/logout')
  return res.data
}

