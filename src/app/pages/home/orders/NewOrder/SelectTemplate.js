import React from "react";
import { toAbsoluteUrl } from "../../../../../_metronic";
import { getRecentTemplates } from "../../../../store/actions/templates.action";
import { connect } from "react-redux";

function Template({ activeStep, handleBack, handleNext, ...props }) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    async function getRecentTemplates() {
      await props.getRecentTemplates();
    }
    getRecentTemplates();
  }, []);

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-3" />
        <div className="col-md-6">
          <div className="kt-portlet">
            <div className="kt-portlet__head d-flex justify-content-center">
              <div className="kt-portlet__head-label">
                <h5 className="kt-portlet__head-title">
                  Select Custom Template
                </h5>
              </div>
            </div>
            <div className="kt-portlet__body">
              <div className="w-100 d-flex justify-content-center">
                <img
                  width={300}
                  alt="Logo"
                  src={toAbsoluteUrl("/media/images/auth-hood-banner.png")}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3" />
      </div>
      <div className="row pb-4">
        <div className="col d-flex justify-content-center">
          <button onClick={handleNext} className="btn btn-primary">
            Select Template
          </button>
        </div>
      </div>
      <hr className="pb-3" />
      <div className="row">
        <div className="col">
          <div className="kt-portlet">
            <div className="kt-portlet__head">
              <div className="kt-portlet__head-label">
                <h5 className="kt-portlet__head-title">Recent Templates</h5>
              </div>
            </div>
            <div className="kt-portlet__body">
              <div className="row">
                {props.recentTemplates.map(
                  ({
                    name,
                    generalOptions: {
                      fileType,
                      fileSize: { size },
                    },
                    basicOptions: { backgroundColor },
                    advancedOptions: { shadowAndReflections, mannequinAndNeck },
                  }) => (
                    <div className="col-md-4 my-3 px-3">
                      <div className="border rounded pb-2">
                        <h5 className="text-center my-3">
                          Template Name: {name}
                        </h5>
                        <hr />
                        <div className="w-100 d-flex justify-content-center">
                          <img
                            width={200}
                            alt="Logo"
                            src={toAbsoluteUrl(
                              "/media/images/auth-hood-banner.png"
                            )}
                          />
                        </div>
                        <hr />
                        <div
                          className="w-100 text-center"
                          style={{ lineHeight: "1.8rem" }}
                        >
                          <div>
                            <span className="font-weight-bold">Size: </span>
                            {size === "other" ? "custom" : size}
                          </div>
                          <div>
                            <span className="font-weight-bold">Type: </span>
                            {fileType}
                          </div>
                          <div>
                            <span className="font-weight-bold">Shadow: </span>
                            {!shadowAndReflections
                              ? "no"
                              : shadowAndReflections}
                          </div>
                          <div>
                            <span className="font-weight-bold">
                              Mannequin:{" "}
                            </span>
                            {mannequinAndNeck}
                          </div>
                          <div>
                            <span className="font-weight-bold">Color:</span>
                            <span
                              className="font-weight-bold ml-1 px-3 py-1 rounded"
                              style={{ backgroundColor }}
                            >
                              {backgroundColor}
                            </span>
                          </div>
                          <button className="btn btn-sm btn-primary mt-3">
                            Choose Template
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row pb-4">
        <div className="col d-flex justify-content-start">
          {activeStep > 0 && (
            <button
              onClick={handleBack}
              className="btn btn-secondary"
              style={{ backgroundColor: "#fff" }}
            >
              Back
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRecentTemplates: () => dispatch(getRecentTemplates()),
  };
};
const mapStateToProps = (state) => {
  return {
    recentTemplates: state.templates.recentTemplates,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Template);
