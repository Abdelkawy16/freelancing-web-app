const router = require('express').Router()
const jobController = require('../controller/job.controller')
const userAuth = require('../middleware/auth.middleware').userAuth
const clientAuth = require('../middleware/auth.middleware').clientAuth
const adminAuth = require('../middleware/auth.middleware').adminAuth
const freelancerAuth = require('../middleware/auth.middleware').freelancerAuth

router.get('/', jobController.showAll)
router.get('/:id', jobController.showSingle)
router.get('/myJobs', clientAuth, jobController.getMyJobs)
router.post('/add', clientAuth, jobController.addJob)
router.delete('/del/:id', clientAuth, jobController.delJob)
router.post('/search', userAuth, jobController.searchByTitle)
router.patch('/edit:id', clientAuth, jobController.editJob)

router.post('/applyJob/:id', freelancerAuth, jobController.applyJob)
router.post('/acceptOffer/:jobId/:offerId', clientAuth, jobController.acceptOffer)

module.exports = router