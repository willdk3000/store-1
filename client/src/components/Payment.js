import React from 'react';
import StripeCheckout from 'react-stripe-checkout'

const Payment = ({ updateCredits, user }) => {
  return (
    <React.Fragment>
      <div className="container">
        <StripeCheckout
          name='Store tester merch'
          description='5$ for 5 credits'
          // amount is in cents
          amount={500}
          token={token => updateCredits(token, user)}
          stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
        >
          <button className="btn btn-primary">Buy 5 credits</button>
        </StripeCheckout>
      </div>
    </React.Fragment>
  )
}

export default Payment;