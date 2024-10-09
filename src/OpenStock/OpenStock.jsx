import React, { useContext, useEffect, useMemo, useState } from "react";
import Paper from "@mui/material/Paper";
import {
  TableHeader,
  TableRowContent,
  VirtuosoTableComponents,
} from "../Component/table";
import { TableVirtuoso } from "react-virtuoso";
import { storeContext } from "../Context/StoreContext";
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

const OpenstockDetail = () => {
  const { openStock, getStock, value } = useContext(storeContext);
  // const [openStock, setopenStock] = useState([]);

  useEffect(() => {
    getStock();
  }, []);

  const columns = useMemo(
    () => [
      { accessorKey: "itemCode", header: "ItemCode" },
      { accessorKey: "itemName", header: "ItemName" },
      { accessorKey: "sellingPrices", header: "Selling" },
      { accessorKey: "mrpPrices", header: "Mrp" },
      { accessorKey: "stockLevel", header: "Stock" },
      { accessorKey: "encode", header: "Encode" },
    ],

    []
  );

  return (
    <div>
      <h1>Inventory Details</h1>
      <Paper style={{ height: 800, width: "100%" }} className="h-1/4 w-fill">
        {value.length > 0 ? (
          <MaterialReactTable
            columns={columns}
            data={value}
            enableColumnOrdering
            enableColumnPinning
            icons={fontAwesomeIcons}
          />
        ) : (
          <h1> Loading Data...</h1>
        )}
      </Paper>
    </div>
  );
};

export default OpenstockDetail;
