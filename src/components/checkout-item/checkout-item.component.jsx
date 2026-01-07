import { useContext } from 'react';
import { CartContext } from '../../contexts/cart-context/cart.context';
import { CheckoutItemContainer, ImageContainer, Name, Quantity, Arrow, Value, Price, RemoveButton } from './checkout-item.styles';

const CheckoutItem = ({cartItem}) => {
  const { addItemToCart, removeItemFromCart, clearItemFromCartList } = useContext(CartContext);
  const { name, imageUrl, quantity, price } = cartItem;

  const handleAddQuantity = () => addItemToCart(cartItem);
  const handleRemoveQuantity = () => removeItemFromCart(cartItem)
  const handleClearItemFromCart = () => clearItemFromCartList(cartItem)

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