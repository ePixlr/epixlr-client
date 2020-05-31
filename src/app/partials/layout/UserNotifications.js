/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { Nav, Tab, Dropdown } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import HeaderDropdownToggle from "../content/CustomDropdowns/HeaderDropdownToggle";
import { ReactComponent as NotificationIcon } from "../../../_metronic/layout/assets/layout-svg-icons/notification.svg";

const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false
};

export default class UserNotifications extends React.Component {
  state = { key: "Alerts" };

  getHeaderTopBarCssClassList = () => {
    let result = "kt-header__topbar-icon ";
    if (this.props.pulse) {
      result += "kt-pulse kt-pulse--brand ";
    }

    const { iconType } = this.props;
    if (iconType) {
      result += `kt-header__topbar-icon--${iconType}`;
    }

    return result;
  };

  getSvgCssClassList = () => {
    let result = "kt-svg-icon ";
    const { iconType } = this.props;
    if (iconType) {
      result += `kt-svg-icon--${iconType}`;
    }

    return result;
  };

  getHetBackGroundCssClassList = () => {
    let result = "kt-head ";
    if (this.props.skin) {
      result += `kt-head--skin-${this.props.skin} `;
    }

    result += "kt-head--fit-x kt-head--fit-b";
    return result;
  };

  backGroundStyle = () => {
    if (!this.props.bgImage) {
      return "none";
    }

    return "url(" + this.props.bgImage + ")";
  };

  userNotificationsButtonCssClassList = () => {
    let result = "btn ";
    if (this.props.type) {
      result += `btn-${this.props.type} `;
    }

    result += "btn-sm btn-bold btn-font-md";
    return result;
  };

  ulTabsClassList = () => {
    let result = "nav nav-tabs nav-tabs-line nav-tabs-bold nav-tabs-line-3x  ";
    if (this.props.type) {
      result += `nav-tabs-line-${this.props.type} `;
    }

    result += "kt-notification-item-padding-x";
    return result;
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const { key } = this.state;
    const { useSVG, icon, pulse } = this.props;
    return (
      <Dropdown className="kt-header__topbar-item" drop="down" alignRight>
        <Dropdown.Toggle
          as={HeaderDropdownToggle}
          id="dropdown-toggle-user-notifications"
        >
          <span className={this.getHeaderTopBarCssClassList()}>
            {!useSVG && <i className={icon} />}

            {useSVG && (
              <span className={this.getSvgCssClassList()}>
                <NotificationIcon style={{ width: 20 }} />
              </span>
            )}

            <span className="kt-pulse__ring" hidden={!pulse} />
          </span>
        </Dropdown.Toggle>
      </Dropdown>
    );
  }
}
