import { useEffect, useState } from "react";
import axios from "../services/axios";
import { getCategoryUrl } from "../services/apiUrl";
import { allCategories } from "../constants";

const useCategory = () => {
  const [categories, setCategories] = useState(allCategories);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(getCategoryUrl);
      setCategories(data?.category);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
};

export default useCategory;
