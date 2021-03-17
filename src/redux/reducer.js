import { ADD, DELETE, FETCH } from './types'

const initialState = {
  status: 'idle',
  data: [
    { id: 1, name: 'Jhon Doe', email: 'jhon@example.com' },
    { id: 2, name: 'Brad Tyson', email: 'brad@example.com' },
  ],
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        data: [...state.data, { ...action.payload, id: state.data.length + 1 }],
      }
    case DELETE:
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload),
      }
    case FETCH:
      return {
        ...state,
        fetched: action.payload,
      }
    default:
      return state
  }
}
