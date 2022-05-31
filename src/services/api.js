import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND,
  headers: {
    "Content-type": "application/json"
  }
})

const mlApi = axios.create({
  baseURL: process.env.REACT_APP_ML,
  headers: {
    "Content-type": "application/json"
  }
})

export function getCurrentHealth(timeRange) {
  return mlApi.get(`/current_health/${timeRange}`);
}

export function getCpu(dateNow, timeRange) {
  return api.get(`/cpu/${dateNow}/${timeRange}`);
}

export function getCpuNow(dateStart) {
  return api.get(`/cpu/${dateStart}`);
}

export function getCpuPrediction(dateStart, timeRange) {
  return api.get(`/cpu_predict/${dateStart}/${timeRange}`);
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

export function getRamPrediction(dateStart, timeRange) {
  return api.get(`/ram_predict/${dateStart}/${timeRange}`);
}

export function getRamDetailsNow(dateStart) {
  return api.get(`/ram_details/${dateStart}`);
}

// export function getHeapNow(dateStart) {
//   return api.get(`/heap/${dateStart}`);
// }

// export function getNonheapNow(dateStart) {
//   return api.get(`/nonheap/${dateStart}`);
// }

export function getResTime(dateNow, timeRange) {
  return api.get(`/res_time/${dateNow}/${timeRange}`);
}

export function getResTimeNow(dateStart) {
  return api.get(`/res_time/${dateStart}`);
}

export function getReqCount(dateNow, timeRange) {
  return api.get(`/req_count/${dateNow}/${timeRange}`);
}

export function getReqCountNow(dateStart) {
  return api.get(`/req_count/${dateStart}`);
}

export function getSucReqCount(dateNow, timeRange) {
  return api.get(`/success_req_count/${dateNow}/${timeRange}`);
}

export function getSucReqCountNow(dateStart) {
  return api.get(`/success_req_count/${dateStart}`);
}

export function getFailReqCount(dateNow, timeRange) {
  return api.get(`/fail_req_count/${dateNow}/${timeRange}`);
}

export function getFailReqCountNow(dateStart) {
  return api.get(`/fail_req_count/${dateStart}`);
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