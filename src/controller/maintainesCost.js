const { objSum, phoneNumber } = require("../common-function");
const maintainesCost = require("../models/maintainesCost");
const moment = require("moment/moment");

exports.maintainesCost = async (req, res) => {
  try {
    const id = req.query.id;
    const isExist = await maintainesCost.findOne({ _id: id }).exec();
    if (isExist) {
      var myquery = { _id: id };
      var newvalues = {
        $set: req.body,
      };
      const data = await maintainesCost.updateOne(myquery, newvalues).exec();
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
      const _production = new maintainesCost(req.body);
      const data = await _production.save();
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

exports.getAllmaintainesCost = async (req, res) => {
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

    const data = await maintainesCost
      .find(req.query)
      .limit(pageOptions.limit)
      .skip(pageOptions.page * pageOptions.limit);
    const allData = await maintainesCost.find(req.query);
    const totalCount = await maintainesCost.find(req.query).count();
    if (data && allData) {
      var totalAmount = 0;
      if (totalCount > 0) {
        totalAmount = objSum(allData, "amount");
      }
      res.status(200).json({
        data,
        totalCount,
        totalAmount,
      });
    }
  } catch (error) {
    res.status(500).json({
      Message: "Something Went Wrong ...!",
    });
  }
};

exports.getByIdmaintainesCost = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await maintainesCost.findById(id);
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
exports.deleteByIdmaintainesCost = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await maintainesCost.deleteOne({ _id: id });
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
