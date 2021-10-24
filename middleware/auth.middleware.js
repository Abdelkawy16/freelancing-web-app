const jwt = require('jsonwebtoken')
const User = require('../db/model/user.model')

let auth = (modelName)=>{
    return async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '')
            const decoded = jwt.verify(token, process.env.JWTTOKEN)
            const user = await modelName.findOne({ _id: decoded._id, 'tokens.token': token })
            if (!user) throw new Error('unauthorized')
            req.user = user
            req.token = token
            next()
        } catch (e) { res.status(500).send({ apiStatus: false, data: e, message: "unauthorized" }) }
    }
}
const userAuth = auth(User)

const freelancerAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWTTOKEN)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) throw new Error('unauthorized')
        if(user.userType != 'freelancer') throw new Error("freelancers only allowed")
        req.user = user
        req.token = token
        next()
    } catch (e) { res.status(500).send({ apiStatus: false, data: e, message: "unauthorized" }) }
}
const clientAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWTTOKEN)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) throw new Error('unauthorized')
        if(user.userType != 'client') throw new Error("Client only allowed")
        req.user = user
        req.token = token
        next()
    } catch (e) { res.status(500).send({ apiStatus: false, data: e, message: "unauthorized" }) }
}
const adminAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWTTOKEN)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) throw new Error('unauthorized')
        if(user.userType != 'admin') throw new Error("admins only allowed")
        req.user = user
        req.token = token
        next()
    } catch (e) { res.status(500).send({ apiStatus: false, data: e, message: "unauthorized" }) }
}

module.exports = {freelancerAuth, clientAuth, userAuth, adminAuth}