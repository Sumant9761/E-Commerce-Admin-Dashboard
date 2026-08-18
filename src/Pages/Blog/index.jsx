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
  fetchDataFromApi,
} from "../../utils/api";
import SearchBox from "../../Components/SearchBox";

const columns = [
  { id: "image", label: "IMAGE", minWidth: 100 },
  { id: "title", label: "TITLE", minWidth: 200 },
  { id: "description", label: "DESCRIPTION", minWidth: 300 },
  { id: "action", label: "ACTION", minWidth: 100 },
];

const BlogList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [blogData, setBlogData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const context = useContext(MyContext);

  useEffect(() => {
    getBlogs();
  }, [context?.isOpenFullScreenPanel]);

  const getBlogs = () => {
    setIsLoading(true);
    fetchDataFromApi("/api/blog").then((res) => {
      setTimeout(() => {
        setBlogData(res?.blogs || []);
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

  const deleteBlog = (id) => {
    deleteData(`/api/blog/${id}`).then((res) => {
      context.openAlertBox("success", res?.message);
      getBlogs();
    });
  };

  // Automatic real-time search filter for blogs
  const filteredBlogs = blogData?.filter(
    (item) =>
      item?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-3">
        <h2 className="text-[18px] font-[600]">Blog List</h2>

        <div className="col w-[25%] ml-auto flex items-center justify-end gap-3">
          <Button
            className="btn-blue !text-white btn-sm"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add Blog",
              })
            }
          >
            Add Blog
          </Button>
        </div>
      </div>

      <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center w-full px-5 justify-between pb-3">
          <div className="col w-[40%]">
            <h2 className="text-[18px] font-[600]">Blogs</h2>
          </div>
          <div className="col w-[35%] ml-auto">
            <SearchBox setSeachQuery={setSearchQuery} placeholder="Search blogs..." />
          </div>
        </div>

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
              {filteredBlogs?.length > 0 ? (
                filteredBlogs
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((item, index) => {
                    return (
                      <TableRow key={item._id || index}>
                        <TableCell width={300}>
                          <div className="flex items-center gap-4 w-[300px]">
                            <div className="img w-full rounded-md overflow-hidden group">
                              <img
                                src={item?.images?.[0]}
                                alt={item?.title}
                                className="w-full group-hover:scale-105 transition-all"
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell width={200}>
                          <span className="text-[15px] font-[500]">
                            {item?.title}
                          </span>
                        </TableCell>

                        <TableCell width={300}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item?.description
                                ? item.description.substr(0, 150) + "..."
                                : "",
                            }}
                          ></div>
                        </TableCell>

                        <TableCell width={100}>
                          <div className="flex items-center gap-1">
                            <Button
                              className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border 
                            !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]"
                              onClick={() =>
                                context.setIsOpenFullScreenPanel({
                                  open: true,
                                  model: "Edit Blog",
                                  id: item?._id,
                                })
                              }
                            >
                              <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                            </Button>

                            <Button
                              className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border 
                            !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]"
                              onClick={() => deleteBlog(item?._id)}
                            >
                              <GoTrash className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No blogs found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredBlogs?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};

export default BlogList;
