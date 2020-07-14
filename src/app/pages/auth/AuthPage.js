import React from "react";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import { toAbsoluteUrl } from "../../../_metronic";
import "../../../_metronic/_assets/sass/pages/login/login-1.scss";
import Login from "./Login";
import Registration from "./Registration";
import ForgotPassword from "./ForgotPassword";

export default function AuthPage() {
  return (
    <>
      <div className="kt-grid kt-grid--ver kt-grid--root">
        <div
          id="kt_login"
          className="kt-grid kt-grid--hor kt-grid--root kt-login kt-login--v1"
        >
          <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--desktop kt-grid--ver-desktop kt-grid--hor-tablet-and-mobile">
            <div className="kt-grid__item kt-grid__item--fluid  kt-grid__item--order-tablet-and-mobile-1  kt-login__wrapper">
              <div className="kt-grid__item kt-logo__wrapper">
                <Link to="/" className="kt-login__logo">
                  <img
                    alt="Logo"
                    src={toAbsoluteUrl("/media/logos/ePixlr logo.png")}
                  />
                </Link>
              </div>
              <Switch>
                <Route path="/auth/login/:token?" component={Login} />
                <Route path="/auth/registration" component={Registration} />
                <Route
                  path="/auth/forgot-password"
                  component={ForgotPassword}
                />
                <Redirect from="/auth" exact={true} to="/auth/login" />
                <Redirect to="/auth/login" />
              </Switch>
            </div>

            <div
              className="kt-grid__item kt-grid__item--order-tablet-and-mobile-2 kt-grid kt-grid--hor kt-login__aside"
              style={{}}
            >
              <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver">
                <div className="kt-grid__item kt-grid__item--middle">
                  <div>
                    <h2 className="kt-login__title">Thanks for Joining</h2>
                    <h4 className="kt-login__subtitle">
                      Laborum et minim enim enim amet adipisicing veniam laborum
                      proident.
                    </h4>
                  </div>
                  <img
                    alt="Logo"
                    width="300"
                    src={toAbsoluteUrl(
                      "/media/images/auth-hood-shadow-banner.png"
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
