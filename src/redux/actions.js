import { ADD, DELETE, FETCH } from './types'

export const addUser = (payload) => {
  return { type: ADD, payload }
}

export const deleteUser = (payload) => {
  return { type: DELETE, payload }
}

export const fetchUser = (payload) => {
  return { type: FETCH, payload }
}
