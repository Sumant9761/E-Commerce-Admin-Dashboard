import React, { useContext, useState } from "react";
import UploadBox from "../../Components/UploadBox";
import { IoMdClose } from "react-icons/io";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { deleteData, postData } from "../../utils/api";
import { MyContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import Editor from "react-simple-wysiwyg";

const AddBlog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [html, setHtml] = useState("");

  const [formFields, setFormFields] = useState({
    title: "",
    images: [],
    description: "",
  });

  const [preview, setPreview] = useState([]);

  const context = useContext(MyContext);
  const history = useNavigate();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  const setPreviewFun = (previewArr) => {
    const imgArr = preview;
    for (let i = 0; i < previewArr.length; i++) {
      imgArr.push(previewArr[i]);
    }
    setPreview([]);
    setTimeout(() => {
      setPreview(imgArr);
      formFields.images = imgArr;
    }, 10);
  };

  const removeImg = (image, index) => {
    var imageArr = [];
    imageArr = preview;
    deleteData(`/api/blog/deleteImage?img=${image}`).then((res) => {
      imageArr.splice(index, 1);

      setPreview([]);
      setTimeout(() => {
        setPreview(imageArr);
        formFields.images = previewArr;
      }, 100);
    });
  };

  const onChangeDescription = (e) => {
    setHtml(e.target.value);
    formFields.description = e.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    console.log(formFields);
    

    if (formFields.title === "") {
      context.openAlertBox("error", "Please enter title");
      setIsLoading(false);
      return false;
    }
    if (formFields.description === "") {
      context.openAlertBox("error", "Please enter description");
      setIsLoading(false);
      return false;
    }
    if (preview?.length === 0) {
      context.openAlertBox("error", "Please select image");
      setIsLoading(false);
      return false;
    }

    postData("/api/blog/add", formFields).then((res) => {
      setTimeout(() => {
        setIsLoading(false);
        context.setIsOpenFullScreenPanel({
          open: false,
        });
        context?.getBlogs();
        history("/blog/list");
      }, 1000);
    });
  };

  return (
    <section className="p-5 bg-gray-50">
      <form className="form py-3 p-8" onSubmit={handleSubmit}>
        <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4">
          <div className="grid grid-cols-1 mb-3">
            <div className="col w-[100%]">
              <h3 className="text-[14px] font-[500] mb-1 text-black">Title</h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm
              focus:outline-none focus:border-[rgba(0,0,0,0.5)] p-3 text-sm"
                name="title"
                value={formFields.title}
                onChange={onChangeInput}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 mb-3">
            <div className="col w-[100%]">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Description
              </h3>
              <Editor
                value={html}
                onChange={onChangeDescription}
                containerProps={{ style: { resize: "vertical" } }}
              />
            </div>
          </div>

          <br />

          <h3 className="text-[18px] font-[500] mb-1 text-black">Image</h3>

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
              url="/api/blog/uploadImages"
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

export default AddBlog;
