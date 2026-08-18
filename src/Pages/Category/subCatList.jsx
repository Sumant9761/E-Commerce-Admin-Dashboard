import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import { MyContext } from "../../App";
import { FaAngleDown } from "react-icons/fa6";
import EditSubCatBox from "./editSubCatBox";
import SearchBox from "../../Components/SearchBox";

const SubCategoryList = () => {
  const [isOpen, setIsOpen] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const context = useContext(MyContext);

  const expend = (index) => {
    if (isOpen === index) {
      setIsOpen(null);
    } else {
      setIsOpen(index);
    }
  };

  // Automatic real-time search filter for subcategories
  const filteredCatData = context?.catData?.filter((cat) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchesCat = cat?.name?.toLowerCase().includes(q);
    const matchesSubCat = cat?.children?.some(
      (sub) =>
        sub?.name?.toLowerCase().includes(q) ||
        sub?.children?.some((third) => third?.name?.toLowerCase().includes(q))
    );
    return matchesCat || matchesSubCat;
  });

  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-3">
        <h2 className="text-[18px] font-[600]">Sub Category List</h2>

        <div className="col w-[45%] ml-auto flex items-center justify-end gap-3">
          <div className="w-[60%]">
            <SearchBox setSeachQuery={setSearchQuery} placeholder="Search sub categories..." />
          </div>
          <Button
            className="btn-blue !text-white btn-sm"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add Sub Category",
              })
            }
          >
            Add Sub Category
          </Button>
        </div>
      </div>

      <div className="card my-4 pt-5 pb-5 px-5 shadow-md sm:rounded-lg bg-white">
        {filteredCatData?.length > 0 ? (
          <ul className="w-full">
            {filteredCatData?.map((firstLavelCat, index) => {
              const isSearching = searchQuery.trim() !== "";
              const shouldOpen = isSearching || isOpen === index;
              return (
                <li className="w-full mb-1" key={firstLavelCat._id || index}>
                  <div className="flex items-center w-full p-2 bg-[#f1f1f1] rounded-sm px-4">
                    <span className="font-[500] flex items-centern gap-4 text-[14px]">
                      {firstLavelCat?.name}
                    </span>
                    <Button
                      className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black !ml-auto"
                      onClick={() => expend(index)}
                    >
                      <FaAngleDown />
                    </Button>
                  </div>

                  {shouldOpen && (
                    <>
                      {firstLavelCat?.children?.length !== 0 && (
                        <ul className="w-full">
                          {firstLavelCat?.children?.map((subCat, index_) => {
                            return (
                              <li className="w-full py-1" key={subCat._id || index_}>
                                <EditSubCatBox
                                  name={subCat?.name}
                                  id={subCat?._id}
                                  catData={context?.catData}
                                  index={index_}
                                  selectedCat={subCat?.parentId}
                                  selectedCatName={subCat?.parentCatName}
                                />

                                {subCat?.children?.length !== 0 && (
                                  <ul className="pl-4">
                                    {subCat?.children?.map(
                                      (thirdLevel, index__) => {
                                        return (
                                          <li
                                            key={thirdLevel._id || index__}
                                            className="w-full hover:bg-[#f1f1f1]"
                                          >
                                            <EditSubCatBox
                                              name={thirdLevel?.name}
                                              id={thirdLevel?._id}
                                              catData={firstLavelCat?.catData}
                                              index={index__}
                                              selectedCat={thirdLevel?.parentId}
                                              selectedCatName={
                                                thirdLevel?.parentCatName
                                              }
                                            />
                                          </li>
                                        );
                                      }
                                    )}
                                  </ul>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="p-4 text-center text-gray-500">No sub categories found.</div>
        )}
      </div>
    </>
  );
};

export default SubCategoryList;
