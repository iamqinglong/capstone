const express = require('express')
const router = express.Router()

const crtlUser = require('../controllers/user.controller')
const crtlDevice = require('../controllers/device.controller')
const crtlTech = require('../controllers/technician.controller')
const jwtHelper = require('../config/jwtHelper')
const ctrlEvent = require('../controllers/event.controller')
const ctrlDevTech = require('../controllers/deviceTechnician.controller')
const ctrlNotification = require('../controllers/notification.controller')
const ctrlUserNotification = require('../controllers/usernotification.controller')

//Authentication
router.post('/register', crtlUser.register)
router.post('/authenticate', crtlUser.authenticate)
router.get('/userProfile', jwtHelper.verifyJwtToken ,crtlUser.userProfile)
router.post('/logout', crtlUser.logout)

//User
router.get('/getAllUsers', crtlUser.getAll)
router.get('/getUserById/:id', crtlUser.getById)
router.put('/updateUser/:id', crtlUser.update)
router.post('/createUser', crtlUser.create)
//Device
router.post('/createDevice', crtlDevice.create)
router.get('/getDevice/:id', crtlDevice.get)
router.get('/getAllDevice', crtlDevice.getAll)
router.get('/getDeviceTechnician/:id', crtlDevice.getDevTech)
router.delete('/deleteDevice/:id', crtlDevice.delete)
router.put('/updateDevice/:id', crtlDevice.update)
router.get('/getAllNotDeviceTechnician/:id', crtlDevice.getAllNotDevTech)
// router.post('/addTechnician/:id', crtlDevice.addTechnician)

//Technician
router.post('/createTech', crtlTech.create)
router.get('/getTechnician/:id', crtlTech.get)
router.get('/getAllTechnician', crtlTech.getAll)
router.get('/getTechnicianDevices/:id', crtlTech.getTechDev)
router.put('/updateTechnician/:id', crtlTech.update)
router.delete('/deleteTech/:id', crtlTech.delete)

//DeviceTechnician
router.post('/createDevTech/:id', ctrlDevTech.create)
router.post('/deleteDevTech', ctrlDevTech.delete)

//Event
router.post('/createEvent/:id', ctrlEvent.create)
router.get('/getDeviceEvent/:id', ctrlEvent.getAll)
router.post('/deleteEvent', ctrlEvent.delete)
router.get('/getEvent/:id', ctrlEvent.get)
router.get('/getEventByTopic/', ctrlEvent.getAllByTopic)
router.post('/updateEvent/:id', ctrlEvent.update)

//Notification
router.post('/createNotification', ctrlNotification.create)
router.get('/getUserNotification/:id', ctrlNotification.get)
router.get('/getNotification/:id', ctrlNotification.getNotif)
//UserNotification
router.post('/createUserNotification/:id', ctrlUserNotification.create)

module.exports = router