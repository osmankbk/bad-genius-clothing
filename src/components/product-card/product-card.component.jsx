import { useDispatch, useSelector } from 'react-redux';

import { addItemToCart } from '../../store/cart/cart.action';
import { cartItemSelector } from '../../store/cart/cart.selector';

import './product-card.styles.scss';

import Button from '../button/button.component';
import { BUTTON_TYPE_CLASSES } from '../../utils/components/button.component';

const ProductCard = ({ product }) => {
  const cartItems = useSelector(cartItemSelector);
  const dispatch = useDispatch();
 
  const { name, price, imageUrl } = product;

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <div className='product-card-container'>
      <img src={imageUrl} alt={`${name}`} />
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to card</Button>
    </div>
  );
};

export default ProductCard;