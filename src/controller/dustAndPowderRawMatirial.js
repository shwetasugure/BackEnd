const { objSum } = require("../common-function");
const dustAndPowderRawMatirial = require("../models/dustAndPowderRawMatirial");

exports.dustAndPowderRawMatirial = async (req, res) => {
    try {
        req.body.amount = req.body.quantity * req.body.pricePerQuantity
        const id = req.query.id
        const isExist = await dustAndPowderRawMatirial.findOne({ _id: id }).exec()
        if (isExist) {
            var myquery = { _id: id };
            var newvalues = {
                $set: req.body
            };
            const data = await dustAndPowderRawMatirial.updateOne(myquery, newvalues).exec()
            if (data.nModified === 1) {
                res.status(200).json({
                    Message: "Requested Data Is Successfully Updated...!"
                })
            } else {
                res.status(500).json({
                    Message: "Failed to Update the Data...!"
                })
            }
        }
        else {
            const _dustAndPowderRawMatirial = new dustAndPowderRawMatirial(req.body);
            const data = await _dustAndPowderRawMatirial.save()
            if (data) {
                res.status(200).json({
                    data
                })
            }
            else {
                res.status(data).json({
                    Message: "Failed to Create a Data...!"
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            Message: "Something Went Wrong ...!"
        })
    }
}

exports.getAlldustAndPowderRawMatirial = async (req, res) => {
    try {
        const pageOptions = {
            page: parseInt(req.query.page, 10) || 0,
            limit: parseInt(req.query.limit, 10) || 10
        }
        delete req.query["page"];
        delete req.query["limit"];
        const data = await dustAndPowderRawMatirial.find(req.query)
            .limit(pageOptions.limit)
            .skip(pageOptions.page * pageOptions.limit)
        const allData = await dustAndPowderRawMatirial.find(req.query)
        const totalCount = await dustAndPowderRawMatirial.find(req.query).count()
        if (data && allData) {
            var totalTrip = 0
            var totalaAmount = 0
            if (totalCount > 0) {
                totalTrip = objSum(allData, "quantity")
                totalaAmount = objSum(allData, "amount")
            }
            res.status(200).json({
                data,
                totalCount,
                totalTrip: totalTrip,
                totalaAmount: totalaAmount
            })
        }
    } catch (error) {
        res.status(500).json({
            Message: "Something Went Wrong ...!"
        })
    }
}

exports.getByIddustAndPowderRawMatirial = async (req, res) => {
    try {
        const id = req.query.id
        const data = await dustAndPowderRawMatirial.findById(id)
        if (data) {
            res.status(200).json({
                data
            })
        } else {
            res.status(500).json({
                Message: "Invalied ID...!"
            })
        }
    } catch (error) {
        res.status(500).json({
            Message: "Something Went Wrong ...!"
        })
    }
}
exports.deleteByIddustAndPowderRawMatirial = async (req, res) => {
    try {
        const id = req.query.id
        const data = await dustAndPowderRawMatirial.deleteOne({ _id: id })
        if (data?.deletedCount > 0) {
            res.status(200).json({
                Message: "Requested Data Is Successfully Deleted...!"
            })
        } else {
            res.status(500).json({
                Message: "Invalied ID...!"
            })
        }
    } catch (error) {
        res.status(500).json({
            Message: "Something Went Wrong ...!"
        })
    }
}