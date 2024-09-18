const { objSum } = require("../common-function");
const chemicalRawMatirial = require("../models/chemicalRawMatirial");
const moment = require("moment/moment");

exports.chemicalRawMatirial = async (req, res) => {
  try {
    req.body.amount =
      req.body.pricePerLiter * req.body.noLiter +
      req.body.transportCharge +
      req.body.gstAmount;
    const id = req.query.id;
    const isExist = await chemicalRawMatirial.findOne({ _id: id }).exec();
    if (isExist) {
      var myquery = { _id: id };
      var newvalues = {
        $set: req.body,
      };
      const data = await chemicalRawMatirial
        .updateOne(myquery, newvalues)
        .exec();
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
      const _chemicalRawMatirial = new chemicalRawMatirial(req.body);
      const data = await _chemicalRawMatirial.save();
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
    console.log(error);
    res.status(500).json({
      Message: "Something Went Wrong ...!",
    });
  }
};

exports.getAllchemicalRawMatirial = async (req, res) => {
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
    const data = await chemicalRawMatirial
      .find(req.query)
      .limit(pageOptions.limit)
      .skip(pageOptions.page * pageOptions.limit);
    const allData = await chemicalRawMatirial.find(req.query);
    const totalCount = await chemicalRawMatirial.find(req.query).count();
    var totalSum = 0;
    var totalLiter = 0;
    if (data && allData) {
      if (totalCount > 0) {
        totalSum = objSum(allData, "amount");
        totalLiter = objSum(allData, "noLiter");
      }
      res.status(200).json({
        data,
        totalCount,
        totalAmount: totalSum,
        totalLiter: totalLiter,
      });
    }
  } catch (error) {
    res.status(500).json({
      Message: "Something Went Wrong ...!",
    });
  }
};

exports.getByIdchemicalRawMatirial = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await chemicalRawMatirial.findById(id);
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
exports.deleteByIdchemicalRawMatirial = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await chemicalRawMatirial.deleteOne({ _id: id });
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
