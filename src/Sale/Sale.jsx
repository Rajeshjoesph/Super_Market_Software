import { react, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
  const coustomerDtlState = {
    customerName: "",
    coustomerMobileNo: "",
    coustomerPlace: "",
    totalAmt: "",
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
      name: "customerName",
      dataType: "text",
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
      dataType: "number",
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
    return Array.from({ length: 2 }, (_, index) => ({
      ...initState,
      id: `row-${index + 1}`, // Unique ID for each row
    }));
  };

  const [billItem, setBillItem] = useState(generateDefaultRows());
  const [error, setError] = useState();

  const handleChange = (rowIndex, e) => {
    const { name, value } = e.target;
    const updateRow = [...billItem];

    if (updateRow[rowIndex]) {
      updateRow[rowIndex][name] = value;
    }

    setBillItem(updateRow);

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
    console.log("amount:", updateRow[rowIndex].amount);
  };
  // console.log(calculateAmt);
  // const calculateAmt = billItem.qty * billItem.sellingRate;>?

  const calculateTotalAmt = Array.isArray(billItem)
    ? billItem.reduce((total, item) => {
        return total + (parseFloat(item.amount) || 0);
      }, 0)
    : 0;

  return (
    <div>
      <h1>Sale bill</h1>
      <div className="p-2">
        <form>
          <div className="SDtl flex m-3 justify-between text-left">
            {coustomerlist?.map((key) => (
              <div className="flex flex-col">
                <label>{key.title}</label>
                <input
                  type={key.dataType}
                  name={key.name}
                  className="w-full p-2 border border-gray-200 bg-white text-black rounded"
                />
              </div>
            ))}
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead className="w-full">
                {stockDetail.map((cell) => (
                  <StyledTableCell className="">{cell.title}</StyledTableCell>
                ))}
              </TableHead>
              <TableBody>
                {billItem.map((row, rowIndex) => (
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
                          // onFocus={() => setActive(index)}
                          className="w-full p-2 border border-gray-200 bg-white text-black rounded"
                        />
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="flex flex-col items-end justify-end">
            <div className="flex flex-col items-end">
              <h2 className="text-lg font-semibold">
                Net Amount: {calculateTotalAmt.toFixed(2)}
              </h2>
              <h2 className="text-lg font-semibold">Total Amount:</h2>
              {error && (
                <p style={{ color: "red" }}>
                  Bill Amount and Total Amount must match!
                </p>
              )}
            </div>
            <button
              type="submit"
              className="m-4  bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaleBills;
