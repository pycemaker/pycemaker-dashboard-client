import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-type": "application/json"
  }
})


export function getCpu(dateNow, timeRange) {
  return api.get(`/cpu/${dateNow}/${timeRange}`);
}

export function getCpuNow(dateStart) {
  return api.get(`/cpu/${dateStart}`);
}

export function getRamReport(dateNow, timeRange) {
  return api.get(`/ram/${dateNow}/${timeRange}`);
}

export function getRamNow(dateStart) {
  return api.get(`/ram/${dateStart}`);
}

export function getDiskeport(dateNow, timeRange) {
  return api.get(`/disk/${dateNow}/${timeRange}`);
}

export function getDiskNow(dateStart) {
  return api.get(`/disk/${dateStart}`);
}

export function getRespTimeReport(dateNow, timeRange) {
  return api.get(`/response_time/${dateNow}/${timeRange}`);
}

export function getRespTimeNow(dateStart) {
  return api.get(`/response_time/${dateStart}`);
}

export function getHttpFailReport(dateNow, timeRange) {
  return api.get(`/http_fail/${dateNow}/${timeRange}`);
}

export function getHttpFailNow(dateStart) {
  return api.get(`/http_fail/${dateStart}`);
}

export function getReport(dateNow, timeRange) {
  return api.get(`/report/${dateNow}/${timeRange}`);
}