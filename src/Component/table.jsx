import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { link } from "material-paper/build/lib/styles/paper.stl";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";

// import { TableVirtuoso } from "react-virtuoso";

const TableHeader = ({ columns }) => {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric ? "right" : "left"}
          className={`${
            column.numeric ? "text-right" : "text-left"
          } bg-gray-100 ${column.width ? `w-${column.width}` : ""}`}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
};

const TableRowContent = ({ columns, row, onDelete }) => {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric ? "rigth" : "left"}
          className={`${column.numeric ? "text-right" : "text-left"}`}
        >
          {column.dataKey !== "edit" ? (
            row[column.dataKey]
          ) : (
            <IconButton
              component={Link}
              to={column.link.replace("_id", row["_id"])}
            >
              <RiEdit2Fill />
            </IconButton>
          )}
          {column.dataKey !== "delete" ? (
            <></>
          ) : (
            <IconButton component={Link} onClick={() => onDelete(row["_id"])}>
              <MdDelete />
            </IconButton>
          )}
        </TableCell>
      ))}
    </React.Fragment>
  );
};

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} className="border-separate table-fixed" />
  ),
  TableHead: React.forwardRef((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: React.forwardRef((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

export { TableHeader, TableRowContent, VirtuosoTableComponents };
