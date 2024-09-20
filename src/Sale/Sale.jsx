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
    },
    {
      title: "Description",
      name: "itemName",
      dataType: "text",
    },
    {
      title: "Qty",
      name: "qty",
      dataType: "number",
    },
    {
      title: "Selling Prices",
      name: "sellingRate",
      dataType: "number",
    },
    {
      title: "Mrp",
      name: "mrpPrices",
      dataType: "number",
    },
    {
      title: "Amt",
      name: "amount",
      dataType: "number",
    },
  ];

  const generateDefaultRows = () => {
    return Array.from({ length: 1 }, (_, index) => ({
      ...initState,
      id: `row-${index + 1}`, // Unique ID for each row
    }));
  };

  const [billItem, setBillItem] = useState(generateDefaultRows());
  console.log(billItem);

  const handleChange = (rowIndex, e) => {
    const { name, value } = e.target;
    const updateRow = [...billItem];

    if (updateRow[rowIndex]) {
      updateRow[rowIndex][name] = value;
    }

    setBillItem(updateRow);

    const lastItemField = Object.values(updateRow[rowIndex]).every(
      (field) => field !== "" && field !== null
    );
    if (lastItemField && rowIndex === updateRow.length - 1) {
      setBillItem((prevRow) => [
        ...prevRow,
        { ...initState, id: `row-${prevRow.length + 1}` },
      ]);
    }
  };

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
        </form>
      </div>
    </div>
  );
};

export default SaleBills;
