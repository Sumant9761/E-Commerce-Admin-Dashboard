import { Button } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { AiOutlineEdit } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
import { MyContext } from "../../App";
import {
  deleteData,
  deleteMultipleData,
  fetchDataFromApi,
} from "../../utils/api";

const columns = [
  { id: "image", label: "IMAGE", minWidth: 100 },
  { id: "action", label: "ACTION", minWidth: 100 },
];

const BannerV1List = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [slidesData, setSlidesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortedIds, setSortedIds] = useState([]);

  const context = useContext(MyContext);

  useEffect(() => {
    getBanners();
  }, [context?.isOpenFullScreenPanel]);

  const getBanners = () => {
    setIsLoading(true);
    fetchDataFromApi("/api/bannerV1").then((res) => {
      setTimeout(() => {
        setSlidesData(res?.data);
        setIsLoading(false);
      }, 300);
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteBanner = (id) => {
    deleteData(`/api/bannerV1/${id}`).then((res) => {
      context.openAlertBox("success", res?.message);
      getBanners();
    });
  };


  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-3">
        <h2 className="text-[18px] font-[600]">Banners List</h2>

        <div className="col w-[25%] ml-auto flex items-center justify-end gap-3">
          <Button
            className="btn-blue !text-white btn-sm"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add BannerV1",
              })
            }
          >
            Add Banner
          </Button>
        </div>
      </div>

      <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    width={column.minWidth}
                    key={column.id}
                    align={column.align}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {slidesData?.length !== 0 &&
                slidesData?.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell width={300}>
                        <div className="flex items-center gap-4 w-[300px]">
                          <div className="img w-full rounded-md overflow-hidden group">
                            <img
                              src={item?.images[0]}
                              className="w-full group-hover:scale-105 transition-all"
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell width={100}>
                        <div className="flex items-center gap-1">
                          <Button
                            className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border 
                          !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]"
                            onClick={() =>
                              context.setIsOpenFullScreenPanel({
                                open: true,
                                model: "Edit BannerV1",
                                id: item?._id,
                              })
                            }
                          >
                            <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                          </Button>

                          <Button
                            className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border 
                          !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]"
                            onClick={() => deleteBanner(item?._id)}
                          >
                            <GoTrash className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={10}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};

export default BannerV1List;
