const shortid = require("shortid");
const customerDetail = require("../models/customerDetail");
const sale = require("../models/sale");
const vehicalDetail = require("../models/vehicalDetail");

exports.challen = async (req, res) => {
  try {
    console.log(req.body);
    const { saleDetail, brickType } = req.body;
    req.body.date = new Date();
    req.body._id = `SVU-${shortid.generate()}`;
    if (brickType === "fourInch") {
      const { fourInch } = saleDetail;
      fourInch.amount = fourInch.quantity * fourInch.rate;
    }
    if (brickType === "sixinch") {
      const { sixInch } = saleDetail;
      sixInch.amount = sixInch.quantity * sixInch.rate;
    }
    if (brickType === "both") {
      const { fourInch, sixInch } = saleDetail;
      fourInch.amount = fourInch.quantity * fourInch.rate;
      sixInch.amount = sixInch.quantity * sixInch.rate;
    }
    const _sale = new sale(req.body);
    const data = await _sale.save();
    if (data) {
      res.status(200).json({
        data,
      });
    } else {
      res.status(data).json({
        Message: "Failed to Create a Data...!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: "Something Went Wrong ...!",
    });
  }
};
