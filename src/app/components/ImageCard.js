import React from "react";
import { Portlet, PortletBody } from "../partials/content/Portlet";

function ImageCard({
  img: { url, index },
  handleRemoveImage,
  loading,
  ...props
}) {
  return (
    <React.Fragment>
      <Portlet
        style={{
          backgroundColor: "transparent",
          border: "1px solid silver",
          width: "180px",
        }}
      >
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
            onClick={() => handleRemoveImage(url, index)}
          >
            <i className="la la-times-circle" style={{ fontSize: 22 }} />
          </button>
        </div>
        <PortletBody>
          <div
            className="d-flex justify-content-center w-100 h-100"
            onClick={props.onClick}
          >
            {loading ? (
              <div class="spinner-grow" role="status" />
            ) : (
              <img height={100} alt="image" src={url} />
            )}
          </div>
        </PortletBody>
      </Portlet>
    </React.Fragment>
  );
}

export default ImageCard;
