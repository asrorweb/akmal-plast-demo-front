import axios from "./api";

const ClientService = {
  async getAllClient() {
    const response = await axios.get("client/all");
    return response;
  },

  async getClientWithId(id) {
    const response = await axios.get(`client/${id}`);
    return response;
  },

  async searchClient(name) {
    const response = await axios.get(`client/search?name=${name}`);
    return response;
  },

  async createClient(client) {
    const response = await axios.post("client/add-client", client);
    return response;
  },

  async updateClient(id, client) {
    const response = await axios.put(`client/update-client/${id}`, client);
    return response;
  },

  async deleteClient(id) {
    const response = await axios.delete(`client/delete-client/${id}`);
    return response;
  },
};

export default ClientService;
