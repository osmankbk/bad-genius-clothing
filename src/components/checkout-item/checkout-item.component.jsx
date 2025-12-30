import { useContext } from 'react';
import { CartContext } from '../../contexts/cart-context/cart.context';
import './checkout-item.styles.scss';

const CheckoutItem = ({cartItem}) => {
  const { addItemToCart, removeItemFromCart, clearItemFromCartList } = useContext(CartContext);
  const { name, imageUrl, quantity, price } = cartItem;

  const handleAddQuantity = () => addItemToCart(cartItem);
  const handleRemoveQuantity = () => removeItemFromCart(cartItem)
  const handleClearItemFromCart = () => clearItemFromCartList(cartItem)

  return (
   <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'> {name} </span>
      <div className='quantity'>
        <div className='arrow' onClick={handleRemoveQuantity}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={handleAddQuantity}>
          &#10095;
        </div>
      </div>
      <span className='price'> {price}</span>
      <div className='remove-button' onClick={handleClearItemFromCart}>
        &#10005;
      </div>
    </div>
  )
}

export default CheckoutItem;