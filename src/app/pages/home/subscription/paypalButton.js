import React from 'react';
import { PayPalButton } from "react-paypal-button-v2";

class PayPalBtn extends React.Component {
    
    render() {
      const { plan, onSuccess } = this.props;
        return (
            <PayPalButton
              createSubscription={(data, actions) => {
                return actions.subscription.create({
                  plan_id: plan
                });
              }}
              onApprove={(data, actions) => {
                onSuccess(data,actions)
              }}
              options={{
                clientId: "AW7X50EZ_Le71_5EcAj3YNDIuK9PTshIxWqPMWjSZ2f8cU19SCB1z6NCdzZy1GbwxuwQfKYlv-wgKbtU",
                vault: true
              }}
          />
        );
    }
}
export default PayPalBtn;