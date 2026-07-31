import { Button } from "@mui/material";
import React, { useContext, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import SearchBox from "../../Components/SearchBox";
import { MyContext } from "../../App";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { SlCalender } from "react-icons/sl";

const label = { slotProps: { input: { "aria-label": "Checkbox demo" } } };

const columns = [
  { id: "userImg", label: "USER IMAGE", minWidth: 80 },
  { id: "userName", label: "USER NAME", minWidth: 100 },
  { id: "userEmail", label: "USER EMAIL", minWidth: 150 },
  { id: "userPhone", label: "USER PHONE NO", minWidth: 130 },
  { id: "createdDate", label: "CREATED", minWidth: 130 },
];

const Users = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const context = useContext(MyContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center w-full px-5 justify-between">
          <div className="col w-[40%]">
            <h2 className="text-[18px] font-[600]">
              Users List{" "}
              <span className="font-[400] text-[14px]">
                (Material UI Table)
              </span>
            </h2>
          </div>

          <div className="col w-[40%] ml-auto">
            <SearchBox />
          </div>
        </div>

        <br />

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox {...label} size="small" />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[70px]">
                    <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                      <Link to="/products/4575">
                        <img
                          src="/person.jpg"
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Rahul Kumar
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex items-center gap-2">
                    <MdOutlineMarkEmailRead /> rahul@gmail.com
                  </span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex items-center gap-2">
                    <MdLocalPhone /> +91-8579632560
                  </span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex items-center gap-2">
                    <SlCalender />
                    07-31-2026
                  </span>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[70px]">
                    <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                      <Link to="/products/4575">
                        <img
                          src="/person.jpg"
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Rahul Kumar
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex items-center gap-2">
                    <MdOutlineMarkEmailRead /> rahul@gmail.com
                  </span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex items-center gap-2">
                    <MdLocalPhone /> +91-8579632560
                  </span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex items-center gap-2">
                    <SlCalender />
                    07-31-2026
                  </span>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[70px]">
                    <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                      <Link to="/products/4575">
                        <img
                          src="/person.jpg"
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Rahul Kumar
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex items-center gap-2">
                    <MdOutlineMarkEmailRead /> rahul@gmail.com
                  </span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex items-center gap-2">
                    <MdLocalPhone /> +91-8579632560
                  </span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex items-center gap-2">
                    <SlCalender />
                    07-31-2026
                  </span>
                </TableCell>
              </TableRow>
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

export default Users;
