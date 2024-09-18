const jwt = require("jsonwebtoken");

exports.requiredsignin = (req, res, next) => {
    const token = req.headers.token;
    if (!req.headers.token)
        return res.status(400).json({
            message: "Please Enter Your Sign in token ",
        });
    jwt.verify(token, process.env.JWT_SECRET, function (err, data) {
        if (err)
            return res.status(400).json({
                message: "Access denied",
            });

        if (data) {
            req.User = data;
        }
    });
    next();
};

exports.verifyadmin = (req, res, next) => {
    if (req.User.role === "admin") {
        next();
    } else {
        return res.status(400).json({
            message: "You are Not Admin",
        });
    }
};
