import { takeEvery, all, call, put, fork } from 'redux-saga/effects'
import { fetchUser } from './actions'

import { request } from 'graphql-request'

//делаем запрос по fetch api и диспатчим action
function* getUser() {
  try {
    const res = yield call(fetch)
    yield put(fetchUser(res))
  } catch (error) {
    console.error(error)
  }
}

// слушаем action асинхронного запроса
function* watchGetUserRequest() {
  yield takeEvery('FETCH_REQUEST', getUser)
}

// корневая обертка для асинхронных запросов
export default function* root() {
  yield all([fork(watchGetUserRequest)])
}

// схема запроса graphql
const query = `
  {
      user (id: 1) {
        id
        name
        username
        email
        phone
        website
        posts {
          data {
            id
            title
          }
        },
        todos {
          data {
            id
            title 
            completed
          }
        }
    }
  }
`

// graphql запрос
const fetch = async () => {
  let url = 'https://graphqlzero.almansi.me/api'
  return await request(url, query).then((r) => {
    return r.user
  })
}
