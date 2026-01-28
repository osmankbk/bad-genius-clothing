import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import CategoryPreview from '../../components/category-preview/category-preview.component';
import Spinner from '../../components/spinner/spinner.component';

import { categoriesSelector, categoryIsLoadingSelector} from '../../store/categories/category.selector';





const CategoriesPreview = () => {
  const categories = useSelector(categoriesSelector);
  const isLoading = useSelector(categoryIsLoadingSelector);
  
  return (
    <Fragment>
      {
        isLoading ? 
        ( <Spinner /> ) 
          :
        (Object.keys(categories).map((title) => {
          const products = categories[title];
          return (<CategoryPreview key={title} title={title} products={products} />)
      }))}
    </Fragment>
  )
};

export default CategoriesPreview;