const User = require('../db/model/user.model')
const Job = require('../db/model/job.model')
// const emailSetting = require('../helpers/email.helper')
// const generateTxt = require('../helpers/generateEmail')

class userController {
    // all users
    static register = async (req, res) => {
        try {
            let user = new User(req.body)
            await user.save()
            // emailSetting(user.email, generateTxt(), "new registeration" )
            res.status(200).send({
                apiStatus: true,
                message: 'registered',
                data: user
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: 'error in adding user',
                data: e.message
            })
        }
    }
    static login = async (req, res) => {
        try {
            const user = await User.loginUser(req.body.email, req.body.password)
            const token = await user.generateToken()
            res.status(200).send({
                apiStatus: true,
                message: 'logged in',
                data: { user, token }
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: 'error in logging in',
                data: e.message
            })
        }
    }
    static profile = async (req, res) => {
        try {
            res.status(200).send({
                apiStatus: true,
                data: req.user,
                message: "user data loaded"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: 'error in loading freelancer',
                data: e.message
            })
        }
    }
    static editProfile = async (req, res) => {
        try {
            await User.updateOne({ _id: req.user._id }, { $set: req.body })
            await req.user.save()
            res.status(200).send({
                apiStatus: true,
                data: req.user,
                message: "user data updated"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: 'error in editing user',
                data: e.message
            })
        }
    }
    static logout = async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter(ele => ele.token != req.token)
            await req.user.save()
            res.status(200).send({
                apiStatus: true,
                message: 'logged out'
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: 'error in logging out',
                data: e.message
            })
        }
    }
    static addLink = async (req, res) => {
        try {
            req.user.socialLinks.push(req.body)
            await req.user.save()
            res.status(200).send({
                apiStatus: true,
                data: req.user,
                message: "added successfuly"
            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error adding socialLinks"
            })
        }
    }
    static addImg = async (req, res) => {
        try {
            if (!req.file) throw new Error("file not found")
            req.user.image = req.file.path.replaceAll('\\', '/')
            await req.user.save()
            res.status(200).send({ apiStatus: true, data: req.user, message: "profile image updated" })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, data: e.message, message: "error add image" })
        }
    }
    static delAcccount = async (req, res) => {
        try {
            const user = await User.findById(req.user._id)
            if (user.userType == 'client') {
                await Job.deleteMany({ ownerId: user._id })
            }
            await User.deleteOne(user)
            res.status(200).send({
                apiStatus: true,
                data: user,
                message: "user deleted successfully"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: 'error in deleting account',
                data: e.message
            })
        }
    }
    static searchByName = async(req, res)=>{
        try {
            const users = await User.find({name: req.body.name})
            res.send({ apiStatus: true, data: users, message: "users loaded successfully" })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, data: e.message, message: "error loading users" })
        }
    }

    // only for freelancers
    static addSkill = async (req, res) => {
        try {
            req.user.skills.push(req.body)
            await req.user.save()
            res.status(200).send({
                apiStatus: true,
                data: req.user,
                message: "added successfuly"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error adding skill"
            })
        }
    }
    static addExperience = async (req, res) => {
        try {
            req.user.experiences.push(req.body)
            await req.user.save()
            res.status(200).send({
                apiStatus: true,
                data: req.user,
                message: "added successfuly"
            })
        }
        catch (e) {
            res.status(500).send({
                apiStatus: false,
                data: e.message,
                message: "error adding experience"
            })
        }
    }

    // only client
    static rateFreelancer = async (req, res) => {
        
    }

    // only Admin
    static deleteUser = async (req, res)=>{
        try {
            const user = await User.findById(req.params.id)
            if (!user) throw new Error('user not found')
            await User.deleteOne(user)
            res.send({ apiStatus: true, data: user, message: "user deleted successfully" })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, data: e.message, message: "error deleting user" })
        }
    }
    static delJob = async (req, res) => {
        try {
            const job = await Job.findById(req.params.id)
            if (!job) throw new Error('job not found')
            await Job.deleteOne(job)
            res.send({ apiStatus: true, data: job, message: "job deleted successfully" })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, data: e.message, message: "error deleting job" })
        }
    }
}

module.exports = userController