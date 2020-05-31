import React from 'react'
import OrderStatus from './Status'
import Checkout from './Checkout'

const steps = ['Status', 'Checkout'];

function getStepContent(step, handleNext, handleBack) {
    switch (step) {
        case 0:
            return <OrderStatus handleNext={handleNext} />
        case 1:
            return <Checkout handleBack={handleBack} />
        default:
            return null
    }
}

function Index() {

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        activeStep < 2 && setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        activeStep >= 0 && setActiveStep(activeStep - 1);
    };

    return (
        getStepContent(activeStep, handleNext, handleBack)
    )
}

export default Index
