const router = require('express').Router()
const userController = require('../controller/user.controller')
const userAuth = require('../middleware/auth.middleware').userAuth
const adminAuth = require('../middleware/auth.middleware').adminAuth
const freelancerAuth = require('../middleware/auth.middleware').freelancerAuth
const upload = require("../middleware/fileUpload")

router.post('/register', userController.register)
router.post('/login', userController.login)

// show profile
router.get('/profile', userAuth, userController.profile)

// get notifications
router.get('/notifications', userAuth, userController.getNotifications)

// add Image 
router.post('/addImg', userAuth, upload.single('img'), userController.addImg)

// add info 
router.post('/addInfo', userAuth, userController.addInfo)

// edit profile
router.patch('/editProfile', userAuth, userController.editProfile)

// add skill, experience, socialLinks
router.post("/addSkill", freelancerAuth, userController.addSkill)
router.post("/addExperience", freelancerAuth, userController.addExperience)
router.post("/addLink", userAuth, userController.addLink)

// delete account
router.delete('/del/account', userAuth, userController.delAcccount)

// delete user by admin
router.delete('/del/user/:id', adminAuth, userController.deleteUser)

// delete job by admin
router.delete('/del/job/:id', adminAuth, userController.delJob)

// load users by admin
router.get('/getUsers', adminAuth, userController.showAll)

// show single user
router.get('/user/:id', userAuth, userController.showSingle)

// logout
router.get('/logout', userAuth, userController.logout)

module.exports = router