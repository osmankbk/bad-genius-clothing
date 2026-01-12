import { useContext } from 'react';

import { CartContext } from '../../contexts/cart-context/cart.context';

import { CartIconContainer, ItemCount, ShoppingIcon} from './cart-icon.styles';

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartQuantity } = useContext(CartContext);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  
  return (
    <CartIconContainer onClick={toggleCart}>
      <ShoppingIcon alt='cart-icon'/>
      <ItemCount>{cartQuantity}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon;