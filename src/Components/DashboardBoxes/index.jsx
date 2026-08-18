import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { LuGift } from "react-icons/lu";
import { IoStatsChartSharp } from "react-icons/io5";
import { AiTwotonePieChart } from "react-icons/ai";
import { BsBank } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";

const DashboardBoxes = (props) => {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          550: { slidesPerView: 2, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 10 },
          1024: { slidesPerView: 4, spaceBetween: 10 }
        }}
        className="dashboardBoxesSlider"
      >
        <SwiperSlide>
          <div
            className="box bg-[#10b981] p-5 py-6 cursor-pointer hover:bg-[#289974] rounded-md border
            border-[rgba(0,0,0,0.1)] flex items-center gap-4"
          >
            <AiTwotonePieChart className="text-[50px] text-[#fff]" />
            <div className="info w-[70%]">
              <h3 className="text-white">Total Users</h3>
              <b className="text-white text-[20px]">{props?.users || 0}</b>
            </div>
            <IoStatsChartSharp className="text-[50px] text-[#fff]" />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="box bg-[#3872fa] p-5 py-6 cursor-pointer hover:bg-[#346ae8] rounded-md border
            border-[rgba(0,0,0,0.1)] flex items-center gap-4"
          >
            <LuGift className="text-[40px] text-[#fff]" />
            <div className="info w-[70%]">
              <h3 className="text-white">Total Orders</h3>
              <b className="text-white text-[20px]">{props?.orders || 0}</b>
            </div>
            <AiTwotonePieChart className="text-[50px] text-[#fff]" />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="box bg-[#312be1d8] p-5 py-6 cursor-pointer hover:bg-[#423eadd8] rounded-md border
            border-[rgba(0,0,0,0.1)] flex items-center gap-4"
          >
            <RiProductHuntLine className="text-[40px] text-[#fff]" />
            <div className="info w-[70%]">
              <h3 className="text-white">Total Products</h3>
              <b className="text-white text-[20px]">{props?.products || 0}</b>
            </div>
            <IoStatsChartSharp className="text-[50px] text-[#fff]" />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="box bg-[#e11d48] p-5 py-6 cursor-pointer hover:bg-[#be123c] rounded-md border
            border-[rgba(0,0,0,0.1)] flex items-center gap-4"
          >
            <BiCategory className="text-[40px] text-[#fff]" />
            <div className="info w-[70%]">
              <h3 className="text-white">Total Categories</h3>
              <b className="text-white text-[20px]">{props?.categories || 0}</b>
            </div>
            <AiTwotonePieChart className="text-[50px] text-[#fff]" />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default DashboardBoxes;

