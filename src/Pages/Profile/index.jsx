import React from "react";
import { useState, useEffect, useContext } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MyContext } from "../../App";
import {
  editData,
  fetchDataFromApi,
  postData,
  uploadImage,
} from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";

import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Collapse } from "react-collapse";
import Radio from "@mui/material/Radio";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Profile = () => {
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [userId, setUserId] = useState("");
  const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState([]);

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [changePassword, setChangePassword] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
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

  const onChangePassword = (e) => {
    const { name, value } = e.target;
    setChangePassword(() => {
      return {
        ...changePassword,
        [name]: value,
      };
    });
  };

  const valideValue = Object.values(formFields).every((el) => el);
  const valideValue2 = Object.values(formFields).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.name === "") {
      context.openAlertBox("error", "Please enter your full name");
      setIsLoading(false);
      return false;
    }
    if (formFields.email === "") {
      context.openAlertBox("error", "Please enter your email id");
      setIsLoading(false);
      return false;
    }
    if (formFields.mobile === "") {
      context.openAlertBox("error", "Please enter your mobile number");
      setIsLoading(false);
      return false;
    }

    setIsLoading(true);
    editData(`/api/user/${userId}`, formFields, { withCredentials: true }).then(
      (res) => {
        if (res?.error !== true) {
          context.openAlertBox("success", res?.data?.message);
          setIsLoading(false);
        } else {
          context.openAlertBox("error", res?.data?.message);
          setIsLoading(false);
        }
      },
    );
  };

  const handleSubmitChangePassword = async (e) => {
    e.preventDefault();
    setIsLoading2(true);

    if (changePassword.oldPassword === "") {
      context.openAlertBox("error", "Please enter old password");
      setIsLoading2(false);
      return false;
    }
    if (changePassword.newPassword === "") {
      context.openAlertBox("error", "Please enter new password");
      setIsLoading2(false);
      return false;
    }
    if (changePassword.confirmPassword === "") {
      context.openAlertBox("error", "Please enter confirm password");
      setIsLoading2(false);
      return false;
    }

    if (changePassword.newPassword !== changePassword.confirmPassword) {
      context.openAlertBox(
        "error",
        "New Password and Confirm Password must be same",
      );
      setIsLoading2(false);
      return false;
    }

    setIsLoading2(true);
    postData(`/api/user/reset-password`, changePassword, {
      withCredentials: true,
    }).then((res) => {
      if (res?.error !== true) {
        setTimeout(() => {
          setIsLoading2(false);
        }, 500);
        context.openAlertBox("success", res?.message);
      } else {
        context.openAlertBox("error", res?.message);
        setIsLoading2(false);
      }
    });
  };

  //When user is not login then redirect to home page
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token === null) {
      history("/login");
    }
  }, [context?.isLogin]);

  //To set the old user data before updating in form when you open my account page
  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      fetchDataFromApi(
        `/api/address/get?userId=${context?.userData?._id}`,
      ).then((res) => {
        setAddress(res?.data);
        context?.setAddress(res?.data);
      });

      setUserId(context?.userData?._id);
      setFormFields({
        name: context?.userData?.name,
        email: context?.userData?.email,
        mobile: context?.userData?.mobile,
      });
      setPhone(`${context?.userData?.mobile || ""}`);
      setChangePassword({ email: context?.userData?.email });
    }
  }, [context?.userData]);

  useEffect(() => {
    const userAvatar = [];
    if (
      context?.userData?.avatar !== "" &&
      context?.userData?.avatar !== undefined
    ) {
      userAvatar.push(context?.userData?.avatar);
      setPreviews(userAvatar);
    } else {
      setPreviews([]);
    }
  }, [context?.userData]);

  let selectedImages = [];

  const formdata = new FormData();

  const onChangeFile = async (e, apiEndPoint) => {
    try {
      setPreviews([]);
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
          formdata.append(`avatar`, file);
        } else {
          context.openAlertBox(
            "error",
            "Please select a valid JPG, PNG or webp image file.",
          );
          setUploading(false);
          return false;
        }
      }
      uploadImage("/api/user/user-avatar", formdata).then((res) => {
        setUploading(false);
        let avatar = [];
        avatar.push(res?.data?.avatar);
        setPreviews(avatar);
      });
    } catch (error) {
      setUploading(false);
      context.openAlertBox("error", "Upload failed");
    }
  };

  return (
    <>
      <div className="card my-4 pt-5 w-[65%] shadow-md sm:rounded-lg bg-white px-5 pb-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-[600]">Users Profile</h2>

          <Button
            className="!ml-auto"
            onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}
          >
            Change Password
          </Button>
        </div>

        <br />

        <div
          className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group flex
                items-center justify-center bg-gray-200"
        >
          {uploading === true ? (
            <CircularProgress color="inherit" />
          ) : (
            <>
              {previews?.length !== 0 ? (
                previews?.map((img, index) => {
                  return (
                    <img
                      src={img}
                      key={index}
                      className="w-full h-full object-cover"
                    />
                  );
                })
              ) : (
                <img src={"/user.png"} className="w-full h-full object-cover" />
              )}
            </>
          )}

          <div
            className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.7)] flex 
            items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100"
          >
            <FaCloudUploadAlt className="text-[#fff] text-[25px]" />
            <input
              type="file"
              className="absolute top-0 left-0 w-full h-full opacity-0"
              accept="image/*"
              onChange={(e) => onChangeFile(e, "/api/user/user-avatar")}
              name="avatar"
            />
          </div>
        </div>

        <form className="form mt-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-5">
            <div className="w-[50%]">
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm
                focus:outline-none focus:border-[rgba(0,0,0,0.5)] p-3 text-sm"
                name="name"
                value={formFields.name}
                onChange={onChangeInput}
                disabled={isLoading === true ? true : false}
              />
            </div>

            <div className="w-[50%]">
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm
              focus:outline-none focus:border-[rgba(0,0,0,0.5)] p-3 text-sm"
                name="email"
                value={formFields.email}
                onChange={onChangeInput}
                disabled={true}
              />
            </div>
          </div>

          <div className="flex items-center mt-4 gap-5">
            <div className="w-[50%]">
              <PhoneInput
                defaultCountry="in"
                value={phone}
                onChange={(phone) => {
                  setPhone(phone);
                  setFormFields({ ...formFields, mobile: phone });
                }}
                disabled={isLoading === true ? true : false}
              />
            </div>
          </div>

          <div
            className="mt-6 py-4 text-center border border-dashed border-blue-200 rounded bg-blue-50 
            cursor-pointer hover:bg-blue-100 font-semibold text-xs sm:text-sm"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add New Address",
              })
            }
          >
            + Add Address
          </div>

          <div className="flex gap-2 flex-col mt-4">
            {address?.length > 0 &&
              address?.map((addr, idx) => {
                return (
                  <>
                    <label
                      key={addr._id || idx}
                      className="border border-dashed border-blue-200 addressBox w-full flex items-center 
                    justify-center bg-[#f1f1f1] p-3 rounded-md cursor-pointer"
                    >
                      <Radio
                        {...label}
                        name="address"
                        checked={selectedValue === addr._id}
                        value={addr._id}
                        onChange={handleChange}
                      />
                      <span className="text-[12px]">
                        {`${addr.address_line1} ${addr.city} ${addr.country} ${addr.state} ${addr.pincode}`}
                      </span>
                    </label>
                  </>
                );
              })}
          </div>

          <br />

          <div className="flex items-center gap-4">
            <Button
              type="submit"
              disabled={!valideValue}
              className="btn-blue btn-lg w-full"
            >
              {isLoading === true ? (
                <CircularProgress color="inherit" />
              ) : (
                "Update Profile"
              )}
            </Button>
          </div>
        </form>
      </div>

      <Collapse isOpened={isOpenCategoryFilter}>
        <div className="card bg-white p-5 w-[65%] shadow-md rounded-md">
          <div className="flex items-center pb-3">
            <h2 className="text-[18px] font-[600] pb-0">Change Password</h2>
          </div>
          <hr />

          <form className="mt-8" onSubmit={handleSubmitChangePassword}>
            <div className="flex items-center gap-5">
              <div className="w-[50%]">
                <TextField
                  type="text"
                  label="Old Password"
                  variant="outlined"
                  size="small"
                  className="w-full"
                  name="oldPassword"
                  value={changePassword.oldPassword}
                  onChange={onChangePassword}
                  disabled={isLoading2 === true ? true : false}
                />
              </div>

              <div className="w-[50%]">
                <TextField
                  type="text"
                  label="New Password"
                  variant="outlined"
                  size="small"
                  className="w-full"
                  name="newPassword"
                  value={changePassword.newPassword}
                  onChange={onChangePassword}
                  disabled={isLoading2 === true ? true : false}
                />
              </div>
            </div>

            <div className="flex items-center mt-4 gap-5">
              <div className="w-[50%]">
                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  size="small"
                  className="w-full"
                  name="confirmPassword"
                  value={changePassword.confirmPassword}
                  onChange={onChangePassword}
                  disabled={isLoading2 === true ? true : false}
                />
              </div>
            </div>

            <br />

            <div className="flex items-center gap-4">
              <Button
                type="submit"
                disabled={!valideValue2}
                className="btn-blue btn-lg w-full"
              >
                {isLoading2 === true ? (
                  <CircularProgress color="inherit" />
                ) : (
                  "Change Password"
                )}
              </Button>
            </div>
          </form>
        </div>
      </Collapse>
    </>
  );
};

export default Profile;
