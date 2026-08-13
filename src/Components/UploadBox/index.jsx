import React, { useContext, useState } from "react";
import { IoImagesOutline } from "react-icons/io5";
import { uploadImageAndCreateCategory } from "../../utils/api";
import { MyContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";

const UploadBox = (props) => {
  const [preview, setPreview] = useState([]);
  const [uploading, setUploading] = useState(false);

  const context = useContext(MyContext);

  let selectedImages = [];

  const onChangeFile = async (e, apiEndPoint) => {
    const formdata = new FormData();
    try {
      setPreview([]);

      const files = e.target.files;
      setUploading(true);
      for (let i = 0; i < files.length; i++) {
        if (
          files[i] &&
          (files[i].type === "image/jpeg" ||
            files[i].type === "image/jpg" ||
            files[i].type === "image/png" ||
            files[i].type === "image/webp")
        ) {
          const file = files[i];
          selectedImages.push(file);
          formdata.append("images", file);
        } else {
          context.openAlertBox(
            "error",
            "Please select a valid JPG, PNG or webp image file.",
          );
          setUploading(false);
          return false;
        }
      }
      uploadImageAndCreateCategory(apiEndPoint, formdata).then((res) => {
        setUploading(false);
        // props.setPreview(res?.data.images);
        props.setPreviewFun(res?.images);
      });
    } catch (error) {
      setUploading(false);
      context.openAlertBox("error", "Upload failed");
    }
  };

  return (
    <div
      className="uploadBox p-3 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px]
     w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-300 flex items-center justify-center flex-col relative"
    >
      {uploading === true ? (
        <>
          <CircularProgress />
          <h4 className="text-center">Uploading...</h4>
        </>
      ) : (
        <>
          <IoImagesOutline className="text-[40px] opacity-35 pointer-events-none" />
          <h4 className="text-[14px] pointer-events-none">Image Upload</h4>

          <input
            type="file"
            accept="image/*"
            multiple={props.multiple !== undefined ? props.multiple : false}
            className="absolute top-0 left-0 w-full h-full z-50 opacity-0"
            onChange={(e) => onChangeFile(e, props?.url)}
            name={props?.name}
          />
        </>
      )}
    </div>
  );
};

export default UploadBox;
