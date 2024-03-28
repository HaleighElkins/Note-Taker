const router = require("express").Router();
const routerApi = require ('./route-api')


router.use('/notes', routerApi)
module.exports = router