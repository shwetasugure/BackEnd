const { objSum } = require("../common-function");
const flyAshRawMatirial = require("../models/flyAshRawMatirial");

exports.flyAshRawMatirial = async (req, res) => {
    try {
        req.body.amount = req.body.numberOfTon * req.body.pricePerTon
        const id = req.query.id
        const isExist = await flyAshRawMatirial.findOne({ _id: id }).exec()
        if (isExist) {
            var myquery = { _id: id };
            var newvalues = {
                $set: req.body
            };
            const data = await flyAshRawMatirial.updateOne(myquery, newvalues).exec()
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
            const _flyAshRawMatirial = new flyAshRawMatirial(req.body);
            const data = await _flyAshRawMatirial.save()
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

exports.getAllflyAshRawMatirial = async (req, res) => {
    try {
        const pageOptions = {
            page: parseInt(req.query.page, 10) || 0,
            limit: parseInt(req.query.limit, 10) || 10
        }
        delete req.query["page"];
        delete req.query["limit"];
        const data = await flyAshRawMatirial.find(req.query)
            .limit(pageOptions.limit)
            .skip(pageOptions.page * pageOptions.limit)
        const totalCount = await flyAshRawMatirial.find(req.query)
            .limit(pageOptions.limit)
            .skip(pageOptions.page * pageOptions.limit).count()
        if (data) {
            var sum = 0
            if (totalCount > 0) {
                sum = objSum(data, "amount")
            }
            res.status(200).json({
                data,
                totalCount,
                totalflyAshRawMatirial: sum
            })
        }
    } catch (error) {
        res.status(500).json({
            Message: "Something Went Wrong ...!"
        })
    }
}

exports.getByIdflyAshRawMatirial = async (req, res) => {
    try {
        const id = req.query.id
        const data = await flyAshRawMatirial.findById(id)
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
exports.deleteByIdflyAshRawMatirial = async (req, res) => {
    try {
        const id = req.query.id
        const data = await flyAshRawMatirial.deleteOne({ _id: id })
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