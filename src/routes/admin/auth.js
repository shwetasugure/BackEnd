const express = require('express');
const { signup, signin, update, getadmin, deleteadmin } = require('../../controller/admin/auth');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../../validators/auth');
const { requiredsignin, verifyadmin } = require("../../common-middleware/index")
const router = express.Router();


router.post('/admin/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/admin/signin', validateSigninRequest, isRequestValidated, signin);
router.put('/admin/update', validateSignupRequest, isRequestValidated, requiredsignin, verifyadmin, update);
router.get('/admin/list', requiredsignin, verifyadmin, getadmin);
router.delete('/admin/delete', requiredsignin, verifyadmin, deleteadmin);


// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({ user: 'profile' })
// });

module.exports = router;