import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import SearchBox from "../../Components/SearchBox";
import { MyContext } from "../../App";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import CircularProgress from "@mui/material/CircularProgress";
import { deleteMultipleData, fetchDataFromApi, postData } from "../../utils/api";

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
  const [userData, setUserData] = useState([]);
  const [sortedIds, setSortedIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const context = useContext(MyContext);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setIsLoading(true);
    fetchDataFromApi("/api/user/getAllUsers").then((res) => {
      if (res?.error === false && res?.users) {
        const usersArr = res.users.map((user) => ({
          ...user,
          checked: false,
        }));
        setUserData(usersArr);
      }
      setIsLoading(false);
    });
  };

  // Handler to toggle all checkboxes
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;

    const updatedItems = userData.map((item) => ({
      ...item,
      checked: isChecked,
    }));
    setUserData(updatedItems);

    if (isChecked) {
      const ids = updatedItems.map((item) => item._id);
      setSortedIds(ids);
    } else {
      setSortedIds([]);
    }
  };

  // Handler to toggle individual checkboxes
  const handleCheckboxChange = (e, id) => {
    const updatedItems = userData.map((item) =>
      item._id === id ? { ...item, checked: !item.checked } : item,
    );
    setUserData(updatedItems);

    const selectedIds = updatedItems
      .filter((item) => item.checked)
      .map((item) => item._id);
    setSortedIds(selectedIds);
  };

  // Delete multiple users
  const deleteMultipleUser = async () => {
    if (sortedIds.length === 0) {
      context.openAlertBox("error", "Please select users to delete.");
      return;
    }
    try {
      const res = await deleteMultipleData("/api/user/deleteMultiple", sortedIds);
      if (res?.error === false || res?.success) {
        getUsers();
        setSortedIds([]);
        context.openAlertBox("success", "Users deleted successfully!");
      } else {
        const postRes = await postData("/api/user/deleteMultiple", { ids: sortedIds });
        if (postRes?.success || postRes?.error === false) {
          getUsers();
          setSortedIds([]);
          context.openAlertBox("success", "Users deleted successfully!");
        } else {
          context.openAlertBox("error", postRes?.message || "Failed to delete users");
        }
      }
    } catch (error) {
      context.openAlertBox("error", "Error in deleting users");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Filter users based on search
  const filteredUsers = userData.filter(
    (user) =>
      user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user?.mobile && String(user.mobile).includes(searchQuery)),
  );

  return (
    <>
      <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center w-full px-5 justify-between">
          <div className="col w-[40%]">
            <h2 className="text-[18px] font-[600]">Users List</h2>
          </div>

          <div className="col w-[50%] ml-auto flex items-center justify-end gap-3">
            {sortedIds?.length !== 0 && (
              <Button
                variant="contained"
                className="btn-sm"
                size="small"
                color="error"
                onClick={deleteMultipleUser}
              >
                Delete
              </Button>
            )}
            <div className="w-[60%]">
              <SearchBox setSeachQuery={setSearchQuery} />
            </div>
          </div>
        </div>

        <br />

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    {...label}
                    size="small"
                    onChange={handleSelectAll}
                    checked={
                      filteredUsers?.length > 0
                        ? filteredUsers.every((item) => item.checked)
                        : false
                    }
                  />
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
              {isLoading === false ? (
                filteredUsers?.length !== 0 ? (
                  filteredUsers
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    ?.map((user, index) => {
                      return (
                        <TableRow key={user._id || index}>
                          <TableCell style={{ minWidth: columns.minWidth }}>
                            <Checkbox
                              {...label}
                              size="small"
                              checked={user.checked === true}
                              onChange={(e) => handleCheckboxChange(e, user._id)}
                            />
                          </TableCell>
                          <TableCell style={{ minWidth: columns.minWidth }}>
                            <div className="flex items-center gap-4 w-[70px]">
                              <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                                <img
                                  src={user?.avatar || "/person.jpg"}
                                  alt={user?.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-all"
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell style={{ minWidth: columns.minWidth }}>
                            {user?.name}
                          </TableCell>
                          <TableCell style={{ minWidth: columns.minWidth }}>
                            <span className="flex items-center gap-2">
                              <MdOutlineMarkEmailRead /> {user?.email}
                            </span>
                          </TableCell>
                          <TableCell style={{ minWidth: columns.minWidth }}>
                            <span className="flex items-center gap-2">
                              <MdLocalPhone /> {user?.mobile ? `+91-${user.mobile}` : "N/A"}
                            </span>
                          </TableCell>
                          <TableCell style={{ minWidth: columns.minWidth }}>
                            <span className="flex items-center gap-2">
                              <SlCalender />
                              {user?.createdAt ? user.createdAt.split("T")[0] : "N/A"}
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No users found.
                    </TableCell>
                  </TableRow>
                )
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>
                    <div className="flex items-center justify-center w-full min-h-[300px]">
                      <CircularProgress color="inherit" />
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredUsers?.length || 0}
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
