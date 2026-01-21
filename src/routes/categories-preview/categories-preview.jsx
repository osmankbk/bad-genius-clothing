import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import CategoryPreview from '../../components/category-preview/category-preview.component';

import { categoriesSelector } from '../../store/categories/category.selector';





const CategoriesPreview = () => {
  const categories = useSelector(categoriesSelector);
  
  return (
    <Fragment>
      {Object.keys(categories).map((title) => {
        const products = categories[title];
        return (<CategoryPreview key={title} title={title} products={products} />)
      })}
    </Fragment>
  )
};

export default CategoriesPreview;