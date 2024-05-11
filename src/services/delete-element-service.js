import axios from "./api";

const DeleteElementService = {
  async deleteElement(id, path) {
    const response = await axios.delete(`${path}/${id}`);
    console.log(response);
    return response;
  },
};

export default DeleteElementService;
