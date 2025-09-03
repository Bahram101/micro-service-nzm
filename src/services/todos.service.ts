import instance from "@/lib/axios";
import axios from "axios";

export const TodosService = {
  async getTodos() {
    const { data } = await axios.get("/api/todos");
    return data;
  },
};
