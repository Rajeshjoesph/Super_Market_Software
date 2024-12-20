import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StockDetailTable = ({ detail, error, setDetail, handleSubmit }) => {
  const generateDefaultRows = (initstate) => {
    return Array.from({ length: 5 }, (_, index) => ({
      ...initstate,
      id: `row-${index + 1}`, // Unique ID for each row
    }));
  };

  const initstate = {
    itemCode: "",
    itemName: "",
    qty: "",
    costPrices: "",
    gst: "",
    discountAmt: "",
    sellingRate: "",
    mrpPrices: "",
    netcost: "",
    amount: "",
  };
  const [stockDetail, setstockDetail] = useState(
    generateDefaultRows(initstate)
  );

  const [suggentBox, setSuggentBox] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (Array.isArray(stockDetail)) {
      const updateTotalAmount = () => {
        const totalAmount = stockDetail.reduce((total, item) => {
          return total + (parseFloat(item.amount) || 0); // Ensure to parse amount as float and handle empty values
        }, 0);
        setDetail((prevDetail) => ({
          ...prevDetail,
          totAmt: totalAmount.toFixed(2), // Update totAmt in detail state
        }));
      };
      updateTotalAmount();
    }
  }, [stockDetail]);

  const fetchItemCodeSuggent = async (query) => {
    if (query.length > 1) {
      try {
        const response = await axios.get("http://localhost:4000/openstock");
        const itemResult = response.data.data;
        const list = itemResult.filter((dbvalue) =>
          dbvalue.itemName
            .toString()
            .toLowerCase()
            .includes(query.toLowerCase())
        );
        setSuggentBox(list);
      } catch (error) {
        console.error("Error fetching item codes:", error);
      }
    } else {
      setSuggentBox([]); // Close the suggestion box if the query is empty
    }
  };

  // drop down select
  const handleItemCodeSelect = (index, suggention) => {
    const { itemCode, itemName, sellingPrices, mrpPrices, qty } = suggention;
    const updatestockDetailList = [...stockDetail];
    updatestockDetailList[index].itemCode = itemCode;
    updatestockDetailList[index].itemName = itemName;
    updatestockDetailList[index].sellingRate = sellingPrices;
    updatestockDetailList[index].mrpPrices = mrpPrices;
    updatestockDetailList[index].qty = qty;
    setstockDetail(updatestockDetailList);
    setSuggentBox([]);
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;

    const updatestockDetailList = [...stockDetail];
    updatestockDetailList[index][name] = value;
    setstockDetail(updatestockDetailList);

    if (name === "itemCode") {
      fetchItemCodeSuggent(value);
      setActive(index);
    }

    if (
      name === "qty" ||
      name === "costPrices" ||
      name === "gst" ||
      name === "discountAmt"
    ) {
      const qty = updatestockDetailList[index].qty || 0;
      const costPrices = updatestockDetailList[index].costPrices || 0;
      const gst = updatestockDetailList[index].gst || 0;
      const discountAmt = updatestockDetailList[index].discountAmt || 0;
      updatestockDetailList[index].netcost = qty * costPrices;
      const gstAmt = (updatestockDetailList[index].netcost * gst) / 100;
      updatestockDetailList[index].amount =
        updatestockDetailList[index].netcost + gstAmt - discountAmt;
    }

    //  const isLastRow=index===stockDetail.length-1;
    const lastItemField = Object.values(updatestockDetailList[index]).every(
      (field) => field !== "" && field !== null
    );
    if (lastItemField && index === stockDetail.length - 1) {
      setstockDetail((prevStockDetail) => [
        ...prevStockDetail,
        { ...initstate, id: `row-${prevStockDetail.length + 1}` },
      ]);
    }
  };
  // calculate tot net Amt
  const calculateTotalNetCost = Array.isArray(stockDetail)
    ? stockDetail.reduce((total, item) => {
        return total + (parseFloat(item.netcost) || 0);
      }, 0)
    : 0;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead className="w-full">
            <TableRow>
              <StyledTableCell className="w-2">Item Code</StyledTableCell>
              <StyledTableCell className="w-12 bg-green-800">
                Description
              </StyledTableCell>
              <StyledTableCell className="w-7">Qty</StyledTableCell>
              <StyledTableCell className="w-3">Cost</StyledTableCell>
              <StyledTableCell className="w-20">Gst</StyledTableCell>
              <StyledTableCell className="w-20">Discount</StyledTableCell>
              <StyledTableCell className="w-20">Net Cost</StyledTableCell>
              <StyledTableCell className="w-3">Selling Price</StyledTableCell>
              <StyledTableCell className="w-20">Mrp</StyledTableCell>
              <StyledTableCell className="w-20">Amt</StyledTableCell>
            </TableRow>
          </TableHead>

          {stockDetail?.map((stockDetail, index) => (
            // <>
            <TableBody key={index}>
              <StyledTableRow>
                <StyledTableCell
                  component="th"
                  scope="row"
                  //   className="w-32"
                >
                  <input
                    type="text"
                    placeholder="item Code"
                    name="itemCode"
                    value={stockDetail.itemCode}
                    onChange={(e) => handleChange(index, e)}
                    onFocus={() => setActive(index)}
                    className="w-full p-2 border border-gray-200 bg-white text-black rounded"
                  />

                  {active === index && suggentBox.length > 0 && (
                    <div className="drop-down w-96 bg-white flex flex-col shadow-md rounded max-h-80 overflow-x-10 absolute">
                      {suggentBox?.map((suggention, idx) => (
                        <div
                          key={idx}
                          style={{
                            padding: "8px",
                            cursor: "pointer",
                            backgroundColor:
                              index % 2 === 0 ? "#f9f9f9" : "#fff",
                          }}
                          className="search-result flex  justify-between m-2"
                          onClick={() => {
                            handleItemCodeSelect(index, suggention);
                          }}
                        >
                          <p>{suggention.itemCode}</p>
                          <p>{suggention.itemName}</p>
                          <p>{suggention.sellingRate} </p>
                          <p>{suggention.mrpPrices}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </StyledTableCell>
                <StyledTableCell>
                  <input
                    type="text"
                    placeholder="Item Name"
                    name="itemName"
                    value={stockDetail.itemName}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-2 border border-gray-200 bg-white text-black rounded"
                    disabled={true}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <input
                    type="number"
                    placeholder="Qty"
                    name="qty"
                    value={stockDetail.qty}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-2 border border-gray-200 bg-white text-black rounded"
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <input
                    type="number"
                    placeholder="Cost Price"
                    name="costPrices"
                    value={stockDetail.costPrices}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-2 border border-gray-200 bg-white text-black rounded"
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <input
                    type="number"
                    placeholder="Gst Code"
                    name="gst"
                    value={stockDetail.gst}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-2 border border-gray-200 bg-white text-black rounded"
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <input
                    type="number"
                    placeholder="Discount value"
                    name="discountAmt"
                    value={stockDetail.discountAmt}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-2 border border-gray-200 bg-white text-black rounded"
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <input
                    type="number"
                    placeholder="Net cost "
                    name="netcost"
                    value={stockDetail.netcost}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-2 border border-gray-200 bg-white text-black rounded"
                    style={{ borderColor: error ? "red" : "" }}
                    disabled={true}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <input
                    type="number"
                    placeholder="Selling Price "
                    name="sellingRate"
                    value={stockDetail.sellingRate}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-2 border border-gray-200 bg-white text-black rounded"
                    style={{ borderColor: error ? "red" : "" }}
                    // disabled={true}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <input
                    type="number"
                    placeholder="Mrp"
                    name="mrpPrices"
                    value={stockDetail.mrpPrices}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-2 border border-gray-200 bg-white text-black rounded"
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <input
                    type="number"
                    placeholder="Amount"
                    name="amount"
                    value={stockDetail.amount}
                    className="w-full p-2 border border-gray-200 bg-white text-black rounded"
                    onChange={(e) => handleChange(index, e)}
                    disabled={true}
                  />
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
            // </>
          ))}
        </Table>
      </TableContainer>
      <div className="flex flex-col items-end justify-end">
        <div className="flex flex-col items-end">
          <h2 className="text-lg font-semibold">
            Net Amount: {calculateTotalNetCost.toFixed(2)}
          </h2>
          <h2 className="text-lg font-semibold">
            Total Amount: {detail.totAmt}
          </h2>
          {error && (
            <p style={{ color: "red" }}>
              Bill Amount and Total Amount must match!
            </p>
          )}
        </div>

        <button
          type="submit"
          className="m-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Register
        </button>
      </div>
    </>
  );
};

export default StockDetailTable;

<StockDetailTable
  error={error}
  detail={detail}
  setDetail={setDetail}
  stockDetail={stockDetail}
  setstockDetail={setstockDetail}
  generateDefaultRows={generateDefaultRows}
  handleSubmit={handleSubmit}
/>;
