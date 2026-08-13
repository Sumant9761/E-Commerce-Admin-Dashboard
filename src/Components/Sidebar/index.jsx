import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { FaRegImage } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { RiProductHuntLine } from "react-icons/ri";
import { TbCategory } from "react-icons/tb";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { TbMessage } from "react-icons/tb";
import { FaAngleDown } from "react-icons/fa";
import { Collapse } from "react-collapse";
import { MyContext } from "../../App";

const Sidebar = () => {
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const isOpenSubMenu = (index) => {
    if (submenuIndex === index) {
      setSubmenuIndex(null);
    } else {
      setSubmenuIndex(index);
    }
  };

  const context = useContext(MyContext);

  return (
    <div
      className={`sidebar fixed top-0 left-0 z-[50] bg-[#fff] h-full border-r border-[rgba(0,0,0,0.1)]
       py-2 px-4 ${context.isSidebarOpen === true ? "w-[16%]" : "w-0"}`}
    >
      <div className="py-2 w-full">
        <Link to="/">
          <img
            src="https://ecme-react.themenate.net/img/logo/logo-light-full.png"
            className="w-[120px]"
          />
        </Link>
      </div>

      <ul className="mt-4">
        <li>
          <Link to="/">
            <Button className="w-full !capitalize !justify-start !mt-4 gap-2 !text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]">
              <MdOutlineDashboard className="text-[20px]" />
              <span>Dashboard</span>
            </Button>
          </Link>
        </li>

        <li>
          <Button
            className="w-full !capitalize !justify-start !mt-4 gap-2 !text-[14px] !text-[rgba(0,0,0,0.8)] 
            !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]"
            onClick={() => isOpenSubMenu(1)}
          >
            <FaRegImage className="text-[18px]" />
            <span>Home Slides</span>
            <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center">
              <FaAngleDown
                className={`transition-all ${submenuIndex === 1 ? "rotate-180" : ""}`}
              />
            </span>
          </Button>

          <Collapse isOpened={submenuIndex === 1 ? true : false}>
            <ul className="w-full">
              <li className="w-full">
                <Link to="/homeSlider/list">
                  <Button
                    className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] 
                !font-[500] !pl-8 flex gap-3"
                  >
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                    Home Banners List
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                <Button
                  className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] 
                !font-[500] !pl-8 flex gap-3"
                >
                  <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                  Add Home Banner Slide
                </Button>
              </li>
            </ul>
          </Collapse>
        </li>

        <li>
          <Button
            className="w-full !capitalize !justify-start !mt-4 gap-2 !text-[14px] !text-[rgba(0,0,0,0.8)] 
            !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]"
            onClick={() => isOpenSubMenu(2)}
          >
            <TbCategory className="text-[18px]" />
            <span>Category</span>
            <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center">
              <FaAngleDown
                className={`transition-all ${submenuIndex === 2 ? "rotate-180" : ""}`}
              />
            </span>
          </Button>

          <Collapse isOpened={submenuIndex === 2 ? true : false}>
            <ul className="w-full">
              <li className="w-full">
                <Link to="/category/list">
                  <Button
                    className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] 
                    !font-[500] !pl-8 flex gap-3"
                  >
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                    Category List
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                <Button
                  className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] 
                    !font-[500] !pl-8 flex gap-3"
                  onClick={() =>
                    context.setIsOpenFullScreenPanel({
                      open: true,
                      model: "Add New Category",
                    })
                  }
                >
                  <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                  Add a category
                </Button>
              </li>
              <li className="w-full">
                <Link to="/subCategory/list">
                  <Button
                    className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] 
                !font-[500] !pl-8 flex gap-3"
                  >
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                    Sub Category List
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                <Button
                  className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] 
                !font-[500] !pl-8 flex gap-3"
                  onClick={() =>
                    context.setIsOpenFullScreenPanel({
                      open: true,
                      model: "Add Sub Category",
                    })
                  }
                >
                  <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                  Add a Sub Category
                </Button>
              </li>
            </ul>
          </Collapse>
        </li>

        <li>
          <Button
            className="w-full !capitalize !justify-start !mt-4 gap-2 !text-[14px] !text-[rgba(0,0,0,0.8)] 
            !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]"
            onClick={() => isOpenSubMenu(3)}
          >
            <RiProductHuntLine className="text-[18px]" />
            <span>Products</span>
            <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center">
              <FaAngleDown
                className={`transition-all ${submenuIndex === 3 ? "rotate-180" : ""}`}
              />
            </span>
          </Button>

          <Collapse isOpened={submenuIndex === 3 ? true : false}>
            <ul className="w-full">
              <li className="w-full">
                <Link to="/products">
                  <Button
                    className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] 
                !font-[500] !pl-8 flex gap-3"
                  >
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                    Product List
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                <Button
                  className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] 
                !font-[500] !pl-8 flex gap-3"
                  onClick={() =>
                    context.setIsOpenFullScreenPanel({
                      open: true,
                      model: "Add Product",
                    })
                  }
                >
                  <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                  Product Upload
                </Button>
              </li>

              <li className="w-full">
                <Link to="/product/addRams">
                  <Button
                    className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] 
                !font-[500] !pl-8 flex gap-3"
                  >
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                    ADD Product RAMS
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                <Link to="/product/addWeight">
                  <Button
                    className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] 
                !font-[500] !pl-8 flex gap-3"
                  >
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                    ADD Product WEIGHT
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                <Link to="/product/addSize">
                  <Button
                    className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] 
                !font-[500] !pl-8 flex gap-3"
                  >
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                    ADD Product SIZE
                  </Button>
                </Link>
              </li>
            </ul>
          </Collapse>
        </li>

        <li>
          <Link to="/users">
            <Button className="w-full !capitalize !justify-start !mt-4 gap-2 !text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]">
              <FiUsers className="text-[18px]" />
              <span>Users</span>
            </Button>
          </Link>
        </li>

        <li>
          <Link to="/orders">
            <Button className="w-full !capitalize !justify-start !mt-4 gap-2 !text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]">
              <IoBagCheckOutline className="text-[20px]" />
              <span>Orders</span>
            </Button>
          </Link>
        </li>

        <li>
          <Button
            className="w-full !capitalize !justify-start !mt-4 gap-2 !text-[14px] !text-[rgba(0,0,0,0.8)] 
            !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]"
            onClick={() => isOpenSubMenu(4)}
          >
            <RiProductHuntLine className="text-[18px]" />
            <span>Banners</span>
            <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center">
              <FaAngleDown
                className={`transition-all ${submenuIndex === 4 ? "rotate-180" : ""}`}
              />
            </span>
          </Button>

          <Collapse isOpened={submenuIndex === 4 ? true : false}>
            <ul className="w-full">
              <li className="w-full">
                <Link to="/bannerV1List">
                  <Button
                    className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] 
                !font-[500] !pl-8 flex gap-3"
                  >
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                    Banner V1 List
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                <Button
                  className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] 
                !font-[500] !pl-8 flex gap-3"
                  onClick={() =>
                    context.setIsOpenFullScreenPanel({
                      open: true,
                      model: "Add BannerV1",
                    })
                  }
                >
                  <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                  Add Banner V1
                </Button>
              </li>
            </ul>
          </Collapse>
        </li>

        <li>
          <Button
            className="w-full !capitalize !justify-start !mt-4 gap-2 !text-[14px] !text-[rgba(0,0,0,0.8)] 
            !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]"
            onClick={() => isOpenSubMenu(5)}
          >
            <TbMessage className="text-[18px]" />
            <span>Blogs</span>
            <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center">
              <FaAngleDown
                className={`transition-all ${submenuIndex === 5 ? "rotate-180" : ""}`}
              />
            </span>
          </Button>

          <Collapse isOpened={submenuIndex === 5 ? true : false}>
            <ul className="w-full">
              <li className="w-full">
                <Link to="/blog/list">
                  <Button
                    className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] 
                !font-[500] !pl-8 flex gap-3"
                  >
                    <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                    Blog List
                  </Button>
                </Link>
              </li>
              <li className="w-full">
                <Button
                  className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] 
                !font-[500] !pl-8 flex gap-3"
                  onClick={() =>
                    context.setIsOpenFullScreenPanel({
                      open: true,
                      model: "Add Blog",
                    })
                  }
                >
                  <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                  Add Blog
                </Button>
              </li>
            </ul>
          </Collapse>
        </li>

        <li>
          <Button className="w-full !capitalize !justify-start !mt-4 gap-2 !text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] items-center !py-2 hover:!bg-[#f1f1f1]">
            <MdLogout className="text-[20px]" />
            <span>Logout</span>
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
