import React from "react";
import { CircularProgress } from "@material-ui/core";
import { toAbsoluteUrl } from "../../../_metronic";

class SplashScreen extends React.Component {
  render() {
    return (
      <>
        <div className="kt-splash-screen">
          <img src={toAbsoluteUrl("/media/logos/ePixlr-logo.png")}
            alt="Metronic logo" />
          <div class="spinner-grow text-danger" role="status" />
        </div>
      </>
    );
  }
}

export default SplashScreen;
