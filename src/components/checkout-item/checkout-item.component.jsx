import { useDispatch, useSelector } from 'react-redux';

import { CheckoutItemContainer, ImageContainer, Name, Quantity, Arrow, Value, Price, RemoveButton } from './checkout-item.styles';

import { addItemToCart, removeItemFromCart, clearItemFromCartList } from '../../store/cart/cart.action';
import { cartItemSelector } from '../../store/cart/cart.selector';

const CheckoutItem = ({cartItem}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(cartItemSelector);
  const { name, imageUrl, quantity, price } = cartItem;

  const handleAddQuantity = () => dispatch(addItemToCart(cartItems, cartItem));
  const handleRemoveQuantity = () => dispatch(removeItemFromCart(cartItems, cartItem));
  const handleClearItemFromCart = () => dispatch(clearItemFromCartList(cartItems, cartItem));

  return (
   <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <Name> {name} </Name>
      <Quantity>
        <Arrow onClick={handleRemoveQuantity}>
          &#10094;
        </Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={handleAddQuantity}>
          &#10095;
        </Arrow>
      </Quantity>
      <Price> {price}</Price>
      <RemoveButton onClick={handleClearItemFromCart}>
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem;