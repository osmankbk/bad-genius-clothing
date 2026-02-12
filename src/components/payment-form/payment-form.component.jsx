import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CardElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { totalCartCost, selectIsCartOpen } from "../../store/cart/cart.selector";
import { userSelector } from "../../store/user/user.selector";

import { clearCart, setIsCartOpen } from "../../store/cart/cart.action";

import { BUTTON_TYPE_CLASSES } from "../../utils/components/button.component";

import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form.styles";

const PaymentForm = () => {
  const [isPorcessingPayment, setIsProcessingPayment] = useState(false);
  const navigate = useNavigate();

  const user = useSelector(userSelector);
  const amount = useSelector(totalCartCost);
  const isCartOpen = useSelector(selectIsCartOpen);

  const dispatch = useDispatch();
  
  const stripe = useStripe();
  const elements = useElements();

  const navigateToShopPage = () => navigate('/shop');

  const paymentHandler = async (e) => {
    e.preventDefault();

    if(!stripe || !elements) return;
    
    setIsProcessingPayment(true);

    try {
      const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: amount * 100 })
    }).then(response => response.json());

    const { clientSecret } = response;
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setIsProcessingPayment(false);
      alert("Card input not ready yet. Please try again.");
      return;
    }

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: user?.displayName || 'Guest'
        }
      },
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error);
      return;
    }

    if (paymentResult.paymentIntent.status === 'succeeded') {
      dispatch(clearCart());
      dispatch(setIsCartOpen(!isCartOpen))
      alert('Payment Successful');
    }
    
    navigateToShopPage();

    } catch(error) {
      console.error('paymentHandler', error);
    }
  }
  
  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <PaymentButton isLoading={isPorcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;