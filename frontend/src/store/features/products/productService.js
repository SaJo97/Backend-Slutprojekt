import axios from "axios";

const getAll = async () => {
  const res = await axios.get(
    "http://localhost:8080/api/products"
  );
  return res.data;
};

export default {
  getAll,
};
