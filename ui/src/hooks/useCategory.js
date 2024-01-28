import { useEffect, useState } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);
  // get categories
  const getCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      setCategories(data?.category);
    } catch (err) {
      console.log(err);
    }
  };

  return categories;
}
