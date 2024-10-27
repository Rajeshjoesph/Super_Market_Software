import { useContext, useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { IconButton } from "@mui/material";
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
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { RiEdit2Fill } from "react-icons/ri";
import { storeContext } from "../Context/StoreContext";
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
  const { noUsers, setNoUsers } = useContext(storeContext);
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   const getUsers = async () => {
  //     await axios.get("http://localhost:4000/users").then((res) => {
  //       console.log(res.data.data);
  //       setUsers(res.data.data);
  //       // console.log("object=>", Object.keys(res.data.data));
  //     });
  //   };
  //   getUsers();
  // }, []);

  const handleDelete = async (id) => {
    console.log(id);

    await axios
      .delete(`http://localhost:4000/users/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setNoUsers((prev) => prev.filter((item) => item._id !== id));
        }
      })
      .catch((err) => console.log(err));
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
          <IconButton component={Link} to={`/users/${row.original._id}`}>
            {/* <button onClick={() => handleEdit(row.original)}> */}
            <RiEdit2Fill />
          </IconButton>
        ),
      },
      {
        accessorKey: "_id",
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
    <>
      {noUsers.length > 0 ? (
        <MaterialReactTable
          columns={columns}
          data={noUsers}
          enableColumnOrdering
          enableColumnPinning
          icons={fontAwesomeIcons}
        />
      ) : (
        <h1>No Data Found....!</h1>
      )}
    </>
  );
};

export default DisplayUsers;
