import React, { useState } from "react";
import { Button } from "@mui/material";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import Badge from "../../components/Badge";
import SearchBox from "../../Components/SearchBox";

const Orders = () => {
  const [isOpenOrderedProduct, setIsOpenOrderedProduct] = useState(null);

  const isShowOrderedProduct = (index) => {
    if (isOpenOrderedProduct === index) {
      setIsOpenOrderedProduct(null);
    } else {
      setIsOpenOrderedProduct(index);
    }
  };

  return (
    <div className="card my-4 shadow-md sm:rounded-lg bg-white">
      <div className="flex items-center justify-between px-5 py-5">
        <h2 className="text-[18px] font-[600]">Recent Orders</h2>
        <div className="w-[40%]">
            <SearchBox />
        </div>
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
  );
};

export default Orders;
