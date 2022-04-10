import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-type": "application/json"
  }
})


export function getCpu(dateNow, timeRange) {
  return api.get(`/cpus/${dateNow}/${timeRange}`);
}

export function getCpuNow(dateStart) {
  return api.get(`/cpu/${dateStart}`);
}

export function getReport(dateNow, timeRange) {
  return api.get(`/report/${dateNow}/${timeRange}`);
}