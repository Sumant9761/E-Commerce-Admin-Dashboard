import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

const SearchBox = (props) => {
  const [query, setQuery] = useState("");

  const onChangeInput = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (typeof props?.setSeachQuery === "function") {
      props.setSeachQuery(val);
    }
    if (typeof props?.setSearchQuery === "function") {
      props.setSearchQuery(val);
    }
    if (typeof props?.onChange === "function") {
      props.onChange(val);
    }
  };

  return (
    <div className="w-full h-auto bg-[#f1f1f1] relative overflow-hidden">
      <IoSearch className="absolute top-[13px] left-[10px] z-50 pointer-events-none opacity-80" />
      <input
        type="text"
        className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] bg-[#f1f1f1] p-2 pl-8
        focus:outline-none focus:border-[rgba(0,0,0,0.6)] rounded-md text-[13px]"
        placeholder={props?.placeholder || "Search here..."}
        value={query}
        onChange={onChangeInput}
      />
    </div>
  );
};

export default SearchBox;
