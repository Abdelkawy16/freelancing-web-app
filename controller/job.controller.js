const Job = require('../db/model/job.model')
const User = require('../db/model/user.model')

class jobController {
    static showAll = async (req, res) => {
        try {
            const jobs = await Job.find()
            res.send({ apiStatus: true, data: jobs, message: "jobs loaded successfully" })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, data: e.message, message: "error loading jobs" })
        }
    }
    static showSingle = async (req, res) => {
        try {
            const job = await Job.findById({ _id: req.params.id })
            res.send({ apiStatus: true, data: job, message: "job loaded successfully" })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, data: e.message, message: "error loading job" })
        }
    }
    static addJob = async (req, res) => {
        try {
            // if (req.user.userType != 'client') throw new Error('only clients allowed to publish jobs')
            const job = new Job({
                ownerId: req.user._id,
                ...req.body
            })
            await job.save()
            res.send({ apiStatus: true, data: job, message: "job added successfully" })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, data: e.message, message: "error adding job" })
        }
    }
    static getMyJobs = async (req, res) => {
        try {
            await req.user.populate('myJobs')
            res.send({ apiStatus: true, data: req.user.myJobs, message: "jobs loaded successfully" })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, data: e.message, message: "error loading jobs" })
        }
    }
    static delJob = async (req, res) => {
        try {
            const job = await Job.findById(req.params.id)
            if (!job) throw new Error('job not found')
            if (job.ownerId != req.user._id.toString()) throw new Error('this job belongs to another Client')
            await Job.deleteOne(job)
            res.send({ apiStatus: true, data: job, message: "job deleted successfully" })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, data: e.message, message: "error deleting job" })
        }
    }
    static applyJob = async (req, res) => {
        try {
            const job = await Job.findById(req.params.id)
            if (!job) throw new Error('job not found')
            if(job.done == true) throw new Error('job ended successfully')
            job.offers.push({
                freelancer: req.user._id,
                ...req.body
            })
            await job.save()
            res.send({ apiStatus: true, data: job, message: "applied successfully" })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, data: e.message, message: "error applying job" })
        }
    }
    static acceptOffer = async (req, res) => {
        try {
            const job = await Job.findById(req.params.jobId)
            if (!job)throw new Error('Job not found!')
            if (job.ownerId != req.user._id.toString()) throw new Error('this job belongs to another Client')
            const offer = job.offers.find(offer => offer._id == req.params.offerId.toString())
            if (!offer) throw new Error('offer not found')
            if(offer.status == true) throw new Error('this offer is already accepted!')
            offer.status = true
            const freelancer = await User.findById(offer.freelancer)
            if (freelancer) {
                freelancer.notifications.unshift({ msg: `${req.user.name} accepted you working on ${job.title} at ${(new Date()).toString().slice(0,25)}. please contact with him on phone number: ${req.user.phone} ASAP!` })
                await freelancer.save()
            }
            job.done = true
            job.offers = [offer]
            await job.save()
            res.send({ apiStatus: true, data: job, message: "accepted successfully" })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, data: e.message, message: "error accepting job" })
        }
    }
    static searchByTitle = async (req, res) => {
        try {
            const jobs = await Job.find({ title: req.body.title })
            res.send({ apiStatus: true, data: jobs, message: "jobs loaded successfully" })
        }
        catch (e) {
            res.status(500).send({ apiStatus: false, data: e.message, message: "error loading jobs" })
        }
    }
    static editJob = async (req, res) => {
        try {
            const job = await Job.updateOne({ _id: req.params.id }, { $set: req.body })
            await job.save()
            res.status(200).send({
                apiStatus: true,
                data: job,
                message: "job data updated"
            })
        } catch (e) {
            res.status(500).send({
                apiStatus: false,
                message: 'error in editing job',
                data: e.message
            })
        }
    }
}

module.exports = jobController