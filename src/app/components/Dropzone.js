import React from "react";
import { toAbsoluteUrl } from "../../_metronic";
import { withRouter } from "react-router-dom";
import GooglePicker from "react-google-picker";
import DropboxChooser from "react-dropbox-chooser";

const APP_KEY = "a7iqenj68jz4hxp";
const CLIENT_ID =
  "382221312918-id0ah08ens38ruqnhkstjf7pf8l5iud6.apps.googleusercontent.com";
const DEVELOPER_KEY = "AIzaSyAzdCCAKVv_nMf2vwoahG7Qk2gOm7YiMxs";
const SCOPE = ["https://www.googleapis.com/auth/drive.file"];

function Dropzone({ handleImgBuffer, loading }) {
  const generateImageUrl = (url, source) => {
    if (source === "g-drive") {
      if (url.action === "picked") {
        const id = url.docs[0].id;
        url = `https://drive.google.com/uc?export=view&id=${id}`;
        handleImgBuffer(url);
      }
      return;
    } else if (source === "d-box") {
      url = url.replace(
        "https://www.dropbox.com",
        "https://dl.dropboxusercontent.com"
      );
      handleImgBuffer(url);
      return;
    } else if (source === "device") {
      // handleImgBuffer(URL.createObjectURL(url.target.files[0]));
      handleImgBuffer(url.target.files);
      return;
    }
  };

  return (
    <div className="row">
      <div className="kt-portlet p-5">
        <h5 className="text-center">
          Drop File here, Pade, Browse or Import from
        </h5>
        <div className="kt-dropzone__assets mt-5 mb-3">
          <div className="d-flex flex-column align-items-center p-4 btn">
            <div class="image-upload">
              <label for="file-input">
                <img
                  alt="google-drive"
                  src={toAbsoluteUrl("/media/icons/device-upload.svg")}
                />
              </label>
              <input
                id="file-input"
                type="file"
                multiple
                onChange={(event) => generateImageUrl(event, "device")}
              />
            </div>
            <span className="text-center">My Device</span>
          </div>

          <div className="d-flex flex-column align-items-center p-4 btn">
            <GooglePicker
              clientId={CLIENT_ID}
              developerKey={DEVELOPER_KEY}
              scope={SCOPE}
              onChange={(data) => generateImageUrl(data, "g-drive")}
              onAuthFailed={(data) => console.log("on auth failed:", data)}
              multiselect={true}
              navHidden={true}
              authImmediate={false}
              mimeTypes={["image/png", "image/jpeg", "image/jpg"]}
              viewId={"DOCS"}
            >
              <img
                alt="google-drive"
                src={toAbsoluteUrl("/media/icons/google-drive.svg")}
              />
            </GooglePicker>
            <span className="mt-2 text-center">Google Drive</span>
          </div>

          <div className="d-flex flex-column align-items-center p-4 btn">
            <DropboxChooser
              appKey={APP_KEY}
              success={(files) =>
                generateImageUrl(files && files[0].link, "d-box")
              }
              cancel={() => console.log("closed")}
              multiselect={false}
              extensions={[".jpeg", ".jpg", ".png"]}
            >
              <img
                alt="google-drive"
                src={toAbsoluteUrl("/media/icons/dropbox.svg")}
              />
            </DropboxChooser>
            <span className="mt-2 text-center">Dropbox</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Dropzone);
