import axios from "./api";

const TradeService = {
  async sellProducts(data) {
    const response = await axios.post("trade/sell", data);
    return response;
  },
  async cencelTrade(id) {
    const response = await axios.post(`trade/cencel/${id}`);
    return response;
  },
  async getAllTradeHistory(page = 1, limit = 10) {
    const response = await axios.get(
      `trade/all-history?page=${page}&limit=${limit}`
    );
    return response;
  },
  async getAllTradeHistoryWithOutPagination() {
    const response = await axios.get("trade/all");
    return response;
  },
  async getOneProductHistory(id) {
    const response = await axios.get(`trade/history/${id}`);
    return response;
  },
};

export default TradeService;
