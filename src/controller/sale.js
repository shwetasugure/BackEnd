const shortid = require("shortid");
const customerDetail = require("../models/customerDetail");
const sale = require("../models/sale");
const vehicalDetail = require("../models/vehicalDetail");
const { createChallen } = require("../lib/pdfkit");
const createLogger = require("../lib/bunyan");
const serviceName = "Sale Service";
const loggers = createLogger(serviceName);

exports.challen = async (req, res) => {
  try {
    loggers.info("This is an information message");
    loggers.warn("This is a warning message");
    const { saleDetail } = req.body;
    req.body.date = new Date();
    req.body._id = `SVU-${shortid.generate()}`;
    let totalAmount = 0;
    saleDetail.forEach((element, index) => {
      const amount = element.quantity * element.rate;
      saleDetail[index].amount = amount;
      totalAmount = totalAmount + amount;
    });
    req.body.totalAmount = totalAmount;
    const _sale = new sale(req.body);
    await _sale.save();
    const pdfData = createChallen(req.body);
    // Set the response headers for PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="challen.pdf"');

    // Stream the PDF data as the response
    pdfData.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: "Something Went Wrong ...!",
    });
  }
};
