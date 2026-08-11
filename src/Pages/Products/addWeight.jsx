import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";
import { AiOutlineEdit } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
import { MyContext } from "../../App";
import {
  deleteData,
  editData,
  fetchDataFromApi,
  postData,
} from "../../utils/api";


const AddWeight = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState("");

  const context = useContext(MyContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetchDataFromApi("/api/product/productWeight/get").then((res) => {
      if (res?.error === false) {
        setData(res?.data);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (name === "") {
      context.openAlertBox("error", "Please enter product name");
      setIsLoading(false);
      return;
    }

    if (editId === "") {
      postData(`/api/product/productWeight/create`, {
        name: name,
      }).then((res) => {
        if (res?.error === false) {
          context.openAlertBox("success", res?.message);
          setTimeout(() => {
            setIsLoading(false);
            getData();
            setName("");
          }, 300);
        } else {
          context.openAlertBox("error", res?.message);
        }
      });
    } else {
      editData(`/api/product/updateProductWeight/${editId}`, {
        name: name,
      }).then((res) => {
        if (res?.data?.error === false) {
          context.openAlertBox("success", res?.data?.message);
          setTimeout(() => {
            setIsLoading(false);
            getData();
            setName("");
            setEditId("");
          }, 300);
        } else {
          context.openAlertBox("error", res?.data?.message);
        }
      });
    }
  };

  const deleteWeight = (id) => {
    deleteData(`/api/product/productWeight/${id}`).then((res) => {
      getData();
      context.openAlertBox("success", res?.message);
    });
  };

  const editWeight = (id) => {
    fetchDataFromApi(`/api/product/productWeight/${id}`).then((res) => {
      setName(res?.data?.name);
      setEditId(res?.data?._id);
    });
  };

  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-3">
        <h2 className="text-[18px] font-[600]">Add Product WEIGHT</h2>
      </div>

      <div className="card my-4 pt-5 pb-5 shadow-md sm:rounded-lg bg-white w-[65%]">
        <form className="form py-3 p-6" onSubmit={handleSubmit}>
          <div className="col mb-4">
            <h3 className="text-[14px] font-[500] mb-1 text-black">
              Product WEIGHT
            </h3>
            <input
              type="text"
              className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm
                focus:outline-none focus:border-[rgba(0,0,0,0.5)] p-3 text-sm"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <Button type="submit" className="btn-blue btn-lg w-full flex gap-2">
            {isLoading === true ? (
              <CircularProgress color="inherit" />
            ) : (
              <>
                <FaCloudUploadAlt className="text-[25px]" />
                Publish and View
              </>
            )}
          </Button>
        </form>
      </div>

      {data?.length !== 0 && (
        <div className="card my-4 pt-5 pb-5 shadow-md sm:rounded-lg bg-white w-[65%]">
          <div class="relative overflow-x-auto mt-5 pb-5 bg-neutral-primary-soft shadow-xs rounded-base border border-default">
            <table class="w-full text-sm text-left rtl:text-right text-body">
              <thead class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 font-medium whitespace-nowrap"
                    width="60%"
                  >
                    PRODUCT WEIGHT
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 font-medium whitespace-nowrap"
                    width="30%"
                  >
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => {
                  return (
                    <tr
                      class="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default"
                      key={index}
                    >
                      <td class="px-6 py-2">
                        <span className="font-[500]">{item?.name}</span>
                      </td>

                      <td class="px-6 py-2">
                        <div className="flex items-center gap-1">
                          <Button
                            className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] 
                          !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]"
                            onClick={() => editWeight(item?._id)}
                          >
                            <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                          </Button>

                          <Button
                            className="!w-[35px] !h-[35px] !min-w-[35px] bg-[#f1f1f1] 
                          !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#ccc]"
                            onClick={() => deleteWeight(item?._id)}
                          >
                            <GoTrash className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default AddWeight;
