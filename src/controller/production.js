const moment = require("moment/moment");
const { objSum, arrayOfObjectfilter } = require("../common-function");
const production = require("../models/production");

exports.production = async (req, res) => {
  try {
    req.body.date = new Date(moment(req?.body?.date).format("YYYY-MM-DD"));
    const id = req.query.id;
    const isExist = await production.findOne({ _id: id }).exec();
    if (isExist) {
      var myquery = { _id: id };
      var newvalues = {
        $set: req.body,
      };
      const data = await production.updateOne(myquery, newvalues).exec();
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
      const _production = new production(req.body);
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

exports.getAllProduction = async (req, res) => {
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
    const data = await production
      .find(req.query)
      .limit(pageOptions.limit)
      .skip(pageOptions.page * pageOptions.limit);
    const allData = await production.find(req.query);
    const totalCount = await production.find(req.query).count();
    if (data && allData) {
      var totalProduction = 0;
      if (totalCount > 0) {
        totalProduction = objSum(allData, "quantity");
      }
      res.status(200).json({
        data,
        totalCount,
        totalProduction,
      });
    }
  } catch (error) {
    res.status(500).json({
      Message: "Something Went Wrong ...!",
    });
  }
};

exports.getByIdProduction = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await production.findById(id);
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
exports.deleteByIdProduction = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await production.deleteOne({ _id: id });
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
