const router = require("express").Router()
const authorization = require("./auth")

router.get("/", authorization, (req, resp) => {

    resp.json({data: "This route is private"})

} )

module.exports = router