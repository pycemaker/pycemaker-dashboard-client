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
  return api.get(`/cpu_predict/${dateStart}`);
}

export function getCpuRandom(dateNow) {
  return api.get(`/random/${dateNow}`);
}

export function getRam(dateNow, timeRange) {
  return api.get(`/ram/${dateNow}/${timeRange}`);
}

export function getRamNow(dateStart) {
  return api.get(`/ram/${dateStart}`);
}

export function getRamDetails(dateNow, timeRange) {
  return api.get(`/ram_details/${dateNow}/${timeRange}`);
}

export function getRamDetailsNow(dateStart) {
  return api.get(`/ram_details/${dateStart}`);
}

export function getHeapNow(dateStart) {
  return api.get(`/heap/${dateStart}`);
}

export function getNonheapNow(dateStart) {
  return api.get(`/nonheap/${dateStart}`);
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