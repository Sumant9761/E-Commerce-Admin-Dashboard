import React, { useState, PureComponent, useContext, useEffect } from "react";
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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { MyContext } from "../../App";
import SearchBox from "../../Components/SearchBox";
import Rating from "@mui/material/Rating";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import CircularProgress from "@mui/material/CircularProgress";
import { deleteData, deleteMultipleData, fetchDataFromApi } from "../../utils/api";

const label = { slotProps: { input: { "aria-label": "Checkbox demo" } } };

const columns = [
  { id: "product", label: "PRODUCT", minWidth: 150 },
  { id: "category", label: "CATEGORY", minWidth: 100 },
  { id: "subcategory", label: "SUB CATEGORY", minWidth: 150 },
  { id: "price", label: "PRICE", minWidth: 130 },
  { id: "sales", label: "SALES", minWidth: 100 },
  { id: "rating", label: "RATING", minWidth: 100 },
  { id: "action", label: "ACTION", minWidth: 120 },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const Dashboard = () => {
  const [isOpenOrderedProduct, setIsOpenOrderedProduct] = useState(null);

  const [ordersData, setOrdersData] = useState([]);
  const [pageOrder, setPageOrder] = useState(1);
  const [seachQuery, setSeachQuery] = useState("");
  const [totalOrdersData, setTotalOrdersData] = useState([]);

  const [usersCount, setUsersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);

  const [chartType, setChartType] = useState("users");
  const [monthlyUsersData, setMonthlyUsersData] = useState([]);
  const [monthlySalesData, setMonthlySalesData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productThirdLevelSubCat, setProductThirdLevelSubCat] = useState("");
  const [productData, setProductData] = useState([]);
  const [productSearchQuery, setProductSearchQuery] = useState("");
  const [sortedIds, setSortedIds] = useState([]);

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

  const context = useContext(MyContext);

  useEffect(() => {
    getProducts();
  }, [context?.isOpenFullScreenPanel]);

  const isShowOrderedProduct = (index) => {
    if (isOpenOrderedProduct === index) {
      setIsOpenOrderedProduct(null);
    } else {
      setIsOpenOrderedProduct(index);
    }
  };

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

  useEffect(() => {
    fetchDataFromApi(`/api/order/order-list?page=${pageOrder}&limit=5`).then(
      (res) => {
        if (res?.error === false) {
          setOrdersData(res);
        }
      },
    );
    fetchDataFromApi("/api/order/order-list").then((res) => {
      if (res?.error === false) {
        setTotalOrdersData(res);
        setOrdersCount(res?.data?.length || 0);
      }
    });
  }, [pageOrder]);

  useEffect(() => {
    fetchDataFromApi("/api/user/getAllUsers").then((res) => {
      if (res?.error === false && res?.users) {
        setUsersCount(res?.users?.length || 0);
      }
    });

    fetchDataFromApi("/api/product/getProductsCount").then((res) => {
      if (res?.error === false && res?.productsCount !== undefined) {
        setProductsCount(res?.productsCount);
      } else if (res?.products?.length) {
        setProductsCount(res?.products?.length);
      }
    });

    fetchDataFromApi("/api/category/get/count").then((res) => {
      if (res?.CategoryCount !== undefined) {
        setCategoryCount(res?.CategoryCount);
      } else if (context?.catData?.length) {
        setCategoryCount(context?.catData?.length);
      }
    });

    fetchDataFromApi("/api/order/users").then((res) => {
      if (res?.TotalUsers) {
        setMonthlyUsersData(res?.TotalUsers);
      }
    });

    fetchDataFromApi("/api/order/sales").then((res) => {
      if (res?.monthlySales) {
        setMonthlySalesData(res?.monthlySales);
      }
    });
  }, []);

  useEffect(() => {
    if (context?.catData?.length) {
      setCategoryCount(context?.catData?.length);
    }
  }, [context?.catData]);

  useEffect(() => {
    // Filters orders based on search query
    if (seachQuery !== "") {
      const filteredOrders = totalOrdersData?.data?.filter(
        (order) =>
          order?._id?.toLowerCase().includes(seachQuery.toLowerCase()) ||
          order?.userId?.name?.toLowerCase().includes(seachQuery.toLowerCase()) ||
          order?.userId?.email?.toLowerCase().includes(seachQuery.toLowerCase()) ||
          order?.createdAt?.includes(seachQuery)
      );
      setOrdersData({ ...totalOrdersData, data: filteredOrders });
    } else {
      fetchDataFromApi(`/api/order/order-list?page=${pageOrder}&limit=5`).then(
        (res) => {
          if (res?.error === false) {
            setOrdersData(res);
          }
        }
      );
    }
  }, [seachQuery, pageOrder]);

  // Handler to toggle all checkboxes
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;

    //Update all items' checked status
    const updatedItems = productData.map((item) => ({
      ...item,
      checked: isChecked,
    }));
    setProductData(updatedItems);

    //Update the sorted IDs state

    if (isChecked) {
      const ids = updatedItems.map((item) => item._id).sort((a, b) => a - b);
      setSortedIds(ids);
    } else {
      setSortedIds([]);
    }
  };

  // Handler to toggle individual checkboxes
  const handleCheckboxChange = (e, id, index) => {
    const updatedItems = productData.map((item) =>
      item._id === id ? { ...item, checked: !item.checked } : item,
    );
    setProductData(updatedItems);

    // Update the sorted IDs state
    const selectedIds = updatedItems
      .filter((item) => item.checked)
      .map((item) => item._id)
      .sort((a, b) => a - b);
    setSortedIds(selectedIds);
  };

  const getProducts = async () => {
    setIsLoading(true);
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      let productArr = [];
      if (res?.error === false) {
        for (let i = 0; i < res?.products?.length; i++) {
          productArr[i] = res?.products[i];
          productArr[i].checked = false;
        }
        setTimeout(() => {
          setProductData(productArr);
          setIsLoading(false);
        }, 300);
      }
    });
  };

  const deleteProduct = (id) => {
    deleteData(`/api/product/${id}`).then((res) => {
      getProducts();
      context?.openAlertBox("success", res?.message || "Product deleted!");
    });
  };

  const deleteMultipleProduct = () => {
    if (sortedIds.length === 0) {
      context?.openAlertBox("error", "Please select products to delete.");
      return;
    }
    try {
      deleteMultipleData("/api/product/deleteMultiple", sortedIds).then((res) => {
        getProducts();
        setSortedIds([]);
        context?.openAlertBox("success", "Products deleted successfully!");
      });
    } catch (error) {
      context?.openAlertBox("error", "Error in deleting products");
    }
  };

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    setProductSubCat("");
    setProductThirdLevelSubCat("");
    setIsLoading(true);
    fetchDataFromApi(
      `/api/product/getAllProductsByCatId/${event.target.value}`,
    ).then((res) => {
      if (res?.error === false) {
        setProductData(res?.products);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    });
  };

  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
    setProductCat("");
    setProductThirdLevelSubCat("");
    setIsLoading(true);
    fetchDataFromApi(
      `/api/product/getAllProductsBySubCatId/${event.target.value}`,
    ).then((res) => {
      if (res?.error === false) {
        setProductData(res?.products);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    });
  };

  const handleChangeProductThirdLevelSubCat = (event) => {
    setProductThirdLevelSubCat(event.target.value);
    setProductCat("");
    setProductSubCat("");
    setIsLoading(true);
    fetchDataFromApi(
      `/api/product/getAllProductsByThirdLevelSubCat/${event.target.value}`,
    ).then((res) => {
      if (res?.error === false) {
        setProductData(res?.products);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    });
  };

  const filteredProducts = productData.filter(
    (item) =>
      item?.name?.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
      item?.brand?.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
      item?.catName?.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
      item?.subCat?.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
      (item?.price && String(item.price).includes(productSearchQuery))
  );

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <>
      <div className="w-full py-2 px-5 border bg-[#f1faff] border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 justify-between rounded-md">
        <div className="info">
          <h1 className="text-[35px] font-bold leading-10 mb-3 capitalize">
            {getGreeting()}, <br /> {context?.userData?.name || "Sumant"}
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

      <DashboardBoxes
        users={usersCount}
        orders={ordersCount || totalOrdersData?.data?.length || 0}
        products={productsCount || productData?.length || 0}
        categories={categoryCount || context?.catData?.length || 0}
      />

      <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center w-full px-5 justify-between gap-4">
          <div className="col w-[15%]">
            <h4 className="font-[600] text-[14px] mb-2">Category By</h4>
            {context?.catData?.length !== 0 && (
              <Select
                style={{ zoom: "80%" }}
                labelId="demo-simple-select-label"
                id="productCatDrop"
                size="small"
                className="w-full"
                value={productCat}
                label="Category"
                onChange={handleChangeProductCat}
              >
                {context?.catData?.map((cat, index) => {
                  return <MenuItem value={cat?._id}>{cat?.name}</MenuItem>;
                })}
              </Select>
            )}
          </div>

          <div className="col w-[15%]">
            <h4 className="font-[600] text-[14px] mb-2">Sub Category By</h4>
            {context?.catData?.length !== 0 && (
              <Select
                style={{ zoom: "80%" }}
                labelId="demo-simple-select-label"
                id="productCatDrop"
                size="small"
                className="w-full"
                value={productSubCat}
                label="Sub Category"
                onChange={handleChangeProductSubCat}
              >
                {context?.catData?.map((cat, index) => {
                  return (
                    cat?.children?.length !== 0 &&
                    cat?.children?.map((subCat, index_) => {
                      return (
                        <MenuItem value={subCat?._id}>{subCat?.name}</MenuItem>
                      );
                    })
                  );
                })}
              </Select>
            )}
          </div>

          <div className="col w-[18%]">
            <h4 className="font-[600] text-[14px] mb-2">
              Third Level Category By
            </h4>
            {context?.catData?.length !== 0 && (
              <Select
                style={{ zoom: "80%" }}
                labelId="demo-simple-select-label"
                id="productCatDrop"
                size="small"
                className="w-full"
                value={productThirdLevelSubCat}
                label="Sub Category"
                onChange={handleChangeProductThirdLevelSubCat}
              >
                {context?.catData?.map((cat) => {
                  return (
                    cat?.children?.length !== 0 &&
                    cat?.children?.map((subCat) => {
                      return (
                        subCat?.children?.length !== 0 &&
                        subCat?.children?.map((thirdLavelCat, index) => {
                          return (
                            <MenuItem value={thirdLavelCat?._id} key={index}>
                              {thirdLavelCat?.name}
                            </MenuItem>
                          );
                        })
                      );
                    })
                  );
                })}
              </Select>
            )}
          </div>

          <div className="col w-[30%] ml-auto flex items-center justify-end gap-3">
            {sortedIds?.length !== 0 && (
              <Button
                variant="contained"
                className="btn-sm"
                size="small"
                color="error"
                onClick={deleteMultipleProduct}
              >
                Delete
              </Button>
            )}
            <div className="w-[70%]">
              <SearchBox setSeachQuery={setProductSearchQuery} placeholder="Search products..." />
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
                      filteredProducts?.length > 0
                        ? filteredProducts.every((item) => item.checked)
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
                filteredProducts?.length !== 0 ? (
                  filteredProducts
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    ?.map((product, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <Checkbox
                            {...label}
                            size="small"
                            checked={product.checked === true ? true : false}
                            onChange={(e) =>
                              handleCheckboxChange(e, product._id, index)
                            }
                          />
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <div className="flex items-center gap-4 w-[300px]">
                            <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                              <Link
                                to={`/product/${product?._id}`}
                                data-discover="true"
                              >
                                <LazyLoadImage
                                  alt={"image"}
                                  effect="blur"
                                  className="w-full group-hover:scale-105 transition-all"
                                  src={product?.images[0]}
                                />
                              </Link>
                            </div>

                            <div className="info w-[75%]">
                              <h3 className="font-[600] text-[12px] leading-4 hover:text-primary">
                                <Link to={`/product/${product?._id}`}>
                                  {product?.name}
                                </Link>
                              </h3>

                              <span className="text-[12px]">
                                {product?.brand}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          {product?.catName}
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          {product?.subCat}
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <div className="flex gap-1 flex-col">
                            <span className="oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]">
                              &#x20b9; {product?.price}
                            </span>
                            <span className="price text-[14px] font-[600] text-primary">
                              &#x20b9; {product?.oldPrice}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <p className="text-[14px]">
                            <span className="font-[600]">{product?.sale}</span>{" "}
                            sale
                          </p>
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <p className="text-[14px]">
                            <Rating
                              name="half-rating"
                              defaultValue={product?.rating}
                              size="small"
                            />
                          </p>
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <div className="flex items-center gap-1">
                            <Button
                              className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] 
                          !rounded-full hover:!bg-[#ccc]"
                              onClick={() =>
                                context.setIsOpenFullScreenPanel({
                                  open: true,
                                  model: "Edit Product",
                                  id: product?._id,
                                })
                              }
                            >
                              <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                            </Button>

                            <Link to={`/product/${product?._id}`}>
                              <Button
                                className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] 
                          !rounded-full hover:!bg-[#ccc]"
                              >
                                <FaRegEye className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                              </Button>
                            </Link>

                            <Button
                              className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] 
                          !rounded-full hover:!bg-[#ccc]"
                              onClick={() => deleteProduct(product?._id)}
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
                    <TableCell colSpan={8} align="center">
                      No products found.
                    </TableCell>
                  </TableRow>
                )
              ) : (
                <TableRow>
                  <TableCell colSpan={8}>
                    <div className="flex items-center justify-center w-full min-h-[400px]">
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
          count={filteredProducts?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>

      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[18px] font-[600]">Recent Orders</h2>
          <div className="w-[25%]">
            <SearchBox
              seachQuery={seachQuery}
              setSeachQuery={setSeachQuery}
              setPageOrder={setPageOrder}
            />
          </div>
        </div>

        <div class="relative overflow-x-auto mt-5 bg-neutral-primary-soft shadow-xs rounded-base border border-default">
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
              {ordersData?.data?.length !== 0 &&
                ordersData?.data?.map((order, index) => {
                  return (
                    <>
                      <tr class="bg-neutral-primary border-b border-default">
                        <td class="px-6 py-4">
                          <Button
                            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                            onClick={() => isShowOrderedProduct(index)}
                          >
                            {isOpenOrderedProduct === index ? (
                              <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                            ) : (
                              <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                            )}
                          </Button>
                        </td>
                        <td class="px-6 py-4">
                          <span className="text-primary">{order?._id}</span>
                        </td>
                        <td class="px-6 py-4">
                          <span className="text-primary">
                            {order?.paymentId
                              ? order?.paymentId
                              : "CASH ON DELIVERY"}
                          </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          {order?.userId?.name}
                        </td>
                        <td class="px-6 py-4">+{order?.userId?.mobile}</td>
                        <td class="px-6 py-4">
                          <span className="block w-[300px]">
                            {order?.delivery_address?.address_line1 +
                              " " +
                              order?.delivery_address?.city +
                              "," +
                              order?.delivery_address?.landmark +
                              "," +
                              order?.delivery_address?.state +
                              " , " +
                              order?.delivery_address?.country +
                              " , " +
                              order?.delivery_address?.mobile}
                          </span>
                        </td>
                        <td class="px-6 py-4">
                          {order?.delivery_address?.pincode}
                        </td>
                        <td class="px-6 py-4">{order?.totalAmt}</td>
                        <td class="px-6 py-4">{order?.userId?.email}</td>
                        <td class="px-6 py-4">
                          <span className="text-primary">
                            {order?.userId?._id}
                          </span>
                        </td>
                        <td class="px-6 py-4">
                          <Badge status={order?.order_status} />
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          {order?.createdAt?.split("T")[0]}
                        </td>
                      </tr>

                      {isOpenOrderedProduct === index && (
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
                                  {order?.products?.map((item, index) => {
                                    return (
                                      <tr class="bg-neutral-primary border-b border-default">
                                        <td class="px-6 py-4">
                                          <span className="text-gray-600">
                                            {item?._id}
                                          </span>
                                        </td>
                                        <td class="px-6 py-4">
                                          <div className="w-[200px]">
                                            {item?.productTitle}
                                          </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                          <img
                                            src={item?.image}
                                            className="w-[60px] h-[80px] object-cover rounded-md"
                                          />
                                        </td>
                                        <td class="px-6 py-4">
                                          {item?.quantity}
                                        </td>
                                        <td class="px-6 py-4">
                                          {item?.price?.toLocaleString(
                                            "en-US",
                                            {
                                              style: "currency",
                                              currency: "INR",
                                            },
                                          )}
                                        </td>
                                        <td class="px-6 py-4">
                                          {item?.subTotal?.toLocaleString(
                                            "en-US",
                                            {
                                              style: "currency",
                                              currency: "INR",
                                            },
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
        {ordersData?.totalPages > 1 && (
          <div className="flex items-center justify-center mt-10 pb-5">
            <Pagination
              showFirstButton
              showLastButton
              count={ordersData?.totalPages}
              page={pageOrder}
              onChange={(e, value) => setPageOrder(value)}
            />
          </div>
        )}
      </div>

      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5 pb-0">
          <h2 className="text-[18px] font-[600]">
            {chartType === "users" ? "Total Users Analytics" : "Total Sales Analytics"}
          </h2>
        </div>

        <div className="flex items-center px-5 py-5 pt-1 gap-5">
          <span
            className={`flex items-center gap-2 text-[15px] cursor-pointer font-[500] px-3 py-1.5 rounded-md transition-all ${
              chartType === "users"
                ? "bg-green-100 text-green-700 font-bold border border-green-300"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setChartType("users")}
          >
            <span className="block w-[10px] h-[10px] rounded-full bg-green-600"></span>
            Total Users
          </span>

          <span
            className={`flex items-center gap-2 text-[15px] cursor-pointer font-[500] px-3 py-1.5 rounded-md transition-all ${
              chartType === "sales"
                ? "bg-blue-100 text-blue-700 font-bold border border-blue-300"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setChartType("sales")}
          >
            <span className="block w-[10px] h-[10px] rounded-full bg-blue-600"></span>
            Total Sales
          </span>
        </div>

        {chartType === "users" ? (
          <BarChart
            width={1000}
            height={500}
            data={monthlyUsersData?.length > 0 ? monthlyUsersData : chart1Data}
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="TotalUsers" fill="#10b981" name="Total Users" radius={[4, 4, 0, 0]} />
          </BarChart>
        ) : (
          <BarChart
            width={1000}
            height={500}
            data={monthlySalesData?.length > 0 ? monthlySalesData : chart1Data}
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalSales" fill="#3872fa" name="Total Sales" radius={[4, 4, 0, 0]} />
          </BarChart>
        )}
      </div>
    </>
  );
};

export default Dashboard;
