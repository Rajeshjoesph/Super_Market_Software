import { jsPDF } from "jspdf";
import "jspdf-autotable";

const PurchaseAcknowleadgePdf = (purchasrData) => {
  try {
    console.log("purchase data:", purchasrData);
    const doc = new jsPDF();
    doc.text("Super  Market", 5, 10);
    doc.text("GST No:yuyjjhj675587", 25, 10);
    doc.text("NO:MPM Street", 25, 15);

    doc.save("test.pdf");
  } catch (err) {
    console.log(err);
  }
};

export default PurchaseAcknowleadgePdf;
