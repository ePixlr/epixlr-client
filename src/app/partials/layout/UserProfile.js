/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { connect } from "react-redux";
import { toAbsoluteUrl } from "../../../_metronic";
import { authLogout } from "../../store/actions/auth.action";
import HeaderDropdownToggle from "../content/CustomDropdowns/HeaderDropdownToggle";

class UserProfile extends React.Component {
  render() {
    const { authLogout, user } = this.props;

    const handleLogout = async () => {
      await authLogout();
    };

    return (
      <Dropdown
        className="kt-header__topbar-item kt-header__topbar-item--user"
        drop="down"
        alignRight
      >
        <Dropdown.Toggle
          as={HeaderDropdownToggle}
          id="dropdown-toggle-user-profile"
        >
          <div className="kt-header__topbar-user">
            <span className="kt-header__topbar-username kt-hidden-mobile">
              {user}
            </span>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl">
          <div className="kt-notification">
            <a className="kt-notification__item">
              <div className="kt-notification__item-icon">
                <i className="flaticon2-calendar-3 kt-font-success" />
              </div>
              <Link to="/profile/me" className="kt-notification__item-details">
                <div className="kt-notification__item-title kt-font-bold">
                  My Profile
                </div>
                <div className="kt-notification__item-time">
                  Account settings and more
                </div>
              </Link>
            </a>
            <div className="kt-notification__custom">
              <button
                onClick={handleLogout}
                className="btn btn-label-brand btn-sm btn-bold"
              >
                Sign Out
              </button>
            </div>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authLogout: () => dispatch(authLogout()),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user.userName,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
