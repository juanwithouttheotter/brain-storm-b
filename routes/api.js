const router = require("express").Router();

// const UserControl = require('../controllers/userControl');

router.get('/', (req,res) => {
    return res.status(200).json({success: "true", message: "Welcome!"}).end();
});


module.exports = router;