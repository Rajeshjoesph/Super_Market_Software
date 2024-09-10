import axios from "axios";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import {
  TableHeader,
  TableRowContent,
  VirtuosoTableComponents,
} from "../Component/table";
import { TableVirtuoso } from "react-virtuoso";

const OpenstockDetail = () => {
  const [openStock, setopenStock] = useState([]);

  useEffect(() => {
    const stockApi = async () => {
      try {
        const res = await axios.get("http://localhost:4000/openstock");

        if (res.status === 200) {
          setopenStock(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    stockApi();
  }, []);

  console.log(openStock);
  const columnWidth = 52;

  const columns = [
    { width: columnWidth, label: "ItemCode", dataKey: "itemCode" },
    { width: columnWidth, label: "ItemName", dataKey: "itemName" },
    { width: columnWidth, label: "Selling", dataKey: "sellingPrices" },
    { width: columnWidth, label: "Mrp", dataKey: "mrpPrices" },
    { width: columnWidth, label: "Stock", dataKey: "stockLevel" },

    { width: columnWidth, label: "Encode", dataKey: "encode" },
  ];

  return (
    <div>
      <h1>Open stock </h1>
      <Paper style={{ height: 800, width: "100%" }} className="h-1/4 w-fill">
        {openStock.length > 0 ? (
          <TableVirtuoso
            data={openStock}
            components={VirtuosoTableComponents}
            fixedHeaderContent={() => <TableHeader columns={columns} />}
            itemContent={(index, row) => (
              <TableRowContent columns={columns} row={row} />
            )}
          />
        ) : (
          <p> Loading Data...</p>
        )}
      </Paper>

      {/*
      {openstock?.map((item) => (
        <>
          <p>{item.itemCode}</p>
          <p>{item.itemName}</p>
        </>
      ))} */}
    </div>
  );
};

export default OpenstockDetail;
