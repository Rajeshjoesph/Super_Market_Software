import React, { useEffect, useMemo, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import { RiDeleteBin6Line, RiEdit2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { MaterialReactTable } from "material-react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownWideShort,
  faBars,
  faBarsStaggered,
  faColumns,
  faCompress,
  faDeleteLeft,
  faEdit,
  faEllipsisH,
  faEllipsisVertical,
  faExpand,
  faEyeSlash,
  faFilter,
  faFilterCircleXmark,
  faGripLines,
  faSearch,
  faSearchMinus,
  faSortDown,
  faThumbTack,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { MdDelete } from "react-icons/md";
config.autoAddCss = false;

const fontAwesomeIcons = {
  ArrowDownwardIcon: (props) => (
    <FontAwesomeIcon icon={faSortDown} {...props} />
  ),
  ClearAllIcon: () => <FontAwesomeIcon icon={faBarsStaggered} />,
  DensityLargeIcon: () => <FontAwesomeIcon icon={faGripLines} />,
  DensityMediumIcon: () => <FontAwesomeIcon icon={faBars} />,
  DensitySmallIcon: () => <FontAwesomeIcon icon={faBars} />,
  DragHandleIcon: () => <FontAwesomeIcon icon={faGripLines} />,
  FilterListIcon: (props) => <FontAwesomeIcon icon={faFilter} {...props} />,
  FilterListOffIcon: () => <FontAwesomeIcon icon={faFilterCircleXmark} />,
  FullscreenExitIcon: () => <FontAwesomeIcon icon={faCompress} />,
  FullscreenIcon: () => <FontAwesomeIcon icon={faExpand} />,
  SearchIcon: (props) => <FontAwesomeIcon icon={faSearch} {...props} />,
  SearchOffIcon: () => <FontAwesomeIcon icon={faSearchMinus} />,
  ViewColumnIcon: () => <FontAwesomeIcon icon={faColumns} />,
  MoreVertIcon: () => <FontAwesomeIcon icon={faEllipsisVertical} />,
  MoreHorizIcon: () => <FontAwesomeIcon icon={faEllipsisH} />,
  SortIcon: (props) => (
    <FontAwesomeIcon icon={faArrowDownWideShort} {...props} />
  ),
  PushPinIcon: (props) => <FontAwesomeIcon icon={faThumbTack} {...props} />,
  VisibilityOffIcon: () => <FontAwesomeIcon icon={faEyeSlash} />,
};

const Allproducts = () => {
  const [getdata, Setdata] = useState([]);

  useEffect(() => {
    const productApi = async () => {
      try {
        const res = await axios.get("http://localhost:4000/products");

        if (res.status === 200) {
          Setdata(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    productApi();
  }, []);

  const handledelete = async (id) => {
    console.log(id);

    await axios
      .delete(`http://localhost:4000/productsview/${id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log("delete");
          Setdata((state) => {
            const filterData = state.filter((val) => val._id !== id);
            return filterData;
          });
        }
      })
      .catch((err) => console.log(err));
  };

  console.log("getdata=>", getdata);
  const columns = useMemo(
    () => [
      { accessorKey: "itemCode", header: "Item Code" },
      { accessorKey: "itemName", header: "Item Name" },
      { accessorKey: "manufacturer", header: "Manufacturer" },
      { accessorKey: "sellingPrices", header: "Selling Prices" },
      { accessorKey: "mrpPrices", header: "Mrp Prices" },
      { accessorKey: "gst", header: "Gst" },
      {
        accessorKey: "_id",
        header: "Edit",
        Cell: ({ row }) => (
          <IconButton component={Link} to={`/create/${row.original._id}`}>
            <RiEdit2Fill />
          </IconButton>
        ),
      },
      {
        accessorKey: "status",
        header: "Delate",
        Cell: ({ row }) => (
          <IconButton
            component={Link}
            onClick={() => handledelete(row.original._id)}
          >
            <MdDelete />
          </IconButton>
        ),
      },
    ],

    []
  );

  return (
    <div>
      <h1>All products</h1>
      {getdata.length > 0 ? (
        <MaterialReactTable
          columns={columns}
          data={getdata}
          enableColumnOrdering
          enableColumnPinning
          icons={fontAwesomeIcons}
        />
      ) : (
        <p>No Entry...</p>
      )}

      {/* <div className="">
        <div className="w-1/7 flex justify-evenly border-2 border-gray-600 m-2 p-2">
          <div>ItemCode</div>
          <div>ItemName</div>
          <div>manufacturer</div>
          <div>Encode</div>
        </div>

        {getdata?.map((val) => (
          <div
            key={val._id}
            className="w-1/7 flex justify-evenly border-2 border-gray-600 m-2 p-2"
          >
            <p className="w-26 p-6 bg-red-200">{val.itemCode}</p>
            <p className="w-26 p-6 bg-red-200">{val.itemName}</p>
            <p className="w-26 p-6 bg-red-200">{val.manufacturer}</p>
            <p className="w-26 p-6 bg-red-200">{val.encode}</p>
            <div className="flex ">
              <span>
                <Link to={`/create/${val._id}`}>
                  <FaRegEdit />
                </Link>
              </span>
              <span>
                <RiDeleteBin6Line onClick={() => handledelete(val._id)} />
              </span>
            </div>
          </div>
        ))}
      </div> */}
      <Toaster position="top-right" />
    </div>
  );
};

export default Allproducts;
