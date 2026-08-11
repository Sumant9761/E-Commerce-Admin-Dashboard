import React from "react";
import { createContext, useState, useEffect } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Products from "./Pages/Products";

import HomeSliderBanners from "./Pages/HomeSliderBanners";
import CategoryList from "./Pages/Category";
import SubCategoryList from "./Pages/Category/subCatList";
import Users from "./Pages/Users";
import Orders from "./Pages/Orders";
import ForgotPassword from "./Pages/ForgotPassword";
import VerifyAccount from "./Pages/VerifyAccount";
import ChangePassword from "./Pages/ChangePassword";

import toast, { Toaster } from "react-hot-toast";
import { fetchDataFromApi } from "./utils/api";
import Profile from "./Pages/Profile";
import ProductDetails from "./Pages/Products/productDetails";
import AddRAMS from "./Pages/Products/addRAMS";
import AddWeight from "./Pages/Products/addWeight";
import AddSize from "./Pages/Products/addSize";


const MyContext = createContext();

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [address, setAddress] = useState([]);
  const [catData, setCatData] = useState([]);

  const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
    open: false,
    model: "",
    id: "",
  });

  const router = createBrowserRouter([
    {
      path: "/",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${isSidebarOpen === true ? "w-[16%]" : "w-[0px] opacity-0"} transition-all`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${isSidebarOpen === false ? "w-[100%]" : "w-[84%]"} transition-all`}
              >
                <Dashboard />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/login",
      exact: true,
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "/sign-up",
      exact: true,
      element: (
        <>
          <SignUp />
        </>
      ),
    },
    {
      path: "/forgot-password",
      exact: true,
      element: (
        <>
          <ForgotPassword />
        </>
      ),
    },
    {
      path: "/verify-account",
      exact: true,
      element: (
        <>
          <VerifyAccount />
        </>
      ),
    },
    {
      path: "/change-password",
      exact: true,
      element: (
        <>
          <ChangePassword />
        </>
      ),
    },
    {
      path: "/products",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${isSidebarOpen === true ? "w-[16%]" : "w-[0px] opacity-0"} transition-all`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${isSidebarOpen === false ? "w-[100%]" : "w-[84%]"} transition-all`}
              >
                <Products />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/homeSlider/list",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${isSidebarOpen === true ? "w-[16%]" : "w-[0px] opacity-0"} transition-all`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${isSidebarOpen === false ? "w-[100%]" : "w-[84%]"} transition-all`}
              >
                <HomeSliderBanners />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/category/list",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${isSidebarOpen === true ? "w-[16%]" : "w-[0px] opacity-0"} transition-all`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${isSidebarOpen === false ? "w-[100%]" : "w-[84%]"} transition-all`}
              >
                <CategoryList />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/subCategory/list",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${isSidebarOpen === true ? "w-[16%]" : "w-[0px] opacity-0"} transition-all`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${isSidebarOpen === false ? "w-[100%]" : "w-[84%]"} transition-all`}
              >
                <SubCategoryList />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/users",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${isSidebarOpen === true ? "w-[16%]" : "w-[0px] opacity-0"} transition-all`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${isSidebarOpen === false ? "w-[100%]" : "w-[84%]"} transition-all`}
              >
                <Users />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/orders",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${isSidebarOpen === true ? "w-[16%]" : "w-[0px] opacity-0"} transition-all`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${isSidebarOpen === false ? "w-[100%]" : "w-[84%]"} transition-all`}
              >
                <Orders />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/profile",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${isSidebarOpen === true ? "w-[16%]" : "w-[0px] opacity-0"} transition-all`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${isSidebarOpen === false ? "w-[100%]" : "w-[84%]"} transition-all`}
              >
                <Profile />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/product/:id",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${isSidebarOpen === true ? "w-[16%]" : "w-[0px] opacity-0"} transition-all`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${isSidebarOpen === false ? "w-[100%]" : "w-[84%]"} transition-all`}
              >
                <ProductDetails />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/product/addRams",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${isSidebarOpen === true ? "w-[16%]" : "w-[0px] opacity-0"} transition-all`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${isSidebarOpen === false ? "w-[100%]" : "w-[84%]"} transition-all`}
              >
                <AddRAMS />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/product/addWeight",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${isSidebarOpen === true ? "w-[16%]" : "w-[0px] opacity-0"} transition-all`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${isSidebarOpen === false ? "w-[100%]" : "w-[84%]"} transition-all`}
              >
                <AddWeight />
              </div>
            </div>
          </section>
        </>
      ),
    },
    {
      path: "/product/addSize",
      exact: true,
      element: (
        <>
          <section className="main">
            <Header />
            <div className="contentMain flex">
              <div
                className={`overflow-hidden sidebarWrapper ${isSidebarOpen === true ? "w-[16%]" : "w-[0px] opacity-0"} transition-all`}
              >
                <Sidebar />
              </div>
              <div
                className={`contentRight py-4 px-5 ${isSidebarOpen === false ? "w-[100%]" : "w-[84%]"} transition-all`}
              >
                <AddSize />
              </div>
            </div>
          </section>
        </>
      ),
    },
  ]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true);

      fetchDataFromApi("/api/user/user-details").then((res) => {
        setUserData(res.data);
        if (res?.response?.data?.error === true) {
          if (res?.response?.data?.message === "You have not login") {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            openAlertBox("error", "Your session is closed please login again");
            window.location.href = "/login";
            setIsLogin(false);
          }
        }
      });
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  useEffect(() => {
    getCat();
  }, []);

  const getCat = () => {
    fetchDataFromApi("/api/category").then((res) => {
      setCatData(res?.data);
    });
  };

  const openAlertBox = (status, msg) => {
    if (status === "success") {
      toast.success(msg);
    }
    if (status === "error") {
      toast.error(msg);
    }
  };

  const values = {
    isSidebarOpen,
    setIsSidebarOpen,
    isLogin,
    setIsLogin,
    isOpenFullScreenPanel,
    setIsOpenFullScreenPanel,
    openAlertBox,
    setUserData,
    userData,
    setAddress,
    address,
    setCatData,
    catData,
    getCat,
  };

  return (
    <>
      <MyContext.Provider value={values}>
        <RouterProvider router={router} />
        <Toaster />
      </MyContext.Provider>
    </>
  );
}

export default App;
export { MyContext };
