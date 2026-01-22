import { useDispatch, useSelector } from 'react-redux';

import { setIsCartOpen } from '../../store/cart/cart.action';
import { cartQuantitySelector, selectIsCartOpen } from '../../store/cart/cart.selector';

import { CartIconContainer, ItemCount, ShoppingIcon} from './cart-icon.styles';

const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartQuantity = useSelector(cartQuantitySelector)
  const toggleCart = () => dispatch(setIsCartOpen(!isCartOpen));
  
  return (
    <CartIconContainer onClick={toggleCart}>
      <ShoppingIcon alt='cart-icon'/>
      <ItemCount>{cartQuantity}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon;