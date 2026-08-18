import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import Badge from "../../components/Badge";
import SearchBox from "../../Components/SearchBox";
import { editData, fetchDataFromApi } from "../../utils/api";
import { MyContext } from "../../App";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useContext } from "react";

const Orders = () => {
  const [isOpenOrderedProduct, setIsOpenOrderedProduct] = useState(null);
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalOrdersData, setTotalOrdersData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const context = useContext(MyContext);

  const handleChange = (event, id) => {
    setOrderStatus(event.target.value);

    const obj = {
      id: id,
      order_status: event.target.value,
    };
    editData(`/api/order/order-status/${id}`, obj).then((res) => {
      if (res?.data?.error === false) {
        context?.openAlertBox("success", res?.data?.message);
      }
    });
  };

  const isShowOrderedProduct = (index) => {
    if (isOpenOrderedProduct === index) {
      setIsOpenOrderedProduct(null);
    } else {
      setIsOpenOrderedProduct(index);
    }
  };

  useEffect(() => {
    fetchDataFromApi(`/api/order/order-list?page=${page}&limit=5`).then((res) => {
      if (res?.error === false) {
        setOrders(res?.data);
        setTotalOrdersData(res);
      }
    });
  }, [orderStatus, page]);

  useEffect(() => {
    if (searchQuery !== "") {
      fetchDataFromApi("/api/order/order-list").then((res) => {
        if (res?.error === false) {
          const filteredOrders = res?.data?.filter(
            (order) =>
              order?._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              order?.userId?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              order?.userId?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              order?.createdAt?.includes(searchQuery),
          );
          setOrders(filteredOrders);
        }
      });
    } else {
      fetchDataFromApi(`/api/order/order-list?page=${page}&limit=5`).then((res) => {
        if (res?.error === false) {
          setOrders(res?.data);
          setTotalOrdersData(res);
        }
      });
    }
  }, [searchQuery]);

  return (
    <div className="card my-4 shadow-md sm:rounded-lg bg-white">
      <div className="flex items-center justify-between px-5 py-5">
        <h2 className="text-[18px] font-[600]">Recent Orders</h2>
        <div className="w-[40%]">
          <SearchBox setSeachQuery={setSearchQuery} />
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
            {orders?.length !== 0 &&
              orders?.map((order, index) => {
                return (
                  <React.Fragment key={index}>
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
                        <Select
                          value={order?.order_status || orderStatus}
                          onChange={(e) => handleChange(e, order?._id)}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          size="small"
                          className="w-[150px]"
                        >
                          <MenuItem value="pending">Pending</MenuItem>
                          <MenuItem value="confirm">Confirm</MenuItem>
                          <MenuItem value="delivered">Delivered</MenuItem>
                        </Select>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {order?.createdAt?.split("T")[0]}
                      </td>
                    </tr>

                    {isOpenOrderedProduct === index && (
                      <tr>
                        <td className="pl-20" colSpan="12">
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
                                {order?.products?.map((item, idx) => {
                                  return (
                                    <tr
                                      key={idx}
                                      class="bg-neutral-primary border-b border-default"
                                    >
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
                                        {item?.price?.toLocaleString("en-US", {
                                          style: "currency",
                                          currency: "INR",
                                        })}
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
                  </React.Fragment>
                );
              })}
          </tbody>
        </table>
      </div>
      {totalOrdersData?.totalPages > 1 && searchQuery === "" && (
        <div className="flex items-center justify-center mt-10 pb-5">
          <Pagination
            showFirstButton
            showLastButton
            count={totalOrdersData?.totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
          />
        </div>
      )}
    </div>
  );
};

export default Orders;
