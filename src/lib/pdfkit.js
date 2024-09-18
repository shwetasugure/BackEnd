const fs = require("fs");
const PDFDocument = require("pdfkit");

function addWatermarkToPage(doc, waterMark) {
  doc.save(); // Save the current state of the document
  doc
    .fontSize(48)
    .fillOpacity(0.3)
    .text(`${waterMark}`, 150, 80, { width: 300, align: "center" });
  doc.restore(); // Restore the document to its previous state
}

function generateHeader(doc, data) {
  doc
    .fontSize(10)
    .text(
      "SAMARTH VEET UDYOG - Fly ash Bricks & Pavers Blocks Manufactures & Sales",
      { align: "center", underline: true }
    )
    .fontSize(8)
    .moveDown(0.5)
    .text(
      "chandak Mala,near SRPF Camp,Vijapur Road Solapur Phone Number - 9923949492, 9011628663",
      {
        align: "center",
        underline: true,
      }
    )
    .moveDown()
    .text(`To - ${data.customerName}, ${data.address} `, {
      align: "center",
      lineBreak: true,
      underline: true,
    })
    .moveDown()
    .text(`Date - ${new Date().toJSON().slice(0, 10)}`, 40, 75, {
      align: "left",
      underline: true,
      continued: true,
    })
    .text(`Challen Number - ${data._id}`, {
      align: "center",
      underline: true,
      continued: true,
    })
    .text(`Vehical Number - ${data.vehicleNumber}`, {
      align: "right",
      underline: true,
    });
}

function generateFooter(doc, data) {
  doc
    .fontSize(10)
    .text("Recieved Sign", 50, 200, {
      align: "left",
      width: 500,
      underline: true,
      continued: true,
    })
    .text("Samarth Veet Udyog", 50, 200, {
      align: "center",
      width: 500,
      underline: true,
      continued: true,
    })
    .fontSize(12)
    .text(`Total - ${data.totalAmount}`, 50, 200, {
      align: "right",
      width: 500,
      underline: true,
    });
}

function generateInvoiceTable(doc, invoice) {
  let i,
    invoiceTableTop = 100;

  for (i = 0; i < invoice.length; i++) {
    const item = invoice[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.brickName,
      item.rate,
      item.quantity,
      item.amount
    );
  }
}

function generateTableRow(doc, y, c1, c2, c3, c4, c5) {
  doc
    .fontSize(8)
    .text(c1, 65, y)
    .moveDown(0.5)
    .moveTo(0 + 50, doc.y)
    .lineTo(doc.page.width - 10, doc.y)
    .stroke()
    .moveDown(0.5)
    .text(c2, 265, y)
    .text(c3, 300, y, { width: 90, align: "right" })
    .text(c4, 410, y, { width: 90, align: "right" });
}
function generateTableHeader(doc, y, c1, c2, c3, c4, c5) {
  const basePosition = 70;
  const style = { width: 90 };
  doc
    .fontSize(10)
    .text(c1, basePosition, y, style)
    .moveDown(0.5)
    .moveTo(0 + 50, doc.y)
    .lineTo(doc.page.width - 10, doc.y, style)
    .stroke()
    .moveDown(0.5)
    .text(c2, basePosition + 200, y, style)
    .text(c3, basePosition + 300, y, style)
    .text(c4, basePosition + 400, y, style);
}
function createChallen(data) {
  let doc = new PDFDocument({ margin: 10, size: "A4" });
  doc.font("Helvetica-Bold");

  generateHeader(doc, data); // Invoke `generateHeader` function.
  const item = data.saleDetail;
  const header = {
    brickName: "Brick Name",
    quantity: "Quantity",
    rate: "Rate",
    amount: "Amount",
  };
  const position = 100;
  generateTableHeader(
    doc,
    position,
    header.brickName,
    header.quantity,
    header.rate,
    header.amount
  );
  addWatermarkToPage(doc, "Client Copy");
  generateInvoiceTable(doc, item);
  generateFooter(doc, data); // Invoke `generateFooter` function.

  // Add a new page
  doc.addPage();
  generateHeader(doc, data);
  generateTableHeader(
    doc,
    position,
    header.brickName,
    header.quantity,
    header.rate,
    header.amount
  );
  addWatermarkToPage(doc, "Own Copy");
  generateInvoiceTable(doc, item);
  generateFooter(doc, data);
  doc.end();
  return doc;
}

module.exports = {
  createChallen,
};
