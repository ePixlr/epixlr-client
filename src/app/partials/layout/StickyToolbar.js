/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useLayoutEffect } from "react";
import { toAbsoluteUrl } from "../../../_metronic";
import { Dropdown } from "react-bootstrap";
import HeaderDropdownToggle from "../content/CustomDropdowns/HeaderDropdownToggle";

export default function StickyToolbar() {
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
    <>
      <ul
        className="kt-sticky-toolbar"
        style={{ display: `${toggleVisible ? "block" : "none"}` }}
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
              <h4>5 Images</h4>
              <span className="mt-3">Basic $10.00</span>
              <hr />
              <div className="w-100 d-flex justify-content-center mt-5">
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
    </>
  );
}
