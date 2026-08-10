import React, { useContext, useEffect, useState } from "react";
import UploadBox from "../../Components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoMdClose } from "react-icons/io";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { deleteData, editData, fetchDataFromApi, postData } from "../../utils/api";
import { MyContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";

const EditCategory = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [formFields, setFormFields] = useState({
    name: "",
    images: [],
  });

  const [preview, setPreview] = useState([]);

  const context = useContext(MyContext);

  useEffect(() => {
    const id = context?.isOpenFullScreenPanel?.id;

    fetchDataFromApi(`/api/category/${id}`).then((res) => {
        formFields.name = res?.category?.name;
        setPreview(res?.category?.images);
    })

  },[])

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
    formFields.images = preview;
  };

  const setPreviewFun = (previewArr) => {
    setPreview(previewArr);
    formFields.images = previewArr;
  };

  const removeImg = (image, index) => {
    var imageArr = [];
    imageArr = preview;
    deleteData(`/api/category/deleteImage?img=${image}`).then((res) => {
      imageArr.splice(index, 1);

      setPreview([]);
      setTimeout(() => {
        setPreview(imageArr);
        formFields.images = previewArr;
      }, 100);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (formFields.name === "") {
      context.openAlertBox("error", "Please enter category name");
      setIsLoading(false);
      return false;
    }
    if (preview?.length === 0) {
      context.openAlertBox("error", "Please select category image");
      setIsLoading(false);
      return false;
    }

    editData(`/api/category/${context?.isOpenFullScreenPanel?.id}`, formFields).then((res) => {
      console.log(res);
      setTimeout(() => {
        setIsLoading(false);
        context.setIsOpenFullScreenPanel({
          open: false,
        });
      }, 1000);
    });
  };

  return (
    <section className="p-5 bg-gray-50">
      <form className="form py-3 p-8" onSubmit={handleSubmit}>
        <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4">
          <div className="grid grid-cols-1 mb-3">
            <div className="col w-[25%]">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Category Name
              </h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm
              focus:outline-none focus:border-[rgba(0,0,0,0.5)] p-3 text-sm"
                name="name"
                value={formFields.name}
                onChange={onChangeInput}
              />
            </div>
          </div>

          <br />

          <h3 className="text-[18px] font-[500] mb-1 text-black">
            Category Image
          </h3>

          <br />

          <div className="grid grid-cols-7 gap-4">
            {preview.length !== 0 &&
              preview?.map((image, index) => {
                return (
                  <div className="uploadBoxWrapper relative" key={index}>
                    <span
                      className="absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px]
                      -right-[5px] flex items-center justify-center z-50 cursor-pointer"
                      onClick={() => removeImg(image, index)}
                    >
                      <IoMdClose className="text-white text-[15px]" />
                    </span>
                    <div
                      className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px]
                      w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-300 flex items-center justify-center flex-col relative"
                    >
                      <img src={image} className="w-100" />
                    </div>
                  </div>
                );
              })}

            <UploadBox
              multiple={true}
              url="/api/category/uploadImages"
              setPreviewFun={setPreviewFun}
            />
          </div>
        </div>

        <br />
        <br />
        <div className="w-[250px]">
          <Button type="submit" className="btn-blue btn-lg w-full flex gap-2">
            {isLoading === true ? (
              <CircularProgress color="inherit" />
            ) : (
              <>
                <FaCloudUploadAlt className="text-[25px]" />
                Publish and View
              </>
            )}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default EditCategory;
