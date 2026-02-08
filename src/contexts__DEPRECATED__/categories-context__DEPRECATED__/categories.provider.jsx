import { useState, useEffect } from "react";

import { CategoriesContext } from "./categories.context.jsx";
import SHOP_DATA from '../../shop-data.js';
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils.js";


export const CategoriesProvider = ({children}) => {
  const [categories, setCategories] = useState({});

  useEffect(() => {
    const getCategoriesMap = async (collectionKey) => {
      const categoriesMap = await getCategoriesAndDocuments(collectionKey);
      setCategories(categoriesMap);
    }

    getCategoriesMap('categories');
  }, []);

  const value = {
    categories,
    setCategories
  }

  return (
    <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
  );
}