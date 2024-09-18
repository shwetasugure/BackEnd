const { objSum, phoneNumber } = require("../common-function");
const customerDetail = require("../models/customerDetail");
const moment = require("moment/moment");

exports.customerDetail = async (req, res) => {
  try {
    const id = req.query.id;
    const isExist = await customerDetail.findOne({ _id: id }).exec();
    // if (phoneNumber(req.body.contactNumber) === false)
    //   return res.status(500).json({ Message: "Invalied Phone Number...!" });
    if (isExist) {
      var myquery = { _id: id };
      var newvalues = {
        $set: req.body,
      };
      const data = await customerDetail.updateOne(myquery, newvalues).exec();
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
      const _production = new customerDetail(req.body);
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
exports.customerAddressDetail = async (req, res) => {
  try {
    const id = req.query.id;
    const action = req.query.action;
    let resp = await customerDetail.findOne({ _id: id }).exec();
    let updatedData = resp;
    const updatedAddress = {
      address: req.body.address,
      price: req.body.price,
    };
    if (action === "create") {
      updatedData?.address.push(updatedAddress);
    } else if (action === "update") {
      const indexOfObject = updatedData?.address.findIndex(
        (x) => x.address === req.body.address
      );
      updatedData?.address.pop(indexOfObject);
      updatedData?.address.push(updatedAddress);
    } else if (action === "delete") {
      const indexOfObject = updatedData?.address.findIndex(
        (x) => x.address === req.body.address
      );
      updatedData?.address.pop(indexOfObject);
    } else {
      res.status(500).json({
        Message: "Invalied Event...!",
      });
    }
    var myquery = { _id: id };
    var newvalues = {
      $set: updatedData,
    };
    const data = await customerDetail.updateOne(myquery, newvalues).exec();
    if (data.nModified === 1) {
      res.status(200).json({
        Message: "Requested Data Is Successfully Updated...!",
      });
    } else {
      res.status(500).json({
        Message: "Failed to Update the Data...!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: "Something Went Wrong ...!",
    });
  }
};

exports.getAllCustomerDetail = async (req, res) => {
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

    const data = await customerDetail
      .find(req.query)
      .limit(pageOptions.limit)
      .skip(pageOptions.page * pageOptions.limit);
    const totalCount = await customerDetail.find(req.query).count();
    if (data) {
      res.status(200).json({
        data,
        totalCount,
      });
    }
  } catch (error) {
    res.status(500).json({
      Message: "Something Went Wrong ...!",
    });
  }
};

exports.getByIdCustomerDetail = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await customerDetail.findById(id);
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
exports.deleteByIdCustomerDetail = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await customerDetail.deleteOne({ _id: id });
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
