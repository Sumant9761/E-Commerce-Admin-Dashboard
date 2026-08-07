import { Button } from "@mui/material";
import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CgLogIn } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { MyContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { postData } from "../../utils/api";

const SignUp = () => {
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingFb, setLoadingFb] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(MyContext);
  const history = useNavigate();

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
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

  const valideValue = Object.values(formFields).every((el) => el);

  function handleClickGoogle() {
    setLoadingGoogle(true);
  }

  function handleClickFb() {
    setLoadingFb(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.name === "") {
      context.openAlertBox("error", "Please enter full name");
      setIsLoading(false);
      return false;
    }

    if (formFields.email === "") {
      context.openAlertBox("error", "Please enter email id");
      setIsLoading(false);
      return false;
    }
    if (formFields.password === "") {
      context.openAlertBox("error", "Please enter password");
      setIsLoading(false);
      return false;
    }

    const res = await postData("/api/user/register", formFields);

    if (res.success) {
      setIsLoading(false);
      context.openAlertBox("success", res.message);
      localStorage.setItem("userEmail", formFields.email);
      setFormFields({
        name: "",
        email: "",
        password: "",
      });
      history("/verify-Account");
    } else {
      setIsLoading(false);
      context.openAlertBox("error", res.message);
    }
  };

  return (
    <section className="bg-white w-full">
      <header className="w-full fixed top-0 left-0 px-4 py-3 flex items-center justify-between z-50">
        <Link to="/">
          <img
            src="https://ecme-react.themenate.net/img/logo/logo-light-full.png"
            className="w-[120px]"
          />
        </Link>

        <div className="flex items-center gap-0">
          <NavLink to="/login" exact={true} activeClassName="isActive">
            <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1">
              <CgLogIn className="text-[18px]" />
              Login
            </Button>
          </NavLink>

          <NavLink to="/sign-up" exact={true} activeClassName="isActive">
            <Button className="!rounded-full !text-[rgba(0,0,0,0.8)] !px-5 flex gap-1">
              <FaRegUser className="text-[15px]" />
              Sign Up
            </Button>
          </NavLink>
        </div>
      </header>
      <img
        src="/Pattern.jpeg"
        className="w-full fixed top-0 left-0 opacity-15"
      />

      <div className="loginBox card w-[600px] h-auto pb-20 mx-auto pt-20 relative z-50">
        <div className="text-center">
          <img src="/logoIcon.png" className="m-auto w-[90px]" />
        </div>

        <h1 className="text-center text-[35px] font-[800] mt-4">
          Join us today! Get special <br />
          benefits and stay up-to-date.
        </h1>

        <div className="flex items-center justify-center w-full mt-5 gap-4">
          <Button
            size="small"
            onClick={handleClickGoogle}
            endIcon={<FcGoogle />}
            loading={loadingGoogle}
            loadingPosition="end"
            variant="outlined"
            className="!bg-none !py-2 !text-[15px] !capitalize !px-5 !text-[rgba(0,0,0,0.7)]"
          >
            Signin with Google
          </Button>
          <Button
            size="small"
            onClick={handleClickFb}
            endIcon={<FaFacebook />}
            loading={loadingFb}
            loadingPosition="end"
            variant="outlined"
            className="!bg-none !py-2 !text-[15px] !capitalize !px-5 !text-[rgba(0,0,0,0.7)]"
          >
            Signin with Facebook
          </Button>
        </div>

        <br />

        <div className="w-full flex items-center justify-center gap-3">
          <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]"></span>
          <span className="text-[14px] font-[500]">
            Or, Sign in with your email
          </span>
          <span className="flex items-center w-[100px] h-[1px] bg-[rgba(0,0,0,0.2)]"></span>
        </div>

        <br />

        <form className="w-full px-8 mt-3" onSubmit={handleSubmit}>
          <div className="form-group mb-4 w-full">
            <h4 className="text-[15px] font-[500] mb-1">Full Name</h4>
            <input
              type="text"
              className="w-full h-[50px]  border-2 border-[rgba(0,0,0,0.2)] rounded-md 
                focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
              name="name"
              value={formFields.name}
              disabled={isLoading === true ? true : false}
              onChange={onChangeInput}
            />
          </div>

          <div className="form-group mb-4 w-full">
            <h4 className="text-[15px] font-[500] mb-1">Email</h4>
            <input
              type="email"
              className="w-full h-[50px]  border-2 border-[rgba(0,0,0,0.2)] rounded-md 
                focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
              name="email"
              value={formFields.email}
              disabled={isLoading === true ? true : false}
              onChange={onChangeInput}
            />
          </div>

          <div className="form-group mb-4 w-full">
            <h4 className="text-[15px] font-[500] mb-1">Password</h4>
            <div className="relative w-full">
              <input
                type={isPasswordShow === false ? "password" : "text"}
                className="w-full h-[50px]  border-2 border-[rgba(0,0,0,0.2)] rounded-md 
                focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3"
                name="password"
                value={formFields.password}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}
              />
              <Button
                className="!absolute top-[7px] right-[10px] z-50 !rounded-full !w-[35px] !h-[35px] 
              !min-w-[35px] !text-gray-700"
                onClick={() => setIsPasswordShow(!isPasswordShow)}
              >
                {isPasswordShow === false ? (
                  <FaRegEye className="text-[18px]" />
                ) : (
                  <FaEyeSlash className="text-[18px]" />
                )}
              </Button>
            </div>
          </div>

          <div className="form-group mb-4 w-full flex items-center justify-between">
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remember me"
            />

            <Link
              to="/forgot-password"
              className="text-primary font-[600] text-[15px] hover:underline hover:text-gray-700"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            className="btn-blue btn-lg w-full"
            type="submit"
            disabled={!valideValue}
          >
            {isLoading === true ? (
              <CircularProgress color="inherit" />
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
