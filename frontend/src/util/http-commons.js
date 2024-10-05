import axios from 'axios';

const {
  VITE_API_URL,
  VITE_GOOGLE_API_KEY,
  VITE_GOOGLE_TTS_API_URL,
  VITE_NODE_API_URL,
  VITE_GPT_API_URL,
  VITE_GPT_KEY
} = import.meta.env;

function Axios() {
  const instance = axios.create({
    baseURL: VITE_API_URL,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  return instance;
}

function AxiosMulti() {
  const instance = axios.create({
    baseURL: VITE_API_URL,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return instance;
}

function Google() {
  const instance = axios.create({
    baseURL:
      VITE_GOOGLE_TTS_API_URL + '/text:synthesize?key=' + VITE_GOOGLE_API_KEY,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  return instance;
}

function Google_STT() {
  const instance = axios.create({
    baseURL: VITE_GOOGLE_TTS_API_URL + '/?key=' + VITE_GOOGLE_API_KEY,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    credentials: 'include',
  });

  return instance;
}

function RecordOV() {
  const instance = axios.create({
    baseURL: VITE_NODE_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  return instance;
}

function GPT() {
  const instance = axios.create({
    baseURL: VITE_GPT_API_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${VITE_GPT_KEY}`,
    },
    credentials: 'include',
  });

  return instance;
}

export { Axios, AxiosMulti, Google, Google_STT, RecordOV, GPT };
