import React from "react";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useContext } from "react";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";
import { useEffect } from "react";

const AddAddress = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState(false);

  const context = useContext(MyContext);

  const [formFields, setFormFields] = useState({
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    status: false,
    userId: "",
    selected: false,
  });

  useEffect(() => {
    setFormFields((prevState) => ({
      ...prevState,
      userId: context.userData._id,
    }));
  }, [context?.userData]);

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    setFormFields((prevState) => ({
      ...prevState,
      status: event.target.value,
    }));
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.address_line1 === "") {
      context.openAlertBox("error", "Please enter your address");
      setIsLoading(false);
      return false;
    }
    if (formFields.city === "") {
      context.openAlertBox("error", "Please enter your city");
      setIsLoading(false);
      return false;
    }
    if (formFields.state === "") {
      context.openAlertBox("error", "Please enter your State");
      setIsLoading(false);
      return false;
    }
    if (formFields.pincode === "") {
      context.openAlertBox("error", "Please enter your Pincode");
      setIsLoading(false);
      return false;
    }
    if (formFields.country === "") {
      context.openAlertBox("error", "Please enter your Country Name");
      setIsLoading(false);
      return false;
    }
    if (formFields.status === "") {
      context.openAlertBox("error", "Please select status");
      setIsLoading(false);
      return false;
    }

    setIsLoading(true);
    postData(`/api/address/addAddress`, formFields, {
      withCredentials: true,
    }).then((res) => {
      if (res?.error !== true) {
        setIsLoading(false);
        context.openAlertBox("success", res?.message);

        context?.setIsOpenFullScreenPanel({
          open: false,
        });

        fetchDataFromApi(
          `/api/address/get?userId=${context?.userData?._id}`,
        ).then((res) => {
  
          context?.setAddress(res?.data);
        });
      } else {
        context.openAlertBox("error", res?.message);
        setIsLoading(false);
      }
    });
  };

  return (
    <section className="p-5 bg-gray-50">
      <form className="form py-3 p-8" onSubmit={handleSubmit}>
        <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4">
          <div className="grid grid-cols-2 mb-3 gap-4">
            <div className="col w-[100%]">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Address Line 1
              </h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm
                focus:outline-none focus:border-[rgba(0,0,0,0.5)] p-3 text-sm"
                name="address_line1"
                value={formFields.address_line1}
                onChange={onChangeInput}
              />
            </div>
            <div className="col w-[100%]">
              <h3 className="text-[14px] font-[500] mb-1 text-black">City</h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm
                focus:outline-none focus:border-[rgba(0,0,0,0.5)] p-3 text-sm"
                name="city"
                value={formFields.city}
                onChange={onChangeInput}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 mb-3 gap-4">
            <div className="col w-[100%]">
              <h3 className="text-[14px] font-[500] mb-1 text-black">State</h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm
                focus:outline-none focus:border-[rgba(0,0,0,0.5)] p-3 text-sm"
                name="state"
                value={formFields.state}
                onChange={onChangeInput}
              />
            </div>
            <div className="col w-[100%]">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Pincode
              </h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm
                focus:outline-none focus:border-[rgba(0,0,0,0.5)] p-3 text-sm"
                name="pincode"
                value={formFields.pincode}
                onChange={onChangeInput}
              />
            </div>
            <div className="col w-[100%]">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Country
              </h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm
                focus:outline-none focus:border-[rgba(0,0,0,0.5)] p-3 text-sm"
                name="country"
                value={formFields.country}
                onChange={onChangeInput}
              />
            </div>
            <div className="col w-[100%]">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Mobile No
              </h3>
              <PhoneInput
                defaultCountry="in"
                value={phone}
                onChange={(phone) => {
                  setPhone(phone);
                  setFormFields((prev) => ({ ...prev, mobile: phone }));
                }}
                disabled={isLoading === true ? true : false}
              />
            </div>

            <div className="col w-[100%]">
              <h3 className="text-[14px] font-[500] mb-1 text-black">Status</h3>
              <Select
                value={status}
                onChange={handleChangeStatus}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                size="small"
                className="w-full"
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
            </div>
          </div>

          <br />
        </div>

        <br />
        <div className="w-[250px]">
          <Button type="submit" className="btn-blue btn-lg w-full flex gap-2">
            <FaCloudUploadAlt className="text-[25px]" />
            Publish and View
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddAddress;
