/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useLayoutEffect } from "react";
import { toAbsoluteUrl } from "../../../_metronic";
import { Dropdown } from "react-bootstrap";
import HeaderDropdownToggle from "../content/CustomDropdowns/HeaderDropdownToggle";
import { connect } from "react-redux";

function StickyToolbar(props) {
  const [toggleVisible, setToggleVisible] = React.useState(true);

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setToggleVisible(false);
      } else if (window.scrollY < 50) {
        setToggleVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <React.Fragment>
      {props.orderFormStep > 0 && (
        <ul
          className="kt-sticky-toolbar"
          style={{
            display: `${toggleVisible ? "block" : "none"}`,
            backgroundColor: "transparent",
            boxShadow: "none",
          }}
        >
          <Dropdown className="kt-header__topbar-item" drop="down" alignRight>
            <Dropdown.Toggle
              as={HeaderDropdownToggle}
              id="dropdown-toggle-user-notifications"
            >
              <button className="btn btn-primary">Order Summary</button>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-xl">
              <div className="p-4">
                <h4>
                  {props.imagesCount === 1 && props.imagesCount + " " + "Image"}
                  {(props.imagesCount > 1 || props.imagesCount === 0) &&
                    props.imagesCount + " " + "Images"}
                </h4>
                <div className="d-flex justify-content-between">
                  <span className="mt-3">Basic ${props.imagesCount * 2}</span>
                  <span className="mt-3">
                    Advanced ${props.advancedTemplateCharges}
                  </span>
                </div>
                <div className="text-right mt-2">
                  <span className="mt-3">
                    Total $
                    {props.imagesCount * 2 + props.advancedTemplateCharges}
                  </span>
                </div>
                <hr />
                <div
                  className="w-100 d-flex justify-content-center pt-5"
                  style={{ backgroundColor: props.currentBackground }}
                >
                  <img
                    width={200}
                    alt="Logo"
                    src={toAbsoluteUrl("/media/images/auth-hood-banner.png")}
                  />
                </div>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </ul>
      )}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    imagesCount: state.orders.noOfImages,
    advancedTemplateCharges: state.orders.advancedTemplateCharges,
    orderFormStep: state.orders.orderFormStep,
    currentBackground: state.templates.currentBackground,
  };
};
export default connect(mapStateToProps, null)(StickyToolbar);
