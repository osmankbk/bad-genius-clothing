import { CartItemContainer, ItemDetails, Name } from "./cart-item.styles";

import type { CartItem } from "@/store/cart/cart.types";

const CartItem = ({ cartItem }: {cartItem: CartItem}) => {
  const { name, imageUrl, price, quantity } = cartItem;

  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`}/>
      <ItemDetails>
        <Name>{name}</Name>
        <span>{quantity} x {price}</span>
      </ItemDetails>
    </CartItemContainer>
  )
}

export default CartItem;