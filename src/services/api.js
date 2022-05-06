import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND,
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

export function getCpuPrediction(dateStart) {
  return api.get(`/cpus/${dateStart}`);
}

export function getCpuRandom(dateNow) {
  return api.get(`/cpuss/${dateNow}`);
}

export function getRam(dateNow, timeRange) {
  return api.get(`/ram/${dateNow}/${timeRange}`);
}

export function getRamNow(dateStart) {
  return api.get(`/ram/${dateStart}`);
}

export function getDisk(dateNow, timeRange) {
  return api.get(`/disk/${dateNow}/${timeRange}`);
}

export function getDiskNow(dateStart) {
  return api.get(`/disk/${dateStart}`);
}

export function getRespTime(dateNow, timeRange) {
  return api.get(`/response_time/${dateNow}/${timeRange}`);
}

export function getRespTimeNow(dateStart) {
  return api.get(`/response_time/${dateStart}`);
}

export function getHttpFail(dateNow, timeRange) {
  return api.get(`/http_fail/${dateNow}/${timeRange}`);
}

export function getHttpFailNow(dateStart) {
  return api.get(`/http_fail/${dateStart}`);
}

export function getReport(dateNow, timeRange) {
  return api.get(`/report/${dateNow}/${timeRange}`);
}

export function getJobsData() {
  return api.get(`/jobs`);
}

export function scheduleJobs(data) {
  return api.post(`/jobs`, data);
}

export function modifyJobs(data) {
  return api.put(`/jobs`, data);
}