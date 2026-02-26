import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { signOutStart } from "../../store/user/user.action";

import CrwnLogo from '../../assets/crown.svg';

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { userSelector } from "../../store/user/user.selector";

import { selectIsCartOpen } from "../../store/cart/cart.selector";


import { NavigationContainer, NavLinks, NavLink, LogoContainer, NavLinkSpan } from "./navigation.styles";

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(userSelector);
  const isCartOpen = useSelector(selectIsCartOpen);
  
  const signOutUser = () => dispatch(signOutStart());
  return (
    <>
      <NavigationContainer>
        <LogoContainer to='/' >
          <img src={CrwnLogo} className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>
            SHOP
          </NavLink>
          {currentUser ? (
            <NavLinkSpan onClick={signOutUser}>SIGN OUT</NavLinkSpan>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {
          isCartOpen && <CartDropdown />
        }
      </NavigationContainer>
      <Outlet />
    </>
  )
}

export default Navigation;