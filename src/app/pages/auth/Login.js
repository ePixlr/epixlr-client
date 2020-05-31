import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { TextField } from "@material-ui/core";
import clsx from "clsx";
import * as auth from "../../store/ducks/auth.duck";
import { login } from "../../crud/auth.crud";
import { signin } from "../../services/auth";

function Login(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "2.5rem",
  });
  const [serverError, setServerError] = React.useState();

  const enableLoading = () => {
    setLoading(true);
    setLoadingButtonStyle({ paddingRight: "3.5rem" });
  };

  const disableLoading = () => {
    setLoading(false);
    setLoadingButtonStyle({ paddingRight: "2.5rem" });
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

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validate={(values) => {
              const errors = {};

              if (!values.email) {
                // https://github.com/formatjs/react-intl/blob/master/docs/API.md#injection-api
                errors.email = intl.formatMessage({
                  id: "AUTH.VALIDATION.REQUIRED_FIELD",
                });
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = intl.formatMessage({
                  id: "AUTH.VALIDATION.INVALID_FIELD",
                });
              }

              if (!values.password) {
                errors.password = intl.formatMessage({
                  id: "AUTH.VALIDATION.REQUIRED_FIELD",
                });
              }

              return errors;
            }}
            onSubmit={async (values, { setStatus, setSubmitting }) => {
              enableLoading();
              await signin(values)
                .then(({ data: { error, token } }) => {
                  if (error) {
                    setServerError(error);
                  } else {
                    setServerError(null);
                    localStorage.setItem("epxlr-auth", token);
                    props.history.push("/dashboard");
                  }
                })
                .catch((err) => {});
              disableLoading();
            }}
          >
            {({
              values,
              status,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <React.Fragment>
                {serverError && (
                  <div role="alert" className="alert alert-danger">
                    <div className="alert-text">{serverError}</div>
                  </div>
                )}
                <form
                  noValidate={true}
                  autoComplete="off"
                  className="kt-form"
                  onSubmit={handleSubmit}
                >
                  <div className="form-group">
                    <TextField
                      type="email"
                      label="Email"
                      margin="normal"
                      className="kt-width-full"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      helperText={touched.email && errors.email}
                      error={Boolean(touched.email && errors.email)}
                    />
                  </div>

                  <div className="form-group">
                    <TextField
                      type="password"
                      margin="normal"
                      label="Password"
                      className="kt-width-full"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      helperText={touched.password && errors.password}
                      error={Boolean(touched.password && errors.password)}
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
                      disabled={isSubmitting}
                      className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx(
                        {
                          "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loading,
                        }
                      )}`}
                      style={loadingButtonStyle}
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
                </form>
              </React.Fragment>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default injectIntl(connect(null, auth.actions)(Login));
