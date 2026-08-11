import React, { useContext, useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Rating from "@mui/material/Rating";
import UploadBox from "../../Components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoMdClose } from "react-icons/io";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MyContext } from "../../App";
import {
  deleteData,
  editData,
  fetchDataFromApi,
  postData,
} from "../../utils/api";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const EditProduct = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productThirdLevelSubCat, setProductThirdLevelSubCat] = useState("");
  const [productFeatured, setProductFeatured] = useState("");
  const [productRams, setProductRams] = useState([]);
  const [productRamsData, setProductRamsData] = useState([]);
  const [productWeight, setProductWeight] = useState([]);
  const [productWeightData, setProductWeightData] = useState([]);
  const [productSize, setProductSize] = useState([]);
  const [productSizeData, setProductSizeData] = useState([]);

  const [preview, setPreview] = useState([]);
  const context = useContext(MyContext);
  const history = useNavigate();

  useEffect(() => {
    fetchDataFromApi("/api/product/productRAMS/get").then((res) => {
      if (res?.error === false) {
        setProductRamsData(res?.data);
      }
    });
    fetchDataFromApi("/api/product/productWeight/get").then((res) => {
      if (res?.error === false) {
        setProductWeightData(res?.data);
      }
    });
    fetchDataFromApi("/api/product/productSize/get").then((res) => {
      if (res?.error === false) {
        setProductSizeData(res?.data);
      }
    });

    fetchDataFromApi(`/api/product/${context?.isOpenFullScreenPanel?.id}`).then(
      (res) => {
        setFormFields({
          name: res?.product?.name,
          description: res?.product?.description,
          images: res?.product?.images,
          brand: res?.product?.brand,
          price: res?.product?.price,
          oldPrice: res?.product?.oldPrice,
          catName: res?.product?.catName,
          category: res?.product?.category,
          catId: res?.product?.catId,
          subCatId: res?.product?.subCatId,
          subCat: res?.product?.subCat,
          thirdsubCat: res?.product?.thirdsubCat,
          thirdsubCatId: res?.product?.thirdsubCatId,
          category: res?.product?.category,
          countInStock: res?.product?.countInStock,
          rating: res?.product?.rating,
          isFeatured: res?.product?.isFeatured,
          discount: res?.product?.discount,
          productRam: res?.product?.productRam,
          size: res?.product?.size,
          productWeight: res?.product?.productWeight,
        });

        setProductCat(res?.product?.catId);
        setProductSubCat(res?.product?.subCatId);
        setProductThirdLevelSubCat(res?.product?.thirdSubCatId);
        setProductFeatured(res?.product?.isFeatured);
        setProductRams(res?.product?.productRam);
        setProductSize(res?.product?.size);
        setProductWeight(res?.product?.productWeight);

        setPreview(res?.product?.images);
      },
    );
  }, []);

  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    images: [],
    brand: "",
    price: "",
    oldPrice: "",
    category: "",
    catName: "",
    catId: "",
    subCatId: "",
    subCat: "",
    thirdsubCat: "",
    thirdsubCatId: "",
    countInStock: "",
    rating: "",
    isFeatured: false,
    discount: "",
    productRam: [],
    size: [],
    productWeight: [],
  });

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

  const selectCatByName = (name) => {
    formFields.catName = name;
  };

  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
    formFields.subCatId = event.target.value;
  };

  const selectSubCatByName = (name) => {
    formFields.subCat = name;
  };

  const handleChangeProductThirdLevelSubCat = (event) => {
    setProductThirdLevelSubCat(event.target.value);
    formFields.thirdsubCatId = event.target.value;
  };

  const selectThirdLevelSubCatByName = (name) => {
    formFields.thirdsubCat = name;
  };

  const handleChangeProductFeatured = (event) => {
    setProductFeatured(event.target.value);
    formFields.isFeatured = event.target.value;
  };

  const handleChangeProductRams = (event) => {
    const {
      target: { value },
    } = event;
    setProductRams(
      //On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
    formFields.productRam = value;
  };

  const handleChangeProductWeight = (event) => {
    const {
      target: { value },
    } = event;
    setProductWeight(typeof value === "string" ? value.split(",") : value);
    formFields.productWeight = value;
  };

  const handleChangeProductSize = (event) => {
    const {
      target: { value },
    } = event;
    setProductSize(typeof value === "string" ? value.split(",") : value);
    formFields.size = value;
  };

  const onChangeRating = (e) => {
    setFormFields(() => ({
      ...formFields,
      rating: e.target.value,
    }));
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
    });
  };

  const removeImg = (image, index) => {
    var imageArr = [];
    imageArr = preview;
    deleteData(`/api/product/deleteImage?img=${image}`).then((res) => {
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

    if (formFields.name === "") {
      context.openAlertBox("error", "Please enter product name");
      setIsLoading(false);
      return;
    }
    if (formFields.description === "") {
      context.openAlertBox("error", "Please enter product description");
      setIsLoading(false);
      return;
    }
    if (formFields?.catId === "") {
      context.openAlertBox("error", "Please select product category");
      setIsLoading(false);
      return;
    }
    if (formFields?.price === "") {
      context.openAlertBox("error", "Please select product price");
      setIsLoading(false);
      return;
    }
    if (formFields?.oldPrice === "") {
      context.openAlertBox("error", "Please select product old price");
      setIsLoading(false);
      return;
    }
    if (formFields?.countInStock === "") {
      context.openAlertBox("error", "Please select product stock");
      setIsLoading(false);
      return;
    }
    if (formFields?.brand === "") {
      context.openAlertBox("error", "Please select product brand");
      setIsLoading(false);
      return;
    }
    if (formFields?.discount === "") {
      context.openAlertBox("error", "Please select product discount");
      setIsLoading(false);
      return;
    }
    if (formFields?.rating === "") {
      context.openAlertBox("error", "Please select product rating");
      setIsLoading(false);
      return;
    }

    if (formFields?.discount === "") {
      context.openAlertBox("error", "Please select product discount");
      setIsLoading(false);
      return;
    }
    if (preview?.length === 0) {
      context.openAlertBox("error", "Please select product images");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    editData(
      `/api/product/updateProduct/${context?.isOpenFullScreenPanel?.id}`,
      formFields,
    ).then((res) => {
      if (res?.data?.error === false) {
        context.openAlertBox("success", res?.data?.message);

        setTimeout(() => {
          setIsLoading(false);
          context.setIsOpenFullScreenPanel({
            open: false,
          });
          history("/products");
        }, 1000);
      } else {
        setIsLoading(false);
        context.openAlertBox("error", res?.data?.message);
      }
    });
  };

  return (
    <section className="p-5 bg-gray-50">
      <form className="form py-3 p-8" onSubmit={handleSubmit}>
        <div className="scroll max-h-[72vh] overflow-y-scroll pr-4">
          <div className="grid grid-cols-1 mb-3">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Name
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

          <div className="grid grid-cols-1 mb-3">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Description
              </h3>
              <textarea
                type="text"
                className="w-full h-[140px] border border-[rgba(0,0,0,0.2)] rounded-sm
              focus:outline-none focus:border-[rgba(0,0,0,0.5)] p-3 text-sm"
                name="description"
                value={formFields.description}
                onChange={onChangeInput}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 mb-3 gap-4">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Category
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
                      <MenuItem
                        value={cat?._id}
                        key={index}
                        onClick={() => selectCatByName(cat?.name)}
                      >
                        {cat?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Sub Category
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
                          <MenuItem
                            value={subCat?._id}
                            key={index}
                            onClick={() => selectSubCatByName(subCat?.name)}
                          >
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
                Product Third Level Category
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
                              <MenuItem
                                value={thirdLavelCat?._id}
                                key={index}
                                onClick={() =>
                                  selectThirdLevelSubCatByName(
                                    thirdLavelCat?.name,
                                  )
                                }
                              >
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
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Price
              </h3>
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
                Product Old Price
              </h3>
              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm
              focus:outline-none focus:border-[rgba(0,0,0,0.5)] p-3 text-sm"
                name="oldPrice"
                value={formFields.oldPrice}
                onChange={onChangeInput}
              />
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Is Featured?
              </h3>
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                size="small"
                className="w-full"
                value={productFeatured}
                label="Category"
                onChange={handleChangeProductFeatured}
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Stock
              </h3>
              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm
              focus:outline-none focus:border-[rgba(0,0,0,0.5)] p-3 text-sm"
                name="countInStock"
                value={formFields.countInStock}
                onChange={onChangeInput}
              />
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Brand
              </h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm
              focus:outline-none focus:border-[rgba(0,0,0,0.5)] p-3 text-sm"
                name="brand"
                value={formFields.brand}
                onChange={onChangeInput}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 mb-3 gap-4">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Discount
              </h3>
              <input
                type="number"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm
              focus:outline-none focus:border-[rgba(0,0,0,0.5)] p-3 text-sm"
                name="discount"
                value={formFields.discount}
                onChange={onChangeInput}
              />
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product RAMS
              </h3>
              {productRamsData?.length !== 0 && (
                <Select
                  multiple
                  labelId="demo-simple-select-label"
                  id="productCatDrop"
                  size="small"
                  className="w-full"
                  value={productRams}
                  label="Category"
                  onChange={handleChangeProductRams}
                >
                  {productRamsData?.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.name}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Weight
              </h3>
              {productWeightData?.length !== 0 && (
                <Select
                  multiple
                  labelId="demo-simple-select-label"
                  id="productCatDrop"
                  size="small"
                  className="w-full"
                  value={productWeight}
                  label="Category"
                  onChange={handleChangeProductWeight}
                >
                  {productWeightData?.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.name}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Size
              </h3>
              {productSizeData?.length !== 0 && (
                <Select
                  multiple
                  labelId="demo-simple-select-label"
                  id="productCatDrop"
                  size="small"
                  className="w-full"
                  value={productSize}
                  label="Category"
                  onChange={handleChangeProductSize}
                >
                  {productSizeData?.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.name}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 mb-3 gap-4">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Rating
              </h3>
              <Rating
                name="rating"
                value={formFields.rating}
                onChange={onChangeRating}
              />
            </div>
          </div>

          <div className="col w-full p-5 px-0">
            <h3 className="font-[700] text-[18px] mb-3">Media & Images</h3>

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
                url="/api/product/uploadImages"
                setPreviewFun={setPreviewFun}
              />
            </div>
          </div>
        </div>

        <hr />
        <br />
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
      </form>
    </section>
  );
};

export default EditProduct;
