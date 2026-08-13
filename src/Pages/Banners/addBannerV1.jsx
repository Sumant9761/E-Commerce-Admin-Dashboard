import React, { useState, useContext } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { MyContext } from "../../App";
import UploadBox from "../../Components/UploadBox";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import CircularProgress from "@mui/material/CircularProgress";
import { deleteData, postData } from "../../utils/api";

const AddBannerV1 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productThirdLevelSubCat, setProductThirdLevelSubCat] = useState("");
  const [alignInfo, setAlignInfo] = useState("");

  const [preview, setPreview] = useState([]);

  const [formFields, setFormFields] = useState({
    catId: "",
    bannerTitle: "",
    subCatId: "",
    thirdsubCatId: "",
    price: "",
    alignInfo: "",
  });

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

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    formFields.catId = event.target.value;
    formFields.category = event.target.value;
  };

  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
    formFields.subCatId = event.target.value;
  };

  const handleChangeProductThirdLevelSubCat = (event) => {
    setProductThirdLevelSubCat(event.target.value);
    formFields.thirdsubCatId = event.target.value;
  };

  const handleChangeAlignInfo = (event) => {
    setAlignInfo(event.target.value);
    formFields.alignInfo = event.target.value;
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
    deleteData(`/api/bannerV1/deleteImage?img=${image}`).then((res) => {
      imageArr.splice(index, 1);

      setPreview([]);
      setTimeout(() => {
        setPreview(imageArr);
        formFields.images = imageArr;
      }, 100);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(0);

    setIsLoading(true);

    if (formFields.bannerTitle === "") {
      context.openAlertBox("error", "Please enter bannerTitle");
      setIsLoading(false);
      return;
    }
    if (formFields.price === "") {
      context.openAlertBox("error", "Please enter price");
      setIsLoading(false);
      return;
    }

    if (preview?.length === 0) {
      context.openAlertBox("error", "Please select product images");
      setIsLoading(false);
      return;
    }

    postData("/api/bannerV1/add", formFields).then((res) => {
      if (res?.error === false) {
        context.openAlertBox("success", res?.message);
        setTimeout(() => {
          setIsLoading(false);
          context.setIsOpenFullScreenPanel({
            open: false,
          });
          history("/bannerV1List");
          context?.getCat();
        }, 1000);
      } else {
        setIsLoading(false);
        context.openAlertBox("error", res?.message);
      }
    });
  };

  return (
    <section className="p-5 bg-gray-50">
      <form className="form py-3 p-8" onSubmit={handleSubmit}>
        <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4">
          <div className="grid grid-cols-5 mb-3 gap-5">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Banner Title
              </h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm
              focus:outline-none focus:border-[rgba(0,0,0,0.5)] p-3 text-sm"
                name="bannerTitle"
                value={formFields.bannerTitle}
                onChange={onChangeInput}
              />
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Category
              </h3>
              {context?.catData?.length !== 0 && (
                <Select
                  labelId="demo-simple-select-label"
                  id="productCatDrop"
                  size="small"
                  className="w-full"
                  value={productCat}
                  label="Category"
                  onChange={handleChangeProductCat}
                >
                  {context?.catData?.map((cat, index) => {
                    return (
                      <MenuItem value={cat?._id} key={index}>
                        {cat?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Sub Category
              </h3>
              {context?.catData?.length !== 0 && (
                <Select
                  labelId="demo-simple-select-label"
                  id="productCatDrop"
                  size="small"
                  className="w-full"
                  value={productSubCat}
                  label="Sub Category"
                  onChange={handleChangeProductSubCat}
                >
                  {context?.catData?.map((cat, index) => {
                    return (
                      cat?.children?.length !== 0 &&
                      cat?.children?.map((subCat, index_) => {
                        return (
                          <MenuItem value={subCat?._id} key={index}>
                            {subCat?.name}
                          </MenuItem>
                        );
                      })
                    );
                  })}
                </Select>
              )}
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Third Level Category
              </h3>
              {context?.catData?.length !== 0 && (
                <Select
                  labelId="demo-simple-select-label"
                  id="productCatDrop"
                  size="small"
                  className="w-full"
                  value={productThirdLevelSubCat}
                  label="Sub Category"
                  onChange={handleChangeProductThirdLevelSubCat}
                >
                  {context?.catData?.map((cat) => {
                    return (
                      cat?.children?.length !== 0 &&
                      cat?.children?.map((subCat) => {
                        return (
                          subCat?.children?.length !== 0 &&
                          subCat?.children?.map((thirdLavelCat, index) => {
                            return (
                              <MenuItem value={thirdLavelCat?._id} key={index}>
                                {thirdLavelCat?.name}
                              </MenuItem>
                            );
                          })
                        );
                      })
                    );
                  })}
                </Select>
              )}
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">Price</h3>
              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm
              focus:outline-none focus:border-[rgba(0,0,0,0.5)] p-3 text-sm"
                name="price"
                value={formFields.price}
                onChange={onChangeInput}
              />
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Align Info
              </h3>
              {context?.catData?.length !== 0 && (
                <Select
                  labelId="demo-simple-select-label"
                  id="productCatDrop"
                  size="small"
                  className="w-full"
                  value={alignInfo}
                  label="Align Info"
                  onChange={handleChangeAlignInfo}
                >
                  <MenuItem value={"left"}>Left</MenuItem>
                  <MenuItem value={"right"}>Right</MenuItem>
                </Select>
              )}
            </div>
          </div>

          <br />

          <h3 className="text-[18px] font-[500] mb-0 text-black">Image</h3>

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
              url="/api/bannerV1/uploadImages"
              setPreviewFun={setPreviewFun}
            />
          </div>
        </div>

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

export default AddBannerV1;
