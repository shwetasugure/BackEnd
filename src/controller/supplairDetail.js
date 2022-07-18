const { objSum, phoneNumber } = require("../common-function");
const supplairDetail = require("../models/supplairDetail");


exports.supplairDetail = async (req, res) => {
    try {
        const id = req.query.id
        const isExist = await supplairDetail.findOne({ _id: id }).exec()
        if (phoneNumber(req.body.conatctNumber) === false) return res.status(500).json({ Message: "Invalied Phone Number...!" })
        if (isExist) {
            var myquery = { _id: id };
            var newvalues = {
                $set: req.body
            };
            const data = await supplairDetail.updateOne(myquery, newvalues).exec()
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
            const _production = new supplairDetail(req.body);
            const data = await _production.save()
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
        console.log(error);
        res.status(500).json({
            Message: "Something Went Wrong ...!"
        })
    }
}

exports.getAllsupplairDetail = async (req, res) => {
    try {
        const pageOptions = {
            page: parseInt(req.query.page, 10) || 0,
            limit: parseInt(req.query.limit, 10) || 10
        }
        delete req.query["page"];
        delete req.query["limit"];

        const data = await supplairDetail.find(req.query)
            .limit(pageOptions.limit)
            .skip(pageOptions.page * pageOptions.limit)
        const totalCount = await supplairDetail.find(req.query).count()
        if (data) {
            res.status(200).json({
                data,
                totalCount
            })
        }
    } catch (error) {
        res.status(500).json({
            Message: "Something Went Wrong ...!"
        })
    }
}

exports.getByIdsupplairDetail = async (req, res) => {
    try {
        const id = req.query.id
        const data = await supplairDetail.findById(id)
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
exports.deleteByIdsupplairDetail = async (req, res) => {
    try {
        const id = req.query.id
        const data = await supplairDetail.deleteOne({ _id: id })
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