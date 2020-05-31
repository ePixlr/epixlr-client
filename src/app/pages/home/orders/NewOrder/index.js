import React from "react";
import UploadImages from "./UploadImages";
import SelectTemplate from "./SelectTemplate";
import TemplateSetting from "./TemplateSetting";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";

const steps = ["Upload Images", "Select Template", "Template Setting"];

function getStepContent(step, setStepNext) {
  switch (step) {
    case 0:
      return <UploadImages setStepNext={setStepNext} />;
    case 1:
      return <SelectTemplate />;
    case 2:
      return <TemplateSetting />;
    default:
      return null;
  }
}

function Index() {
  const [activeStep, setActiveStep] = React.useState(2);
  const [stepNext, setStepNext] = React.useState(false);

  const handleNext = () => {
    if (stepNext == false) {
      ToastsStore.error("Please choose an image first");
      return;
    }
    activeStep < 2 && setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    activeStep >= 0 && setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.TOP_CENTER}
      />
      {/* <div className="w-100 kt-progress-wrapper" />*/}
      <div className="row">
        <div className="col-xs-12 pb-5 pl-3">
          <h6>
            Step {activeStep + 1} / 3 {steps[activeStep]}
          </h6>
        </div>
      </div>
      <div>
        {getStepContent(activeStep, setStepNext)}
        <div className="row px-5">
          <div className="col d-flex justify-content-end">
            {activeStep > 0 && (
              <button
                onClick={handleBack}
                className="btn btn-secondary"
                style={{ backgroundColor: "#fff" }}
              >
                Back
              </button>
            )}
            <span className="spacer p-2" />
            <button onClick={handleNext} className="btn btn-primary">
              {activeStep === 0 && "Next: Select Template"}
              {activeStep === 1 && "Next: Template Setting"}
              {activeStep === 2 && "Submit Order"}
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Index;
