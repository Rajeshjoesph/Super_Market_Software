import axios from "axios";
import react, { useEffect, useMemo, useState } from "react";
import Paper from "@mui/material/Paper";
import {
  TableHeader,
  TableRowContent,
  VirtuosoTableComponents,
} from "../Component/table";
import { TableVirtuoso } from "react-virtuoso";
import { RiEdit2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
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
import { IconButton } from "@mui/material";
import { MdDelete } from "react-icons/md";
// import axios from "axios";
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

const ViewBills = () => {
  const [viewBills, setViewBills] = useState([]);

  useEffect(() => {
    const getBills = async () => {
      try {
        const res = await axios.get("http://localhost:4000/sales/");

        if (res.status === 200) {
          setViewBills(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getBills();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4000/sales/${id}`);
      if (res.status === 200) {
        setViewBills((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(viewBills);

  const columns = useMemo(
    () => [
      { accessorKey: "entrydate", header: "Bill Date" },
      { accessorKey: "coustomerName", header: "Customer Name" },
      { accessorKey: "coustomerMobileNo", header: "coustomerMobileNo" },
      { accessorKey: "billNum", header: "Invoice No" },
      { accessorKey: "totalAmt", header: "Total Amt" },
      { accessorKey: "paymentType", header: "Payment Type" },
      {
        header: "Edit",
        Cell: ({ row }) => (
          <IconButton component={Link} to={`/sales/${row.original._id}`}>
            <RiEdit2Fill />
          </IconButton>
        ),
      },
      {
        header: "Delete",
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
      {/* <Paper style={{ height: 800, width: "100%" }}> */}
      {viewBills.length > 0 ? (
        <MaterialReactTable
          columns={columns}
          data={viewBills}
          enableColumnOrdering
          enableColumnPinning
          icons={fontAwesomeIcons}
        />
      ) : (
        // <TableVirtuoso
        //   data={viewBills}
        //   components={VirtuosoTableComponents}
        //   fixedHeaderContent={() => <TableHeader columns={BillColumn} />}
        //   itemContent={(index, row) => (
        //     <TableRowContent
        //       key={index}
        //       columns={BillColumn}
        //       row={row}
        //       onDelete={handleDelete}
        //     />
        //   )}
        // />
        <p>No Entry....</p>
      )}
      {/* </Paper> */}
    </div>
  );
};

export default ViewBills;
