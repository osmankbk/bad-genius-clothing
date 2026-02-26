import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component'

import { cartItemSelector } from '../../store/cart/cart.selector';

import { CartDropdownContainer, CartItems, EmptyCartMessage } from './cart-dropdown.styles';

const CartDropdown = () => {
  const cartItems = useSelector(cartItemSelector);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => navigate('/checkout')
  return (
    <CartDropdownContainer>
      <CartItems> 
      { cartItems.length ? cartItems?.map((item) => 
        (<CartItem key={item.id} cartItem={item}/>)) : <EmptyCartMessage>You Cart Is Empty</EmptyCartMessage>}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown;