import { useEffect, useMemo, useState } from "react";
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
import axios from "axios";
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

const DisplayUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      await axios.get("http://localhost:4000/users").then((res) => {
        console.log(res.data.data);
        setUsers(res.data.data);
        // console.log("object=>", Object.keys(res.data.data));
      });
    };
    getUsers();
  }, []);

  const handleEdit = (row) => {
    console.log("Edit clicked for row:", row);
    // Add your edit logic here
  };

  const handleDelete = async (row, id) => {
    try {
      await axios.delete(`http://localhost:4000/users/:id`).then((res) => {
        console.log(res.data, "Delete");
      });
    } catch (err) {
      console.log(err);
    }
    console.log("Delete clicked for row:", row);
    // Add your delete logic here
  };

  const columns = useMemo(
    () => [
      { accessorKey: "userId", header: "User Id" },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "password", header: "Password" },
      { accessorKey: "role", header: "Role" },
      { accessorKey: "status", header: "Status" },
      {
        accessorKey: "edit",
        header: "Edit",
        Cell: ({ row }) => (
          <button onClick={() => handleEdit(row.original)}>
            <FontAwesomeIcon icon={faEdit} style={{ cursor: "pointer" }} />
          </button>
        ),
      },
      {
        accessorKey: "status",
        header: "Delate",
        Cell: ({ row }) => (
          <button onClick={handleDelete(row.original)}>
            <FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer" }} />
          </button>
        ),
      },
    ],

    []
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={users}
      enableColumnOrdering
      enableColumnPinning
      icons={fontAwesomeIcons}
    />
  );
};

export default DisplayUsers;
