import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


import ProductCard from '../../components/product-card/product-card.component';

import { CategoryContainer, CategoryTitle } from './category.styles';

import { categoriesSelector } from '../../store/categories/category.selector';

const Category = () => {
  const { category } = useParams();
  const categories = useSelector(categoriesSelector);
  const [ products, setProducts ] = useState(categories[category]);

  useEffect(() => {
    setProducts(categories[category])
    
  }, [category, categories]);

  return (
    <Fragment>
       <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
       <CategoryContainer>
      {
        products && products.map((product) => (<ProductCard key={product.id} product={product} />))
      }
    </CategoryContainer>
    </Fragment>
  );
};

export default Category;