const { objSum } = require("../common-function");
const cementRawMatirial = require("../models/cementRawMatirial");
const moment = require("moment/moment");

exports.cementRawMatirial = async (req, res) => {
  try {
    req.body.amount =
      req.body.pricePerBag * req.body.quantity + req.body.transportCharge;
    const id = req.query.id;
    const isExist = await cementRawMatirial.findOne({ _id: id }).exec();
    if (isExist) {
      var myquery = { _id: id };
      var newvalues = {
        $set: req.body,
      };
      const data = await cementRawMatirial.updateOne(myquery, newvalues).exec();
      if (data.nModified === 1) {
        res.status(200).json({
          Message: "Requested Data Is Successfully Updated...!",
        });
      } else {
        res.status(500).json({
          Message: "Failed to Update the Data...!",
        });
      }
    } else {
      const _cementRawMatirial = new cementRawMatirial(req.body);
      const data = await _cementRawMatirial.save();
      if (data) {
        res.status(200).json({
          data,
        });
      } else {
        res.status(data).json({
          Message: "Failed to Create a Data...!",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      Message: "Something Went Wrong ...!",
    });
  }
};

exports.getAllcementRawMatirial = async (req, res) => {
  try {
    const pageOptions = {
      page: parseInt(req.query.page, 10) || 0,
      limit: parseInt(req.query.limit, 10) || 10,
    };
    delete req.query["page"];
    delete req.query["limit"];
    if (req?.query?.startDate && req?.query?.endDate) {
      const startDate = new Date(
        moment(req?.query?.startDate).format("YYYY-MM-DD")
      );
      const endDate = new Date(
        moment(req?.query?.endDate).format("YYYY-MM-DD")
      );
      req.query["date"] = { $gte: startDate, $lte: endDate };
      delete req.query["startDate"];
      delete req.query["endDate"];
    }
    const data = await cementRawMatirial
      .find(req.query)
      .limit(pageOptions.limit)
      .skip(pageOptions.page * pageOptions.limit);
    const allData = await cementRawMatirial.find(req.query);
    const totalCount = await cementRawMatirial.find(req.query).count();
    var bagSum = 0;
    var tonSum = 0;
    var amount = 0;
    if (data && allData) {
      if (totalCount > 0) {
        bagSum = objSum(allData, "quantity");
        tonSum = objSum(allData, "numberOfTon");
        amount = objSum(allData, "amount");
      }
      res.status(200).json({
        data,
        totalCount,
        totalBag: bagSum,
        totalTon: tonSum,
        totalSum: amount,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: "Something Went Wrong ...!",
    });
  }
};

exports.getByIdcementRawMatirial = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await cementRawMatirial.findById(id);
    if (data) {
      res.status(200).json({
        data,
      });
    } else {
      res.status(500).json({
        Message: "Invalied ID...!",
      });
    }
  } catch (error) {
    res.status(500).json({
      Message: "Something Went Wrong ...!",
    });
  }
};
exports.deleteByIdcementRawMatirial = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await cementRawMatirial.deleteOne({ _id: id });
    if (data?.deletedCount > 0) {
      res.status(200).json({
        Message: "Requested Data Is Successfully Deleted...!",
      });
    } else {
      res.status(500).json({
        Message: "Invalied ID...!",
      });
    }
  } catch (error) {
    res.status(500).json({
      Message: "Something Went Wrong ...!",
    });
  }
};
