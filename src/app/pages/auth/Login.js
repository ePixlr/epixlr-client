import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { TextField } from "@material-ui/core";
import clsx from "clsx";
import { auth, authFail } from "../../store/actions/auth.action";

function Login(props) {
  const [values, setValues] = React.useState({ email: "", password: "" });

  React.useEffect(() => {
    props.removeError(null);
  }, []);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleOnSubmit = async () => {
    await props.auth(values, "SIGNIN");
  };

  return (
    <>
      <div className="kt-login__body">
        <div className="kt-login__form">
          <div className="kt-login__title">
            <h3>
              <FormattedMessage id="AUTH.LOGIN.TITLE" />
            </h3>
          </div>

          <React.Fragment>
            {props.error && (
              <div role="alert" className="alert alert-danger">
                <div className="alert-text">{props.error}</div>
              </div>
            )}

            <div className="form-group">
              <TextField
                type="email"
                label="Email"
                margin="normal"
                className="kt-width-full"
                name="email"
                // onBlur={handleBlur}
                onChange={handleOnChange}
                value={values.email}
                // helperText={touched.email && errors.email}
                // error={Boolean(touched.email && errors.email)}
              />
            </div>

            <div className="form-group">
              <TextField
                type="password"
                margin="normal"
                label="Password"
                className="kt-width-full"
                name="password"
                // onBlur={handleBlur}
                onChange={handleOnChange}
                value={values.password}
                // helperText={touched.password && errors.password}
                // error={Boolean(touched.password && errors.password)}
              />
            </div>
            <div className="kt-link-wrapper">
              <Link
                to="/auth/forgot-password"
                className="kt-link kt-login__link-forgot"
              >
                <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
              </Link>
            </div>
            <div className="kt-login__actions">
              <button
                id="kt_login_signin_submit"
                type="submit"
                onClick={handleOnSubmit}
                className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx(
                  {
                    "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light":
                      props.loading,
                  }
                )}`}
                style={
                  props.loading
                    ? { paddingRight: "3.5rem" }
                    : { paddingRight: "2.5rem" }
                }
              >
                Sign In
              </button>
            </div>
            <div className="kt-login__head">
              <span className="kt-login__signup-label">
                Don't have an account yet?
              </span>
              &nbsp;&nbsp;
              <Link
                to="/auth/registration"
                className="kt-link kt-login__signup-link"
              >
                Sign Up!
              </Link>
            </div>
          </React.Fragment>
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (data, action) => dispatch(auth(data, action)),
    removeError: (error) => dispatch(authFail(error)),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);

// export default injectIntl(connect(null, auth.actions)(Login));
