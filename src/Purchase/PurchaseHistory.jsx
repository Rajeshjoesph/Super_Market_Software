import React, { useEffect, useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import {
  TableHeader,
  TableRowContent,
  VirtuosoTableComponents,
} from "../Component/table";
import { TableVirtuoso } from "react-virtuoso";
import { RiEdit2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

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

  // delete function
  // last step where is id
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/purchaseentry/${id}`
      );
      if (res.status === 200) {
        setViewDetail(veiwDetail.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(veiwDetail);
  const columnWidth = 52;
  const PurchaseColumn = [
    { width: columnWidth, label: "Pur Date", dataKey: "entrydate" },
    { width: columnWidth, label: "Supplyer Name", dataKey: "supplyerName" },
    { width: columnWidth, label: "Invoice No", dataKey: "invoiceNo" },
    { width: columnWidth, label: "Invoice Amt", dataKey: "billAmt" },
    {
      width: columnWidth,
      label: "Edit",
      dataKey: "edit",
      link: `/purchaseentry/_id`,
    },
    {
      width: columnWidth,
      label: "Delete",
      dataKey: "delete",
      link: `/purchaseentry/_id`,
    },
  ];

  return (
    <div>
      <Paper style={{ height: 800, width: "100%" }}>
        {veiwDetail.length > 0 ? (
          <TableVirtuoso
            data={veiwDetail}
            components={VirtuosoTableComponents}
            fixedHeaderContent={() => <TableHeader columns={PurchaseColumn} />}
            itemContent={(index, row) => (
              <TableRowContent
                key={index}
                columns={PurchaseColumn}
                row={row}
                onDelete={handleDelete}
              />
            )}
          />
        ) : (
          <p>LOading Data...</p>
        )}
      </Paper>
    </div>
  );
};
export default PurchaseHistory;
