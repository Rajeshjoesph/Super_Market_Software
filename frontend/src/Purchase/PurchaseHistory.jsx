import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import { RiEdit2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
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

const PurchaseHistory = () => {
  const [veiwDetail, setViewDetail] = useState([]);

  useEffect(() => {
    const recivedata = async () => {
      try {
        const res = await axios.get("http://localhost:4000/purchaseentry");

        if (res.status === 200) {
          setViewDetail(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    recivedata();
  }, []);
  // console.log();

  // delete function
  // last step where is id
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/purchaseentry/${id}`
      );
      if (res.status === 200) {
        setViewDetail((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(veiwDetail);

  const columns = useMemo(
    () => [
      { accessorKey: "entrydate", header: "Pur Date" },
      { accessorKey: "invoiceNo", header: "Invoice No" },
      { accessorKey: "supplyerName", header: "Supplyer Name" },
      { accessorKey: "billAmt", header: "Invoice Amt" },
      { accessorKey: "totAmt", header: "Pur Amt" },
      { accessorKey: "GrnNo", header: "Grn No" },
      {
        accessorKey: "_id",
        header: "Edit",
        Cell: ({ row }) => (
          <IconButton
            component={Link}
            to={`/purchaseentry/${row.original._id}`}
          >
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
            onClick={() => handleDelete(row.original._id)}
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
      {veiwDetail.length > 0 ? (
        <MaterialReactTable
          columns={columns}
          data={veiwDetail}
          enableColumnOrdering
          enableColumnPinning
          icons={fontAwesomeIcons}
        />
      ) : (
        <p>No Entry...</p>
      )}
    </div>
  );
};
export default PurchaseHistory;
