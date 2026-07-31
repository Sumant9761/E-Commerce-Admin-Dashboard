import React, { useState, PureComponent, useContext } from "react";
import DashboardBoxes from "../../Components/DashboardBoxes";
import { Button } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import Badge from "../../components/Badge";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Progress from "../../Components/ProgressBar";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import Pagination from "@mui/material/Pagination";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { MyContext } from "../../App";

const label = { slotProps: { input: { "aria-label": "Checkbox demo" } } };

const columns = [
  { id: "product", label: "PRODUCT", minWidth: 150 },
  { id: "category", label: "CATEGORY", minWidth: 100 },
  { id: "subcategory", label: "SUB CATEGORY", minWidth: 150 },
  { id: "price", label: "PRICE", minWidth: 130 },
  { id: "sales", label: "SALES", minWidth: 100 },
  { id: "action", label: "ACTION", minWidth: 120 },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const Dashboard = () => {
  const [isOpenOrderedProduct, setIsOpenOrderedProduct] = useState(null);

  const context = useContext(MyContext);

  const isShowOrderedProduct = (index) => {
    if (isOpenOrderedProduct === index) {
      setIsOpenOrderedProduct(null);
    } else {
      setIsOpenOrderedProduct(index);
    }
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [categoryFilterVal, setCategoryFilterVal] = useState("");
  const [chart1Data, setChart1Data] = useState([
    {
      name: "JAN",
      TotalUsers: 4000,
      TotalSales: 2400,
      amt: 2400,
    },
    {
      name: "FEB",
      TotalUsers: 3000,
      TotalSales: 1398,
      amt: 2210,
    },
    {
      name: "MARCH",
      TotalUsers: 2000,
      TotalSales: 9800,
      amt: 2290,
    },
    {
      name: "APRIL",
      TotalUsers: 2780,
      TotalSales: 3908,
      amt: 2000,
    },
    {
      name: "MAY",
      TotalUsers: 1890,
      TotalSales: 4800,
      amt: 2181,
    },
    {
      name: "JUNE",
      TotalUsers: 2390,
      TotalSales: 3800,
      amt: 2500,
    },
    {
      name: "JULY",
      TotalUsers: 3490,
      TotalSales: 4300,
      amt: 2100,
    },
    {
      name: "AUG",
      TotalUsers: 3490,
      TotalSales: 8456,
      amt: 2100,
    },
    {
      name: "SEP",
      TotalUsers: 3490,
      TotalSales: 7856,
      amt: 2100,
    },
    {
      name: "OCT",
      TotalUsers: 3490,
      TotalSales: 5234,
      amt: 2100,
    },
    {
      name: "NOV",
      TotalUsers: 3490,
      TotalSales: 6050,
      amt: 2100,
    },
    {
      name: "DEC",
      TotalUsers: 3490,
      TotalSales: 4596,
      amt: 2100,
    },
  ]);

  const handleChangeCatFilter = (event) => {
    setCategoryFilterVal(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div className="w-full py-2 px-5 border bg-[#f1faff] border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 justify-between rounded-md">
        <div className="info">
          <h1 className="text-[35px] font-bold leading-10 mb-3">
            Good Morning, <br /> Sumant
          </h1>
          <p>
            Here's What happening on your store today. See the statistics at
            once.
          </p>

          <br />
          <Button
            className="btn-blue !capitalize gap-1"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add Product",
              })
            }
          >
            <FaPlus />
            Add Product
          </Button>
        </div>

        <img src="/shop-illustration.webp" className="w-[250px]" />
      </div>

      <DashboardBoxes />

      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[18px] font-[600]">
            Products{" "}
            <span className="font-[400] text-[14px]">(Tailwind CSS Table)</span>
          </h2>
        </div>

        <div className="flex items-center w-full pl-5 justify-between">
          <div className="col w-[20%]">
            <h4 className="font-[600] text-[14px] mb-2">Category By</h4>
            <Select
              className="w-full"
              size="small"
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={categoryFilterVal}
              onChange={handleChangeCatFilter}
              label="Category"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Men</MenuItem>
              <MenuItem value={20}>Women</MenuItem>
              <MenuItem value={30}>Kids</MenuItem>
            </Select>
          </div>

          <div className="col w-[25%] ml-auto flex items-center gap-3">
            <Button className="btn !bg-green-600 !text-white btn-sm">
              Export
            </Button>
            <Button
              className="btn-blue !text-white btn-sm"
              onClick={() =>
                context.setIsOpenFullScreenPanel({
                  open: true,
                  model: "Add Product",
                })
              }
            >
              Add Product
            </Button>
          </div>
        </div>

        <div class="relative overflow-x-auto mt-5 pb-5 bg-neutral-primary-soft shadow-xs rounded-base border border-default">
          <table class="w-full text-sm text-left rtl:text-right text-body">
            <thead class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
              <tr>
                <th scope="col" class="px-6 pr-0 py-3 font-medium" width="10%">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </th>
                <th scope="col" class="px-2 py-3 font-medium whitespace-nowrap">
                  PRODUCT
                </th>
                <th scope="col" class="px-6 py-3 font-medium whitespace-nowrap">
                  CATEGORY
                </th>
                <th scope="col" class="px-6 py-3 font-medium whitespace-nowrap">
                  SUB CATEGORY
                </th>
                <th scope="col" class="px-6 py-3 font-medium whitespace-nowrap">
                  PRICE
                </th>
                <th scope="col" class="px-6 py-3 font-medium whitespace-nowrap">
                  SALES
                </th>
                <th scope="col" class="px-6 py-3 font-medium whitespace-nowrap">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                <td class="px-6 pr-0 py-3">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>

                <td class="px-2 py-2">
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/products/4575">
                        <img
                          src="https://ecme-react.themenate.net/img/products/product-1.jpg"
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>

                    <div className="info w-[75%]">
                      <Link to="/products/4575">
                        <h3 className="font-[500] text-[12px] leading-4 hover:text-primary">
                          VNEED Women Embroidered Rayon Kurta Pant Set | Kurta
                          Set for women
                        </h3>
                      </Link>
                      <span className="text-[12px]">Flörven</span>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-2">Electronics</td>

                <td class="px-6 py-2">Women</td>

                <td class="px-6 py-2">
                  <div className="flex gap-1 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]">
                      $58.00
                    </span>
                    <span className="price text-[14px] font-[600] text-[#3872fa]">
                      $58.00
                    </span>
                  </div>
                </td>

                <td class="px-6 py-2">
                  <p className="text-[14px]">
                    <span className="font-[600]">234</span> sale
                  </p>
                  <Progress value={40} type="error" />
                </td>

                <td class="px-6 py-2">
                  <div className="flex items-center gap-1">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <GoTrash className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>
                  </div>
                </td>
              </tr>

              <tr class="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                <td class="px-6 pr-0 py-3">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>

                <td class="px-2 py-2">
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/products/4575">
                        <img
                          src="https://ecme-react.themenate.net/img/products/product-1.jpg"
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>

                    <div className="info w-[75%]">
                      <Link to="/products/4575">
                        <h3 className="font-[500] text-[12px] leading-4 hover:text-primary">
                          VNEED Women Embroidered Rayon Kurta Pant Set | Kurta
                          Set for women
                        </h3>
                      </Link>
                      <span className="text-[12px]">Flörven</span>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-2">Electronics</td>

                <td class="px-6 py-2">Women</td>

                <td class="px-6 py-2">
                  <div className="flex gap-1 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]">
                      $58.00
                    </span>
                    <span className="price text-[14px] font-[600] text-primary">
                      $58.00
                    </span>
                  </div>
                </td>

                <td class="px-6 py-2">
                  <p className="text-[14px]">
                    <span className="font-[600]">234</span> sale
                  </p>
                  <Progress value={40} type="error" />
                </td>

                <td class="px-6 py-2">
                  <div className="flex items-center gap-1">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <GoTrash className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>
                  </div>
                </td>
              </tr>

              <tr class="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                <td class="px-6 pr-0 py-3">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>

                <td class="px-2 py-2">
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/products/4575">
                        <img
                          src="https://ecme-react.themenate.net/img/products/product-1.jpg"
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>

                    <div className="info w-[75%]">
                      <Link to="/products/4575">
                        <h3 className="font-[500] text-[12px] leading-4 hover:text-primary">
                          VNEED Women Embroidered Rayon Kurta Pant Set | Kurta
                          Set for women
                        </h3>
                      </Link>
                      <span className="text-[12px]">Flörven</span>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-2">Electronics</td>

                <td class="px-6 py-2">Women</td>

                <td class="px-6 py-2">
                  <div className="flex gap-1 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]">
                      $58.00
                    </span>
                    <span className="price text-[14px] font-[600] text-[#3872fa]">
                      $58.00
                    </span>
                  </div>
                </td>

                <td class="px-6 py-2">
                  <p className="text-[14px]">
                    <span className="font-[600]">234</span> sale
                  </p>
                  <Progress value={40} type="error" />
                </td>

                <td class="px-6 py-2">
                  <div className="flex items-center gap-1">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <GoTrash className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>
                  </div>
                </td>
              </tr>

              <tr class="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                <td class="px-6 pr-0 py-3">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>

                <td class="px-2 py-2">
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/products/4575">
                        <img
                          src="https://ecme-react.themenate.net/img/products/product-1.jpg"
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>

                    <div className="info w-[75%]">
                      <Link to="/products/4575">
                        <h3 className="font-[500] text-[12px] leading-4 hover:text-primary">
                          VNEED Women Embroidered Rayon Kurta Pant Set | Kurta
                          Set for women
                        </h3>
                      </Link>
                      <span className="text-[12px]">Flörven</span>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-2">Electronics</td>

                <td class="px-6 py-2">Women</td>

                <td class="px-6 py-2">
                  <div className="flex gap-1 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]">
                      $58.00
                    </span>
                    <span className="price text-[14px] font-[600] text-[#3872fa]">
                      $58.00
                    </span>
                  </div>
                </td>

                <td class="px-6 py-2">
                  <p className="text-[14px]">
                    <span className="font-[600]">234</span> sale
                  </p>
                  <Progress value={40} type="error" />
                </td>

                <td class="px-6 py-2">
                  <div className="flex items-center gap-1">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <GoTrash className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>
                  </div>
                </td>
              </tr>

              <tr class="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                <td class="px-6 pr-0 py-3">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>

                <td class="px-2 py-2">
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/products/4575">
                        <img
                          src="https://ecme-react.themenate.net/img/products/product-1.jpg"
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>

                    <div className="info w-[75%]">
                      <Link to="/products/4575">
                        <h3 className="font-[500] text-[12px] leading-4 hover:text-primary">
                          VNEED Women Embroidered Rayon Kurta Pant Set | Kurta
                          Set for women
                        </h3>
                      </Link>
                      <span className="text-[12px]">Flörven</span>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-2">Electronics</td>

                <td class="px-6 py-2">Women</td>

                <td class="px-6 py-2">
                  <div className="flex gap-1 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]">
                      $58.00
                    </span>
                    <span className="price text-[14px] font-[600] text-[#3872fa]">
                      $58.00
                    </span>
                  </div>
                </td>

                <td class="px-6 py-2">
                  <p className="text-[14px]">
                    <span className="font-[600]">234</span> sale
                  </p>
                  <Progress value={40} type="error" />
                </td>

                <td class="px-6 py-2">
                  <div className="flex items-center gap-1">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <GoTrash className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end pt-4 pb-4 px-4">
          <Pagination count={10} color="primary" />
        </div>
      </div>

      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[18px] font-[600]">
            Products{" "}
            <span className="font-[400] text-[14px]">(Material UI Table)</span>
          </h2>
        </div>

        <div className="flex items-center w-full pl-5 justify-between">
          <div className="col w-[20%]">
            <h4 className="font-[600] text-[14px] mb-2">Category By</h4>
            <Select
              className="w-full"
              size="small"
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={categoryFilterVal}
              onChange={handleChangeCatFilter}
              label="Category"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Men</MenuItem>
              <MenuItem value={20}>Women</MenuItem>
              <MenuItem value={30}>Kids</MenuItem>
            </Select>
          </div>

          <div className="col w-[25%] ml-auto flex items-center gap-3">
            <Button className="btn !bg-green-600 !text-white btn-sm">
              Export
            </Button>
            <Button
              className="btn-blue !text-white btn-sm"
              onClick={() =>
                context.setIsOpenFullScreenPanel({
                  open: true,
                  model: "Add Product",
                })
              }
            >
              Add Product
            </Button>
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
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/products/4575">
                        <img
                          src="https://ecme-react.themenate.net/img/products/product-1.jpg"
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>

                    <div className="info w-[75%]">
                      <Link to="/products/4575">
                        <h3 className="font-[600] text-[12px] leading-4 hover:text-primary">
                          VNEED Women Embroidered Rayon Kurta Pant Set | Kurta
                          Set for women
                        </h3>
                      </Link>
                      <span className="text-[12px]">Flörven</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Electronics
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Women
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex gap-1 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]">
                      $58.00
                    </span>
                    <span className="price text-[14px] font-[600] text-primary">
                      $58.00
                    </span>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="text-[14px]">
                    <span className="font-[600]">234</span> sale
                  </p>
                  <Progress value={40} type="success" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-1">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <GoTrash className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/products/4575">
                        <img
                          src="https://ecme-react.themenate.net/img/products/product-1.jpg"
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>

                    <div className="info w-[75%]">
                      <Link to="/products/4575">
                        <h3 className="font-[600] text-[12px] leading-4 hover:text-primary">
                          VNEED Women Embroidered Rayon Kurta Pant Set | Kurta
                          Set for women
                        </h3>
                      </Link>
                      <span className="text-[12px]">Flörven</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Electronics
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Women
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex gap-1 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]">
                      $58.00
                    </span>
                    <span className="price text-[14px] font-[600] text-primary">
                      $58.00
                    </span>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="text-[14px]">
                    <span className="font-[600]">234</span> sale
                  </p>
                  <Progress value={40} type="success" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-1">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <GoTrash className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/products/4575">
                        <img
                          src="https://ecme-react.themenate.net/img/products/product-1.jpg"
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>

                    <div className="info w-[75%]">
                      <Link to="/products/4575">
                        <h3 className="font-[600] text-[12px] leading-4 hover:text-primary">
                          VNEED Women Embroidered Rayon Kurta Pant Set | Kurta
                          Set for women
                        </h3>
                      </Link>
                      <span className="text-[12px]">Flörven</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Electronics
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Women
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex gap-1 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]">
                      $58.00
                    </span>
                    <span className="price text-[14px] font-[600] text-primary">
                      $58.00
                    </span>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="text-[14px]">
                    <span className="font-[600]">234</span> sale
                  </p>
                  <Progress value={40} type="success" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-1">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <GoTrash className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/products/4575">
                        <img
                          src="https://ecme-react.themenate.net/img/products/product-1.jpg"
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>

                    <div className="info w-[75%]">
                      <Link to="/products/4575">
                        <h3 className="font-[600] text-[12px] leading-4 hover:text-primary">
                          VNEED Women Embroidered Rayon Kurta Pant Set | Kurta
                          Set for women
                        </h3>
                      </Link>
                      <span className="text-[12px]">Flörven</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Electronics
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Women
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex gap-1 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]">
                      $58.00
                    </span>
                    <span className="price text-[14px] font-[600] text-primary">
                      $58.00
                    </span>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="text-[14px]">
                    <span className="font-[600]">234</span> sale
                  </p>
                  <Progress value={40} type="success" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-1">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <GoTrash className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/products/4575">
                        <img
                          src="https://ecme-react.themenate.net/img/products/product-1.jpg"
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>

                    <div className="info w-[75%]">
                      <Link to="/products/4575">
                        <h3 className="font-[600] text-[12px] leading-4 hover:text-primary">
                          VNEED Women Embroidered Rayon Kurta Pant Set | Kurta
                          Set for women
                        </h3>
                      </Link>
                      <span className="text-[12px]">Flörven</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Electronics
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Women
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex gap-1 flex-col">
                    <span className="oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]">
                      $58.00
                    </span>
                    <span className="price text-[14px] font-[600] text-primary">
                      $58.00
                    </span>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="text-[14px]">
                    <span className="font-[600]">234</span> sale
                  </p>
                  <Progress value={40} type="success" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-1">
                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>

                    <Button className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]">
                      <GoTrash className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>
                  </div>
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

      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[18px] font-[600]">Recent Orders</h2>
        </div>

        <div class="relative overflow-x-auto mt-5 pb-5 bg-neutral-primary-soft shadow-xs rounded-base border border-default">
          <table class="w-full text-sm text-left rtl:text-right text-body">
            <thead class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
              <tr>
                <th scope="col" class="px-6 py-3 font-medium whitespace-nowrap">
                  &nbsp;
                </th>
                <th scope="col" class="px-6 py-3 font-medium whitespace-nowrap">
                  Order Id
                </th>
                <th scope="col" class="px-6 py-3 font-medium whitespace-nowrap">
                  Payment Id
                </th>
                <th scope="col" class="px-6 py-3 font-medium whitespace-nowrap">
                  Name
                </th>
                <th scope="col" class="px-6 py-3 font-medium whitespace-nowrap">
                  Phone Number
                </th>
                <th scope="col" class="px-6 py-3 font-medium whitespace-nowrap">
                  Address
                </th>
                <th scope="col" class="px-6 py-3 font-medium whitespace-nowrap">
                  Pincode
                </th>
                <th scope="col" class="px-6 py-3 font-medium whitespace-nowrap">
                  Total amount
                </th>
                <th scope="col" class="px-6 py-3 font-medium whitespace-nowrap">
                  Email
                </th>
                <th scope="col" class="px-6 py-3 font-medium whitespace-nowrap">
                  User Id
                </th>
                <th scope="col" class="px-6 py-3 font-medium whitespace-nowrap">
                  Order Status
                </th>
                <th scope="col" class="px-6 py-3 font-medium whitespace-nowrap">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-neutral-primary border-b border-default">
                <td class="px-6 py-4">
                  <Button
                    className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                    onClick={() => isShowOrderedProduct(0)}
                  >
                    {isOpenOrderedProduct === 0 ? (
                      <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                    ) : (
                      <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                    )}
                  </Button>
                </td>
                <td class="px-6 py-4">
                  <span className="text-[#3872fa] font-[600]">
                    sc24evdfbfvwvb
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span className="text-[#3872fa] font-[600]">fefeewgew</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">Sumant Kumar</td>
                <td class="px-6 py-4">7037366838</td>
                <td class="px-6 py-4">
                  <span className="block w-[300px]">
                    Shyam vatika colony, Surajpur Greater noida
                  </span>
                </td>
                <td class="px-6 py-4">201306</td>
                <td class="px-6 py-4">15000</td>
                <td class="px-6 py-4">sumant@gmail.com</td>
                <td class="px-6 py-4">
                  <span className="text-[#3872fa] font-[600]">
                    dskjvbdhjvbevhbej
                  </span>
                </td>
                <td class="px-6 py-4">
                  <Badge status="delivered" />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">2026-27-07</td>
              </tr>

              {isOpenOrderedProduct === 0 && (
                <tr>
                  <td className="pl-20" colSpan="6">
                    <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                      <table class="w-full text-sm text-left rtl:text-right text-body">
                        <thead class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                          <tr>
                            <th
                              scope="col"
                              class="px-6 py-3 font-medium whitespace-nowrap"
                            >
                              Product Id
                            </th>
                            <th
                              scope="col"
                              class="px-6 py-3 font-medium whitespace-nowrap"
                            >
                              Product Title
                            </th>
                            <th
                              scope="col"
                              class="px-6 py-3 font-medium whitespace-nowrap"
                            >
                              Image
                            </th>
                            <th
                              scope="col"
                              class="px-6 py-3 font-medium whitespace-nowrap"
                            >
                              Quantity
                            </th>
                            <th
                              scope="col"
                              class="px-6 py-3 font-medium whitespace-nowrap"
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              class="px-6 py-3 font-medium whitespace-nowrap"
                            >
                              SubTotal
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="bg-neutral-primary border-b border-default">
                            <td class="px-6 py-4">
                              <span className="text-gray-600">
                                sc24evdfbfvwvb
                              </span>
                            </td>
                            <td class="px-6 py-4">
                              A-Line Kurti with Sharara & Du...
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              <img
                                src="/A-line Kurti.jpg"
                                className="w-[40px] h-[40px] object-cover rounded-md"
                              />
                            </td>
                            <td class="px-6 py-4">2</td>
                            <td class="px-6 py-4">1200</td>
                            <td class="px-6 py-4">1300</td>
                          </tr>

                          <tr class="bg-neutral-primary border-b border-default">
                            <td class="px-6 py-4">
                              <span className="text-gray-600">
                                sc24evdfbfvwvb
                              </span>
                            </td>
                            <td class="px-6 py-4">
                              A-Line Kurti with Sharara & Du...
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              <img
                                src="/A-line Kurti.jpg"
                                className="w-[40px] h-[40px] object-cover rounded-md"
                              />
                            </td>
                            <td class="px-6 py-4">2</td>
                            <td class="px-6 py-4">1200</td>
                            <td class="px-6 py-4">1300</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}

              <tr class="bg-neutral-primary border-b border-default">
                <td class="px-6 py-4">
                  <Button
                    className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                    onClick={() => isShowOrderedProduct(1)}
                  >
                    {isOpenOrderedProduct === 1 ? (
                      <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                    ) : (
                      <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                    )}
                  </Button>
                </td>
                <td class="px-6 py-4">
                  <span className="text-[#3872fa] font-[600]">
                    sc24evdfbfvwvb
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span className="text-[#3872fa] font-[600]">fefeewgew</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">Sumant Kumar</td>
                <td class="px-6 py-4">7037366838</td>
                <td class="px-6 py-4">
                  <span className="block w-[300px]">
                    Shyam vatika colony, Surajpur Greater noida
                  </span>
                </td>
                <td class="px-6 py-4">201306</td>
                <td class="px-6 py-4">15000</td>
                <td class="px-6 py-4">sumant@gmail.com</td>
                <td class="px-6 py-4">
                  <span className="text-[#3872fa] font-[600]">
                    dskjvbdhjvbevhbej
                  </span>
                </td>
                <td class="px-6 py-4">
                  <Badge status="delivered" />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">2026-27-07</td>
              </tr>

              {isOpenOrderedProduct === 1 && (
                <tr>
                  <td className="pl-20" colSpan="6">
                    <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                      <table class="w-full text-sm text-left rtl:text-right text-body">
                        <thead class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                          <tr>
                            <th
                              scope="col"
                              class="px-6 py-3 font-medium whitespace-nowrap"
                            >
                              Product Id
                            </th>
                            <th
                              scope="col"
                              class="px-6 py-3 font-medium whitespace-nowrap"
                            >
                              Product Title
                            </th>
                            <th
                              scope="col"
                              class="px-6 py-3 font-medium whitespace-nowrap"
                            >
                              Image
                            </th>
                            <th
                              scope="col"
                              class="px-6 py-3 font-medium whitespace-nowrap"
                            >
                              Quantity
                            </th>
                            <th
                              scope="col"
                              class="px-6 py-3 font-medium whitespace-nowrap"
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              class="px-6 py-3 font-medium whitespace-nowrap"
                            >
                              SubTotal
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="bg-neutral-primary border-b border-default">
                            <td class="px-6 py-4">
                              <span className="text-gray-600">
                                sc24evdfbfvwvb
                              </span>
                            </td>
                            <td class="px-6 py-4">
                              A-Line Kurti with Sharara & Du...
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              <img
                                src="/A-line Kurti.jpg"
                                className="w-[40px] h-[40px] object-cover rounded-md"
                              />
                            </td>
                            <td class="px-6 py-4">2</td>
                            <td class="px-6 py-4">1200</td>
                            <td class="px-6 py-4">1300</td>
                          </tr>

                          <tr class="bg-neutral-primary border-b border-default">
                            <td class="px-6 py-4">
                              <span className="text-gray-600">
                                sc24evdfbfvwvb
                              </span>
                            </td>
                            <td class="px-6 py-4">
                              A-Line Kurti with Sharara & Du...
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              <img
                                src="/A-line Kurti.jpg"
                                className="w-[40px] h-[40px] object-cover rounded-md"
                              />
                            </td>
                            <td class="px-6 py-4">2</td>
                            <td class="px-6 py-4">1200</td>
                            <td class="px-6 py-4">1300</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5 pb-0">
          <h2 className="text-[18px] font-[600]">Total Users & Total Sales</h2>
        </div>

        <div className="flex items-center px-5 py-5 pt-1 gap-5">
          <span className="flex items-center gap-1 text-[15px]">
            <span className="block w-[8px] h-[8px] rounded-full bg-green-600"></span>
            Total Users
          </span>

          <span className="flex items-center gap-1 text-[15px]">
            <span className="block w-[8px] h-[8px] rounded-full bg-primary"></span>
            Total Sales
          </span>
        </div>

        <LineChart
          width={1000}
          maxWidth={500}
          height={500}
          data={chart1Data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="none" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="TotalSales"
            stroke="#8884d8"
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="TotalUsers"
            stroke="#82ca9d"
            strokeWidth={3}
          />
        </LineChart>
      </div>
    </>
  );
};

export default Dashboard;
