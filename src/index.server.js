const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
var cors = require('cors')


//routes
const superadminRoutes = require("./routes/superadmin/auth");
const adminRoutes = require("./routes/admin/auth");
const production = require('./routes/production')
const customerDetail = require('./routes/customerDetail')
const vehicalDetail = require('./routes/vehicalDetail')
const supplairDetail = require('./routes/supplairDetail')
const dailyTransportDetail = require('./routes/dailyTransportDetail')
const dustAndPowderRawMatirial = require('./routes/dustAndPowderRawMatirial')
const cementRawMatirial = require('./routes/cementRawMatirial')
const pondAshRawMatirial = require('./routes/pondAshRawMatirial')
const flyAshRawMatirial = require('./routes/flyAshRawMatirial')
const chemicalRawMatirial = require('./routes/chemicalRawMatirial')
const workerSalary = require('./routes/workerSalary')
const maintainesCost = require('./routes/maintainesCost')


env.config();
mongoose.connect(`mongodb://localhost/${process.env.MONGO_DB_DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
var connect = mongoose.connection.once('open', function () {
    console.log("Database Connected")
}).on('error', function (error) {
    console.log(error)
})

app.use(cors())
app.use(express.static("uploads"));
app.use(express.json());
app.use("/api", superadminRoutes);
app.use("/api", adminRoutes);
app.use("/api", production);
app.use("/api", customerDetail);
app.use("/api", vehicalDetail);
app.use("/api", supplairDetail);
app.use("/api", dailyTransportDetail);
app.use("/api", dustAndPowderRawMatirial);
app.use("/api", cementRawMatirial);
app.use("/api", pondAshRawMatirial);
app.use("/api", flyAshRawMatirial);
app.use("/api", chemicalRawMatirial);
app.use("/api", workerSalary);
app.use("/api", maintainesCost);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
