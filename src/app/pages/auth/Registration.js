import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { TextField } from "@material-ui/core";
import clsx from "clsx";
import { auth, authFail } from "../../store/actions/auth.action";

function Registration(props) {
  const [values, setValues] = React.useState({
    userName: "",
    email: "",
    password: "",
  });

  React.useEffect(() => {
    props.removeError(null);
  }, []);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleOnSubmit = async () => {
    await props.auth(values, "SIGNUP");
  };

  return (
    <div className="kt-login__body">
      <div className="kt-login__form">
        <div className="kt-login__title">
          <h3>
            <FormattedMessage id="AUTH.REGISTER.TITLE" />
          </h3>
        </div>

        {props.error && (
          <div role="alert" className="alert alert-danger">
            <div className="alert-text">{props.error}</div>
          </div>
        )}

        <div className="form-group mb-0">
          <TextField
            margin="normal"
            label="UserName"
            className="kt-width-full"
            name="userName"
            onChange={handleOnChange}
            value={values.userName}
          />
        </div>

        <div className="form-group mb-0">
          <TextField
            label="Email"
            margin="normal"
            className="kt-width-full"
            name="email"
            onChange={handleOnChange}
            value={values.email}
          />
        </div>

        <div className="form-group mb-0">
          <TextField
            type="password"
            margin="normal"
            label="Password"
            className="kt-width-full"
            name="password"
            onChange={handleOnChange}
            value={values.password}
          />
        </div>

        <div className="kt-login__actions d-flex justify-content-between">
          <Link to="/auth">
            <button
              type="button"
              className="btn btn-secondary btn-elevate kt-login__btn-secondary"
            >
              Back
            </button>
          </Link>

          <button
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
            Submit
          </button>
        </div>
      </div>
    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Registration);
