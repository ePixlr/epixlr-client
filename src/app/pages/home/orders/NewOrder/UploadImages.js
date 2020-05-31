import React from "react";
import Dropzone from "../../../../components/Dropzone";
import ImageCard from "../../../../components/ImageCard";
import ImgsViewer from "react-images-viewer";
import { uploadImage, deleteImage } from "../../../../services/order";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";

function UploadImages({ setStepNext }) {
  const [imgBuffer, setImgBuffer] = React.useState([]);
  const [imgViewer, setImgViewer] = React.useState({ url: "", visible: false });
  const [loading, setLoading] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });

  React.useEffect(() => {
    if (imgBuffer.length <= 0) {
      setStepNext(false);
      return;
    }
    setStepNext(true);
  }, [imgBuffer]);

  const handleImgBuffer = async (url) => {
    setLoading(true);
    const data = new FormData();
    data.append("imagesBuffer", url);

    await uploadImage(data)
      .then(({ data }) => {
        if (data) {
          if (!data.error) {
            ToastsStore.success("Success: image uploaded");
            if (!data.error) {
              setImgBuffer((oldArray) => [...oldArray, data.url]);
              setOrderId(data.order);
            }
          } else {
            ToastsStore.error("Oops! image upload failed");
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        ToastsStore.error("Oops! Server error image upload failed");
        setLoading(false);
      });
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
    await deleteImage({ imageName, order: orderId })
      .then(({ data }) => {
        if (!data.error) {
          ToastsStore.success(data.message);
          setImgBuffer(imgBuffer.filter((e, i) => i !== index));
          return;
        } else {
          ToastsStore.error("Oops! Image Deleted Failed");
          return;
        }
      })
      .catch((error) => {
        ToastsStore.error("Oops! Server error image deleted failed");
      });
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
          <Dropzone handleImgBuffer={handleImgBuffer} loading={loading} />
        </div>
        <div className="col-md-2 col-xs-1" />
      </div>
      <div className="d-flex my-5">
        <hr style={{ width: loading ? "40%" : "50%" }} />
        {loading && <div class="spinner-grow text-primary" role="status" />}
        <hr style={{ width: loading ? "40%" : "50%" }} />
      </div>
      {imgBuffer.length > 0 && (
        <div className="d-flex flex-wrap justify-content-center">
          {imgBuffer.map((url, index) => (
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
    </React.Fragment>
  );
}

export default UploadImages;
