import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import CheckOutPage from '../../routes/checkout-page/checkout-page.component';

import { CartContext } from '../../contexts/cart-context/cart.context';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => navigate('/checkout')
  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'> 
      {cartItems?.map((item) => 
        (<CartItem key={item.id} cartItem={item}/>))
      }
      </div>
      <Button onClick={goToCheckoutHandler}>GO TO</Button>
    </div>
  )
}

export default CartDropdown;