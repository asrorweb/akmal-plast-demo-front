import axios from "./api";

const WorkerService = {
  async getAllWorkers() {
    const response = await axios.get("admin/all-worker");
    return response;
  },

  async getWorker() {
    const response = await axios.get("admin/worker");
    return response;
  },

  async getWorkerWithId(id) {
    const response = await axios.get(`admin/worker/${id}`);
    return response;
  },

  async searchWorker(name) {
    const response = await axios.get(`admin/search?name=${name}`);
    return response;
  },

  async registerWorker(user) {
    const response = await axios.post("admin/register", user);
    return response;
  },

  async loginWorker(user) {
    const response = await axios.post("admin/login", user);
    return response;
  },

  async updateWorker(id, user) {
    const response = await axios.put(`admin/update/${id}`, user);
    return response;
  },

  async deleteWorker(id) {
    const response = await axios.delete(`admin/delete/${id}`);
    return response;
  },
};

export default WorkerService;
