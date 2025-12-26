import { useContext } from 'react';

import ShoppingIcon from '../../assets/shopping-bag.svg?react';

import { CartContext } from '../../contexts/cart-context/cart.context';

import './cart-icon.styles.scss';

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartQuantity } = useContext(CartContext);


  const toggleCart = () => setIsCartOpen(() => !isCartOpen );
  
  return (
    <div className='cart-icon-container' onClick={toggleCart}>
      <ShoppingIcon className='shopping-icon' alt='cart-icon'/>
      <span className='item-count'>{cartQuantity}</span>
    </div>
  )
}

export default CartIcon;