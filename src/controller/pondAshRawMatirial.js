const { objSum } = require("../common-function");
const pondAshRawMatirial = require("../models/pondAshRawMatirial");
const moment = require("moment/moment");

exports.pondAshRawMatirial = async (req, res) => {
  try {
    const id = req.query.id;
    const isExist = await pondAshRawMatirial.findOne({ _id: id }).exec();
    if (isExist) {
      var myquery = { _id: id };
      var newvalues = {
        $set: req.body,
      };
      const data = await pondAshRawMatirial
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
      const _pondAshRawMatirial = new pondAshRawMatirial(req.body);
      const data = await _pondAshRawMatirial.save();
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

exports.getAllpondAshRawMatirial = async (req, res) => {
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
    const data = await pondAshRawMatirial
      .find(req.query)
      .limit(pageOptions.limit)
      .skip(pageOptions.page * pageOptions.limit);
    const allData = await pondAshRawMatirial.find(req.query);
    const totalCount = await pondAshRawMatirial.find(req.query).count();
    if (data && allData) {
      var totalTon = 0;
      var totalAmount = 0;
      if (totalCount > 0) {
        totalTon = objSum(allData, "numberOfTon");
        totalAmount = objSum(allData, "amount");
      }
      res.status(200).json({
        data,
        totalCount,
        totalTon,
        totalAmount,
      });
    }
  } catch (error) {
    res.status(500).json({
      Message: "Something Went Wrong ...!",
    });
  }
};

exports.getByIdpondAshRawMatirial = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await pondAshRawMatirial.findById(id);
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
exports.deleteByIdpondAshRawMatirial = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await pondAshRawMatirial.deleteOne({ _id: id });
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
