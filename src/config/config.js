import _ from 'lodash'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'

const myEnv = dotenv.config()
dotenvExpand(myEnv)

function toArray (string) { // eslint-disable-line no-unused-vars
  if (!string || string.indexOf(',') < 0) {
    return string
  }
  return string.split(',')
}

const defaultConfig = {
  TZ: 'Europe/Amsterdam',
  DATE_FORMAT: 'YYYY-MM-DD[T]HH:mmZ',
  DATA_SIZE_LIMIT: '100',
  BASE_URL: 'http://stag.local',
  WEB_PORT: '3000',
  API_TIMEOUT: '40000',
  API_PORT: '1338',
  NODE_ENV: 'development'
}

_.defaults(process.env, defaultConfig)

const {
    NODE_ENV,
    FBKEY,
    FBSECRET,
    MONGO_PORT_27017_TCP_ADDR,
    MONGO_PORT_27017_TCP_PORT,
    MONGO_DB_NAME,
    MONGO_DB_OPTION,
    TZ,
    DATE_FORMAT,
    DATA_SIZE_LIMIT,
    BASE_URL,
    WEB_PORT,
    API_PORT,
    API_TIMEOUT
} = process.env

const base = {
  NODE_ENV,
  API: {
    URL: `${BASE_URL}:${API_PORT}`,
    BASEURL: BASE_URL,
    PORT: API_PORT,
    TIMEOUT: parseInt(API_TIMEOUT, 10)
  },
  WEB: {
    URL: `${BASE_URL}:${WEB_PORT}`
  },
  FACEBOOK: {
    KEY: FBKEY,
    SECRET: FBSECRET
  },
  MONGO: {
    URL: `mongodb://${MONGO_PORT_27017_TCP_ADDR}:${MONGO_PORT_27017_TCP_PORT}/${MONGO_DB_NAME}?${MONGO_DB_OPTION}`,
    COLLECTIONS: {
      USERS: 'users',
      COLOCREQUEST: 'colocation-requests',
      COLOCATION: 'colocations',
      ROOMMATEREQUEST: 'roommate-requests'
    }
  },
  TIMEZONE: TZ,
  DATEFORMAT: DATE_FORMAT,
  DATASSIZELIMIT: parseInt(DATA_SIZE_LIMIT, 10)
}

export const config = base
