const jwt = require("jsonwebtoken")

module.exports = function (req, resp, next){

    const bearerToken = req.headers.authorization
    if (!bearerToken) return resp.status(401).json({error: "Access Denied"})

    const token = bearerToke.split(" ")[1]
    if (!token) return resp.status(401).json({error: "Access Denied"})

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        next()
    } catch (err) {
        resp.status(400).json({error: "Invalid Token"})
    }

}