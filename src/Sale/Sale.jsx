import { react, useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useParams } from "react-router-dom";
import PaymentModal from "../Component/table";
import generateThermalReceiptPDF from "../utilit/PdfGenerate";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Notification from "../Component/Notification";
import { storeContext } from "../Context/StoreContext";

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

const SaleBills = () => {
  const { users } = useContext(storeContext);

  console.log("bill", users);

  const coustomerDtlState = {
    coustomerName: "",
    coustomerMobileNo: "",
    coustomerPlace: "",
    totalAmt: "",
    paymentType: "",
  };
  const initState = {
    itemCode: "",
    itemName: "",
    qty: "",
    discountAmt: "",
    sellingRate: "",
    mrpPrices: "",
    amount: "",
  };

  const coustomerlist = [
    {
      title: "Customer Name",
      name: "coustomerName",
      dataType: "text",
      onfocus: "()=>setActive(index)",
    },
    {
      title: "Mobile No",
      name: "coustomerMobileNo",
      dataType: "Number",
    },
    {
      title: "Coustomer Place",
      name: "coustomerPlace",
      dataType: "text",
    },
  ];
  const stockDetail = [
    {
      title: "Item Code",
      name: "itemCode",
      dataType: "text",
      value: "",
    },
    {
      title: "Description",
      name: "itemName",
      dataType: "text",
      value: "",
    },
    {
      title: "Qty",
      name: "qty",
      dataType: "number",
      value: "",
    },
    {
      title: "Selling Prices",
      name: "sellingRate",
      dataType: "number",
      value: "",
    },
    {
      title: "Mrp",
      name: "mrpPrices",
      dataType: "number",
      value: "",
    },
    {
      title: "Amt",
      name: "amount",
      dataType: "number",
      value: "",
    },
  ];

  const generateDefaultRows = () => {
    return Array.from({ length: 10 }, (_, index) => ({
      ...initState,
      id: `row-${index + 1}`, // Unique ID for each row
    }));
  };

  const [coustInfo, setCoustInfo] = useState(coustomerDtlState);
  const [billItem, setBillItem] = useState(generateDefaultRows());
  const [suggentBox, setSuggentBox] = useState([]);
  const [error, setError] = useState();
  const [active, setActive] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const { id } = useParams();
  // total amt
  useEffect(() => {
    if (Array.isArray(billItem)) {
      const updateTotalAmount = () => {
        const totalAmount = billItem.reduce((total, item) => {
          return total + (parseFloat(item.amount) || 0);
        }, 0);
        setCoustInfo((prevDetail) => ({
          ...prevDetail,
          totalAmt: totalAmount.toFixed(2),
        }));
      };
      updateTotalAmount();
    }
  }, [billItem]);

  useEffect(() => {
    if (id) {
      const getBillDetail = async () => {
        await axios.get(`http://localhost:4000/sales/${id}`).then((res) => {
          console.log(res.data.data);
          const coustomerDetail = res.data.data;

          if (coustomerDetail && typeof coustomerDetail === "object") {
            setCoustInfo({
              coustomerName: coustomerDetail.coustomerName,
              coustomerPlace: coustomerDetail.coustomerPlace,
              coustomerMobileNo: coustomerDetail.coustomerMobileNo,
            });

            setBillItem(
              coustomerDetail.productDetail.map((item) => ({
                itemCode: item.itemCode,
                itemName: item.itemName,
                qty: item.qty,
                sellingRate: item.sellingRate,
                mrpPrices: item.mrpPrices,
                amount: item.amount,
              })) || []
            );
          }
        });
      };
      getBillDetail();
    }
  }, [id]);

  const handleChange = (rowIndex, e) => {
    const { name, value } = e.target;
    const updateRow = [...billItem];
    updateRow[rowIndex][name] = value;
    setBillItem(updateRow);

    if (updateRow[rowIndex]) {
      updateRow[rowIndex][name] = value;
    }
    if (name === "itemCode") {
      fetchItemCodeSuggent(value);
      setActive(rowIndex);
    }

    if (
      name === "qty" ||
      name === "sellingRate" ||
      name === "gst" ||
      name === "discountAmt"
    ) {
      billItem[rowIndex].amount =
        billItem[rowIndex].qty * billItem[rowIndex].sellingRate;
    }

    const lastRowIndex = billItem.length - 1;
    const allFieldsfilled = Object.values(updateRow[lastRowIndex]).every(
      (field) => field !== "" && field !== null
    );

    if (allFieldsfilled && rowIndex === lastRowIndex) {
      setBillItem((prevRow) => [
        ...prevRow,
        { ...initState, id: `row-${prevRow.length + 1}` },
      ]);
    }
  };

  const handleChangeCoustomerdtl = (e) => {
    const { name, value } = e.target;

    setCoustInfo((prev) => ({ ...prev, [name]: value }));
  };

  const calculateTotalAmt = Array.isArray(billItem)
    ? billItem.reduce((total, item) => {
        return total + (parseFloat(item.amount) || 0);
      }, 0)
    : 0;

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

  const handleItemCodeSelect = (index, suggention) => {
    const { itemCode, itemName, sellingPrices, mrpPrices, qty } = suggention;
    const updatestockDetailList = [...billItem];
    updatestockDetailList[index].itemCode = itemCode;
    updatestockDetailList[index].itemName = itemName;
    updatestockDetailList[index].sellingRate = sellingPrices;
    updatestockDetailList[index].mrpPrices = mrpPrices;
    updatestockDetailList[index].qty = qty;
    setBillItem(updatestockDetailList);
    setSuggentBox([]);
  };

  console.log(coustInfo);

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    const saleEntry = {
      ...coustInfo,
      productDetail: billItem.filter(
        (item) =>
          item.itemCode !== "" && item.qty !== "" && item.sellingRate !== ""
      ),
    };
    // console.log(saleEntry);

    if (id) {
      axios
        .put(`http://localhost:4000/sales/${id}`, saleEntry)
        .then((res) => {
          if (res.status === 200) {
            setCoustInfo(coustomerDtlState);
            setBillItem(generateDefaultRows());
            setModalOpen(false);
            console.log(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post("http://localhost:4000/sales", saleEntry)
        .then((res) => {
          if (res.status === 200) {
            setCoustInfo(coustomerDtlState);
            setBillItem(generateDefaultRows());
            console.log(res.data.data);
            generateThermalReceiptPDF(res.data.data);
            setModalOpen(false);
            // testPDF();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <h1>Sale bill</h1>
      <div className="p-2">
        <form onSubmit={(e) => handleFinalSubmit(e)}>
          <div className="SDtl flex m-3 justify-between text-left">
            {coustomerlist?.map((key) => (
              <div className="flex flex-col">
                <label>{key.title}</label>
                <input
                  type={key.dataType}
                  name={key.name}
                  value={coustInfo[key.name] || ""}
                  onChange={handleChangeCoustomerdtl}
                  className="w-full p-2 border Sborder-gray-200 bg-white text-black rounded"
                />
              </div>
            ))}
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="cuSstomized table">
              <TableHead className="w-full">
                {stockDetail.map((cell) => (
                  <StyledTableCell className="">{cell.title}</StyledTableCell>
                ))}
              </TableHead>
              <TableBody>
                {Array.isArray(billItem) &&
                  billItem.map((row, rowIndex) => (
                    <StyledTableRow key={row.id}>
                      {stockDetail.map((cell, cellIndex) => (
                        <StyledTableCell
                          component="th"
                          scope="row"
                          key={cellIndex}
                          //   className="w-32"
                        >
                          <input
                            type={cell.dataType}
                            placeholder={cell.title}
                            name={cell.name}
                            value={row[cell.name] || ""}
                            onChange={(e) => handleChange(rowIndex, e)}
                            onFocus={
                              cell.name === "itemCode"
                                ? cell.onfocus
                                : undefined
                            }
                            // onFocus={() => setActive(index)}
                            className="w-full p-2 border border-gray-200 bg-white text-black rounded"
                          />

                          {cell.name === "itemCode" &&
                            active === rowIndex &&
                            suggentBox.length > 0 && (
                              <div className="drop-down w-96 bg-white flex flex-col shadow-md rounded max-h-80 overflow-x-10 absolute">
                                {suggentBox?.map((suggention, idx) => (
                                  <div
                                    key={idx}
                                    style={{
                                      padding: "8px",
                                      cursor: "pointer",
                                      backgroundColor:
                                        rowIndex % 2 === 0 ? "#f9f9f9" : "#fff",
                                    }}
                                    className="search-result flex  justify-between m-2"
                                    onClick={() => {
                                      handleItemCodeSelect(
                                        rowIndex,
                                        suggention
                                      );
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
                      ))}
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="flex flex-col items-end justify-end">
            <div className="flex flex-col items-end">
              <h2 className="text-2xl font-semibold mt-5">
                Total Amount:{calculateTotalAmt.toFixed(2)}
              </h2>
              {error && (
                <p style={{ color: "red" }}>
                  Bill Amount and Total Amount must match!
                </p>
              )}
            </div>
            <input
              type="button"
              value="Save.."
              onClick={() => setModalOpen(true)}
              className="m-4  bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {isModalOpen && (
            <PaymentModal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
              totalAmount={calculateTotalAmt}
              onPaymentTypeChange={handleChangeCoustomerdtl}
              onPaymentComplete={handleFinalSubmit}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default SaleBills;
