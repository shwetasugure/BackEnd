const { objSum } = require("../common-function");
const dailyTransportDetail = require("../models/dailyTransportDetail");

exports.dailyTransportDetail = async (req, res) => {
    try {
        req.body.amount = req.body.perTrip * req.body.trip
        const id = req.query.id
        const isExist = await dailyTransportDetail.findOne({ _id: id }).exec()
        if (isExist) {
            var myquery = { _id: id };
            var newvalues = {
                $set: req.body
            };
            const data = await dailyTransportDetail.updateOne(myquery, newvalues).exec()
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
            const _dailyTransportDetail = new dailyTransportDetail(req.body);
            const data = await _dailyTransportDetail.save()
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

exports.getAlldailyTransportDetail = async (req, res) => {
    try {
        const pageOptions = {
            page: parseInt(req.query.page, 10) || 0,
            limit: parseInt(req.query.limit, 10) || 10
        }
        delete req.query["page"];
        delete req.query["limit"];
        const data = await dailyTransportDetail.find(req.query)
            .limit(pageOptions.limit)
            .skip(pageOptions.page * pageOptions.limit)
        const totalCount = await dailyTransportDetail.find(req.query)
            .limit(pageOptions.limit)
            .skip(pageOptions.page * pageOptions.limit).count()
        if (data) {
            var sum = 0
            if (totalCount > 0) {
                sum = objSum(data, "quantity")
            }
            res.status(200).json({
                data,
                totalCount,
                totaldailyTransportDetail: sum
            })
        }
    } catch (error) {
        res.status(500).json({
            Message: "Something Went Wrong ...!"
        })
    }
}

exports.getByIddailyTransportDetail = async (req, res) => {
    try {
        const id = req.query.id
        const data = await dailyTransportDetail.findById(id)
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
exports.deleteByIddailyTransportDetail = async (req, res) => {
    try {
        const id = req.query.id
        const data = await dailyTransportDetail.deleteOne({ _id: id })
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