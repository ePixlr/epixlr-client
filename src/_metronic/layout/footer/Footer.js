import React from "react";
import { connect } from "react-redux";
import objectPath from "object-path";
import * as builder from "../../ducks/builder";
import { Link } from "react-router-dom";

class Footer extends React.Component {
  render() {
    const today = new Date().getFullYear();
    return (
      <div
        className={`kt-footer ${this.props.footerClasses} kt-grid__item kt-grid kt-grid--desktop kt-grid--ver-desktop`}
        id="kt_footer"
      >
        <div className={`kt-container ${this.props.footerContainerClasses}`}>
          <div className="kt-footer__copyright">
            {today.toString()}&nbsp;&copy;&nbsp;
            <Link
              to="/dashboard"
              rel=""
              className="kt-link"
            >
              ePixlr.
            </Link>
            All Rights Reserved.
          </div>
          <div className="kt-footer__menu">
            <Link
              to="/dashboard"
              rel=""
              className="kt-footer__menu-link kt-link"
            >
              FAQs
            </Link>
            <Link
              to="/dashboard"
              rel=""
              className="kt-footer__menu-link kt-link"
            >
              Support
            </Link>
            <Link
              to="/dashboard"
              rel=""
              className="kt-footer__menu-link kt-link"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  fluid:
    objectPath.get(store.builder.layoutConfig, "footer.self.width") === "fluid",
  footerClasses: builder.selectors.getClasses(store, {
    path: "footer",
    toString: true
  }),
  footerContainerClasses: builder.selectors.getClasses(store, {
    path: "footer_container",
    toString: true
  })
});

export default connect(mapStateToProps)(Footer);
