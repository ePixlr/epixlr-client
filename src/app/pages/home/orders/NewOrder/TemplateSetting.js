import React from "react";
import ColorPicker from "../../../../components/ColorPicker";
import { validateTemplate } from "../../../../utils/validation/validate";
import { connect } from "react-redux";

function TemplateSetting(props) {
  const [formData, setFormData] = React.useState({
    name: "",
    generalOptions: {
      instructions: "",
      fileType: "",
      fileSize: "",
    },
    basicOptions: {
      backgroundColor: { color: "", index: 0 },
    },
    advancedOptions: {
      shadowAndReflections: "",
      clippingPath: "",
      mannequinAndNeck: "",
    },
  });
  const [formErrors, setFormError] = React.useState({
    name: null,
    fileType: null,
    fileSize: null,
    backgroundColor: null,
    status: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeGeneralOptions = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      generalOptions: {
        ...formData.generalOptions,
        [name]: value,
      },
    });
  };

  const handleChangeBasicOptions = (color, index) => {
    setFormData({
      ...formData,
      basicOptions: {
        backgroundColor: { color, index },
      },
    });
  };

  const handleChangeAdvancedOptions = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      advancedOptions: {
        ...formData.advancedOptions,
        [name]: value,
      },
    });
  };

  const handleValidate = () => {
    const {
      name,
      generalOptions: { fileType, fileSize },
      basicOptions: {
        backgroundColor: { color },
      },
    } = formData;
    const { error, status: valid, path } = validateTemplate({
      name,
      fileType,
      fileSize,
      backgroundColor: color,
    });
    console.log(error);
    if (!valid) {
      setFormError({ [path]: error, status: true });
      return false;
    }
    setFormError({
      name: null,
      fileType: null,
      fileSize: null,
      backgroundColor: null,
      status: false,
    });
    return true;
  };

  const handleSubmit = () => {
    //=i-0kp,
    const isValidData = handleValidate();
    if (isValidData) {
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      document.body.scrollTop = 0;
    }
  };

  // React.useEffect(() => {
  //     window.scrollTo(0, 0);
  //     document.body.scrollTop = 0;
  // });

  return (
    <React.Fragment>
      <div className="row">
        <div className="col">
          {props.loading.toString()}
          {formErrors.status && (
            <div class="alert alert-danger text-light" role="alert">
              {formErrors.name && <h5>Template name is required</h5>}
              {formErrors.fileType && <h5>File Type is required</h5>}
              {formErrors.fileSize && <h5>File Size is required</h5>}
              {formErrors.backgroundColor && (
                <h5>Background Color is required</h5>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="kt-portlet">
            <div className="kt-portlet__head">
              <div className="kt-portlet__head-label">
                <h5 className="kt-portlet__head-title">Template Name</h5>
              </div>
            </div>
            <div className="kt-portlet__body">
              <div className="row">
                <div className="col-md-3 col-xs-12 d-flex align-items-center">
                  <h6>Template Name</h6>
                </div>
                <div className="col-md-5 col-xs-12">
                  <input
                    type="text"
                    class={`form-control ${formErrors.name && "is-invalid"}`}
                    name="name"
                    onChange={handleChange}
                  />
                  {formErrors.name && (
                    <div class="invalid-feedback">
                      Template name is required.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="spacer pt-1" />
      <div className="row">
        <div className="col">
          <div className="kt-portlet">
            <div className="kt-portlet__head">
              <div className="kt-portlet__head-label">
                <h5 className="kt-portlet__head-title">General Options</h5>
              </div>
            </div>
            <div className="kt-portlet__body">
              <div className="kt-section">
                <span className="kt-section__info">
                  Add more instructions and save your template
                </span>
              </div>
              <div className="row">
                <div className="col-md-3 col-xs-12">
                  <h6>Instructions</h6>
                </div>
                <div className="col-md-9 col-xs-12">
                  <div class="form-group">
                    <span>Is there anything else we should know?</span>
                    <textarea
                      class="form-control mt-2"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      name="instructions"
                      onChange={handleChangeGeneralOptions}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-3 col-xs-12">
                  <h6>File Type</h6>
                </div>
                <div className="col-md-9 col-xs-12">
                  <div class="form-group">
                    <select
                      class={`form-control ${formErrors.fileType &&
                        "is-invalid"}`}
                      name="fileType"
                      onChange={handleChangeGeneralOptions}
                    >
                      <option value="">Select Format</option>
                      <option value="JPG">JPG</option>
                      <option value="JPEG">JPEG</option>
                      <option value="PNG">PNG</option>
                    </select>
                    {formErrors.fileType && (
                      <div class="invalid-feedback">File type is required.</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-3 col-xs-12">
                  <h6>File Size</h6>
                </div>
                <div className="col-md-9 col-xs-12">
                  <div class="form-group">
                    <select
                      class={`form-control ${formErrors.fileSize &&
                        "is-invalid"}`}
                      name="fileSize"
                      onChange={handleChangeGeneralOptions}
                    >
                      <option value="">Select Size</option>
                      <option value="original">Original</option>
                      <option value="crop">Crop</option>
                    </select>
                    {formErrors.fileSize && (
                      <div class="invalid-feedback">File size is required.</div>
                    )}
                  </div>
                </div>
              </div>

              {formData.generalOptions.fileSize === "crop" && (
                <div className="row">
                  <div className="col-md-3 col-xs-12">{""}</div>
                  <div className="col-md-9 col-xs-12 d-block d-sm-flex flex-row justify-content-between">
                    <div class="form-group w-25">
                      <span>Size</span>
                      <select class="form-control mt-2">
                        <option>2:3</option>
                      </select>
                    </div>
                    <div class="form-group w-25">
                      <span>Custom Width</span>
                      <select class="form-control mt-2">
                        <option>1200px</option>
                        <option>1300px</option>
                      </select>
                    </div>
                    <div class="form-group w-25">
                      <span>Custom Height</span>
                      <select class="form-control mt-2">
                        <option>1200px</option>
                        <option>1300px</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="spacer pt-1" />
      <div className="row">
        <div className="col">
          <div className="kt-portlet">
            <div className="kt-portlet__head">
              <div className="kt-portlet__head-label">
                <h5 className="kt-portlet__head-title">Basic Options</h5>
              </div>
            </div>
            <div className="kt-portlet__body">
              <div className="kt-section">
                <span className="kt-section__info">
                  Basic options are included within the price
                </span>
              </div>
              <div className="row">
                <div className="col-md-3 col-xs-12">
                  <h6>Background Color</h6>
                </div>
                <div className="col-md-9 col-xs-12 d-flex">
                  <div class="form-group">
                    <div class="form-check">
                      <input
                        class={`form-check-input ${formErrors.backgroundColor &&
                          "is-invalid"}`}
                        type="checkbox"
                        id="gridCheck"
                        name="backgroundColor"
                        checked={
                          formData.basicOptions.backgroundColor.index === 1
                        }
                        onChange={() => handleChangeBasicOptions("original", 1)}
                      />
                      <label class="form-check-label" for="gridCheck">
                        Original
                      </label>
                      {formErrors.backgroundColor && (
                        <div class="invalid-feedback">
                          Background color is required.
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="form-group ml-5">
                    <div class="form-check">
                      <input
                        class={`form-check-input ${formErrors.backgroundColor &&
                          "is-invalid"}`}
                        type="checkbox"
                        id="gridCheck"
                        name="backgroundColor"
                        checked={
                          formData.basicOptions.backgroundColor.index === 2
                        }
                        onChange={() => handleChangeBasicOptions("white", 2)}
                      />
                      <label class="form-check-label" for="gridCheck">
                        White
                      </label>
                    </div>
                  </div>
                  <div class="form-group ml-5">
                    <div class="form-check">
                      <input
                        class={`form-check-input ${formErrors.backgroundColor &&
                          "is-invalid"}`}
                        type="checkbox"
                        id="gridCheck"
                        name="backgroundColor"
                        checked={
                          formData.basicOptions.backgroundColor.index === 3
                        }
                        onChange={() =>
                          handleChangeBasicOptions("transparent", 3)
                        }
                      />
                      <label class="form-check-label" for="gridCheck">
                        Transparent
                      </label>
                    </div>
                  </div>
                  <div class="form-group ml-5" style={{ marginTop: -5 }}>
                    <ColorPicker />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="spacer pt-1" />

      <div className="row">
        <div className="col">
          <div className="kt-portlet">
            <div className="kt-portlet__head">
              <div className="kt-portlet__head-label">
                <h5 className="kt-portlet__head-title">Advanced Options</h5>
              </div>
            </div>
            <div className="kt-portlet__body">
              <div className="kt-section">
                <span className="kt-section__info">
                  Please note, advanced editing will cost a little extra. The
                  price of each option is indicated as per photo
                </span>
              </div>
              <div className="row">
                <div className="col-md-3 col-xs-12">
                  <h6>Shadow and Reflections</h6>
                  <br />
                  Shadow & Reflections (+$0.5)
                </div>
                <div className="col-md-9 col-xs-12">
                  <div class="form-group">
                    <span>
                      Add depth to your photo for a more natural and
                      professional look
                    </span>
                    <select
                      class="form-control mt-2"
                      name="shadowAndReflections"
                      onChange={handleChangeAdvancedOptions}
                    >
                      <option value="keep-original-shadow">
                        Keep original shadow
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-3 col-xs-12">
                  <h6>Clipping Path</h6>
                  <br />
                  Simple clip & Multi clip (+$2.00)
                </div>
                <div className="col-md-9 col-xs-12">
                  <div class="form-group">
                    <span>
                      Hand made clipping path and multiple clipping path for
                      your business
                    </span>
                    <select
                      class="form-control mt-2"
                      name="clippingPath"
                      onChange={handleChangeAdvancedOptions}
                    >
                      <option value="hand-made-clippind-path">
                        Hand Made Clipping Path
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-3 col-xs-12">
                  <h6>Remove Mannequin or Neck Joint</h6>
                  <br />
                  Mannequin remove or Nect Joint ($0.5)
                </div>
                <div className="col-md-9 col-xs-12">
                  <div class="form-group">
                    <span>Remove Mannequin, Neck Joint or 3D Nect joint</span>
                    <select
                      class="form-control mt-2"
                      name="mannequinAndNeck"
                      onChange={handleChangeAdvancedOptions}
                    >
                      <option value="next-joint">Neck Joint</option>
                    </select>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <div className="kt-section">
                <span className="kt-section__info">
                  <h6>
                    Please note that all basic retouch are free. If you need
                    Advanced retouching services feel free contact to us
                  </h6>
                </span>
                <button onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    // generateOrderSummary: () => dispatch(generateOrderSummary()),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.orders.loading,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TemplateSetting);
