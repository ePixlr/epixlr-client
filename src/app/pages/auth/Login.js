import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { TextField } from "@material-ui/core";
import clsx from "clsx";
import {
  auth,
  authFail,
  sendverificationEmail,
  accountVerification,
} from "../../store/actions/auth.action";

function Login(props) {
  const [values, setValues] = React.useState({ email: "", password: "" });

  React.useEffect(() => {
    console.log(props.match, "propsps");
    props.removeError(null);
  }, []);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleOnSubmit = async () => {
    await props.auth(values, "SIGNIN");
  };

  const resendVerificationLink = async () => {
    await props.sendverificationEmail(props.user);
  };

  const _accountVerification = async () => {
    await props.accountVerification(props.match.params.token);
  };

  if (props.match && props.match.params && props.match.params.token) {
    if (props.account_verified) {
      props.history.push("/auth/verify");
    }
    return (
      <React.Fragment>
        <div className="need-help-alert mt-5 text-dark text-center mt-5">
          <h4>Account Verification</h4>
          <p className="mt-2">To verify your account press verify button</p>
          <button
            id="kt_login_signin_submit"
            type="submit"
            onClick={_accountVerification}
            className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx(
              {
                "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light":
                  props.verification_loading,
              }
            )}`}
            style={
              props.verification_loading
                ? { paddingRight: "3.5rem" }
                : { paddingRight: "1rem" }
            }
          >
            Verify
          </button>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {props.isVerified ? (
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
      ) : (
        <React.Fragment>
          <div className="mt-5 pt-5">
            {props.mailStatus && (
              <div role="alert" className="alert alert-success">
                <div className="alert-text">
                  {`A Verification Email has been send to`}
                  <a href={`mailto:${values.email}`} className="ml-2 text-dark">
                    {values.email}
                  </a>
                </div>
              </div>
            )}
            <div className="kt-login__title text-dark mt-3">
              <h4 className="text-left">Having trouble signing in</h4>
              <h6
                className="text-justify font-weight-light pt-2"
                style={{ lineHeight: "25px" }}
              >
                To continue using Epixlr services, please verify your account
                first by clicking on the link in the verification email send to
                your email.This will confirm your email as your contact address.
              </h6>
            </div>
            <div className="need-help-alert mt-5 text-dark">
              <h5>Need help?</h5>
              <h6 className="mt-3">Didn't receive the email</h6>
              {props.mailLoading ? (
                <div class="spinner-border" role="status" />
              ) : (
                <a className="text-info" onClick={resendVerificationLink}>
                  Resend the verification email
                </a>
              )}
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (data, action) => dispatch(auth(data, action)),
    removeError: (error) => dispatch(authFail(error)),
    sendverificationEmail: (user) => dispatch(sendverificationEmail(user)),
    accountVerification: (token) => dispatch(accountVerification(token)),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isVerified: state.auth.isVerified,
    user: state.auth.user,
    mailStatus: state.auth.mailStatus,
    mailLoading: state.auth.mailLoading,
    account_verified: state.auth.account_verified,
    verification_loading: state.auth.verification_loading,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);

// export default injectIntl(connect(null, auth.actions)(Login));
