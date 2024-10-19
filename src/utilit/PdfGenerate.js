import { jsPDF } from "jspdf";
import "jspdf-autotable";

const generateThermalReceiptPDF = (salesData) => {
  try {
    console.log("Generating PDF with data:", salesData);

    const doc = new jsPDF({
      orientation: "portait",
      unit: "mm",
      format: [100, 200],
    });

    doc.setFontSize(12);
    doc.text("Super  Market", 30, 10);
    const dateText = `Date:${salesData.entrydate}`;
    const invoiceText = `Invoice No: ${salesData.billNum}`;
    const customerText = salesData.coustomerName
      ? `${salesData.coustomerName}`
      : `MR/Ms:Customer`;
    const addressText = salesData.coustomerMobileNo
      ? `${salesData.coustomerMobileNo}`
      : `XXXXXXXXXX`;

    doc.text(dateText, 5, 20);
    doc.text(invoiceText, 58, 20);
    doc.text(customerText, 5, 28);
    doc.text(addressText, 58, 28);

    doc.setLineDash([2, 1], 2);
    doc.line(2, 35, 99, 35);
    doc.autoTable({
      startY: 36,
      head: [["Product Name", "Quantity", "Price", "Mrp", "Total"]],
      body: salesData.productDetail.map((item) => [
        item.itemName,
        item.qty,
        item.sellingRate,
        item.mrpPrices,
        item.amount,
      ]),
      theme: "plain",
      styles: {
        cellPadding: 2, // General padding for all cells
      },
      margin: { top: 0, left: 1, right: 1 },
    });
    doc.setLineDash([2, 1], 2);
    doc.line(2, 44, 99, 44);
    doc.text(
      `Total: ${salesData.totalAmt.toFixed(2)}`,
      60,
      doc.lastAutoTable.finalY + 20
    );
    doc.text(
      `Payment Type: ${salesData.paymentType}`,
      60,
      doc.lastAutoTable.finalY + 30
    );
    doc.text(
      "Thank You for  Shopping with us",
      5,
      doc.lastAutoTable.finalY + 40
    );
    doc.save(`recepit_${salesData.billNum}.pdf`);
    const pdfBlob = doc.output("blob");
    const pdfURL = URL.createObjectURL(pdfBlob);
    window.open(pdfURL, "_blank");
  } catch (err) {
    console.log("Error generating PDF:", err);
  }
};

export default generateThermalReceiptPDF;
