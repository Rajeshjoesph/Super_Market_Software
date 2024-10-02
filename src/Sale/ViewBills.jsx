import axios from "axios";
import react, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import {
  TableHeader,
  TableRowContent,
  VirtuosoTableComponents,
} from "../Component/table";
import { TableVirtuoso } from "react-virtuoso";
import { RiEdit2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

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
        setViewBills(viewBills.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(viewBills);
  const columnWidth = 52;
  const BillColumn = [
    { width: columnWidth, label: "Customer Date", dataKey: "entrydate" },
    { width: columnWidth, label: "Customer Name", dataKey: "coustomerName" },
    { width: columnWidth, label: "Customer No", dataKey: "coustomerMobileNo" },
    { width: columnWidth, label: "Invoice No", dataKey: "billNum" },
    { width: columnWidth, label: "Total Amt", dataKey: "totalAmt" },
    {
      width: columnWidth,
      label: "Edit",
      dataKey: "edit",
      link: (id) => `/sales/${id}`,
    },
    {
      width: columnWidth,
      label: "Delete",
      dataKey: "delete",
      link: (id) => `/sales/${id}`,
    },
  ];

  return (
    <div>
      <Paper style={{ height: 800, width: "100%" }}>
        {viewBills.length > 0 ? (
          <TableVirtuoso
            data={viewBills}
            components={VirtuosoTableComponents}
            fixedHeaderContent={() => <TableHeader columns={BillColumn} />}
            itemContent={(index, row) => (
              <TableRowContent
                key={index}
                columns={BillColumn}
                row={row}
                onDelete={handleDelete}
              />
            )}
          />
        ) : (
          <p>No Entry....</p>
        )}
      </Paper>
    </div>
  );
};

export default ViewBills;
