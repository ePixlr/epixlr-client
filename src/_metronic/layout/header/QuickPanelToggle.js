/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { ReactComponent as CalenderIcon } from "../assets/layout-svg-icons/calendar.svg";
import KTOffcanvas from "../../_assets/js/offcanvas";

export default class QuickPanelToggler extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line
    // const panel = document.getElementById("kt_quick_panel");

    // const offCanvas = new KTOffcanvas(panel, {
    //   overlay: true,
    //   baseClass: "kt-quick-panel",
    //   closeBy: "kt_quick_panel_close_btn",
    //   toggleBy: "kt_quick_panel_toggler_btn"
    // });
  }

  render() {
    return (
      <>
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="quick-panel-tooltip">View</Tooltip>}
        >
          <div
            className="kt-header__topbar-item kt-header__topbar-item--quick-panel"
            data-toggle="kt-tooltip"
            title="Quick panel"
            data-placement="right"
          >
            <span
              className="kt-header__topbar-icon"
              id="kt_quick_panel_toggler_btn"
            >
              <CalenderIcon style={{ width: 18 }} />
            </span>
          </div>
        </OverlayTrigger>
      </>
    );
  }
}
