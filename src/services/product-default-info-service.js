import axios from "./api";

const ProductDefaultInfoService = {
  async getAllProductDefaultInfo() {
    const response = await axios.get("product/all");
    return response;
  },
  async getOneProductDefaultIngoWithId(id) {
    const response = await axios.get(`product/${id}`);
    return response;
  },
  async addProductDefaultInfo(product) {
    const response = await axios.post("product/create", product);
    return response;
  },
  async serachProductDefaultInfo(name) {
    const response = await axios.get(`product/search?name=${name}`);
    return response;
  },
  async updadeProductDefaultInfo(id, product) {
    const response = await axios.put(`product/update/${id}`, product);
    return response;
  },
};

export default ProductDefaultInfoService;
