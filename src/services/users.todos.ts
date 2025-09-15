import axios from "axios";

export const UserService = {
  async getAll() {
    const { data } = await axios.get("/api/users");
    return data
  },
};
