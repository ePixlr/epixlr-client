import React from "react";
import ColorPicker from "../../../../components/ColorPicker";
import { validateTemplate } from "../../../../utils/validation/validate";
import {
  advancedTemplateCharges,
  submitOrder,
} from "../../../../store/actions/orders.action";
import { changeTemplateBackground } from "../../../../store/actions/templates.action";
import { connect } from "react-redux";

let count = 0;

function TemplateSetting({ activeStep, handleBack, ...props }) {
  const [formData, setFormData] = React.useState({
    name: "",
    generalOptions: {
      instructions: "",
      fileType: "",
      fileSize: {
        shape: "",
        size: "Square 1:1",
        width: "1200px",
        height: "1200px",
      },
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
    shape: null,
    backgroundColor: null,
    status: false,
  });
  const [advanceOptionVisible, setAdvanceOptionVisible] = React.useState({
    shadow: false,
    clipping: false,
    mannequin: false,
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
    if (
      name.toLowerCase() === "size" ||
      name.toLowerCase() === "width" ||
      name.toLowerCase() === "height" ||
      name.toLowerCase() === "shape"
    ) {
      setFormData({
        ...formData,
        generalOptions: {
          ...formData.generalOptions,
          fileSize: {
            ...formData.generalOptions.fileSize,
            [name]: value,
          },
        },
      });
      return;
    }
    setFormData({
      ...formData,
      generalOptions: {
        ...formData.generalOptions,
        [name]: value,
      },
    });
  };

  const handleChangeBasicOptions = (color, index) => {
    props.changeTemplateBackground(color);
    setFormData({
      ...formData,
      basicOptions: {
        backgroundColor: { color, index },
      },
    });
  };

  const handleChangeAdvancedOptions = (event) => {
    const { name, value } = event.target;
    if (name === "shadowAndReflections" && value !== "") {
      count = count + 0.5;
    } else if (name === "shadowAndReflections" && value === "" && count > 0) {
      count = count - 0.5;
    }
    if (name === "clippingPath" && value !== "") {
      count = count + 2.0;
    } else if (name === "clippingPath" && value === "" && count > 0) {
      count = count - 2.0;
    }
    if (name === "mannequinAndNeck" && value !== "") {
      count = count + 0.5;
    } else if (name === "mannequinAndNeck" && value === "" && count > 0) {
      count = count - 0.5;
    }
    props.advancedTemplateCharges(count);
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
      generalOptions: {
        fileType,
        fileSize: { shape },
      },
      basicOptions: {
        backgroundColor: { color },
      },
    } = formData;
    const { error, status: valid, path } = validateTemplate({
      name,
      fileType,
      shape,
      backgroundColor: color,
    });
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

  const handleSubmit = async () => {
    const isValidData = handleValidate();
    if (isValidData) {
      let fileSize = formData.generalOptions.fileSize;
      if (fileSize.shape === "original") {
        fileSize = {
          ...fileSize,
          size: "",
          width: "",
          height: "",
        };
      }

      await props.submitOrder({
        data: {
          ...formData,
          generalOptions: {
            ...formData.generalOptions,
            fileSize,
          },
          basicOptions: {
            backgroundColor: formData.basicOptions.backgroundColor.color,
          },
          order: props.orderId,
        },
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      document.body.scrollTop = 0;
    }
  };
  const handleAdvanceOptionVisibility = (event) => {
    const { name, checked } = event.target;
    setAdvanceOptionVisible({
      ...advanceOptionVisible,
      [name]: checked,
    });
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col">
          {formErrors.status && (
            <div class="alert alert-danger text-light" role="alert">
              {formErrors.name && <h5>Template name is required</h5>}
              {formErrors.fileType && <h5>File Type is required</h5>}
              {formErrors.shape && <h5>File Size is required</h5>}
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
                      <option value="PNG">PNG</option>
                      <option value="PNG">GIF</option>
                      <option value="PNG">TIFF</option>
                      <option value="PNG">PSD</option>
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
                      class={`form-control ${formErrors.shape && "is-invalid"}`}
                      name="shape"
                      onChange={handleChangeGeneralOptions}
                    >
                      <option value="">Select Size</option>
                      <option value="original">Original</option>
                      <option value="crop">Crop</option>
                    </select>
                    {formErrors.shape && (
                      <div class="invalid-feedback">File size is required.</div>
                    )}
                  </div>
                </div>
              </div>

              {formData.generalOptions.fileSize.shape === "crop" && (
                <div className="row">
                  <div className="col-md-3 col-xs-12">{""}</div>
                  <div className="col-md-9 col-xs-12 d-block d-sm-flex flex-row justify-content-between">
                    <div class="form-group w-25">
                      <span>Size</span>
                      <select
                        class="form-control mt-2"
                        name="size"
                        onChange={handleChangeGeneralOptions}
                      >
                        <option value="Square 1:1">Square 1:1</option>
                        <option value="Landscape 4:3">Landscape 4:3</option>
                        <option value="Landscape 3:2">Landscape 3:2</option>
                        <option value="Landscape 5:3">Landscape 5:3</option>
                        <option value="Landscape 16:9">Landscape 16:9</option>
                        <option value="Portrait 3:4">Portrait 3:4</option>
                        <option value="Portrait 2:3">Portrait 2:3</option>
                        <option value="Portrait 3:5">Portrait 3:5</option>
                        <option value="Portrait 9:16">Portrait 9:16</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    {formData.generalOptions.fileSize.size === "other" && (
                      <>
                        <div class="form-group w-25">
                          <span>Custom Width</span>
                          <select
                            class="form-control mt-2"
                            name="width"
                            onChange={handleChangeGeneralOptions}
                          >
                            <option value="1200px">1200px</option>
                            <option value="1300px">1300px</option>
                          </select>
                        </div>
                        <div class="form-group w-25">
                          <span>Custom Height</span>
                          <select
                            class="form-control mt-2"
                            name="height"
                            onChange={handleChangeGeneralOptions}
                          >
                            <option value="1200px">1200px</option>
                            <option value="1300px">1300px</option>
                          </select>
                        </div>
                      </>
                    )}
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
                        id="original"
                        name="backgroundColor"
                        checked={
                          formData.basicOptions.backgroundColor.index === 1
                        }
                        onChange={() => handleChangeBasicOptions("original", 1)}
                      />
                      <label class="form-check-label" for="original">
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
                        id="white"
                        name="backgroundColor"
                        checked={
                          formData.basicOptions.backgroundColor.index === 2
                        }
                        onChange={() => handleChangeBasicOptions("white", 2)}
                      />
                      <label class="form-check-label" for="white">
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
                        id="transparent"
                        name="backgroundColor"
                        checked={
                          formData.basicOptions.backgroundColor.index === 3
                        }
                        onChange={() =>
                          handleChangeBasicOptions("transparent", 3)
                        }
                      />
                      <label class="form-check-label" for="transparent">
                        Transparent
                      </label>
                    </div>
                  </div>
                  <div class="form-group ml-5">
                    <div class="form-check">
                      <input
                        class={`form-check-input ${formErrors.backgroundColor &&
                          "is-invalid"}`}
                        type="checkbox"
                        id="other"
                        name="backgroundColor"
                        checked={
                          formData.basicOptions.backgroundColor.index === 4
                        }
                        onChange={() =>
                          handleChangeBasicOptions("transparent", 4)
                        }
                      />
                      <label class="form-check-label" for="other">
                        Other
                      </label>
                    </div>
                  </div>
                  {formData.basicOptions.backgroundColor.index === 4 && (
                    <div class="form-group ml-5" style={{ marginTop: -5 }}>
                      <ColorPicker
                        handleChange={(color, index) =>
                          handleChangeBasicOptions(color, 4)
                        }
                      />
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
                  <div class="form-check form-group">
                    <input
                      class={`form-check-input ${formErrors.backgroundColor &&
                        "is-invalid"}`}
                      type="checkbox"
                      id="shadow"
                      name="shadow"
                      checked={advanceOptionVisible.shadow}
                      onChange={handleAdvanceOptionVisibility}
                    />
                    <label class="form-check-label" for="shadow">
                      <h6>Shadow and Reflections</h6>
                    </label>
                    <br />
                    Shadow & Reflections (+$0.5)
                  </div>
                </div>
                {advanceOptionVisible.shadow && (
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
                        <option value="">Original Shadow</option>
                        <option value="Drop Shadow">Drop Shadow</option>
                        <option value="Reflection Shadow">
                          Reflection Shadow
                        </option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              <div className="row mt-3">
                <div className="col-md-3 col-xs-12">
                  <div class="form-group form-check">
                    <input
                      class={`form-check-input ${formErrors.backgroundColor &&
                        "is-invalid"}`}
                      type="checkbox"
                      id="clipping"
                      name="clipping"
                      checked={advanceOptionVisible.clipping}
                      onChange={handleAdvanceOptionVisibility}
                    />
                    <label class="form-check-label" for="clipping">
                      <h6>Clipping Path</h6>
                    </label>
                    <br />
                    Simple clip & Multi clip (+$2.00)
                  </div>
                </div>
                {advanceOptionVisible.clipping && (
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
                        <option value="">Hand Made Clipping Path</option>
                        <option value="Multi Clipping">Multi Clipping</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              <div className="row mt-3">
                <div className="col-md-3 col-xs-12">
                  <div class="form-group form-check">
                    <input
                      class={`form-check-input ${formErrors.backgroundColor &&
                        "is-invalid"}`}
                      type="checkbox"
                      id="mannequin"
                      name="mannequin"
                      checked={advanceOptionVisible.mannequin}
                      onChange={handleAdvanceOptionVisibility}
                    />
                    <label class="form-check-label" for="mannequin">
                      <h6>Remove Mannequin or Neck Joint</h6>
                    </label>
                    <br />
                    Mannequin remove or Nect Joint ($0.5)
                  </div>
                </div>
                {advanceOptionVisible.mannequin && (
                  <div className="col-md-9 col-xs-12">
                    <div class="form-group">
                      <span>Remove Mannequin, Neck Joint or 3D Nect joint</span>
                      <select
                        class="form-control mt-2"
                        name="mannequinAndNeck"
                        onChange={handleChangeAdvancedOptions}
                      >
                        <option value="">3D Neck Joint</option>
                        <option value="Remove Mannequin">
                          Remove Mannequin
                        </option>
                      </select>
                    </div>
                  </div>
                )}
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
              </div>
            </div>
          </div>
        </div>
      </div>
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
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit Order
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    advancedTemplateCharges: (charges) =>
      dispatch(advancedTemplateCharges(charges)),
    submitOrder: (data) => dispatch(submitOrder(data)),
    changeTemplateBackground: (color) =>
      dispatch(changeTemplateBackground(color)),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.orders.loading,
    error: state.orders.error,
    orderId: state.orders.orderId,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TemplateSetting);
