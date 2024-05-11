import axios from "./api";

const ManufacturedProductService = {
  async getAllManufacturedProduct(page = 1, limit = 5) {
    const response = await axios.get(
      `product-base/all-manufactured?page=${page}&limit=${limit}`
    );
    return response;
  },

  async getOneProductFromBaseById(id) {
    const response = await axios.get(`product-base/base/${id}`);
    return response;
  },

  async searchProductFromBase(name) {
    const response = await axios.get(`product-base/search-base?name=${name}`);
    return response;
  },

  async getAllProductFromBase() {
    const response = await axios.get("product-base/all-product");
    return response;
  },

  async addProductManufacturedHistoryAndBase(id, data) {
    const response = await axios.post(`product-base/add-product/${id}`, data);
    return response;
  },
};

export default ManufacturedProductService;
