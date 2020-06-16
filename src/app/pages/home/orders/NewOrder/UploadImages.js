import React from "react";
import Dropzone from "../../../../components/Dropzone";
import ImageCard from "../../../../components/ImageCard";
import ImgsViewer from "react-images-viewer";
import {
  createOrder,
  incrementImages,
} from "../../../../store/actions/orders.action";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";
import { connect } from "react-redux";

function UploadImages({ activeStep, handleBack, handleNext, ...props }) {
  const [imgViewer, setImgViewer] = React.useState({ url: "", visible: false });

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });

  const handleImgBuffer = async (url) => {
    const data = new FormData();
    Array.from(url).map((file) => {
      data.append("imagesBuffer", file);
    });
    await props.createOrder(data, url);
    if (!props.error) {
      props.incrementImages(url.length);
      ToastsStore.success("Success: image uploaded");
    } else {
      ToastsStore.error("Oops! image upload failed");
    }
  };

  const handleImgViewer = (url, visible) => {
    setImgViewer({ url, visible });
  };

  const handleRemoveImage = async (url, index) => {
    console.log(index, "index");
    let imageName = "";
    url &&
      (imageName = url.replace(
        "http://192.161.173.28:9000/dinamicostudio/",
        ""
      ));
  };

  return (
    <React.Fragment>
      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.TOP_CENTER}
      />
      <div className="row">
        <div className="col-md-2 col-xs-1" />
        <div className="col-md-8 col-xs-10">
          <Dropzone handleImgBuffer={handleImgBuffer} loading={props.loading} />
        </div>
        <div className="col-md-2 col-xs-1" />
      </div>
      <div className="d-flex my-5">
        <hr style={{ width: props.loading ? "40%" : "50%" }} />
        {props.loading && (
          <div class="spinner-grow text-primary" role="status" />
        )}
        <hr style={{ width: props.loading ? "40%" : "50%" }} />
      </div>
      {props.imagesBuffer.length > 0 && (
        <div className="d-flex flex-wrap justify-content-center">
          {props.imagesBuffer.map((url, index) => (
            <div className="mx-3" key={index}>
              <ImageCard
                img={{ url, index }}
                handleRemoveImage={handleRemoveImage}
                onClick={() => handleImgViewer(url, true)}
              />
            </div>
          ))}
        </div>
      )}
      <ImgsViewer
        isOpen={imgViewer.visible}
        imgs={[{ src: imgViewer.url }]}
        onClose={() => handleImgViewer(null, false)}
        closeBtnTitle="close"
        showImgCount={false}
      />
      <div className="row px-5">
        <div className="col d-flex justify-content-end">
          <span className="spacer p-2" />
          <button className="btn btn-primary" onClick={handleNext}>
            Next: Select Template
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    createOrder: (data, images) => dispatch(createOrder(data, images)),
    incrementImages: (count) => dispatch(incrementImages(count)),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.orders.loading,
    imagesBuffer: state.orders.imagesBuffer,
    error: state.orders.error,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UploadImages);
