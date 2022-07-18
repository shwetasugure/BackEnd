const { objSum, phoneNumber } = require("../common-function");
const workerSalary = require("../models/workerSalary");


exports.workerSalary = async (req, res) => {
    try {
        req.body.amount = req.body.noOfPlates * req.body.pricePerPlate
        const id = req.query.id
        const isExist = await workerSalary.findOne({ _id: id }).exec()
        if (isExist) {
            var myquery = { _id: id };
            var newvalues = {
                $set: req.body
            };
            const data = await workerSalary.updateOne(myquery, newvalues).exec()
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
            const _production = new workerSalary(req.body);
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

exports.getAllworkerSalary = async (req, res) => {
    try {
        const pageOptions = {
            page: parseInt(req.query.page, 10) || 0,
            limit: parseInt(req.query.limit, 10) || 10
        }
        delete req.query["page"];
        delete req.query["limit"];

        const data = await workerSalary.find(req.query)
            .limit(pageOptions.limit)
            .skip(pageOptions.page * pageOptions.limit)
        const allData = await workerSalary.find(req.query)
        const totalCount = await workerSalary.find(req.query).count()
        if (data && allData) {
            var totalAmount = 0
            var totalPlate = 0
            if (totalCount > 0) {
                totalAmount = objSum(allData, "amount")
                totalPlate = objSum(allData, "noOfPlates")
            }
            res.status(200).json({
                data,
                totalCount,
                totalAmount,
                totalPlate
            })
        }
    } catch (error) {
        res.status(500).json({
            Message: "Something Went Wrong ...!"
        })
    }
}

exports.getByIdworkerSalary = async (req, res) => {
    try {
        const id = req.query.id
        const data = await workerSalary.findById(id)
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
exports.deleteByIdworkerSalary = async (req, res) => {
    try {
        const id = req.query.id
        const data = await workerSalary.deleteOne({ _id: id })
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