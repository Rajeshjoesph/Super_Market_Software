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
import StockDetailTable from "../Component/StockDetailForm";

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

const PurchaseEntry = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const generateDefaultRows = (initstate) => {
    return Array.from({ length: 5 }, (_, index) => ({
      ...initstate,
      id: `row-${index + 1}`, // Unique ID for each row
    }));
  };

  const mainDtl = {
    supplyerName: "",
    supplyerGstNo: "",
    invoiceNo: "",
    billAmt: "",
    totAmt: "",
  };

  const [stockDetail, setstockDetail] = useState([]);
  const [detail, setDetail] = useState(mainDtl);
  const [error, setError] = useState(false);

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

  const handleChangeSupplyDtl = (e) => {
    const { name, value } = e.target;
    setDetail({ ...detail, [name]: value });
    // fetchItemCodeSuggent(detail);
  };

  useEffect(() => {
    if (id) {
      const getPurchaseData = async () => {
        await axios
          .get(`http://localhost:4000/purchaseentry/${id}`)
          .then((res) => {
            setDetail(res.data.data);
            setstockDetail(res.data.data.stockDetail);
            // console.log(res.data.data.stockDetail);
          });
      };
      getPurchaseData();
    }
  }, [id]);

  // submit function
  const handleSubmit = (e) => {
    e.preventDefault();

    const hasError = stockDetail.some((item) => {
      return parseFloat(item.sellingRate) < parseFloat(stockDetail.netcost);
    });

    if (hasError || parseFloat(detail.billAmt) !== parseFloat(detail.totAmt)) {
      setError(true);
      return;
    }
    setError(false);

    const purchaseData = {
      ...detail,
      stockDetail: stockDetail.filter(
        (item) =>
          item.itemCode !== "" && item.qty !== "" && item.costPrices !== ""
      ),
    };
    console.log(stockDetail);

    console.log("purchaseData=>", purchaseData);

    // purchase update
    if (id) {
      axios
        .put(`http://localhost:4000/purchaseentry/${id}`, purchaseData)
        .then((res) => {
          console.log("data update SuccessFully");
          navigate("/PurchaseHistory");
        });
    } else {
      // new purchase
      axios
        .post("http://localhost:4000/purchaseentry", purchaseData)
        .then((res) => {
          if (res.status === 200) {
            setstockDetail(generateDefaultRows());
            setDetail(mainDtl);
            console.log(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <h1>Purchase Entry</h1>
      <div className="p-2">
        <form onSubmit={handleSubmit}>
          <div className="SDtl flex m-3 justify-between text-left">
            <div className="flex flex-col">
              <label> Supplyer Name</label>
              <input
                type="text"
                name="supplyerName"
                value={detail.supplyerName}
                onChange={(e) => handleChangeSupplyDtl(e)}
                // onFocus={() => setActive(null)}
                className="w-full p-2 border border-gray-200 bg-white text-black rounded"
              />
            </div>
            <div className="flex flex-col">
              <label>Gst No</label>
              <input
                type="text"
                name="supplyerGstNo"
                value={detail.supplyerGstNo}
                onChange={(e) => handleChangeSupplyDtl(e)}
                className="w-full p-2 border border-gray-200 bg-white text-black rounded"
              />
            </div>
            <div className="flex flex-col">
              <label> Invoice No</label>
              <input
                type="text"
                name="invoiceNo"
                value={detail.invoiceNo}
                onChange={(e) => handleChangeSupplyDtl(e)}
                className="w-full p-2 border border-gray-200 bg-white text-black rounded"
              />
            </div>
            <div className="flex flex-col">
              <label> Bill Amt</label>
              <input
                type="number"
                name="billAmt"
                value={detail.billAmt}
                onChange={(e) => handleChangeSupplyDtl(e)}
                className="w-full p-2 border border-gray-200 bg-white text-black rounded"
                style={{ borderColor: error ? "red" : "" }}
              />
            </div>
          </div>

          <StockDetailTable
            error={error}
            detail={detail}
            stockDetail={stockDetail}
            setstockDetail={setstockDetail}
            generateDefaultRows={generateDefaultRows}
            handleSubmit={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
};

export default PurchaseEntry;
