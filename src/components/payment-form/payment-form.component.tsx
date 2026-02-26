import { useState, FormHTMLAttributes, SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";

import { CardElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { totalCartCost } from "../../store/cart/cart.selector";
import { userSelector } from "../../store/user/user.selector";

import { clearCart } from "../../store/cart/cart.action";

import { BUTTON_TYPE_CLASSES } from "../../utils/components/button.component";

import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form.styles";

const PaymentForm = () => {
  const [isPorcessingPayment, setIsProcessingPayment] = useState(false);
  const navigate = useNavigate();

  const user = useSelector(userSelector);
  const amount = useSelector(totalCartCost);

  const dispatch = useDispatch();
  
  const stripe = useStripe();
  const elements = useElements();

  const navigateToShopPage = () => navigate('/shop');

  const isValideCardElement = (card: StripeCardElement | null) : card is StripeCardElement => card !== null;

  const paymentHandler = async (e: SubmitEvent<HTMLFormElement>) => {
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

    if (!isValideCardElement(cardElement)) {
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