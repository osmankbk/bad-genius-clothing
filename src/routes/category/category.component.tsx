import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

import { CategoryContainer, CategoryTitle } from './category.styles';

import { categoriesSelector, categoryIsLoadingSelector } from '../../store/categories/category.selector';

type CategoryRouteParams = {
  category: string;
}

const Category = () => {
  const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
  const categories = useSelector(categoriesSelector);
  const isLoading = useSelector(categoryIsLoadingSelector);
  const [ products, setProducts ] = useState(categories[category]);

  useEffect(() => {
    setProducts(categories[category])
    
  }, [category, categories]);

  return (
    <Fragment>
       <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
       {
        isLoading ? (
          <Spinner />
        ) : (
           <CategoryContainer>
            {
              products && products.map((product) => (<ProductCard key={product.id} product={product} />))
            }
          </CategoryContainer>
        )}
    </Fragment>
  );
};

export default Category;